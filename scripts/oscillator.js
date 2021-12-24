import { calcNoteLengthInSec } from "./utils.js";
const AudioContext = window.AudioContext || window.webkitAudioContext;

export function playOneNote(frequency, length, player) {
  const { instrument, context, envelope } = player;
  const oscillator = context.createOscillator();
  const volumeGain = context.createGain();
  const currentTime = context.currentTime;

  oscillator.type = instrument;
  oscillator.frequency.value = frequency;
  volumeGain.connect(context.destination);
  oscillator.connect(volumeGain);
  oscillator.start(currentTime);

  if (player.envelope) {
    // envelope implementation, configuration should be done with  controls
    volumeGain.gain.setValueAtTime(0, 0);
    volumeGain.gain.linearRampToValueAtTime(
      envelope.sustainLevel,
      context.currentTime + length * envelope.attackTime
    );
    volumeGain.gain.setValueAtTime(
      envelope.sustainLevel,
      context.currentTime + length - length * envelope.releaseTime
    );
    volumeGain.gain.linearRampToValueAtTime(0, context.currentTime + length);
  } else {
    // To remove "click" sound
    volumeGain.gain.exponentialRampToValueAtTime(
      0.00001,
      currentTime + length + 1
    );
  }

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
  if (player.isPlaying && player.melody.length > 0) {
    const [noteFrequency, noteLength] = player.melody.shift();
    const noteLengthInSec = calcNoteLengthInSec(noteLength, player.tempo);
    playOneNote(noteFrequency, noteLengthInSec, player),
      window.setTimeout(function () {
        playLoop(player);
      }, noteLengthInSec * 1000);
  }
}
