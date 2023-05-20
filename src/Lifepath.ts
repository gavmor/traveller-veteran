import { age, Character, newUPP } from './Character.js';
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
        case 1: return withTerm(withEducation(char));
        case 2: return withTerm(withCareer(char));
        default: return musterOut(char);
    }
}

const musterOut = (char: Character) =>
  age(char) <= AGE_OF_MAJORITY
    ? withTerm(char)
    : { 
      ...char,
      log: [
        ...char.log,
        `+++ Mustered Out at ${age(char)}!`]
      };

