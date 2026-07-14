const deckData = window.ASAP_DECK;
const sectionByKey = Object.fromEntries(deckData.sections.map((section) => [section.key, section]));
const syncChannel =
  typeof BroadcastChannel !== "undefined" ? new BroadcastChannel("asap-presenter-sync") : null;
const syncSourceId = `presenter-${Math.random().toString(36).slice(2, 10)}`;

const presenterCounter = document.getElementById("presenterCounter");
const presenterSection = document.getElementById("presenterSection");
const presenterSlideTitle = document.getElementById("presenterSlideTitle");
const presenterSlideSubtitle = document.getElementById("presenterSlideSubtitle");
const presenterScript = document.getElementById("presenterScript");
const presenterQa = document.getElementById("presenterQa");
const presenterNextTitle = document.getElementById("presenterNextTitle");
const presenterPrev = document.getElementById("presenterPrev");
const presenterNext = document.getElementById("presenterNext");
const openDeckLink = document.getElementById("openDeckLink");

let currentIndex = 0;

function currentSlide() {
  return deckData.slides[currentIndex];
}

function normalizeScriptBlocks(slide) {
  const script = slide?.scriptKo;

  if (Array.isArray(script) && script.every((item) => typeof item === "string")) {
    if (script.length === 1) {
      return [{ speak: script[0], detail: "" }];
    }

    const [speak, detail, ...rest] = script;
    return [
      {
        speak,
        detail: [detail, ...rest].filter(Boolean).join(" "),
      },
    ];
  }

  if (Array.isArray(script)) {
    return script.map((item) => {
      if (typeof item === "string") {
        return { speak: item, detail: "" };
      }

      return {
        speak: item.speak || "",
        detail: item.detail || "",
      };
    });
  }

  if (typeof script === "string") {
    return [{ speak: script, detail: "" }];
  }

  return [];
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

function renderScript(index) {
  const scriptBlocks = normalizeScriptBlocks(deckData.slides[index]);

  if (!scriptBlocks.length) {
    presenterScript.innerHTML = `<p class="presenter-empty">스크립트가 아직 없습니다.</p>`;
    return;
  }

  presenterScript.innerHTML = scriptBlocks
    .map(
      (block) => {
        const detailHtml = String(block.detail || "")
          .split(/\n\s*\n/)
          .filter(Boolean)
          .map((paragraph) => `<p class="presenter-script-detail">${paragraph}</p>`)
          .join("");

        return `
        <article class="presenter-script-item">
          ${block.speak ? `<p class="presenter-script-speak"><strong>${block.speak}</strong></p>` : ""}
          ${detailHtml}
        </article>
      `;
      },
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
  renderScript(currentIndex);
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
