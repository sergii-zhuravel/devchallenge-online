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

export function playMelody(player) {
  if (player.melody.length <= 0) {
    return;
  }
  player.context = new AudioContext();

  player.isPlaying = true;
  playLoop(player);
}

export function playLoop(player) {
  // const secondsPerBeat = 60.0 / tempo;
  if (player.isPlaying && player.melody.length > 0) {
    const [noteFrequency, noteLength] = player.melody.shift();
    const noteLengthInSec = calcNoteLengthInSec(noteLength, player.tempo);
    playOneNote(
      noteFrequency,
      noteLengthInSec,
      player.instrument,
      player.context
    ),
      window.setTimeout(function () {
        playLoop(player);
      }, noteLengthInSec * 1000);
  }
}
