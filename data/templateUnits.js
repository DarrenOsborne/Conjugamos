const templateVerbBank = [
  "hablar",
  "comer",
  "vivir",
  "tener",
  "ir",
  "hacer",
  "decir",
  "estar",
  "poder",
  "querer",
  "ver",
  "dar"
];

const defaultRecognition = [
  { form: "hablo", meaning: "I speak" },
  { form: "hablas", meaning: "you speak" },
  { form: "habla", meaning: "he/she speaks" },
  { form: "hablamos", meaning: "we speak" },
  { form: "hablan", meaning: "they speak" },
  { form: "como", meaning: "I eat" },
  { form: "comes", meaning: "you eat" },
  { form: "come", meaning: "he/she eats" },
  { form: "comemos", meaning: "we eat" },
  { form: "comen", meaning: "they eat" },
  { form: "vivo", meaning: "I live" },
  { form: "vive", meaning: "he/she lives" }
];

const defaultConjugation = [
  { prompt: "yo / hablar", answer: "hablo" },
  { prompt: "tú / comer", answer: "comes" },
  { prompt: "él / vivir", answer: "vive" },
  { prompt: "nosotros / hablar", answer: "hablamos" }
];

const defaultSentenceBuilding = [
  { prompt: "I speak in class", answer: "Hablo en clase" },
  { prompt: "We eat at home", answer: "Comemos en casa" },
  { prompt: "They live nearby", answer: "Viven cerca" }
];

const defaultChecklist = [
  "Pattern mini-lesson",
  "Core verbs review",
  "Recognition cycle",
  "Conjugation check",
  "Sentence challenge",
  "Mini-dialogue read-aloud"
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

export const templateUnits = unitTitles.map(([phase, unit], index) => ({
  phase,
  unit,
  pattern: "Focused unit workflow: short explanation, high-frequency forms, then immediate production drills.",
  lessonObjectives: [
    `Master the key pattern for ${unit.toLowerCase()}.`,
    "Connect grammar to practical communication.",
    "Complete all drills with consistent accuracy."
  ],
  verbs: templateVerbBank.slice(index % 3, (index % 3) + 10),
  recognition: defaultRecognition,
  conjugation: defaultConjugation,
  sentenceBuilding: defaultSentenceBuilding,
  story: [
    "Mini story template line 1.",
    "Mini story template line 2 with target verbs.",
    "Mini story template line 3."
  ],
  lessonChecklist: defaultChecklist
}));
