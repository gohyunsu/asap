const deckData = window.ASAP_DECK;
const sectionByKey = Object.fromEntries(deckData.sections.map((section) => [section.key, section]));
const syncChannel =
  typeof BroadcastChannel !== "undefined" ? new BroadcastChannel("asap-presenter-sync") : null;
const syncSourceId = `presenter-${Math.random().toString(36).slice(2, 10)}`;
const notesStorageKey = "asap-ko-script-v1";

const presenterCounter = document.getElementById("presenterCounter");
const presenterSection = document.getElementById("presenterSection");
const presenterSlideTitle = document.getElementById("presenterSlideTitle");
const presenterSlideSubtitle = document.getElementById("presenterSlideSubtitle");
const presenterNotes = document.getElementById("presenterNotes");
const presenterQa = document.getElementById("presenterQa");
const presenterNextTitle = document.getElementById("presenterNextTitle");
const presenterPrev = document.getElementById("presenterPrev");
const presenterNext = document.getElementById("presenterNext");
const openDeckLink = document.getElementById("openDeckLink");

let currentIndex = 0;
let notesStore = loadNotesStore();

function loadNotesStore() {
  try {
    const raw = window.localStorage.getItem(notesStorageKey);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function persistNotesStore() {
  window.localStorage.setItem(notesStorageKey, JSON.stringify(notesStore));
}

function currentSlide() {
  return deckData.slides[currentIndex];
}

function noteKey(index) {
  return `slide-${index + 1}`;
}

function defaultKoreanScript(slide) {
  if (Array.isArray(slide?.scriptKo)) {
    return slide.scriptKo.join("\n\n");
  }

  if (typeof slide?.scriptKo === "string") {
    return slide.scriptKo;
  }

  return "";
}

function noteValueFor(index) {
  const stored = notesStore[noteKey(index)];
  if (typeof stored === "string") {
    return stored;
  }

  return defaultKoreanScript(deckData.slides[index]);
}

function qaValueFor(index) {
  const qaItems = deckData.slides[index]?.qaKo;
  return Array.isArray(qaItems) ? qaItems : [];
}

function renderQa(index) {
  const qaItems = qaValueFor(index);

  if (!qaItems.length) {
    presenterQa.innerHTML = `<p class="presenter-empty">예상 질문이 아직 없습니다.</p>`;
    return;
  }

  presenterQa.innerHTML = qaItems
    .map(
      ([question, answer]) => `
        <article class="presenter-qa-item">
          <p class="presenter-qa-question">Q. ${question}</p>
          <p class="presenter-qa-answer">A. ${answer}</p>
        </article>
      `,
    )
    .join("");
}

function renderPresenter() {
  const slide = currentSlide();
  const section = sectionByKey[slide.section];
  const nextSlide = deckData.slides[currentIndex + 1];

  presenterCounter.textContent = `${currentIndex + 1} / ${deckData.slides.length}`;
  presenterSection.textContent = `${section.label} / ${slide.chapter}`;
  presenterSlideTitle.textContent = slide.title;
  presenterSlideSubtitle.textContent = slide.subtitle || "";
  presenterSlideSubtitle.hidden = !slide.subtitle;
  presenterNotes.value = noteValueFor(currentIndex);
  renderQa(currentIndex);
  presenterNextTitle.textContent = nextSlide ? nextSlide.title : "마지막 슬라이드";
}

function broadcastGoToSlide(index) {
  syncChannel?.postMessage({
    type: "go-to-slide",
    sourceId: syncSourceId,
    index,
  });
}

function setCurrentIndex(index, broadcast = false) {
  currentIndex = Math.max(0, Math.min(index, deckData.slides.length - 1));
  renderPresenter();
  if (broadcast) {
    broadcastGoToSlide(currentIndex);
  }
}

function handleSyncMessage(message) {
  if (!message || message.sourceId === syncSourceId) {
    return;
  }

  if (message.type === "state" && Number.isInteger(message.index)) {
    setCurrentIndex(message.index, false);
  }
}

presenterNotes.addEventListener("input", () => {
  notesStore[noteKey(currentIndex)] = presenterNotes.value;
  persistNotesStore();
});

presenterPrev.addEventListener("click", () => setCurrentIndex(currentIndex - 1, true));
presenterNext.addEventListener("click", () => setCurrentIndex(currentIndex + 1, true));

openDeckLink.addEventListener("click", () => {
  window.open(`index.html#slide-${currentIndex + 1}`, "asap-deck");
});

document.addEventListener("keydown", (event) => {
  const tagName = event.target?.tagName?.toLowerCase();
  if (tagName === "textarea") {
    return;
  }

  if (event.key === "ArrowRight" || event.key === "PageDown") {
    event.preventDefault();
    setCurrentIndex(currentIndex + 1, true);
  }

  if (event.key === "ArrowLeft" || event.key === "PageUp") {
    event.preventDefault();
    setCurrentIndex(currentIndex - 1, true);
  }
});

syncChannel?.addEventListener("message", (event) => handleSyncMessage(event.data));
syncChannel?.postMessage({ type: "request-state", sourceId: syncSourceId });

renderPresenter();
