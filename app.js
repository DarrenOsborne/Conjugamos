import { curriculum } from "./data/curriculum.js";
import { verbDefinitions } from "./data/verbDefinitions.js";

const MODULES = [
  { id: "overview", label: "Overview", cardId: "module-overview" },
  { id: "pattern", label: "Pattern Lesson", cardId: "module-pattern" },
  { id: "verbs", label: "Core Verbs", cardId: "module-verbs" },
  { id: "recognition", label: "Recognition", cardId: "module-recognition" },
  { id: "conjugation", label: "Conjugation", cardId: "module-conjugation" },
  { id: "sentence", label: "Sentence Building", cardId: "module-sentence" },
  { id: "story", label: "Story", cardId: "module-story" }
];

const el = {
  phaseFilter: document.getElementById("phase-filter"),
  unitList: document.getElementById("unit-list"),
  unitTitle: document.getElementById("unit-title"),
  unitPhase: document.getElementById("unit-phase"),
  unitMeta: document.getElementById("unit-meta"),
  lessonPath: document.getElementById("lesson-path"),
  moduleNav: document.getElementById("module-nav"),
  moduleCounter: document.getElementById("module-counter"),
  moduleCards: Array.from(document.querySelectorAll(".module-card")),
  focusObjectives: document.getElementById("focus-objectives"),
  lessonChecklist: document.getElementById("lesson-checklist"),
  checklistProgress: document.getElementById("checklist-progress"),
  patternLesson: document.getElementById("pattern-lesson"),
  coreVerbs: document.getElementById("core-verbs"),
  recognitionArea: document.getElementById("recognition-area"),
  recognitionCounter: document.getElementById("recognition-counter"),
  nextRecognition: document.getElementById("next-recognition"),
  conjPrompt: document.getElementById("conj-prompt"),
  conjInput: document.getElementById("conj-input"),
  checkConj: document.getElementById("check-conj"),
  nextConj: document.getElementById("next-conj"),
  conjFeedback: document.getElementById("conj-feedback"),
  sentencePrompt: document.getElementById("sentence-prompt"),
  sentenceInput: document.getElementById("sentence-input"),
  checkSentence: document.getElementById("check-sentence"),
  nextSentence: document.getElementById("next-sentence"),
  sentenceFeedback: document.getElementById("sentence-feedback"),
  storyLines: document.getElementById("story-lines")
};

let currentUnit = null;
let activeModuleId = MODULES[0].id;
let recognitionIndex = 0;
let conjugationIndex = 0;
let sentenceIndex = 0;
let recognitionDeck = [];
let conjugationDeck = [];

const unitProgress = new Map();

function normalize(text) {
  return text
    .trim()
    .toLowerCase()
    .replaceAll("á", "a")
    .replaceAll("é", "e")
    .replaceAll("í", "i")
    .replaceAll("ó", "o")
    .replaceAll("ú", "u");
}

function shuffle(list) {
  const clone = [...list];
  for (let i = clone.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [clone[i], clone[j]] = [clone[j], clone[i]];
  }
  return clone;
}

function escapeHtml(text) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function renderInlineMarkdown(text) {
  return escapeHtml(text)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/`(.+?)`/g, "<code>$1</code>");
}

function markdownToHtml(markdown) {
  const lines = markdown.split("\n");
  const html = [];
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

function buildPatternLessonMarkdown(unit) {
  const conjugationExamples = unit.conjugation
    .slice(0, 4)
    .map((item) => `- **${item.prompt}** → \`${item.answer}\``)
    .join("\n");
  const sentenceExamples = unit.sentenceBuilding
    .slice(0, 3)
    .map((item) => `- ${item.prompt}: **${item.answer}**`)
    .join("\n");
  const reminders = [
    "Match the verb ending (or helping verb) to the subject pronoun first.",
    "Say the full chunk out loud before writing it to build fluency.",
    "Double-check accents and irregular spellings after you answer."
  ]
    .map((item) => `- ${item}`)
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
${sentenceExamples}

#### Accuracy checklist
${reminders}`;
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

function buildModuleNav() {
  el.moduleNav.innerHTML = "";
  MODULES.forEach((module, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `module-btn ${module.id === activeModuleId ? "active" : ""}`;
    button.textContent = `${index + 1}. ${module.label}`;
    button.addEventListener("click", () => setActiveModule(module.id));
    el.moduleNav.appendChild(button);
  });
}

function setActiveModule(moduleId) {
  activeModuleId = moduleId;
  const module = MODULES.find((item) => item.id === moduleId);

  el.moduleCards.forEach((card) => {
    card.hidden = card.id !== module.cardId;
  });

  const moduleIndex = MODULES.findIndex((item) => item.id === moduleId);
  el.moduleCounter.textContent = `Step ${moduleIndex + 1} of ${MODULES.length}`;
  el.lessonPath.textContent = `L${currentUnit.lessonNumber} / ${currentUnit.unit} / ${module.label}`;
  buildModuleNav();
}

function filteredUnits() {
  const selected = el.phaseFilter.value;
  return selected === "All phases" ? curriculum : curriculum.filter((u) => u.phase === selected);
}

function getProgress(unitId) {
  if (!unitProgress.has(unitId)) {
    unitProgress.set(unitId, {
      checklist: Array.from({ length: 6 }, () => false)
    });
  }
  return unitProgress.get(unitId);
}

function updateChecklist(index, value) {
  const progress = getProgress(currentUnit.id);
  progress.checklist[index] = value;
  renderChecklist();
}

function renderUnits() {
  const units = filteredUnits();
  el.unitList.innerHTML = "";

  units.forEach((unit) => {
    const button = document.createElement("button");
    const active = currentUnit?.id === unit.id;
    button.className = `unit-btn ${active ? "active" : ""}`;
    button.innerHTML = `<span class="unit-pill">L${unit.lessonNumber}</span><span>${unit.unit}</span>`;
    button.addEventListener("click", () => selectUnit(unit));
    el.unitList.appendChild(button);
  });

  if (!currentUnit && units.length > 0) {
    selectUnit(units[0]);
    return;
  }

  if (currentUnit && !units.some((u) => u.id === currentUnit.id) && units.length > 0) {
    selectUnit(units[0]);
  }
}

function renderObjectives() {
  el.focusObjectives.innerHTML = currentUnit.lessonObjectives.map((objective) => `<li>${objective}</li>`).join("");
}

function renderChecklist() {
  const progress = getProgress(currentUnit.id);
  el.lessonChecklist.innerHTML = currentUnit.lessonChecklist
    .map(
      (item, index) => `
        <label class="check-item">
          <input type="checkbox" data-check-index="${index}" ${progress.checklist[index] ? "checked" : ""}>
          <span>${item}</span>
        </label>
      `
    )
    .join("");

  const done = progress.checklist.filter(Boolean).length;
  el.checklistProgress.textContent = `${done}/${progress.checklist.length} lesson steps completed`;

  el.lessonChecklist.querySelectorAll("input[type='checkbox']").forEach((checkbox) => {
    checkbox.addEventListener("change", (event) => {
      const index = Number(event.target.dataset.checkIndex);
      updateChecklist(index, event.target.checked);
    });
  });
}

function renderRecognition() {
  const item = recognitionDeck[recognitionIndex % recognitionDeck.length];
  el.recognitionArea.innerHTML = `<p><strong>${item.form}</strong> → ${item.meaning}</p>`;
  el.recognitionCounter.textContent = `Card ${recognitionIndex % recognitionDeck.length + 1} of ${recognitionDeck.length}`;
}

function renderConjugation() {
  const item = conjugationDeck[conjugationIndex % conjugationDeck.length];
  el.conjPrompt.textContent = item.prompt;
  el.conjInput.value = "";
  el.conjFeedback.textContent = "";
  el.conjFeedback.className = "feedback";
}

function renderSentence() {
  const item = currentUnit.sentenceBuilding[sentenceIndex % currentUnit.sentenceBuilding.length];
  el.sentencePrompt.textContent = item.prompt;
  el.sentenceInput.value = "";
  el.sentenceFeedback.textContent = "";
  el.sentenceFeedback.className = "feedback";
}

function selectUnit(unit) {
  currentUnit = unit;
  recognitionIndex = 0;
  conjugationIndex = 0;
  sentenceIndex = 0;
  recognitionDeck = shuffle(unit.recognition);
  conjugationDeck = shuffle(unit.conjugation);

  el.unitTitle.textContent = unit.unit;
  el.unitPhase.textContent = unit.phase;
  el.unitMeta.textContent = `Lesson ${unit.lessonNumber} • ${unit.verbs.length} core verbs • ${unit.recognition.length} recognition cards • ${unit.conjugation.length} conjugation drills • ${unit.sentenceBuilding.length} sentence drills`;
  el.patternLesson.innerHTML = markdownToHtml(buildPatternLessonMarkdown(unit));
  el.coreVerbs.innerHTML = unit.verbs
    .map((verb) => `<li><strong>${verb}</strong> — ${verbDefinitions[verb] ?? "definition coming soon"}</li>`)
    .join("");
  el.storyLines.innerHTML = unit.story.map((line) => `<p>${line}</p>`).join("");

  renderObjectives();
  renderChecklist();
  renderRecognition();
  renderConjugation();
  renderSentence();
  renderUnits();
  setActiveModule(activeModuleId);
}

el.phaseFilter.addEventListener("change", () => {
  currentUnit = null;
  renderUnits();
});

el.nextRecognition.addEventListener("click", () => {
  recognitionIndex += 1;
  renderRecognition();
});

el.checkConj.addEventListener("click", () => {
  const expected = conjugationDeck[conjugationIndex % conjugationDeck.length].answer;
  const good = normalize(el.conjInput.value) === normalize(expected);
  el.conjFeedback.textContent = good ? "✅ Correct" : `❌ Expected: ${expected}`;
  el.conjFeedback.className = `feedback ${good ? "ok" : "bad"}`;
});

el.nextConj.addEventListener("click", () => {
  conjugationIndex += 1;
  renderConjugation();
});

el.checkSentence.addEventListener("click", () => {
  const expected = currentUnit.sentenceBuilding[sentenceIndex % currentUnit.sentenceBuilding.length].answer;
  const good = normalize(el.sentenceInput.value) === normalize(expected);
  el.sentenceFeedback.textContent = good ? "✅ Correct" : `❌ Example: ${expected}`;
  el.sentenceFeedback.className = `feedback ${good ? "ok" : "bad"}`;
});

el.nextSentence.addEventListener("click", () => {
  sentenceIndex += 1;
  renderSentence();
});

buildPhaseFilter();
buildModuleNav();
renderUnits();
