import { Character, newUPP } from './Character.js';
import { newCharacter } from "./Character.js";
import { withEducation } from "./Education.js";
import { withBackgroundSkills } from './Background.js';
import { faker } from '@faker-js/faker';
import { d6 } from './game/Mechanics.js';
import { withCareer } from './Career.js';
import { planetNameGenerator } from "planet-name-generator"
import { planetCase } from './lib/string.js';
import { musterOut } from './MusterOut.js';

export const generate = (): Character => withTerm(withBackgroundSkills(newCharacter(
    newUPP(),
    faker.name.fullName(),
    planetCase(planetNameGenerator(1)[0])
)));

export function withTerm(char: Character): Character {
  if(!char.alive) return char;
  
  switch (d6() % 3) {
      case 1: return withTerm(withEducation(char));
      case 2: return withTerm(withCareer(char));
      default: return musterOut(char);
  }
}

