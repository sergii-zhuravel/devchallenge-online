import { calcNoteLengthInSec } from "./utils.js";

export function playOneNote(frequency, length, callback) {
  const AudioContext = window.AudioContext || window.webkitAudioContext;

  var context = new AudioContext();
  var oscillator = context.createOscillator();
  var volumeGain = context.createGain();
  oscillator.frequency.value = frequency;
  oscillator.connect(volumeGain);
  volumeGain.connect(context.destination);
  oscillator.start(0);
  volumeGain.gain.exponentialRampToValueAtTime(
    0.00001,
    context.currentTime + length + 1
  );
  oscillator.stop(length);
  oscillator.onended = function () {
    if (callback) callback();
  };
}

export function playMelody(melody, tempo) {
  if (melody.length <= 0) {
    return;
  }

  const [note, noteLength] = melody.shift();
  //   const cN = getNote(noteName);
  //   const length = ((1 / (tempo / 60)) * 4) / noteLength;

  playOneNote(
    note,
    calcNoteLengthInSec(noteLength, tempo),
    playMelody.bind(null, melody, tempo)
  );
}
