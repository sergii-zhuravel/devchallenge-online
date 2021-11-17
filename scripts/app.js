import { DEFAULT_INSTRUMENT, DEFAULT_TEMPO } from "./consts.js";
import { playMelody, playLoop } from "./oscillator.js";
import { parseMelody } from "./utils.js";

const player1 = {
  melody: [],
  tempo: DEFAULT_TEMPO,
  instrument: DEFAULT_INSTRUMENT,
  isPlaying: false,
  context: null,
};

const player2 = {
  melody: [],
  tempo: DEFAULT_TEMPO,
  instrument: DEFAULT_INSTRUMENT,
  isPlaying: false,
  context: null,
};

const form1 = document.querySelector("form#form1");
const form2 = document.querySelector("form#form2");

function playerFormEventHandler(event) {
  event.preventDefault();

  const formData = new FormData(this);
  if (this.id === "form1") {
    handleFormData(formData, player1);
  } else {
    handleFormData(formData, player2);
  }
}

function handleFormData(formData, player) {
  const melodyString = formData.get("melody").trim();
  const tempo = formData.get("tempo") || DEFAULT_TEMPO;
  const instrument = formData.get("instrument") || DEFAULT_INSTRUMENT;

  if (!melodyString) {
    // error handling can be implemented here
    console.error("Field is required");
    return;
  }

  // before parsing we can validate the melody string, can be done later
  const melody = parseMelody(melodyString);

  player.melody = melody;
  player.tempo = tempo;
  player.instrument = instrument;

  playMelody(player);
}

form1.addEventListener("submit", playerFormEventHandler, false);
form2.addEventListener("submit", playerFormEventHandler, false);

pauseBtn1.addEventListener("click", () => {
  player1.isPlaying = !player1.isPlaying;
  if (player1.isPlaying) {
    playLoop(player1);
  }
});

stopBtn1.addEventListener("click", () => {
  player1.isPlaying = false;
  player1.melody.length = 0;
});

// experiment with UI loop to update UI elements according to the APP state
setInterval(() => {
  if (player1.isPlaying) {
    playBtn1.disabled = true;
    pauseBtn1.textContent = "Pause";
    stopBtn1.disabled = false;
  } else {
    playBtn1.disabled = false;
    pauseBtn1.textContent = "Continue";
    stopBtn1.disabled = true;
  }
  if (player1.melody.length === 0) {
    pauseBtn1.disabled = true;
  } else {
    pauseBtn1.disabled = false;
  }
}, 300);
