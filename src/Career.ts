import { Character } from './Character.js';

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
