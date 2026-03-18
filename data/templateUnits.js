const defaultChecklist = [
  "Pattern mini-lesson",
  "Core verbs review",
  "Recognition cycle",
  "Conjugation check",
  "Sentence challenge",
  "Mini-dialogue read-aloud"
];

export const templateUnits = [
  {
    phase: "Phase 2 — Everyday Structures",
    unit: "Reflexive Verbs",
    pattern:
      "Reflexive verbs use me/te/se/nos/os/se before the conjugated verb. Keep pronoun-person agreement: yo me levanto, tú te pones, nosotros nos acostamos.",
    lessonObjectives: [
      "Match each reflexive pronoun with the correct subject.",
      "Conjugate daily-routine reflexive verbs in the present tense.",
      "Describe a morning and evening routine with reflexive actions."
    ],
    verbs: ["levantarse", "ponerse", "acostarse", "ducharse", "lavarse", "vestirse", "sentarse", "despertarse", "afeitarse", "maquillarse"],
    recognition: [
      { form: "me levanto", meaning: "I get up" },
      { form: "te pones", meaning: "you put on" },
      { form: "se acuesta", meaning: "he/she goes to bed" },
      { form: "nos duchamos", meaning: "we shower" },
      { form: "se visten", meaning: "they get dressed" }
    ],
    conjugation: [
      { prompt: "yo / levantarse", answer: "me levanto" },
      { prompt: "tú / ponerse", answer: "te pones" },
      { prompt: "ella / vestirse", answer: "se viste" },
      { prompt: "nosotros / acostarse", answer: "nos acostamos" },
      { prompt: "ellos / despertarse", answer: "se despiertan" }
    ],
    sentenceBuilding: [
      { prompt: "I get up at six", answer: "Me levanto a las seis" },
      { prompt: "You put on a jacket", answer: "Te pones una chaqueta" },
      { prompt: "We go to bed early", answer: "Nos acostamos temprano" }
    ],
    story: ["Me levanto temprano y me ducho rápido.", "Luego me pongo la ropa para la escuela.", "Por la noche nos acostamos antes de las diez."],
    lessonChecklist: defaultChecklist
  },
  {
    phase: "Phase 2 — Everyday Structures",
    unit: "Present Continuous",
    pattern:
      "Use estar + gerund (-ando / -iendo) for actions happening right now: estoy hablando, estás haciendo, estamos escribiendo.",
    lessonObjectives: [
      "Form gerunds correctly from -ar, -er, and -ir verbs.",
      "Conjugate estar and combine it with a gerund.",
      "Describe in-progress actions in class and at home."
    ],
    verbs: ["hablar", "hacer", "estudiar", "comer", "escribir", "leer", "vivir", "abrir", "caminar", "preparar"],
    recognition: [
      { form: "estoy hablando", meaning: "I am speaking" },
      { form: "estás haciendo", meaning: "you are doing/making" },
      { form: "está estudiando", meaning: "he/she is studying" },
      { form: "estamos comiendo", meaning: "we are eating" },
      { form: "están escribiendo", meaning: "they are writing" }
    ],
    conjugation: [
      { prompt: "yo / hablar", answer: "estoy hablando" },
      { prompt: "tú / hacer", answer: "estás haciendo" },
      { prompt: "él / leer", answer: "está leyendo" },
      { prompt: "nosotros / vivir", answer: "estamos viviendo" },
      { prompt: "ellos / abrir", answer: "están abriendo" }
    ],
    sentenceBuilding: [
      { prompt: "I am speaking with my teacher", answer: "Estoy hablando con mi profesor" },
      { prompt: "You are doing homework", answer: "Estás haciendo la tarea" },
      { prompt: "We are eating now", answer: "Estamos comiendo ahora" }
    ],
    story: ["Estoy estudiando en la biblioteca.", "Mi amigo está haciendo un proyecto.", "Ahora estamos hablando de la clase."],
    lessonChecklist: defaultChecklist
  },
  {
    phase: "Phase 2 — Everyday Structures",
    unit: "Informal Future (ir + a + infinitive)",
    pattern: "Use ir (present) + a + infinitive to say what is going to happen: voy a estudiar, vamos a salir.",
    lessonObjectives: [
      "Conjugate ir in the present tense.",
      "Build near-future statements and plans.",
      "Ask and answer what someone is going to do."
    ],
    verbs: ["ir", "estudiar", "salir", "comer", "trabajar", "visitar", "hacer", "leer", "practicar", "descansar"],
    recognition: [
      { form: "voy a estudiar", meaning: "I am going to study" },
      { form: "vas a salir", meaning: "you are going to go out" },
      { form: "va a comer", meaning: "he/she is going to eat" },
      { form: "vamos a trabajar", meaning: "we are going to work" },
      { form: "van a visitar", meaning: "they are going to visit" }
    ],
    conjugation: [
      { prompt: "yo / estudiar", answer: "voy a estudiar" },
      { prompt: "tú / hacer", answer: "vas a hacer" },
      { prompt: "ella / leer", answer: "va a leer" },
      { prompt: "nosotros / practicar", answer: "vamos a practicar" },
      { prompt: "ellos / descansar", answer: "van a descansar" }
    ],
    sentenceBuilding: [
      { prompt: "I am going to study tonight", answer: "Voy a estudiar esta noche" },
      { prompt: "We are going to visit our grandparents", answer: "Vamos a visitar a nuestros abuelos" },
      { prompt: "They are going to work tomorrow", answer: "Van a trabajar mañana" }
    ],
    story: ["Este fin de semana voy a descansar.", "Mi hermana va a estudiar para un examen.", "Luego vamos a salir con amigos."],
    lessonChecklist: defaultChecklist
  },
  {
    phase: "Phase 2 — Everyday Structures",
    unit: "Present Perfect",
    pattern: "Use haber (he, has, ha, hemos, han) + past participle to connect past actions to the present: he estudiado.",
    lessonObjectives: ["Form regular past participles.", "Conjugate haber in present perfect.", "Talk about recent experiences and completed actions."],
    verbs: ["haber", "estudiar", "comer", "vivir", "terminar", "leer", "escribir", "trabajar", "aprender", "visitar"],
    recognition: [
      { form: "he estudiado", meaning: "I have studied" },
      { form: "has comido", meaning: "you have eaten" },
      { form: "ha vivido", meaning: "he/she has lived" },
      { form: "hemos terminado", meaning: "we have finished" },
      { form: "han trabajado", meaning: "they have worked" }
    ],
    conjugation: [
      { prompt: "yo / estudiar", answer: "he estudiado" },
      { prompt: "tú / comer", answer: "has comido" },
      { prompt: "él / escribir", answer: "ha escrito" },
      { prompt: "nosotros / aprender", answer: "hemos aprendido" },
      { prompt: "ellos / visitar", answer: "han visitado" }
    ],
    sentenceBuilding: [
      { prompt: "I have studied a lot", answer: "He estudiado mucho" },
      { prompt: "You have eaten already", answer: "Has comido ya" },
      { prompt: "We have finished the project", answer: "Hemos terminado el proyecto" }
    ],
    story: ["Hoy he trabajado desde temprano.", "Mi clase ha leído dos capítulos.", "Al final hemos aprendido mucho."],
    lessonChecklist: defaultChecklist
  },
  {
    phase: "Phase 2 — Everyday Structures",
    unit: "Present Perfect Irregulars",
    pattern: "Some participles are irregular: hecho, dicho, visto, puesto, escrito, abierto, vuelto, roto.",
    lessonObjectives: ["Memorize the most common irregular participles.", "Use them accurately with haber.", "Compare regular vs irregular participles in context."],
    verbs: ["hacer", "decir", "ver", "poner", "escribir", "abrir", "volver", "romper", "morir", "resolver"],
    recognition: [
      { form: "he hecho", meaning: "I have done/made" },
      { form: "has dicho", meaning: "you have said" },
      { form: "ha visto", meaning: "he/she has seen" },
      { form: "hemos puesto", meaning: "we have put" },
      { form: "han escrito", meaning: "they have written" }
    ],
    conjugation: [
      { prompt: "yo / hacer", answer: "he hecho" },
      { prompt: "tú / decir", answer: "has dicho" },
      { prompt: "ella / abrir", answer: "ha abierto" },
      { prompt: "nosotros / volver", answer: "hemos vuelto" },
      { prompt: "ellos / romper", answer: "han roto" }
    ],
    sentenceBuilding: [
      { prompt: "I have done my homework", answer: "He hecho mi tarea" },
      { prompt: "You have said the answer", answer: "Has dicho la respuesta" },
      { prompt: "They have written a letter", answer: "Han escrito una carta" }
    ],
    story: ["Hoy he visto a mi profesor.", "También he hecho todos los ejercicios.", "Mis amigos han dicho que la clase fue útil."],
    lessonChecklist: defaultChecklist
  },
  {
    phase: "Phase 3 — Past Tenses",
    unit: "Preterite Regular Verbs",
    pattern: "Use preterite for completed past actions. Endings: -ar (é, aste, ó, amos, aron), -er/-ir (í, iste, ió, imos, ieron).",
    lessonObjectives: ["Conjugate regular verbs in preterite.", "Recognize completed actions with time markers.", "Narrate yesterday's events in sequence."],
    verbs: ["hablar", "comer", "vivir", "estudiar", "trabajar", "caminar", "leer", "escribir", "abrir", "visitar"],
    recognition: [
      { form: "hablé", meaning: "I spoke" },
      { form: "comiste", meaning: "you ate" },
      { form: "vivió", meaning: "he/she lived" },
      { form: "estudiamos", meaning: "we studied" },
      { form: "trabajaron", meaning: "they worked" }
    ],
    conjugation: [
      { prompt: "yo / hablar", answer: "hablé" },
      { prompt: "tú / comer", answer: "comiste" },
      { prompt: "ella / vivir", answer: "vivió" },
      { prompt: "nosotros / escribir", answer: "escribimos" },
      { prompt: "ellos / abrir", answer: "abrieron" }
    ],
    sentenceBuilding: [
      { prompt: "I studied last night", answer: "Estudié anoche" },
      { prompt: "We walked to school", answer: "Caminamos a la escuela" },
      { prompt: "They visited their grandmother", answer: "Visitaron a su abuela" }
    ],
    story: ["Ayer estudié para el examen.", "Luego comimos en la cafetería.", "Por la tarde escribimos un resumen."],
    lessonChecklist: defaultChecklist
  },
  {
    phase: "Phase 3 — Past Tenses",
    unit: "Preterite Irregular YO Forms",
    pattern: "Some preterite yo forms change spelling/sound: -car→qué, -gar→gué, -zar→cé (busqué, llegué, empecé).",
    lessonObjectives: ["Identify spelling-change triggers in yo preterite.", "Produce correct yo forms quickly.", "Use the forms in short past-tense statements."],
    verbs: ["buscar", "llegar", "empezar", "pagar", "tocar", "practicar", "almorzar", "sacar", "jugar", "organizar"],
    recognition: [
      { form: "busqué", meaning: "I looked for" },
      { form: "llegué", meaning: "I arrived" },
      { form: "empecé", meaning: "I started" },
      { form: "pagué", meaning: "I paid" },
      { form: "organicé", meaning: "I organized" }
    ],
    conjugation: [
      { prompt: "yo / buscar", answer: "busqué" },
      { prompt: "yo / llegar", answer: "llegué" },
      { prompt: "yo / empezar", answer: "empecé" },
      { prompt: "yo / tocar", answer: "toqué" },
      { prompt: "yo / almorzar", answer: "almorcé" }
    ],
    sentenceBuilding: [
      { prompt: "I looked for my notebook", answer: "Busqué mi cuaderno" },
      { prompt: "I arrived late", answer: "Llegué tarde" },
      { prompt: "I started the homework", answer: "Empecé la tarea" }
    ],
    story: ["Ayer busqué mis llaves por toda la casa.", "Después llegué a clase muy rápido.", "En la noche empecé a estudiar."],
    lessonChecklist: defaultChecklist
  },
  {
    phase: "Phase 3 — Past Tenses",
    unit: "Preterite Stem-Changing Verbs",
    pattern: "Some -ir verbs stem-change only in 3rd person preterite: e→i (pidió/pidieron), o→u (durmió/durmieron).",
    lessonObjectives: ["Recognize third-person stem changes.", "Conjugate affected -ir verbs in preterite.", "Use these forms in short narratives."],
    verbs: ["dormir", "pedir", "servir", "preferir", "sentir", "morir", "repetir", "vestirse", "seguir", "decir"],
    recognition: [
      { form: "durmió", meaning: "he/she slept" },
      { form: "durmieron", meaning: "they slept" },
      { form: "pidió", meaning: "he/she asked for" },
      { form: "sirvieron", meaning: "they served" },
      { form: "prefirió", meaning: "he/she preferred" }
    ],
    conjugation: [
      { prompt: "él / dormir", answer: "durmió" },
      { prompt: "ellos / dormir", answer: "durmieron" },
      { prompt: "ella / pedir", answer: "pidió" },
      { prompt: "ellos / servir", answer: "sirvieron" },
      { prompt: "él / seguir", answer: "siguió" }
    ],
    sentenceBuilding: [
      { prompt: "He slept on the sofa", answer: "Durmió en el sofá" },
      { prompt: "They served dinner", answer: "Sirvieron la cena" },
      { prompt: "She asked for help", answer: "Pidió ayuda" }
    ],
    story: ["Anoche mi hermano durmió muy bien.", "En la fiesta sirvieron comida italiana.", "Mi amiga pidió agua porque tenía sed."],
    lessonChecklist: defaultChecklist
  },
  {
    phase: "Phase 3 — Past Tenses",
    unit: "Preterite Irregular Verbs",
    pattern: "Strong preterite irregulars use special stems/endings: tener→tuv-, estar→estuv-, ir/ser→fui, hacer→hizo.",
    lessonObjectives: ["Memorize high-frequency irregular stems and endings.", "Differentiate ser/ir forms by context.", "Narrate past events with irregular preterite verbs."],
    verbs: ["tener", "estar", "ir", "ser", "hacer", "poner", "poder", "venir", "decir", "traer"],
    recognition: [
      { form: "tuve", meaning: "I had" },
      { form: "estuvo", meaning: "he/she was" },
      { form: "fuimos", meaning: "we went/were" },
      { form: "hicieron", meaning: "they did/made" },
      { form: "pudo", meaning: "he/she was able" }
    ],
    conjugation: [
      { prompt: "yo / tener", answer: "tuve" },
      { prompt: "ella / estar", answer: "estuvo" },
      { prompt: "nosotros / ir", answer: "fuimos" },
      { prompt: "ellos / hacer", answer: "hicieron" },
      { prompt: "él / poner", answer: "puso" }
    ],
    sentenceBuilding: [
      { prompt: "I had a test", answer: "Tuve un examen" },
      { prompt: "We went to the museum", answer: "Fuimos al museo" },
      { prompt: "They did the project", answer: "Hicieron el proyecto" }
    ],
    story: ["Ayer tuve una reunión importante.", "Después fuimos al laboratorio.", "Allí hicimos un experimento."],
    lessonChecklist: defaultChecklist
  },
  {
    phase: "Phase 3 — Past Tenses",
    unit: "Preterite Recap",
    pattern: "Choose the correct preterite pattern (regular, spelling change, stem change, irregular) based on the verb and subject.",
    lessonObjectives: ["Review all major preterite patterns.", "Select accurate forms under mixed practice.", "Build confidence in past-event narration."],
    verbs: ["hablar", "buscar", "dormir", "tener", "hacer", "comer", "pedir", "estar", "ir", "empezar"],
    recognition: [
      { form: "hablamos", meaning: "we spoke" },
      { form: "busqué", meaning: "I looked for" },
      { form: "durmieron", meaning: "they slept" },
      { form: "tuviste", meaning: "you had" },
      { form: "empezó", meaning: "he/she started" }
    ],
    conjugation: [
      { prompt: "nosotros / hablar", answer: "hablamos" },
      { prompt: "yo / buscar", answer: "busqué" },
      { prompt: "ellos / dormir", answer: "durmieron" },
      { prompt: "tú / tener", answer: "tuviste" },
      { prompt: "ella / empezar", answer: "empezó" }
    ],
    sentenceBuilding: [
      { prompt: "Yesterday I looked for my phone", answer: "Ayer busqué mi teléfono" },
      { prompt: "We spoke with the teacher", answer: "Hablamos con el profesor" },
      { prompt: "They slept late", answer: "Durmieron tarde" }
    ],
    story: ["Ayer hablamos mucho en clase.", "Después busqué información para la tarea.", "Por la noche me dormí temprano."],
    lessonChecklist: defaultChecklist
  },
  {
    phase: "Phase 3 — Past Tenses",
    unit: "Imperfect",
    pattern: "Use imperfect for habitual/ongoing past actions and descriptions: hablaba, comíamos, vivían.",
    lessonObjectives: ["Conjugate regular imperfect endings.", "Recognize habitual vs completed past meaning.", "Describe past routines and settings."],
    verbs: ["hablar", "comer", "vivir", "estudiar", "caminar", "leer", "trabajar", "jugar", "mirar", "escuchar"],
    recognition: [
      { form: "hablaba", meaning: "I/he/she used to speak" },
      { form: "comías", meaning: "you used to eat" },
      { form: "vivíamos", meaning: "we used to live" },
      { form: "estudiaban", meaning: "they used to study" },
      { form: "jugaba", meaning: "I/he/she used to play" }
    ],
    conjugation: [
      { prompt: "yo / hablar", answer: "hablaba" },
      { prompt: "tú / comer", answer: "comías" },
      { prompt: "nosotros / vivir", answer: "vivíamos" },
      { prompt: "ellos / estudiar", answer: "estudiaban" },
      { prompt: "ella / caminar", answer: "caminaba" }
    ],
    sentenceBuilding: [
      { prompt: "I used to study every day", answer: "Estudiaba todos los días" },
      { prompt: "We used to live in Chile", answer: "Vivíamos en Chile" },
      { prompt: "They used to play soccer", answer: "Jugaban al fútbol" }
    ],
    story: ["Cuando era niño, vivía en un pueblo pequeño.", "Todos los días caminaba con mi abuelo.", "Por la noche leíamos juntos."],
    lessonChecklist: defaultChecklist
  },
  {
    phase: "Phase 3 — Past Tenses",
    unit: "Imperfect Irregulars",
    pattern: "Only three verbs are irregular in imperfect: ser (era), ir (iba), ver (veía).",
    lessonObjectives: ["Memorize ser/ir/ver imperfect forms.", "Use irregulars in descriptions and routines.", "Contrast irregular imperfect with regular patterns."],
    verbs: ["ser", "ir", "ver", "tener", "hacer", "estar", "hablar", "comer", "vivir", "leer"],
    recognition: [
      { form: "era", meaning: "I/he/she was" },
      { form: "ibas", meaning: "you used to go" },
      { form: "veíamos", meaning: "we used to see" },
      { form: "eran", meaning: "they were" },
      { form: "iba", meaning: "I/he/she used to go" }
    ],
    conjugation: [
      { prompt: "yo / ser", answer: "era" },
      { prompt: "tú / ir", answer: "ibas" },
      { prompt: "nosotros / ver", answer: "veíamos" },
      { prompt: "ellos / ser", answer: "eran" },
      { prompt: "ella / ir", answer: "iba" }
    ],
    sentenceBuilding: [
      { prompt: "I was very shy", answer: "Era muy tímido" },
      { prompt: "We used to go to the beach", answer: "Íbamos a la playa" },
      { prompt: "They used to see that movie", answer: "Veían esa película" }
    ],
    story: ["Cuando era pequeño, era muy curioso.", "Cada verano íbamos al mar.", "Allí veíamos atardeceres increíbles."],
    lessonChecklist: defaultChecklist
  },
  {
    phase: "Phase 3 — Past Tenses",
    unit: "Past Perfect",
    pattern: "Use imperfect haber + participle for an action completed before another past point: había estudiado.",
    lessonObjectives: ["Form past perfect with había/habías/había/habíamos/habían.", "Sequence events in the past clearly.", "Use regular and irregular participles accurately."],
    verbs: ["haber", "estudiar", "comer", "hacer", "escribir", "ver", "abrir", "terminar", "decir", "volver"],
    recognition: [
      { form: "había estudiado", meaning: "I/he/she had studied" },
      { form: "habías comido", meaning: "you had eaten" },
      { form: "habíamos hecho", meaning: "we had done" },
      { form: "habían escrito", meaning: "they had written" },
      { form: "había visto", meaning: "I/he/she had seen" }
    ],
    conjugation: [
      { prompt: "yo / estudiar", answer: "había estudiado" },
      { prompt: "tú / comer", answer: "habías comido" },
      { prompt: "nosotros / hacer", answer: "habíamos hecho" },
      { prompt: "ellos / escribir", answer: "habían escrito" },
      { prompt: "ella / ver", answer: "había visto" }
    ],
    sentenceBuilding: [
      { prompt: "I had studied before class", answer: "Había estudiado antes de la clase" },
      { prompt: "We had done the homework", answer: "Habíamos hecho la tarea" },
      { prompt: "They had written the report", answer: "Habían escrito el informe" }
    ],
    story: ["Cuando llegó el profesor, yo ya había estudiado.", "Mis compañeros habían terminado el proyecto.", "Todos habíamos preparado preguntas."],
    lessonChecklist: defaultChecklist
  },
  {
    phase: "Phase 3 — Past Tenses",
    unit: "Past Tense Recap",
    pattern: "Choose between preterite, imperfect, and past perfect based on timeline and meaning.",
    lessonObjectives: ["Distinguish completed vs habitual vs prior-past events.", "Apply mixed past forms in context.", "Tell a coherent past-tense story."],
    verbs: ["hablar", "ser", "ir", "tener", "hacer", "estudiar", "comer", "ver", "dormir", "haber"],
    recognition: [
      { form: "hablé", meaning: "I spoke (completed)" },
      { form: "hablaba", meaning: "I used to speak / was speaking" },
      { form: "fui", meaning: "I went / was" },
      { form: "era", meaning: "I was (description)" },
      { form: "había comido", meaning: "I had eaten" }
    ],
    conjugation: [
      { prompt: "yo / hablar (completed)", answer: "hablé" },
      { prompt: "yo / hablar (habitual)", answer: "hablaba" },
      { prompt: "nosotros / ir (completed)", answer: "fuimos" },
      { prompt: "ella / ser (description)", answer: "era" },
      { prompt: "ellos / comer (prior past)", answer: "habían comido" }
    ],
    sentenceBuilding: [
      { prompt: "I was tired because I had studied", answer: "Estaba cansado porque había estudiado" },
      { prompt: "When I was young, I played soccer", answer: "Cuando era joven, jugaba al fútbol" },
      { prompt: "Yesterday we went to the park", answer: "Ayer fuimos al parque" }
    ],
    story: ["Cuando era niño, vivía en Madrid.", "Ayer fui al centro con mis amigos.", "Antes ya habíamos comido en casa."],
    lessonChecklist: defaultChecklist
  },
  {
    phase: "Phase 4 — Future & Conditional",
    unit: "Future (Simple Future)",
    pattern: "Add future endings to infinitives: hablaré, comerás, vivirá, trabajaremos, saldrán.",
    lessonObjectives: ["Conjugate regular simple future forms.", "Express predictions and plans.", "Use future time markers naturally."],
    verbs: ["hablar", "comer", "vivir", "estudiar", "trabajar", "leer", "escribir", "salir", "viajar", "aprender"],
    recognition: [{ form: "hablaré", meaning: "I will speak" }, { form: "comerás", meaning: "you will eat" }, { form: "vivirá", meaning: "he/she will live" }, { form: "estudiaremos", meaning: "we will study" }, { form: "trabajarán", meaning: "they will work" }],
    conjugation: [{ prompt: "yo / hablar", answer: "hablaré" }, { prompt: "tú / comer", answer: "comerás" }, { prompt: "ella / vivir", answer: "vivirá" }, { prompt: "nosotros / estudiar", answer: "estudiaremos" }, { prompt: "ellos / trabajar", answer: "trabajarán" }],
    sentenceBuilding: [{ prompt: "I will study tomorrow", answer: "Estudiaré mañana" }, { prompt: "We will travel in June", answer: "Viajaremos en junio" }, { prompt: "They will work this weekend", answer: "Trabajarán este fin de semana" }],
    story: ["Mañana estudiaré para el examen.", "Después viajaremos a otra ciudad.", "Mis amigos trabajarán en un proyecto nuevo."],
    lessonChecklist: defaultChecklist
  },
  {
    phase: "Phase 4 — Future & Conditional",
    unit: "Future Irregulars",
    pattern: "Some verbs use irregular future stems: tendr-, saldr-, podr-, querr-, dir-, har-, vendr-, pondr-.",
    lessonObjectives: ["Memorize major irregular future stems.", "Conjugate irregular future verbs correctly.", "Use irregular futures in realistic predictions."],
    verbs: ["tener", "salir", "poder", "querer", "decir", "hacer", "venir", "poner", "saber", "haber"],
    recognition: [{ form: "tendré", meaning: "I will have" }, { form: "saldrás", meaning: "you will leave" }, { form: "podrá", meaning: "he/she will be able" }, { form: "haremos", meaning: "we will do/make" }, { form: "dirán", meaning: "they will say" }],
    conjugation: [{ prompt: "yo / tener", answer: "tendré" }, { prompt: "tú / salir", answer: "saldrás" }, { prompt: "ella / poder", answer: "podrá" }, { prompt: "nosotros / hacer", answer: "haremos" }, { prompt: "ellos / decir", answer: "dirán" }],
    sentenceBuilding: [{ prompt: "I will have time later", answer: "Tendré tiempo después" }, { prompt: "We will do the activity", answer: "Haremos la actividad" }, { prompt: "They will say the answer", answer: "Dirán la respuesta" }],
    story: ["Mañana tendré una reunión.", "Luego saldré con mi familia.", "Al final haremos la tarea juntos."],
    lessonChecklist: defaultChecklist
  },
  {
    phase: "Phase 4 — Future & Conditional",
    unit: "Future Perfect",
    pattern: "Use future haber + participle for actions that will have been completed: habré terminado.",
    lessonObjectives: ["Build future perfect with habré, habrás, habrá, habremos, habrán.", "Use future deadlines and completion statements.", "Combine regular and irregular participles."],
    verbs: ["haber", "terminar", "hacer", "escribir", "leer", "estudiar", "comer", "abrir", "decir", "volver"],
    recognition: [{ form: "habré terminado", meaning: "I will have finished" }, { form: "habrás hecho", meaning: "you will have done" }, { form: "habrá escrito", meaning: "he/she will have written" }, { form: "habremos leído", meaning: "we will have read" }, { form: "habrán vuelto", meaning: "they will have returned" }],
    conjugation: [{ prompt: "yo / terminar", answer: "habré terminado" }, { prompt: "tú / hacer", answer: "habrás hecho" }, { prompt: "él / escribir", answer: "habrá escrito" }, { prompt: "nosotros / leer", answer: "habremos leído" }, { prompt: "ellos / volver", answer: "habrán vuelto" }],
    sentenceBuilding: [{ prompt: "I will have finished by 8", answer: "Habré terminado para las ocho" }, { prompt: "We will have read the chapter", answer: "Habremos leído el capítulo" }, { prompt: "They will have done the project", answer: "Habrán hecho el proyecto" }],
    story: ["Para mañana habré terminado mi ensayo.", "Mis compañeros habrán leído el texto.", "Todos habremos preparado la presentación."],
    lessonChecklist: defaultChecklist
  },
  {
    phase: "Phase 4 — Future & Conditional",
    unit: "Conditional",
    pattern: "Use infinitive + conditional endings (-ía, -ías, -ía, -íamos, -ían) for would statements and polite requests.",
    lessonObjectives: ["Conjugate regular conditional forms.", "Use conditional for hypothetical situations.", "Make polite classroom requests."],
    verbs: ["hablar", "comer", "vivir", "gustar", "querer", "poder", "hacer", "tener", "ir", "comprar"],
    recognition: [{ form: "hablaría", meaning: "I/he/she would speak" }, { form: "comerías", meaning: "you would eat" }, { form: "viviríamos", meaning: "we would live" }, { form: "podrían", meaning: "they would be able" }, { form: "querría", meaning: "I/he/she would want" }],
    conjugation: [{ prompt: "yo / hablar", answer: "hablaría" }, { prompt: "tú / comer", answer: "comerías" }, { prompt: "nosotros / vivir", answer: "viviríamos" }, { prompt: "ellos / poder", answer: "podrían" }, { prompt: "yo / querer", answer: "querría" }],
    sentenceBuilding: [{ prompt: "I would like water", answer: "Querría agua" }, { prompt: "We would travel more", answer: "Viajaríamos más" }, { prompt: "They would buy a car", answer: "Comprarían un carro" }],
    story: ["Si tuviera tiempo, estudiaría más.", "También viajaría con mi familia.", "Mis amigos comerían en un restaurante nuevo."],
    lessonChecklist: defaultChecklist
  },
  {
    phase: "Phase 4 — Future & Conditional",
    unit: "Conditional Perfect",
    pattern: "Use conditional haber + participle for actions that would have happened: habría estudiado.",
    lessonObjectives: ["Form conditional perfect accurately.", "Express regrets and missed opportunities.", "Contrast with simple conditional meaning."],
    verbs: ["haber", "estudiar", "hacer", "decir", "ver", "ir", "comer", "abrir", "escribir", "terminar"],
    recognition: [{ form: "habría estudiado", meaning: "I/he/she would have studied" }, { form: "habrías hecho", meaning: "you would have done" }, { form: "habría dicho", meaning: "he/she would have said" }, { form: "habríamos ido", meaning: "we would have gone" }, { form: "habrían terminado", meaning: "they would have finished" }],
    conjugation: [{ prompt: "yo / estudiar", answer: "habría estudiado" }, { prompt: "tú / hacer", answer: "habrías hecho" }, { prompt: "ella / decir", answer: "habría dicho" }, { prompt: "nosotros / ir", answer: "habríamos ido" }, { prompt: "ellos / terminar", answer: "habrían terminado" }],
    sentenceBuilding: [{ prompt: "I would have studied more", answer: "Habría estudiado más" }, { prompt: "We would have gone to class", answer: "Habríamos ido a clase" }, { prompt: "They would have finished early", answer: "Habrían terminado temprano" }],
    story: ["Sin lluvia, habríamos salido al parque.", "Yo habría llevado mi cámara.", "Mis amigos habrían tomado muchas fotos."],
    lessonChecklist: defaultChecklist
  },
  {
    phase: "Phase 4 — Future & Conditional",
    unit: "Future & Conditional Recap",
    pattern: "Pick future, future perfect, conditional, or conditional perfect based on certainty, timing, and hypothesis.",
    lessonObjectives: ["Choose the appropriate future/conditional form in context.", "Produce mixed-tense predictions and hypotheticals.", "Summarize plans and possibilities clearly."],
    verbs: ["tener", "hacer", "ir", "estudiar", "terminar", "poder", "querer", "decir", "comer", "haber"],
    recognition: [{ form: "tendré", meaning: "I will have" }, { form: "habré terminado", meaning: "I will have finished" }, { form: "haría", meaning: "I/he/she would do" }, { form: "habríamos ido", meaning: "we would have gone" }, { form: "podrían", meaning: "they would be able" }],
    conjugation: [{ prompt: "yo / tener (future)", answer: "tendré" }, { prompt: "yo / terminar (future perfect)", answer: "habré terminado" }, { prompt: "ella / hacer (conditional)", answer: "haría" }, { prompt: "nosotros / ir (conditional perfect)", answer: "habríamos ido" }, { prompt: "ellos / poder (conditional)", answer: "podrían" }],
    sentenceBuilding: [{ prompt: "By tomorrow I will have finished", answer: "Para mañana habré terminado" }, { prompt: "I would travel if I had money", answer: "Viajaría si tuviera dinero" }, { prompt: "We would have gone earlier", answer: "Habríamos ido más temprano" }],
    story: ["Mañana tendré más tiempo libre.", "Para entonces habré terminado mi trabajo.", "Si pudiera, viajaría con mis amigos."],
    lessonChecklist: defaultChecklist
  },
  {
    phase: "Phase 5 — Subjunctive",
    unit: "Present Subjunctive",
    pattern: "Form present subjunctive from yo stem + opposite endings; use after expressions of desire, doubt, emotion: quiero que estudies.",
    lessonObjectives: ["Build present subjunctive forms from yo stems.", "Use subjunctive in que-clauses with triggers.", "Contrast indicative vs subjunctive meaning."],
    verbs: ["hablar", "comer", "vivir", "tener", "hacer", "ir", "estar", "ser", "poder", "querer"],
    recognition: [{ form: "hable", meaning: "that I/he/she speak" }, { form: "comas", meaning: "that you eat" }, { form: "viva", meaning: "that I/he/she live" }, { form: "tengamos", meaning: "that we have" }, { form: "vayan", meaning: "that they go" }],
    conjugation: [{ prompt: "yo / hablar", answer: "hable" }, { prompt: "tú / comer", answer: "comas" }, { prompt: "ella / vivir", answer: "viva" }, { prompt: "nosotros / tener", answer: "tengamos" }, { prompt: "ellos / ir", answer: "vayan" }],
    sentenceBuilding: [{ prompt: "I want you to study", answer: "Quiero que estudies" }, { prompt: "We hope they come", answer: "Esperamos que vengan" }, { prompt: "It is important that you eat", answer: "Es importante que comas" }],
    story: ["Quiero que mis estudiantes participen más.", "Es bueno que practiquemos cada día.", "Dudo que ellos lleguen tarde hoy."],
    lessonChecklist: defaultChecklist
  },
  {
    phase: "Phase 5 — Subjunctive",
    unit: "Past Subjunctive",
    pattern: "Form past subjunctive from ellos preterite stem + ra endings: hablaron→hablara, tuvieron→tuviera.",
    lessonObjectives: ["Create past subjunctive from preterite stems.", "Use past subjunctive after past triggers.", "Build hypothetical and polite expressions."],
    verbs: ["hablar", "comer", "vivir", "tener", "hacer", "ir", "ser", "poder", "querer", "decir"],
    recognition: [{ form: "hablara", meaning: "that I/he/she spoke" }, { form: "comieras", meaning: "that you ate" }, { form: "viviera", meaning: "that I/he/she lived" }, { form: "tuviéramos", meaning: "that we had" }, { form: "fueran", meaning: "that they were/went" }],
    conjugation: [{ prompt: "yo / hablar", answer: "hablara" }, { prompt: "tú / comer", answer: "comieras" }, { prompt: "ella / vivir", answer: "viviera" }, { prompt: "nosotros / tener", answer: "tuviéramos" }, { prompt: "ellos / ir", answer: "fueran" }],
    sentenceBuilding: [{ prompt: "I wanted you to come", answer: "Quería que vinieras" }, { prompt: "It was good that we studied", answer: "Era bueno que estudiáramos" }, { prompt: "If I had money, I would travel", answer: "Si tuviera dinero, viajaría" }],
    story: ["Mi profesor quería que practicáramos más.", "Era importante que todos participaran.", "Si tuviéramos más tiempo, leeríamos otro texto."],
    lessonChecklist: defaultChecklist
  }
];
