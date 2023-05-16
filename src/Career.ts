import { Character } from './Character.js';

export function withCareer(char: Character): Character {
    return {
        ...char,
        log: [...char.log, '  Career'],
        terms: [
            ...char.terms,
            {foo: "bar"}
        ]
    };
}
