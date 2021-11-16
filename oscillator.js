import { calcNoteLengthInSec } from "./utils.js";

export function playOneNote(frequency, length, callback) {
  var context = new AudioContext();
  var o = context.createOscillator();
  var g = context.createGain();
  o.frequency.value = frequency;
  o.connect(g);
  g.connect(context.destination);
  o.start(0);
  g.gain.exponentialRampToValueAtTime(
    0.00001,
    context.currentTime + length + 1
  );
  o.stop(length);
  o.onended = function () {
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
