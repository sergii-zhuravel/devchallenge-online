import { calcNoteLengthInSec } from "./utils.js";
const AudioContext = window.AudioContext || window.webkitAudioContext;

export function playOneNote(frequency, length, instrument, context) {
  let oscillator = context.createOscillator();
  const volumeGain = context.createGain();
  const currentTime = context.currentTime;

  oscillator.type = instrument;
  oscillator.frequency.value = frequency;
  volumeGain.connect(context.destination);
  oscillator.connect(volumeGain);
  oscillator.start(currentTime);
  volumeGain.gain.exponentialRampToValueAtTime(
    0.00001,
    currentTime + length + 1
  );
  oscillator.stop(currentTime + length);
}

export function playMelody(melody, tempo, instrument) {
  if (melody.length <= 0) {
    return;
  }
  const context = new AudioContext();

  let delay = 0;

  for (const note of melody) {
    const [noteFrequency, noteLength] = note;
    const noteLengthInSec = calcNoteLengthInSec(noteLength, tempo);
    window.setTimeout(
      () => playOneNote(noteFrequency, noteLengthInSec, instrument, context),
      delay * 1000
    );
    delay += noteLengthInSec;
  }
}
