import { curriculum } from "./data/curriculum";
import { verbDefinitions } from "./data/verbDefinitions";
import type { CurriculumUnit } from "./data/schema";

type ModuleId = "overview" | "pattern" | "verbs" | "recognition" | "conjugation" | "sentence" | "story";

type UnitRouteState = {
  checklist: boolean[];
  recognitionIndex: number;
  conjugationIndex: number;
  sentenceIndex: number;
  recognitionDeck: CurriculumUnit["recognition"];
  conjugationDeck: CurriculumUnit["conjugation"];
};

const MODULES: { id: ModuleId; label: string; cardId: string }[] = [
  { id: "overview", label: "Overview", cardId: "module-overview" },
  { id: "pattern", label: "Pattern Lesson", cardId: "module-pattern" },
  { id: "verbs", label: "Core Verbs", cardId: "module-verbs" },
  { id: "recognition", label: "Recognition", cardId: "module-recognition" },
  { id: "conjugation", label: "Conjugation", cardId: "module-conjugation" },
  { id: "sentence", label: "Sentence Building", cardId: "module-sentence" },
  { id: "story", label: "Story", cardId: "module-story" }
];

const el = {
  phaseFilter: document.getElementById("phase-filter") as HTMLSelectElement,
  unitList: document.getElementById("unit-list") as HTMLDivElement,
  unitTitle: document.getElementById("unit-title") as HTMLHeadingElement,
  unitPhase: document.getElementById("unit-phase") as HTMLParagraphElement,
  unitMeta: document.getElementById("unit-meta") as HTMLParagraphElement,
  lessonPath: document.getElementById("lesson-path") as HTMLParagraphElement,
  moduleNav: document.getElementById("module-nav") as HTMLElement,
  moduleCounter: document.getElementById("module-counter") as HTMLParagraphElement,
  moduleCards: Array.from(document.querySelectorAll<HTMLElement>(".module-card")),
  focusObjectives: document.getElementById("focus-objectives") as HTMLUListElement,
  lessonChecklist: document.getElementById("lesson-checklist") as HTMLDivElement,
  checklistProgress: document.getElementById("checklist-progress") as HTMLParagraphElement,
  patternLesson: document.getElementById("pattern-lesson") as HTMLDivElement,
  coreVerbs: document.getElementById("core-verbs") as HTMLUListElement,
  recognitionArea: document.getElementById("recognition-area") as HTMLDivElement,
  recognitionCounter: document.getElementById("recognition-counter") as HTMLParagraphElement,
  nextRecognition: document.getElementById("next-recognition") as HTMLButtonElement,
  conjPrompt: document.getElementById("conj-prompt") as HTMLParagraphElement,
  conjInput: document.getElementById("conj-input") as HTMLInputElement,
  checkConj: document.getElementById("check-conj") as HTMLButtonElement,
  nextConj: document.getElementById("next-conj") as HTMLButtonElement,
  conjFeedback: document.getElementById("conj-feedback") as HTMLParagraphElement,
  sentencePrompt: document.getElementById("sentence-prompt") as HTMLParagraphElement,
  sentenceInput: document.getElementById("sentence-input") as HTMLInputElement,
  checkSentence: document.getElementById("check-sentence") as HTMLButtonElement,
  nextSentence: document.getElementById("next-sentence") as HTMLButtonElement,
  sentenceFeedback: document.getElementById("sentence-feedback") as HTMLParagraphElement,
  storyLines: document.getElementById("story-lines") as HTMLDivElement
};

const unitRouteState = new Map<string, UnitRouteState>();
let currentUnit: CurriculumUnit | null = null;
let activeModuleId: ModuleId = "overview";

function normalize(text: string) {
  return text
    .trim()
    .toLowerCase()
    .replaceAll("á", "a")
    .replaceAll("é", "e")
    .replaceAll("í", "i")
    .replaceAll("ó", "o")
    .replaceAll("ú", "u");
}

function shuffle<T>(list: T[]) {
  const clone = [...list];
  for (let i = clone.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [clone[i], clone[j]] = [clone[j], clone[i]];
  }
  return clone;
}

function escapeHtml(text: string) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function renderInlineMarkdown(text: string) {
  return escapeHtml(text)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/`(.+?)`/g, "<code>$1</code>");
}

function markdownToHtml(markdown: string) {
  const lines = markdown.split("\n");
  const html: string[] = [];
  let inList = false;

  const closeList = () => {
    if (inList) {
      html.push("</ul>");
      inList = false;
    }
  };

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      closeList();
      continue;
    }

    if (trimmed.startsWith("### ")) {
      closeList();
      html.push(`<h4>${renderInlineMarkdown(trimmed.slice(4))}</h4>`);
      continue;
    }

    if (trimmed.startsWith("#### ")) {
      closeList();
      html.push(`<h5>${renderInlineMarkdown(trimmed.slice(5))}</h5>`);
      continue;
    }

    if (trimmed.startsWith("- ")) {
      if (!inList) {
        html.push("<ul>");
        inList = true;
      }
      html.push(`<li>${renderInlineMarkdown(trimmed.slice(2))}</li>`);
      continue;
    }

    closeList();
    html.push(`<p>${renderInlineMarkdown(trimmed)}</p>`);
  }

  closeList();
  return html.join("");
}

function buildPatternLessonMarkdown(unit: CurriculumUnit) {
  const conjugationExamples = unit.conjugation
    .slice(0, 4)
    .map((item) => `- **${item.prompt}** → \`${item.answer}\``)
    .join("\n");
  const sentenceExamples = unit.sentenceBuilding
    .slice(0, 3)
    .map((item) => `- ${item.prompt}: **${item.answer}**`)
    .join("\n");

  return `### ${unit.unit}: Pattern Guide
**Core rule:** ${unit.pattern}

#### How to form it (step by step)
- Identify the subject (\`yo\`, \`tú\`, \`él/ella\`, \`nosotros\`, \`ellos\`).
- Choose the correct verb pattern for this lesson.
- Build the verb phrase in Spanish, then read it once naturally.

#### Model conjugation examples
${conjugationExamples}

#### Useful sentence models
${sentenceExamples}`;
}

function buildPhaseFilter() {
  const phases = ["All phases", ...new Set(curriculum.map((u) => u.phase))];
  for (const phase of phases) {
    const option = document.createElement("option");
    option.value = phase;
    option.textContent = phase;
    el.phaseFilter.appendChild(option);
  }
}

function filteredUnits() {
  const selected = el.phaseFilter.value;
  return selected === "All phases" ? curriculum : curriculum.filter((u) => u.phase === selected);
}

function getRouteState(unit: CurriculumUnit): UnitRouteState {
  if (!unitRouteState.has(unit.id)) {
    unitRouteState.set(unit.id, {
      checklist: Array.from({ length: unit.lessonChecklist.length }, () => false),
      recognitionIndex: 0,
      conjugationIndex: 0,
      sentenceIndex: 0,
      recognitionDeck: shuffle(unit.recognition),
      conjugationDeck: shuffle(unit.conjugation)
    });
  }

  return unitRouteState.get(unit.id)!;
}

function parseRoute() {
  const match = window.location.hash.match(/^#\/lesson\/(unit-\d+)\/module\/(\w+)$/);
  const unitId = match?.[1] ?? filteredUnits()[0]?.id ?? curriculum[0].id;
  const moduleId = match?.[2] as ModuleId | undefined;
  const module = MODULES.some((item) => item.id === moduleId) ? (moduleId as ModuleId) : "overview";
  return { unitId, moduleId: module };
}

function navigate(unitId: string, moduleId: ModuleId = activeModuleId) {
  const nextHash = `#/lesson/${unitId}/module/${moduleId}`;
  if (window.location.hash === nextHash) {
    renderFromRoute();
    return;
  }
  window.location.hash = nextHash;
}

function renderModuleNav() {
  el.moduleNav.innerHTML = "";
  MODULES.forEach((module, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `module-btn ${module.id === activeModuleId ? "active" : ""}`;
    button.textContent = `${index + 1}. ${module.label}`;
    button.addEventListener("click", () => {
      if (currentUnit) {
        navigate(currentUnit.id, module.id);
      }
    });
    el.moduleNav.appendChild(button);
  });
}

function setActiveModule(moduleId: ModuleId) {
  activeModuleId = moduleId;
  const module = MODULES.find((item) => item.id === moduleId)!;

  el.moduleCards.forEach((card) => {
    card.hidden = card.id !== module.cardId;
  });

  const moduleIndex = MODULES.findIndex((item) => item.id === moduleId);
  el.moduleCounter.textContent = `Step ${moduleIndex + 1} of ${MODULES.length}`;
  if (currentUnit) {
    el.lessonPath.textContent = `L${currentUnit.lessonNumber} / ${currentUnit.unit} / ${module.label}`;
  }
  renderModuleNav();
}

function renderUnits() {
  const units = filteredUnits();
  el.unitList.innerHTML = "";

  units.forEach((unit) => {
    const button = document.createElement("button");
    button.className = `unit-btn ${currentUnit?.id === unit.id ? "active" : ""}`;
    button.innerHTML = `<span class="unit-pill">L${unit.lessonNumber}</span><span>${unit.unit}</span>`;
    button.addEventListener("click", () => navigate(unit.id, activeModuleId));
    el.unitList.appendChild(button);
  });
}

function renderChecklist(unit: CurriculumUnit) {
  const state = getRouteState(unit);
  el.lessonChecklist.innerHTML = unit.lessonChecklist
    .map(
      (item, index) => `
        <label class="check-item">
          <input type="checkbox" data-check-index="${index}" ${state.checklist[index] ? "checked" : ""}>
          <span>${item}</span>
        </label>
      `
    )
    .join("");

  const done = state.checklist.filter(Boolean).length;
  el.checklistProgress.textContent = `${done}/${state.checklist.length} lesson steps completed`;

  el.lessonChecklist.querySelectorAll<HTMLInputElement>("input[type='checkbox']").forEach((checkbox) => {
    checkbox.addEventListener("change", (event) => {
      const index = Number((event.target as HTMLInputElement).dataset.checkIndex);
      state.checklist[index] = (event.target as HTMLInputElement).checked;
      renderChecklist(unit);
    });
  });
}

function renderRecognition(unit: CurriculumUnit) {
  const state = getRouteState(unit);
  const item = state.recognitionDeck[state.recognitionIndex % state.recognitionDeck.length];
  el.recognitionArea.innerHTML = `<p><strong>${item.form}</strong> → ${item.meaning}</p>`;
  el.recognitionCounter.textContent = `Card ${state.recognitionIndex % state.recognitionDeck.length + 1} of ${state.recognitionDeck.length}`;
}

function renderConjugation(unit: CurriculumUnit) {
  const state = getRouteState(unit);
  const item = state.conjugationDeck[state.conjugationIndex % state.conjugationDeck.length];
  el.conjPrompt.textContent = item.prompt;
  el.conjInput.value = "";
  el.conjFeedback.textContent = "";
  el.conjFeedback.className = "feedback";
}

function renderSentence(unit: CurriculumUnit) {
  const state = getRouteState(unit);
  const item = unit.sentenceBuilding[state.sentenceIndex % unit.sentenceBuilding.length];
  el.sentencePrompt.textContent = item.prompt;
  el.sentenceInput.value = "";
  el.sentenceFeedback.textContent = "";
  el.sentenceFeedback.className = "feedback";
}

function renderLesson(unit: CurriculumUnit) {
  currentUnit = unit;
  el.unitTitle.textContent = unit.unit;
  el.unitPhase.textContent = unit.phase;
  el.unitMeta.textContent = `Lesson ${unit.lessonNumber} • ${unit.verbs.length} core verbs • ${unit.recognition.length} recognition cards • ${unit.conjugation.length} conjugation drills • ${unit.sentenceBuilding.length} sentence drills`;
  el.patternLesson.innerHTML = markdownToHtml(buildPatternLessonMarkdown(unit));
  el.coreVerbs.innerHTML = unit.verbs
    .map((verb) => `<li><strong>${verb}</strong> — ${verbDefinitions[verb] ?? "definition coming soon"}</li>`)
    .join("");
  el.storyLines.innerHTML = unit.story.map((line) => `<p>${line}</p>`).join("");
  el.focusObjectives.innerHTML = unit.lessonObjectives.map((objective) => `<li>${objective}</li>`).join("");

  renderChecklist(unit);
  renderRecognition(unit);
  renderConjugation(unit);
  renderSentence(unit);
  renderUnits();
  setActiveModule(activeModuleId);
}

function renderFromRoute() {
  const { unitId, moduleId } = parseRoute();
  const availableUnits = filteredUnits();
  const unit = availableUnits.find((item) => item.id === unitId) ?? availableUnits[0] ?? curriculum[0];
  if (!unit) {
    return;
  }

  activeModuleId = moduleId;
  renderLesson(unit);
}

el.phaseFilter.addEventListener("change", () => {
  const units = filteredUnits();
  const fallbackUnitId = units[0]?.id ?? curriculum[0].id;
  navigate(fallbackUnitId, activeModuleId);
});

el.nextRecognition.addEventListener("click", () => {
  if (!currentUnit) {
    return;
  }
  const state = getRouteState(currentUnit);
  state.recognitionIndex += 1;
  renderRecognition(currentUnit);
});

el.checkConj.addEventListener("click", () => {
  if (!currentUnit) {
    return;
  }
  const state = getRouteState(currentUnit);
  const expected = state.conjugationDeck[state.conjugationIndex % state.conjugationDeck.length].answer;
  const good = normalize(el.conjInput.value) === normalize(expected);
  el.conjFeedback.textContent = good ? "✅ Correct" : `❌ Expected: ${expected}`;
  el.conjFeedback.className = `feedback ${good ? "ok" : "bad"}`;
});

el.nextConj.addEventListener("click", () => {
  if (!currentUnit) {
    return;
  }
  const state = getRouteState(currentUnit);
  state.conjugationIndex += 1;
  renderConjugation(currentUnit);
});

el.checkSentence.addEventListener("click", () => {
  if (!currentUnit) {
    return;
  }
  const state = getRouteState(currentUnit);
  const expected = currentUnit.sentenceBuilding[state.sentenceIndex % currentUnit.sentenceBuilding.length].answer;
  const good = normalize(el.sentenceInput.value) === normalize(expected);
  el.sentenceFeedback.textContent = good ? "✅ Correct" : `❌ Example: ${expected}`;
  el.sentenceFeedback.className = `feedback ${good ? "ok" : "bad"}`;
});

el.nextSentence.addEventListener("click", () => {
  if (!currentUnit) {
    return;
  }
  const state = getRouteState(currentUnit);
  state.sentenceIndex += 1;
  renderSentence(currentUnit);
});

window.addEventListener("hashchange", renderFromRoute);

buildPhaseFilter();
if (!window.location.hash.startsWith("#/lesson/")) {
  navigate(curriculum[0].id, "overview");
} else {
  renderFromRoute();
}
