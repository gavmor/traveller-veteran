import { CharBuilder, Character, newUPP } from './Character.js';
import { newCharacter } from "./Character.js";
import { withEducation } from "./Education.js";
import { withBackgroundSkills } from './Background.js';
import { faker } from '@faker-js/faker';
import { d6 } from './Game.js';
import { screen } from '../display.js';



export function withTerm(char: Character): Character {
    switch (d6() % 3) {
        case 1: return withTerm(withEducation({...char, age: char.age + 1}));
        case 2: return withTerm(withEducation({...char, age: char.age + 1}));
        default: return char.age < 1 ? withTerm(char) : char;
    }
}

export const generate = (): Character => withTerm(withBackgroundSkills(newCharacter(
    newUPP(),
    faker.name.fullName()
)));
