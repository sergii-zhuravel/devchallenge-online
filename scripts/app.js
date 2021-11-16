import { playMelody } from "./oscillator.js";
import { parseMelody } from "./utils.js";

const melodyInput =
  "E4/4 E4/4 E4/4 D#4/8. A#4/16 E4/4 D#4/8. A#4/16 E4/2 D5/4 D5/4 D5/4 D#5/8. A#4/16 F#4/4 D#4/8. A#4/16 E4/2";
const DEFAULT_TEMPO = 100;
// const melody = parseMelody(melodyInput);
let oscillator;
let currentTime;

export function play() {
  const melodyInput = document.getElementById("melody");
  const tempoInput = document.getElementById("tempo");
  if (!melodyInput.value) {
    // error handling
    console.error("Field is required");
    return;
  }
  const melody = parseMelody(melodyInput.value);
  const tempo = tempoInput.value || DEFAULT_TEMPO;

  playMelody(melody, tempo);
}

const playButton = document.getElementById("play");
playButton.onclick = play;
