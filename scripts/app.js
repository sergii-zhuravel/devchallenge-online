import { DEFAULT_INSTRUMENT, DEFAULT_TEMPO } from "./consts.js";
import { playMelody } from "./oscillator.js";
import { parseMelody } from "./utils.js";

const form1 = document.querySelector("form#form1");
const form2 = document.querySelector("form#form2");

function playerFormEventHandler(event) {
  event.preventDefault();

  const formData = new FormData(this);

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

  playMelody(melody, tempo, instrument);
}

form1.addEventListener("submit", playerFormEventHandler, false);

form2.addEventListener("submit", playerFormEventHandler, false);
