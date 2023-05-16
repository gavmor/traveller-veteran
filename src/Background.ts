import * as ramda from 'ramda';
import { DM, EDU } from './Game.js';
import { Character, Skillset, Skill, BackgroundSkills } from './Character.js';
import { shuffle } from "./lib/shuffler.js";
import { newCharacter } from "./Character.js";
import { equals, expect, test } from "@benchristel/taste";

const assignAtZero = (acc: Skillset, skill: Skill): {} => Object.assign(acc, { [skill]: 0 });

export const withBackgroundSkills = (char: Character): Character => Object.assign(
  char,
  {
    skills: sample<Skill>(
      DM(EDU(char)) + 3,
      // @ts-expect-error
      BackgroundSkills
    ).reduce(assignAtZero, {})
  }
);
test("withBackgroundSkills", {
  "provides 3 + EDU DM skills"() {
    const character = withBackgroundSkills(newCharacter([6, 6, 6, 6, 6, 6]));
    expect(Object.keys(character.skills).length, equals, 3);
  }
});
const sample = <T>(n: number, items: T[]): T[] => ramda.take(n, shuffle(items));
