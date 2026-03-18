import { curriculum } from "./data/curriculum.js";

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
  const item = currentUnit.recognition[recognitionIndex % currentUnit.recognition.length];
  el.recognitionArea.innerHTML = `<p><strong>${item.form}</strong> → ${item.meaning}</p>`;
  el.recognitionCounter.textContent = `Card ${recognitionIndex % currentUnit.recognition.length + 1} of ${currentUnit.recognition.length}`;
}

function renderConjugation() {
  const item = currentUnit.conjugation[conjugationIndex % currentUnit.conjugation.length];
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

  el.unitTitle.textContent = unit.unit;
  el.unitPhase.textContent = unit.phase;
  el.unitMeta.textContent = `Lesson ${unit.lessonNumber} • ${unit.verbs.length} core verbs • ${unit.recognition.length} recognition cards • ${unit.conjugation.length} conjugation drills • ${unit.sentenceBuilding.length} sentence drills`;
  el.patternLesson.textContent = unit.pattern;
  el.coreVerbs.innerHTML = unit.verbs.map((v) => `<li>${v}</li>`).join("");
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
  const expected = currentUnit.conjugation[conjugationIndex % currentUnit.conjugation.length].answer;
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
