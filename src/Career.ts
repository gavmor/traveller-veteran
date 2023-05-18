import { expect, is, test } from '@benchristel/taste';
import { Character, newCharacter } from './Character.js';

// test("withCareer", {
//     "works"(){
//         expect(withCareer(newCharacter()), is, {})
//     }
// })
export function withCareer(char: Character): Character {
    return {
        ...char,
        log: [...char.log, '  Career'],
        career: [
            ...char.career,
            {type: "Career"}
        ]
    };
}
