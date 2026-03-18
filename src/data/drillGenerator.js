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

const SENTENCE_SUBJECTS = [
  { personIndex: 0, subjectKey: "yo", spanish: "Yo", english: "I", showSubject: false },
  { personIndex: 0, subjectKey: "yo", spanish: "Yo", english: "I", showSubject: false },
  { personIndex: 1, subjectKey: "tú", spanish: "Tú", english: "You", showSubject: true },
  { personIndex: 1, subjectKey: "tú", spanish: "Tú", english: "You", showSubject: true },
  { personIndex: 2, subjectKey: "él/ella", spanish: "Mi hermano", english: "My brother", showSubject: true },
  { personIndex: 2, subjectKey: "él/ella", spanish: "La profesora", english: "The teacher", showSubject: true },
  { personIndex: 3, subjectKey: "nosotros", spanish: "Nosotros", english: "We", showSubject: true },
  { personIndex: 3, subjectKey: "nosotros", spanish: "Mi familia y yo", english: "My family and I", showSubject: true },
  { personIndex: 4, subjectKey: "vosotros", spanish: "Vosotros", english: "You all", showSubject: true },
  { personIndex: 4, subjectKey: "vosotros", spanish: "Tus amigos", english: "Your friends", showSubject: true },
  { personIndex: 5, subjectKey: "ellos/ellas", spanish: "Ellos", english: "They", showSubject: true },
  { personIndex: 5, subjectKey: "ellos/ellas", spanish: "Mis amigos", english: "My friends", showSubject: true }
];

const SENTENCE_OBJECTS = [
  { english: "new words", spanish: "palabras nuevas" },
  { english: "the lesson", spanish: "la lección" },
  { english: "short emails", spanish: "correos cortos" },
  { english: "the notes", spanish: "los apuntes" },
  { english: "the homework", spanish: "la tarea" },
  { english: "the door", spanish: "la puerta" }
];

const SENTENCE_CONTEXTS = [
  { english: "every day", spanish: "todos los días" },
  { english: "in Spanish class", spanish: "en la clase de español" },
  { english: "at home in the afternoon", spanish: "en casa por la tarde" },
  { english: "with friends after school", spanish: "con amigos después de clases" },
  { english: "on the weekend", spanish: "durante el fin de semana" },
  { english: "before dinner", spanish: "antes de la cena" }
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
  if (verb.endsWith("se")) {
    const baseVerb = verb.slice(0, -2);
    const baseForms = conjugatePresent(baseVerb);
    return baseForms.map((form, personIndex) => `${REFLEXIVE_PRONOUNS[personIndex]} ${form}`);
  }

  return PRESENT_IRREGULARS[verb] ?? regularPresent(verb);
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

  PRONOUNS.forEach((pronoun, personIndex) => {
    verbs.forEach((verb, verbIndex) => {
      const forms = conjugatePresent(verb);
      const answer = forms[personIndex];
      conjugation.push({ prompt: `${pronoun} / ${verb}`, answer });
      recognition.push({ form: answer, meaning: `${pronoun} ${verb}` });

      const possibleSubjects = SENTENCE_SUBJECTS.filter((subject) => subject.personIndex === personIndex);
      const subject = possibleSubjects[verbIndex % possibleSubjects.length];
      const object = SENTENCE_OBJECTS[(verbIndex + personIndex) % SENTENCE_OBJECTS.length];
      const context = SENTENCE_CONTEXTS[(verbIndex * 2 + personIndex) % SENTENCE_CONTEXTS.length];
      const english = `${subject.english} ${verb} ${object.english} ${context.english}`;
      sentenceBuilding.push({
        prompt: english,
        answer: `${subject.showSubject ? subject.spanish + " " : ""}${answer} ${object.spanish} ${context.spanish}`.trim()
      });
    });
  });

  return { recognition, conjugation, sentenceBuilding };
}

export function expandUnitDrills(unit) {
  const verbs = [...(unit.verbs ?? [])];
  const generated = buildGeneratedDrills(verbs);
  const useAutoGeneratedDrills = unit.useAutoGeneratedDrills !== false;

  const recognitionSource = useAutoGeneratedDrills
    ? unit.recognition?.length
      ? [...generated.recognition, ...unit.recognition]
      : generated.recognition
    : (unit.recognition ?? []);
  const conjugationSource = useAutoGeneratedDrills
    ? unit.conjugation?.length
      ? [...generated.conjugation, ...unit.conjugation]
      : generated.conjugation
    : (unit.conjugation ?? []);
  const sentenceSource = useAutoGeneratedDrills
    ? unit.sentenceBuilding?.length
      ? [...generated.sentenceBuilding, ...unit.sentenceBuilding]
      : generated.sentenceBuilding
    : (unit.sentenceBuilding ?? []);

  return {
    ...unit,
    verbs,
    recognition: cycleToLength(recognitionSource, Math.max(TARGET_RECOGNITION, verbs.length)),
    conjugation: cycleToLength(conjugationSource, Math.max(TARGET_CONJUGATION, verbs.length)),
    sentenceBuilding: cycleToLength(sentenceSource, Math.max(TARGET_SENTENCE_BUILDING, verbs.length))
  };
}
