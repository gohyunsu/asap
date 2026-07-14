const deckData = window.ASAP_DECK;
const deck = document.getElementById("deck");
const sectionNav = document.getElementById("sectionNav");
const chapterNav = document.getElementById("chapterNav");
const counter = document.getElementById("slideCounter");
const progress = document.getElementById("progressBar");
const prevButton = document.getElementById("prevSlide");
const nextButton = document.getElementById("nextSlide");
const presenterButton = document.getElementById("openPresenter");
const topbar = document.querySelector(".topbar");
const syncChannel =
  typeof BroadcastChannel !== "undefined" ? new BroadcastChannel("asap-presenter-sync") : null;
const syncSourceId = `deck-${Math.random().toString(36).slice(2, 10)}`;

const sectionByKey = Object.fromEntries(deckData.sections.map((section) => [section.key, section]));
let slides = [];
let currentIndex = 0;

function currentSlide() {
  return deckData.slides[currentIndex];
}

function buildSyncPayload() {
  return {
    type: "state",
    sourceId: syncSourceId,
    index: currentIndex,
    slideCount: deckData.slides.length,
    title: currentSlide()?.title || "",
  };
}

function broadcastState() {
  syncChannel?.postMessage(buildSyncPayload());
}

function handleSyncMessage(message) {
  if (!message || message.sourceId === syncSourceId) {
    return;
  }

  if (message.type === "go-to-slide" && Number.isInteger(message.index)) {
    goToSlide(message.index);
    return;
  }

  if (message.type === "request-state") {
    broadcastState();
  }
}

function openPresenterWindow() {
  const presenter = window.open(
    "presenter.html",
    "asap-presenter",
    "popup=yes,width=760,height=900,resizable=yes,scrollbars=yes",
  );

  if (presenter) {
    presenter.focus();
    window.setTimeout(() => broadcastState(), 150);
  }
}

function syncTopbarHeight() {
  if (!topbar) {
    return;
  }

  document.documentElement.style.setProperty("--topbar-h", `${Math.ceil(topbar.getBoundingClientRect().height)}px`);
}

function firstSlideIndex(predicate) {
  return deckData.slides.findIndex(predicate);
}

function currentScrollContainer() {
  return deck;
}

function canScrollWithinSlide(direction) {
  const container = currentScrollContainer();

  if (!container) {
    return false;
  }

  const remainingDown = container.scrollHeight - container.clientHeight - container.scrollTop;
  const remainingUp = container.scrollTop;

  return direction > 0 ? remainingDown > 6 : remainingUp > 6;
}

function scrollWithinSlide(direction) {
  const container = currentScrollContainer();

  if (!container) {
    return;
  }

  const amount = Math.max(180, Math.floor(container.clientHeight * 0.84));
  container.scrollBy({ top: direction * amount, behavior: "smooth" });
}

function renderTextList(items = []) {
  if (!items.length) {
    return "";
  }

  return `<ul class="bullets">${items.map((item) => `<li>${item}</li>`).join("")}</ul>`;
}

function renderBlocks(blocks = []) {
  if (!blocks.length) {
    return "";
  }

  return `
    <div class="cards" style="--cols:${blocks.length >= 3 ? 3 : 2}">
      ${blocks
        .map(
          (block) => `
            <article class="card">
              <h3>${block.title}</h3>
              <p>${block.text}</p>
            </article>
          `,
        )
        .join("")}
    </div>
  `;
}

function renderVisual(visual) {
  if (!visual) {
    return "";
  }

  if (visual.type === "image") {
    const source = visual.source
      ? `<a href="${visual.source}" target="_blank" rel="noreferrer">${visual.sourceLabel || "source"}</a>`
      : "";
    const caption = [visual.caption, source].filter(Boolean).join(" · ");
    const figureClasses = [
      "visual",
      visual.cover ? "cover" : "",
      visual.className || "",
      visual.src && visual.src.includes("asap_table") ? "table-figure" : "",
    ]
      .filter(Boolean)
      .join(" ");
    return `
      <figure class="${figureClasses}">
        <img src="${visual.src}" alt="${visual.alt || visual.caption || ""}" loading="lazy" />
        ${caption ? `<figcaption class="caption">${caption}</figcaption>` : ""}
      </figure>
    `;
  }

  if (visual.type === "video") {
    const source = visual.source
      ? `<a href="${visual.source}" target="_blank" rel="noreferrer">${visual.sourceLabel || "source"}</a>`
      : "";
    const caption = [visual.caption, source].filter(Boolean).join(" · ");
    return `
      <figure class="visual ${visual.cover ? "cover" : ""}">
        <video
          src="${visual.src}"
          ${visual.poster ? `poster="${visual.poster}"` : ""}
          ${visual.autoplay === false ? "" : "autoplay"}
          ${visual.muted === false ? "" : "muted"}
          ${visual.loop === false ? "" : "loop"}
          ${visual.controls ? "controls" : ""}
          playsinline
          preload="metadata"
        ></video>
        ${caption ? `<figcaption class="caption">${caption}</figcaption>` : ""}
      </figure>
    `;
  }

  if (visual.type === "cards") {
    return `
      <div class="cards" style="--cols:${visual.cols || 2}">
        ${visual.items
          .map(
            ([title, text]) => `
              <article class="card">
                <h3>${title}</h3>
                <p>${text}</p>
              </article>
            `,
          )
          .join("")}
      </div>
    `;
  }

  if (visual.type === "terms") {
    return `
      <div class="cards" style="--cols:${visual.cols || 2}">
        ${visual.items
          .map(
            ([term, text]) => `
              <article class="term">
                <strong>${term}</strong>
                <p>${text}</p>
              </article>
            `,
          )
          .join("")}
      </div>
    `;
  }

  if (visual.type === "formula") {
    return `
      <div class="formula">
        ${visual.items
          .map(
            ([label, expression]) => `
              <div class="formula-row">
                <span>${label}</span>
                <div class="math">${expression}</div>
              </div>
            `,
          )
          .join("")}
      </div>
    `;
  }

  if (visual.type === "derivation") {
    return `
      <div class="derivation">
        ${visual.steps
          .map(
            (step, index) => `
              <div class="step">
                <span class="step-num">${index + 1}</span>
                <div>
                  <div class="math">${step.expr}</div>
                  ${step.text ? `<p class="caption">${step.text}</p>` : ""}
                </div>
              </div>
            `,
          )
          .join("")}
      </div>
    `;
  }

  if (visual.type === "table") {
    return `
      <div class="table-wrap">
        <table>
          <thead>
            <tr>${visual.headers.map((header) => `<th>${header}</th>`).join("")}</tr>
          </thead>
          <tbody>
            ${visual.rows
              .map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`)
              .join("")}
          </tbody>
        </table>
      </div>
    `;
  }

  if (visual.type === "pipeline") {
    return `
      <div class="pipeline">
        ${visual.steps
          .map(
            ([title, text], index) => `
              <div class="pipeline-step">
                <span>${index + 1}</span>
                <div><strong>${title}</strong><p>${text}</p></div>
              </div>
            `,
          )
          .join("")}
      </div>
    `;
  }

  if (visual.type === "timeline") {
    return `
      <div class="timeline">
        ${visual.items
          .map(
            ([label, title, text]) => `
              <div class="timeline-item">
                <span>${label}</span>
                <div><strong>${title}</strong><p>${text}</p></div>
              </div>
            `,
          )
          .join("")}
      </div>
    `;
  }

  if (visual.type === "sequence") {
    return `
      <div class="sequence">
        ${visual.items
          .map(
            ([title, text], index) => `
              <div class="sequence-step">
                <span>${index + 1}</span>
                <div><strong>${title}</strong><p>${text}</p></div>
              </div>
            `,
          )
          .join("")}
      </div>
    `;
  }

  if (visual.type === "compare") {
    return `
      <div class="compare">
        ${visual.rows
          .map(
            ([name, mechanism, limitation]) => `
              <div class="compare-row">
                <strong>${name}</strong>
                <span>${mechanism}</span>
                <p>${limitation}</p>
              </div>
            `,
          )
          .join("")}
      </div>
    `;
  }

  if (visual.type === "metrics") {
    return `
      <div class="metrics" style="--cols:${visual.cols || 2}">
        ${visual.items
          .map(
            ([label, value, text]) => `
              <article class="metric-card">
                <span>${label}</span>
                <strong>${value}</strong>
                <p>${text}</p>
              </article>
            `,
          )
          .join("")}
      </div>
    `;
  }

  if (visual.type === "axis") {
    return `
      <div class="axis">
        <span class="axis-label top">${visual.yTop}</span>
        <span class="axis-label bottom">${visual.yBottom}</span>
        <span class="axis-label left">${visual.xLeft}</span>
        <span class="axis-label right">${visual.xRight}</span>
        ${visual.points
          .map(
            ([label, x, y, tone]) => `
              <strong class="point ${tone}" style="left:${x}%; top:${y}%">${label}</strong>
            `,
          )
          .join("")}
      </div>
    `;
  }

  if (visual.type === "quote") {
    return `<blockquote class="quote"><p>${visual.text}</p></blockquote>`;
  }

  return "";
}

function renderSlide(slide, index) {
  const visual = renderVisual(slide.visual);
  const hasCopy = Boolean(
    slide.lead ||
      (slide.points && slide.points.length) ||
      (slide.blocks && slide.blocks.length),
  );
  const layout = slide.layout || (visual && hasCopy ? "split" : "wide");
  const slideClasses = ["slide"];
  if (slide.variant) {
    slideClasses.push(`slide-${slide.variant}`);
  }
  const content = `
    ${slide.lead ? `<p class="lead">${slide.lead}</p>` : ""}
    ${renderTextList(slide.points)}
    ${renderBlocks(slide.blocks)}
  `;

  return `
    <section class="${slideClasses.join(" ")}" id="slide-${index + 1}" data-section="${slide.section}" data-chapter="${slide.chapter}">
      <div class="slide-inner">
        <header class="slide-head">
          ${slide.role ? `<p class="kicker">${slide.role}</p>` : ""}
          <h1 class="slide-title">${slide.title}</h1>
          ${slide.subtitle ? `<p class="slide-subtitle">${slide.subtitle}</p>` : ""}
          ${slide.byline ? `<p class="slide-byline">${slide.byline}</p>` : ""}
        </header>
        <div class="slide-body">
          <div class="layout ${layout}">
            ${hasCopy ? `<div class="copy">${content}</div>` : ""}
            ${visual ? `<aside>${visual}</aside>` : ""}
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderSectionNav() {
  sectionNav.innerHTML = deckData.sections
    .map((section) => `<button type="button" data-section="${section.key}">${section.label}</button>`)
    .join("");

  sectionNav.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      const index = firstSlideIndex((slide) => slide.section === button.dataset.section);
      if (index >= 0) {
        goToSlide(index);
      }
    });
  });
}

function renderChapterNav() {
  const slide = currentSlide();
  const section = sectionByKey[slide.section];
  chapterNav.innerHTML = section.chapters
    .map((chapter) => `<button type="button" data-chapter="${chapter}">${chapter}</button>`)
    .join("");

  chapterNav.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      const index = firstSlideIndex(
        (candidate) => candidate.section === slide.section && candidate.chapter === button.dataset.chapter,
      );
      if (index >= 0) {
        goToSlide(index);
      }
    });
  });
}

function renderDeck() {
  deck.innerHTML = deckData.slides.map(renderSlide).join("");
  slides = Array.from(document.querySelectorAll(".slide"));
  counter.textContent = `1 / ${slides.length}`;
  renderSectionNav();
}

function updateState(index) {
  currentIndex = Math.max(0, Math.min(index, slides.length - 1));
  const slide = currentSlide();

  slides.forEach((slideElement, slideIndex) => {
    slideElement.classList.toggle("active", slideIndex === currentIndex);
  });

  currentScrollContainer()?.scrollTo({ top: 0, behavior: "auto" });
  counter.textContent = `${currentIndex + 1} / ${slides.length}`;
  progress.style.width = `${((currentIndex + 1) / slides.length) * 100}%`;

  sectionNav.querySelectorAll("button").forEach((button) => {
    button.classList.toggle("active", button.dataset.section === slide.section);
  });

  renderChapterNav();
  chapterNav.querySelectorAll("button").forEach((button) => {
    button.classList.toggle("active", button.dataset.chapter === slide.chapter);
  });
  syncTopbarHeight();
  broadcastState();
}

function goToSlide(index, updateHash = true) {
  const nextIndex = Math.max(0, Math.min(index, slides.length - 1));
  updateState(nextIndex);
  if (updateHash) {
    history.replaceState(null, "", `#slide-${nextIndex + 1}`);
  }
}

function syncFromHash() {
  const match = window.location.hash.match(/^#slide-(\d+)$/);
  if (!match) {
    return;
  }

  const target = Number(match[1]) - 1;
  if (target >= 0 && target < slides.length) {
    goToSlide(target, false);
  }
}

function wireInteractions() {
  presenterButton?.addEventListener("click", openPresenterWindow);
  prevButton.addEventListener("click", () => goToSlide(currentIndex - 1));
  nextButton.addEventListener("click", () => goToSlide(currentIndex + 1));

  document.querySelector(".brand").addEventListener("click", (event) => {
    event.preventDefault();
    goToSlide(0);
  });

  document.addEventListener("keydown", (event) => {
    const tagName = event.target?.tagName?.toLowerCase();
    if (tagName === "input" || tagName === "textarea" || tagName === "select") {
      return;
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      goToSlide(currentIndex + 1);
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goToSlide(currentIndex - 1);
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (canScrollWithinSlide(1)) {
        scrollWithinSlide(1);
      } else {
        goToSlide(currentIndex + 1);
      }
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (canScrollWithinSlide(-1)) {
        scrollWithinSlide(-1);
      } else {
        goToSlide(currentIndex - 1);
      }
    }

    if (event.key === "PageDown" || event.key === " ") {
      event.preventDefault();
      if (canScrollWithinSlide(1)) {
        scrollWithinSlide(1);
      } else {
        goToSlide(currentIndex + 1);
      }
    }

    if (event.key === "PageUp") {
      event.preventDefault();
      if (canScrollWithinSlide(-1)) {
        scrollWithinSlide(-1);
      } else {
        goToSlide(currentIndex - 1);
      }
    }

    if (event.key === "Home") {
      event.preventDefault();
      currentScrollContainer()?.scrollTo({ top: 0, behavior: "smooth" });
    }

    if (event.key === "End") {
      event.preventDefault();
      currentScrollContainer()?.scrollTo({ top: currentScrollContainer().scrollHeight, behavior: "smooth" });
    }

    if (event.key.toLowerCase() === "k") {
      event.preventDefault();
      openPresenterWindow();
    }
  });

  window.addEventListener("resize", syncTopbarHeight);
  syncChannel?.addEventListener("message", (event) => handleSyncMessage(event.data));
}

renderDeck();
wireInteractions();
syncTopbarHeight();
updateState(0);
syncFromHash();

window.addEventListener("hashchange", syncFromHash);
