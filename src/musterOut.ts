import { age, Character } from "./Character.js";
import { newCharacter } from "./Character.js";
import { Die } from "./Game.js";
import { AGE_OF_MAJORITY } from "./Setting.js";
import { expect, is, not, test } from "@benchristel/taste";
import { withTerm } from "./Lifepath.js";

export const musterOut = (char: Character) =>
  age(char) <= AGE_OF_MAJORITY + 8
    ? withTerm(char)
    : {
        ...char,
        log: [...char.log, `+++ Mustered Out at ${age(char)}!`],
      };

test("musterOut", {
  "Sends a character back for more if they've not completed at least one term"() {
    const neophyte = newCharacter([2, 2, 2, 2, 2, 2]);

    Die.test = false;
    const { career, education } = musterOut(neophyte);
    expect([...(career || []), ...(education || [])], not(is), []);
    Die.test = true;
  },
});
