import { NOTES_FREQUENCY_MAP, DEFAULT_NOTE } from "./consts.js";

export function getNote(noteSymbol) {
  const noteFrequency = NOTES_FREQUENCY_MAP[noteSymbol];

  // simple fallback before validation of all melody string is implemented
  if (!noteFrequency) {
    console.error("Note is incorrect");
    return DEFAULT_NOTE;
  }
  return noteFrequency;
}

export function parseMelody(input) {
  return input.split(" ").map(parseOneRecord);
}

export function parseOneRecord(record) {
  const [note, noteLength] = record.split("/");
  return [getNote(note), noteLength];
}

export function calcNoteLengthInSec(noteLength, tempo) {
  const multiplier = noteLength.includes(".") ? 1.5 : 1;
  const noteLengthInSec = (((1 / (tempo / 60)) * 4) / noteLength) * multiplier;
  return noteLengthInSec;
}
