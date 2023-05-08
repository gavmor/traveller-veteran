import { CharBuilder, Character, newUPP } from './Character.js';
import { newCharacter } from "./Character.js";
import { withEducation } from "./Education.js";
import { withBackgroundSkills } from './Background.js';
import { faker } from '@faker-js/faker';
import { d6 } from './Game.js';
import { screen } from '../display.js';


const term: CharBuilder = (char) => {
    // screen.debug((d6() % 2).toString());
    return d6() % 3 > 0 ? term(withEducation(char)) : char
}

export const generate = (): Character => term(withBackgroundSkills(newCharacter(
    newUPP(),
    faker.name.fullName()
)));
