import { Character, newUPP } from './Character.js';
import { newCharacter } from "./Character.js";
import { withEducation } from "./Education.js";
import { withBackgroundSkills } from './Background.js';
import { faker } from '@faker-js/faker';
import { d6 } from './Game.js';
import { withCareer } from './Career.js';
import { planetNameGenerator } from "planet-name-generator"

export const generate = (): Character => withTerm(withBackgroundSkills(newCharacter(
    newUPP(),
    faker.name.fullName(),
    planetNameGenerator(1)[0]
)));

function withTerm(char: Character): Character {
    switch (d6() % 3) {
        case 1: return withTerm(ageUp(withEducation(char)));
        case 2: return withTerm(ageUp(withCareer(char)));
        default: return musterOut(char);
    }
}

const musterOut = (char: Character) => char.age < 1 ? withTerm(ageUp(char)) : char
const ageUp = (char: Character):Character => ({...char, age: char.age + 1 });
