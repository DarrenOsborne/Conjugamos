const PRONOUNS = ["yo", "tú", "él/ella", "nosotros", "vosotros", "ellos/ellas"];

const TARGET_VERBS = 15;
const TARGET_RECOGNITION = 50;
const TARGET_CONJUGATION = 50;
const TARGET_SENTENCE_BUILDING = 10;

const VERB_EXTENSION_POOL = [
  "hablar",
  "comer",
  "vivir",
  "estudiar",
  "leer",
  "escribir",
  "hacer",
  "tener",
  "ir",
  "venir",
  "trabajar",
  "practicar",
  "aprender",
  "caminar",
  "abrir"
];

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
  abrir: ["abro", "abres", "abre", "abrimos", "abrís", "abren"]
};

const SENTENCE_SUBJECTS = [
  ["yo", "Yo"],
  ["tú", "Tú"],
  ["él/ella", "Él"],
  ["nosotros", "Nosotros"],
  ["vosotros", "Vosotros"],
  ["ellos/ellas", "Ellos"]
];

const SENTENCE_TEMPLATES = [
  "todos los días",
  "en la clase de español",
  "en casa por la tarde",
  "con mis amigos",
  "durante el fin de semana",
  "cuando tenemos tiempo"
];

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
  return PRESENT_IRREGULARS[verb] ?? regularPresent(verb);
}

function uniqueWithPool(list, pool, target) {
  const merged = [...list];
  pool.forEach((item) => {
    if (merged.length < target && !merged.includes(item)) {
      merged.push(item);
    }
  });
  return merged.slice(0, target);
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

function buildGeneratedDrills(verbs) {
  const conjugation = [];
  const recognition = [];
  const sentenceBuilding = [];

  verbs.forEach((verb) => {
    const forms = conjugatePresent(verb);
    forms.forEach((answer, personIndex) => {
      const pronoun = PRONOUNS[personIndex];
      conjugation.push({ prompt: `${pronoun} / ${verb}`, answer });
      recognition.push({ form: answer, meaning: `${pronoun} ${verb}` });

      const [subjectKey, subjectText] = SENTENCE_SUBJECTS[personIndex];
      const context = SENTENCE_TEMPLATES[personIndex % SENTENCE_TEMPLATES.length];
      const english = `${subjectText} ${verb} ${context}`;
      sentenceBuilding.push({
        prompt: english,
        answer: `${subjectKey === "yo" ? "" : subjectText + " "}${answer} ${context}`.trim()
      });
    });
  });

  return { recognition, conjugation, sentenceBuilding };
}

export function expandUnitDrills(unit) {
  const verbs = uniqueWithPool(unit.verbs ?? [], VERB_EXTENSION_POOL, TARGET_VERBS);
  const generated = buildGeneratedDrills(verbs);

  const recognitionSource = unit.recognition?.length ? [...unit.recognition, ...generated.recognition] : generated.recognition;
  const conjugationSource = unit.conjugation?.length ? [...unit.conjugation, ...generated.conjugation] : generated.conjugation;
  const sentenceSource = unit.sentenceBuilding?.length ? [...unit.sentenceBuilding, ...generated.sentenceBuilding] : generated.sentenceBuilding;

  return {
    ...unit,
    verbs,
    recognition: cycleToLength(recognitionSource, TARGET_RECOGNITION),
    conjugation: cycleToLength(conjugationSource, TARGET_CONJUGATION),
    sentenceBuilding: cycleToLength(sentenceSource, TARGET_SENTENCE_BUILDING)
  };
}
