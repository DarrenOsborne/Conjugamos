const PRONOUNS = ["yo", "tú", "él/ella", "nosotros", "vosotros", "ellos/ellas"];

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
  abrir: ["abro", "abres", "abre", "abrimos", "abrís", "abren"
  ]
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

export function expandUnitDrills(unit) {
  const verbs = unit.verbs.slice(0, 10);
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
      const startsWithUppercase = subjectText;
      const english = `${startsWithUppercase} ${verb} ${context}`;
      sentenceBuilding.push({
        prompt: english,
        answer: `${subjectKey === "yo" ? "" : subjectText + " "}${answer} ${context}`.trim()
      });
    });
  });

  return {
    ...unit,
    verbs,
    recognition,
    conjugation,
    sentenceBuilding
  };
}
