import { playMelody } from "./oscillator.js";
import { parseMelody } from "./utils.js";

const melodyInput =
  "E4/4 E4/4 E4/4 D#4/8. A#4/16 E4/4 D#4/8. A#4/16 E4/2 D5/4 D5/4 D5/4 D#5/8. A#4/16 F#4/4 D#4/8. A#4/16 E4/2";
const DEFAULT_TEMPO = 100;
const DEFAULT_INSTRUMENT = "sine";
const form1 = document.querySelector("form#form1");

form1.addEventListener(
  "submit",
  function (event) {
    event.preventDefault();

    var data = new FormData(this);
    const melodyString = data.get("melody").trim();
    const tempo = data.get("tempo") || DEFAULT_TEMPO;
    const instrument = data.get("instrument") || DEFAULT_INSTRUMENT;

    if (!melodyString) {
      // error handling can be implemented here
      console.error("Field is required");
      return;
    }
    const melody = parseMelody(melodyString);

    playMelody(melody, tempo, instrument);
  },
  false
);

form2.addEventListener(
  "submit",
  function (event) {
    event.preventDefault();

    var data = new FormData(this);
    const melodyString = data.get("melody").trim();
    const tempo = data.get("tempo") || DEFAULT_TEMPO;
    const instrument = data.get("instrument") || DEFAULT_INSTRUMENT;

    if (!melodyString) {
      // error handling can be implemented here
      console.error("Field is required");
      return;
    }
    const melody = parseMelody(melodyString);

    playMelody(melody, tempo, instrument);
  },
  false
);
