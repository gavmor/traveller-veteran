import { Character } from './Character.js';
import { newCharacter } from "./Character.js";
import { withEducation } from "./Education.js";
import { withBackgroundSkills } from './Background.js';

export const generate = (): Character => withEducation(withBackgroundSkills(newCharacter()));
