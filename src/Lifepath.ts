import { Character, newUPP } from './Character.js';
import { newCharacter } from "./Character.js";
import { withEducation } from "./Education.js";
import { withBackgroundSkills } from './Background.js';
import { faker } from '@faker-js/faker';
import { d6 } from './Game.js';
import { withCareer } from './Career.js';
import { planetNameGenerator } from "planet-name-generator"
import { planetCase } from './lib/string.js';
import { AGE_OF_MAJORITY } from "./Setting.js";

export const generate = (): Character => withTerm(withBackgroundSkills(newCharacter(
    newUPP(),
    faker.name.fullName(),
    planetCase(planetNameGenerator(1)[0])
)));

function withTerm(char: Character): Character {
    switch (d6() % 3) {
        case 1: return withTerm(ageUp(withEducation(char)));
        case 2: return withTerm(ageUp(withCareer(char)));
        default: return musterOut(char);
    }
}

const musterOut = (char: Character) =>
  char.age < 2
    ? withTerm(char)
    : { ...char, log: [...char.log, `+++ Mustered Out at ${4*char.age+AGE_OF_MAJORITY}!`] };

const ageUp = (char: Character): Character => ({
  ...char,
  age: char.age + 1,
//   log: [ ...char.log, justAged(char)],
});
// function justAged(char: Character) {
//     if (char.log[char.log.length-1] === ".") console.error(new Error("Aged Twice").stack, char.log, char.age)
//     return "."
// }

