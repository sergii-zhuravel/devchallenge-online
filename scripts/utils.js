import { noteValues } from "./consts.js";

export function getNote(noteSymbol) {
  return noteValues[noteSymbol];
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
