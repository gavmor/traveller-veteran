import { Character, newUPP } from './Character.js';
import { newCharacter } from "./Character.js";
import { withEducation } from "./Education.js";
import { withBackgroundSkills } from './Background.js';
import { faker } from '@faker-js/faker';

export const generate = (): Character => withEducation(withBackgroundSkills(newCharacter(
    newUPP(),
    faker.name.fullName()
)));
