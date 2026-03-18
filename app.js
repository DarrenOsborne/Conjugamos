const curriculum = [
  {
    phase: "Phase 1 — Present Foundations",
    unit: "Present Regular Verbs",
    pattern: "Regular verbs follow predictable endings in present: -ar (o, as, a, amos, áis, an), -er/-ir (o, es, e, emos/imos, éis/ís, en).",
    verbs: ["hablar", "comer", "vivir", "estudiar", "aprender"],
    recognition: [
      { form: "hablo", meaning: "I speak" },
      { form: "comemos", meaning: "we eat" },
      { form: "viven", meaning: "they live" }
    ],
    conjugation: [
      { prompt: "yo / hablar", answer: "hablo" },
      { prompt: "nosotros / comer", answer: "comemos" },
      { prompt: "ellos / vivir", answer: "viven" }
    ],
    sentenceBuilding: [
      { prompt: "I study Spanish", answer: "Estudio español" },
      { prompt: "We learn every day", answer: "Aprendemos cada día" }
    ],
    story: ["—¿Hablas español?", "—Sí, estudio todos los días.", "Comemos juntos y practicamos."]
  },
  {
    phase: "Phase 1 — Present Foundations",
    unit: "Present Irregular YO Forms",
    pattern: "Some verbs are regular except in yo: tener→tengo, hacer→hago, poner→pongo.",
    verbs: ["tener", "hacer", "poner", "salir", "traer"],
    recognition: [
      { form: "tengo", meaning: "I have" },
      { form: "hago", meaning: "I do / make" },
      { form: "salgo", meaning: "I leave" }
    ],
    conjugation: [
      { prompt: "yo / tener", answer: "tengo" },
      { prompt: "yo / hacer", answer: "hago" },
      { prompt: "yo / traer", answer: "traigo" }
    ],
    sentenceBuilding: [
      { prompt: "I have homework", answer: "Tengo tarea" },
      { prompt: "I put the book here", answer: "Pongo el libro aquí" }
    ],
    story: ["Tengo mucho trabajo hoy.", "Hago la cena ahora.", "Luego salgo con amigos."]
  },
  {
    phase: "Phase 1 — Present Foundations",
    unit: "Present Stem-Changing Verbs",
    pattern: "Stem-changing verbs change in the root in most forms: e→ie, o→ue, e→i.",
    verbs: ["querer", "poder", "pensar", "volver", "dormir"],
    recognition: [
      { form: "puedo", meaning: "I can" },
      { form: "piensas", meaning: "you think" },
      { form: "duermen", meaning: "they sleep" }
    ],
    conjugation: [
      { prompt: "yo / querer", answer: "quiero" },
      { prompt: "tú / poder", answer: "puedes" },
      { prompt: "ellos / dormir", answer: "duermen" }
    ],
    sentenceBuilding: [
      { prompt: "I want to eat", answer: "Quiero comer" },
      { prompt: "We think about that", answer: "Pensamos en eso" }
    ],
    story: ["—¿Quieres salir?", "—No puedo. Estoy cansado.", "—Bueno, dormimos temprano."]
  },
  {
    phase: "Phase 1 — Present Foundations",
    unit: "Present Irregular Verbs (ser, estar, ir, haber)",
    pattern: "These high-frequency verbs are fully irregular and must be memorized with use.",
    verbs: ["ser", "estar", "ir", "haber", "dar"],
    recognition: [
      { form: "soy", meaning: "I am" },
      { form: "están", meaning: "they are" },
      { form: "hay", meaning: "there is/are" }
    ],
    conjugation: [
      { prompt: "yo / ser", answer: "soy" },
      { prompt: "nosotros / ir", answer: "vamos" },
      { prompt: "él / estar", answer: "está" }
    ],
    sentenceBuilding: [
      { prompt: "I am from Peru", answer: "Soy de Perú" },
      { prompt: "There is a problem", answer: "Hay un problema" }
    ],
    story: ["Soy estudiante y estoy en casa.", "Vamos al parque después.", "Hay mucha gente hoy."]
  }
];

const unitTitles = [
  ["Phase 2 — Everyday Structures", "Reflexive Verbs"],
  ["Phase 2 — Everyday Structures", "Present Continuous"],
  ["Phase 2 — Everyday Structures", "Informal Future (ir + a + infinitive)"],
  ["Phase 2 — Everyday Structures", "Present Perfect"],
  ["Phase 2 — Everyday Structures", "Present Perfect Irregulars"],
  ["Phase 3 — Past Tenses", "Preterite Regular Verbs"],
  ["Phase 3 — Past Tenses", "Preterite Irregular YO Forms"],
  ["Phase 3 — Past Tenses", "Preterite Stem-Changing Verbs"],
  ["Phase 3 — Past Tenses", "Preterite Irregular Verbs"],
  ["Phase 3 — Past Tenses", "Preterite Recap"],
  ["Phase 3 — Past Tenses", "Imperfect"],
  ["Phase 3 — Past Tenses", "Imperfect Irregulars"],
  ["Phase 3 — Past Tenses", "Past Perfect"],
  ["Phase 3 — Past Tenses", "Past Tense Recap"],
  ["Phase 4 — Future & Conditional", "Future (Simple Future)"],
  ["Phase 4 — Future & Conditional", "Future Irregulars"],
  ["Phase 4 — Future & Conditional", "Future Perfect"],
  ["Phase 4 — Future & Conditional", "Conditional"],
  ["Phase 4 — Future & Conditional", "Conditional Perfect"],
  ["Phase 4 — Future & Conditional", "Future & Conditional Recap"],
  ["Phase 5 — Subjunctive", "Present Subjunctive"],
  ["Phase 5 — Subjunctive", "Past Subjunctive"]
];

for (const [phase, unit] of unitTitles) {
  curriculum.push({
    phase,
    unit,
    pattern: "Template unit: keep explanations short, focus on high-frequency usage, and recycle forms in context.",
    verbs: ["hablar", "comer", "vivir", "tener", "ir"],
    recognition: [
      { form: "modelo 1", meaning: "sample meaning" },
      { form: "modelo 2", meaning: "sample meaning" }
    ],
    conjugation: [
      { prompt: "yo / verbo", answer: "respuesta" },
      { prompt: "tú / verbo", answer: "respuesta" }
    ],
    sentenceBuilding: [
      { prompt: "Sample sentence prompt", answer: "Respuesta de ejemplo" },
      { prompt: "Another sentence prompt", answer: "Otra respuesta" }
    ],
    story: [
      "Mini story template line 1.",
      "Mini story template line 2 with target verbs.",
      "Mini story template line 3."
    ]
  });
}

const el = {
  phaseFilter: document.getElementById("phase-filter"),
  unitList: document.getElementById("unit-list"),
  unitTitle: document.getElementById("unit-title"),
  unitPhase: document.getElementById("unit-phase"),
  patternLesson: document.getElementById("pattern-lesson"),
  coreVerbs: document.getElementById("core-verbs"),
  recognitionArea: document.getElementById("recognition-area"),
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
let recognitionIndex = 0;
let conjugationIndex = 0;
let sentenceIndex = 0;

function normalize(text) {
  return text.trim().toLowerCase().replaceAll("á", "a").replaceAll("é", "e").replaceAll("í", "i").replaceAll("ó", "o").replaceAll("ú", "u");
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

function renderUnits() {
  const units = filteredUnits();
  el.unitList.innerHTML = "";

  units.forEach((unit) => {
    const button = document.createElement("button");
    button.className = `unit-btn ${currentUnit?.unit === unit.unit ? "active" : ""}`;
    button.textContent = unit.unit;
    button.addEventListener("click", () => selectUnit(unit));
    el.unitList.appendChild(button);
  });

  if (!currentUnit && units.length > 0) selectUnit(units[0]);
}

function renderRecognition() {
  const item = currentUnit.recognition[recognitionIndex % currentUnit.recognition.length];
  el.recognitionArea.innerHTML = `<p><strong>${item.form}</strong> → ${item.meaning}</p>`;
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
  el.patternLesson.textContent = unit.pattern;
  el.coreVerbs.innerHTML = unit.verbs.map((v) => `<li>${v}</li>`).join("");
  el.storyLines.innerHTML = unit.story.map((line) => `<p>${line}</p>`).join("");

  renderRecognition();
  renderConjugation();
  renderSentence();
  renderUnits();
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
renderUnits();
