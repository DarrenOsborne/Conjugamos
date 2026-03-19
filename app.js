const DATA_FILE = "./spanish_200_common_verbs.txt";

const SUBJECTS = [
  { key: "yo", label: "yo", cue: "I" },
  { key: "tu", label: "tú", cue: "you" },
  { key: "el", label: "él / ella / usted", cue: "he / she" },
  { key: "nosotros", label: "nosotros", cue: "we" },
  { key: "vosotros", label: "vosotros", cue: "you all" },
  { key: "ellos", label: "ellos / ellas / ustedes", cue: "they all" },
];

const state = {
  verbs: [],
  currentPrompt: null,
  awaitingNext: false,
  correct: 0,
  wrong: 0,
  lastPromptKey: "",
};

const card = document.querySelector(".practice-card");
const sentenceEl = document.querySelector("#sentence");
const hintEl = document.querySelector("#hint");
const subjectFormEl = document.querySelector("#subject-form");
const verbChipEl = document.querySelector(".verb-chip");
const verbNameEl = document.querySelector("#verb-name");
const answerEl = document.querySelector("#answer");
const feedbackEl = document.querySelector("#feedback");
const correctCountEl = document.querySelector("#correct-count");
const wrongCountEl = document.querySelector("#wrong-count");

window.addEventListener("keydown", (event) => {
  if (event.key === "." && !event.repeat) {
    event.preventDefault();
    toggleVerbReveal();
    return;
  }

  if (event.key !== "Enter" || event.repeat) {
    return;
  }

  const activeTag = document.activeElement?.tagName ?? "";
  if (activeTag === "TEXTAREA") {
    return;
  }

  event.preventDefault();

  if (answerEl.disabled) {
    return;
  }

  if (state.awaitingNext) {
    showNextPrompt();
    return;
  }

  submitAnswer();
});

init();

async function init() {
  try {
    const csvText = await loadCsv(DATA_FILE);
    state.verbs = parseCsv(csvText).map(cleanRecord).filter(isUsableRecord);

    if (!state.verbs.length) {
      throw new Error("No valid verb rows were found in the CSV.");
    }

    answerEl.disabled = false;
    answerEl.focus();
    showNextPrompt();
  } catch (error) {
    card.dataset.state = "wrong";
    sentenceEl.textContent = "Could not load the practice data.";
    hintEl.textContent = "Check the CSV file path.";
    subjectFormEl.textContent = "Unavailable";
    verbNameEl.textContent = "Unavailable";
    feedbackEl.className = "feedback is-wrong";
    feedbackEl.textContent =
      "If you opened index.html directly, run a local server so the browser can read spanish_200_common_verbs.txt.";
  }
}

async function loadCsv(path) {
  const response = await fetch(path);

  if (!response.ok) {
    throw new Error(`Failed to load ${path}`);
  }

  const buffer = await response.arrayBuffer();
  return new TextDecoder("utf-8").decode(buffer);
}

function parseCsv(text) {
  const rows = [];
  let cell = "";
  let row = [];
  let inQuotes = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const next = text[index + 1];

    if (char === '"') {
      if (inQuotes && next === '"') {
        cell += '"';
        index += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === "," && !inQuotes) {
      row.push(cell);
      cell = "";
      continue;
    }

    if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && next === "\n") {
        index += 1;
      }
      row.push(cell);
      if (row.some((value) => value.trim() !== "")) {
        rows.push(row);
      }
      row = [];
      cell = "";
      continue;
    }

    cell += char;
  }

  if (cell || row.length) {
    row.push(cell);
    rows.push(row);
  }

  const [headers, ...dataRows] = rows;
  return dataRows.map((dataRow) => {
    const record = {};
    headers.forEach((header, index) => {
      record[header] = dataRow[index] ?? "";
    });
    return record;
  });
}

function cleanRecord(record) {
  return Object.fromEntries(
    Object.entries(record).map(([key, value]) => [key, String(value).trim()])
  );
}

function isUsableRecord(record) {
  return (
    record.spanish_infinitive &&
    record.english &&
    (record.sentence1 || record.sentence2) &&
    SUBJECTS.every((subject) => record[subject.key])
  );
}

function showNextPrompt() {
  const prompt = createPrompt();
  state.currentPrompt = prompt;
  state.awaitingNext = false;
  state.lastPromptKey = prompt.key;

  card.dataset.state = "idle";
  sentenceEl.innerHTML = prompt.sentenceHtml;
  hintEl.textContent = prompt.englishCue;
  subjectFormEl.textContent = prompt.subject.label;
  verbNameEl.textContent = prompt.record.spanish_infinitive;
  verbChipEl.dataset.visible = "false";
  feedbackEl.className = "feedback";
  feedbackEl.textContent = "Type the missing verb, then press Enter.";
  answerEl.value = "";
  answerEl.readOnly = false;
  answerEl.focus();
}

function toggleVerbReveal() {
  const isVisible = verbChipEl.dataset.visible === "true";
  verbChipEl.dataset.visible = isVisible ? "false" : "true";
}

function createPrompt() {
  const maxAttempts = 24;
  let prompt = null;

  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    const record = state.verbs[Math.floor(Math.random() * state.verbs.length)];
    const subject = SUBJECTS[Math.floor(Math.random() * SUBJECTS.length)];
    const sentenceField = Math.random() < 0.5 ? "sentence1" : "sentence2";
    const sentence = record[sentenceField] || record[sentenceField === "sentence1" ? "sentence2" : "sentence1"];
    const key = [record.rank, sentenceField, subject.key].join(":");

    prompt = {
      key,
      record,
      subject,
      expected: record[subject.key],
      englishCue: `${subject.cue} ${toGloss(record.english)}`,
      sentenceHtml: renderSentence(sentence),
    };

    if (prompt.key !== state.lastPromptKey) {
      break;
    }
  }

  return prompt;
}

function toGloss(english) {
  return english
    .split("/")
    .map((part) => part.trim().replace(/^to\s+/i, ""))
    .join(" / ");
}

function renderSentence(sentence) {
  const safeSentence = escapeHtml(sentence);
  return safeSentence.replace(
    "*",
    '<span class="sentence-blank" aria-hidden="true">blank</span>'
  );
}

function submitAnswer() {
  const rawAnswer = answerEl.value.trim();

  if (!rawAnswer) {
    toggleVerbReveal();
    feedbackEl.className = "feedback";
    feedbackEl.textContent =
      verbChipEl.dataset.visible === "true"
        ? "Verb revealed. Keep typing or press . to hide it."
        : "Verb hidden. Keep typing.";
    answerEl.focus();
    return;
  }

  const expected = state.currentPrompt.expected.trim();
  const isCorrect = normalizeAnswer(rawAnswer) === normalizeAnswer(expected);

  state.awaitingNext = true;
  answerEl.readOnly = true;

  if (isCorrect) {
    state.correct += 1;
    card.dataset.state = "correct";
    feedbackEl.className = "feedback is-correct";
    feedbackEl.textContent = `Correct: ${expected}. Press Enter for the next one.`;
  } else {
    state.wrong += 1;
    card.dataset.state = "wrong";
    feedbackEl.className = "feedback is-wrong";
    feedbackEl.textContent = `Not quite. Correct answer: ${expected}. Press Enter for the next one.`;
  }

  correctCountEl.textContent = String(state.correct);
  wrongCountEl.textContent = String(state.wrong);
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[character];
  });
}

function normalizeAnswer(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}
