const PRONOUNS = ["yo", "tú", "él/ella", "nosotros", "vosotros", "ellos/ellas"];
const REFLEXIVE_PRONOUNS = ["me", "te", "se", "nos", "os", "se"];

const TARGET_RECOGNITION = 50;
const TARGET_CONJUGATION = 50;
const TARGET_SENTENCE_BUILDING = 10;

const PRESENT_IRREGULARS = {
  ser: ["soy", "eres", "es", "somos", "sois", "son"],
  estar: ["estoy", "estás", "está", "estamos", "estáis", "están"],
  ir: ["voy", "vas", "va", "vamos", "vais", "van"],
  haber: ["he", "has", "ha", "hemos", "habéis", "han"],
  tener: ["tengo", "tienes", "tiene", "tenemos", "tenéis", "tienen"],
  hacer: ["hago", "haces", "hace", "hacemos", "hacéis", "hacen"],
  decir: ["digo", "dices", "dice", "decimos", "decís", "dicen"],
  poder: ["puedo", "puedes", "puede", "podemos", "podéis", "pueden"],
  querer: ["quiero", "quieres", "quiere", "queremos", "queréis", "quieren"],
  ver: ["veo", "ves", "ve", "vemos", "veis", "ven"],
  dar: ["doy", "das", "da", "damos", "dais", "dan"],
  salir: ["salgo", "sales", "sale", "salimos", "salís", "salen"],
  traer: ["traigo", "traes", "trae", "traemos", "traéis", "traen"],
  caer: ["caigo", "caes", "cae", "caemos", "caéis", "caen"],
  oír: ["oigo", "oyes", "oye", "oímos", "oís", "oyen"],
  saber: ["sé", "sabes", "sabe", "sabemos", "sabéis", "saben"],
  poner: ["pongo", "pones", "pone", "ponemos", "ponéis", "ponen"],
  venir: ["vengo", "vienes", "viene", "venimos", "venís", "vienen"],
  dormir: ["duermo", "duermes", "duerme", "dormimos", "dormís", "duermen"],
  pedir: ["pido", "pides", "pide", "pedimos", "pedís", "piden"],
  pensar: ["pienso", "piensas", "piensa", "pensamos", "pensáis", "piensan"],
  volver: ["vuelvo", "vuelves", "vuelve", "volvemos", "volvéis", "vuelven"],
  cerrar: ["cierro", "cierras", "cierra", "cerramos", "cerráis", "cierran"],
  empezar: ["empiezo", "empiezas", "empieza", "empezamos", "empezáis", "empiezan"],
  servir: ["sirvo", "sirves", "sirve", "servimos", "servís", "sirven"],
  preferir: ["prefiero", "prefieres", "prefiere", "preferimos", "preferís", "prefieren"],
  leer: ["leo", "lees", "lee", "leemos", "leéis", "leen"],
  abrir: ["abro", "abres", "abre", "abrimos", "abrís", "abren"],
  acostar: ["acuesto", "acuestas", "acuesta", "acostamos", "acostáis", "acuestan"],
  despertar: ["despierto", "despiertas", "despierta", "despertamos", "despertáis", "despiertan"],
  sentar: ["siento", "sientas", "sienta", "sentamos", "sentáis", "sientan"],
  vestir: ["visto", "vistes", "viste", "vestimos", "vestís", "visten"]
};



const PERFECT_PARTICIPLES = {
  abrir: "abierto",
  cubrir: "cubierto",
  decir: "dicho",
  escribir: "escrito",
  freír: "frito",
  hacer: "hecho",
  imprimir: "impreso",
  morir: "muerto",
  poner: "puesto",
  resolver: "resuelto",
  romper: "roto",
  ver: "visto",
  volver: "vuelto"
};



const ACCENTED_PERFECT_PARTICIPLES = {
  caer: "caído",
  creer: "creído",
  leer: "leído",
  oír: "oído",
  poseer: "poseído",
  traer: "traído"
};

const PERFECT_AUXILIARIES = {
  presentPerfect: ["he", "has", "ha", "hemos", "habéis", "han"]
};

const SENTENCE_SUBJECTS = [
  ["yo", "Yo"],
  ["tú", "Tú"],
  ["él/ella", "Él"],
  ["nosotros", "Nosotros"],
  ["vosotros", "Vosotros"],
  ["ellos/ellas", "Ellos"]
];

const SENTENCE_TEMPLATES_BY_MODE = {
  present: [
    "todos los días",
    "en la clase de español",
    "en casa por la tarde",
    "con mis amigos",
    "durante el fin de semana",
    "cuando tenemos tiempo"
  ],
  presentPerfect: [
    "hoy",
    "esta semana",
    "últimamente",
    "este mes",
    "en mi vida",
    "en esta clase"
  ]
};

function regularPresent(verb) {
  if (verb.endsWith("ar")) {
    const stem = verb.slice(0, -2);
    return ["o", "as", "a", "amos", "áis", "an"].map((ending) => `${stem}${ending}`);
  }
  if (verb.endsWith("er")) {
    const stem = verb.slice(0, -2);
    return ["o", "es", "e", "emos", "éis", "en"].map((ending) => `${stem}${ending}`);
  }
  if (verb.endsWith("ir")) {
    const stem = verb.slice(0, -2);
    return ["o", "es", "e", "imos", "ís", "en"].map((ending) => `${stem}${ending}`);
  }
  return [verb, verb, verb, verb, verb, verb];
}

function conjugatePresent(verb) {
  if (verb.endsWith("se")) {
    const baseVerb = verb.slice(0, -2);
    const baseForms = conjugatePresent(baseVerb);
    return baseForms.map((form, personIndex) => `${REFLEXIVE_PRONOUNS[personIndex]} ${form}`);
  }

  return PRESENT_IRREGULARS[verb] ?? regularPresent(verb);
}



function pastParticiple(verb) {
  if (PERFECT_PARTICIPLES[verb]) {
    return PERFECT_PARTICIPLES[verb];
  }

  if (verb.endsWith("ar")) {
    return `${verb.slice(0, -2)}ado`;
  }

  if (ACCENTED_PERFECT_PARTICIPLES[verb]) {
    return ACCENTED_PERFECT_PARTICIPLES[verb];
  }

  if (verb.endsWith("er") || verb.endsWith("ir")) {
    return `${verb.slice(0, -2)}ido`;
  }

  return verb;
}

function conjugatePresentPerfect(verb) {
  const participle = pastParticiple(verb);
  return PERFECT_AUXILIARIES.presentPerfect.map((aux) => `${aux} ${participle}`);
}

function getDrillMode(unit) {
  if (unit?.drillMode) {
    return unit.drillMode;
  }

  if ((unit?.unit ?? "").toLowerCase().includes("present perfect")) {
    return "presentPerfect";
  }

  return "present";
}

function cycleToLength(items, target) {
  if (!items?.length) {
    return [];
  }

  const expanded = [];
  for (let i = 0; i < target; i += 1) {
    expanded.push(items[i % items.length]);
  }
  return expanded;
}

function buildGeneratedDrills(verbs, mode = "present") {
  const conjugation = [];
  const recognition = [];
  const sentenceBuilding = [];

  const sentenceTemplates = SENTENCE_TEMPLATES_BY_MODE[mode] ?? SENTENCE_TEMPLATES_BY_MODE.present;
  const getForms = mode === "presentPerfect" ? conjugatePresentPerfect : conjugatePresent;
  const generationVerbs = mode === "presentPerfect" ? verbs.filter((verb) => verb !== "haber") : verbs;

  PRONOUNS.forEach((pronoun, personIndex) => {
    generationVerbs.forEach((verb) => {
      const forms = getForms(verb);
      const answer = forms[personIndex];
      conjugation.push({ prompt: `${pronoun} / ${verb}`, answer });
      recognition.push({ form: answer, meaning: `${pronoun} ${verb}` });

      const [subjectKey, subjectText] = SENTENCE_SUBJECTS[personIndex];
      const context = sentenceTemplates[personIndex % sentenceTemplates.length];
      const english = mode === "presentPerfect"
        ? `${subjectText} have/has ${verb} ${context}`
        : `${subjectText} ${verb} ${context}`;
      sentenceBuilding.push({
        prompt: english,
        answer: `${subjectKey === "yo" ? "" : subjectText + " "}${answer} ${context}`.trim()
      });
    });
  });

  return { recognition, conjugation, sentenceBuilding };
}

export function expandUnitDrills(unit) {
  const verbs = [...(unit.verbs ?? [])];
  const mode = getDrillMode(unit);
  const generated = buildGeneratedDrills(verbs, mode);

  const recognitionSource = unit.recognition?.length ? [...generated.recognition, ...unit.recognition] : generated.recognition;
  const conjugationSource = unit.conjugation?.length ? [...generated.conjugation, ...unit.conjugation] : generated.conjugation;
  const sentenceSource = unit.sentenceBuilding?.length ? [...generated.sentenceBuilding, ...unit.sentenceBuilding] : generated.sentenceBuilding;

  return {
    ...unit,
    verbs,
    recognition: cycleToLength(recognitionSource, Math.max(TARGET_RECOGNITION, verbs.length)),
    conjugation: cycleToLength(conjugationSource, Math.max(TARGET_CONJUGATION, verbs.length)),
    sentenceBuilding: cycleToLength(sentenceSource, Math.max(TARGET_SENTENCE_BUILDING, verbs.length))
  };
}
