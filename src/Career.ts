import { expect, is, test } from '@benchristel/taste';
import { age, Character, newCharacter } from './Character.js';

test("withCareer", {
    "increases age by a term"(){
        expect(age(withCareer(newCharacter([2,2,2,2,2,2]))), is, 22)
    }
})

export function withCareer(char: Character): Character {
    return {
        ...char,
        log: [...char.log, '  Career'],
        career: [
            ...char.career||[],
            {type: "Career"}
        ]
    };
}
