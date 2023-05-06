import { take, times } from 'ramda';
import { shuffler } from "./lib/shuffler";

import { describe, expect, is } from "@benchristel/taste"

const SKILLS = ["Admin", "Animals", "Art", "Athletics", "Carouse", "Drive", "Electronics", "Science", "Flyer", "Seafarer", "Language", "Streetwise", "Mechanic", "Survival", "Medic", "Vacc Suit", "Profession"] as const;
type Skill = (typeof SKILLS)[number];
type Skillset = Partial<Record<Skill, number>>;
const shuffle = shuffler(Math.random);

type Hex = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | 'a' | 'b' | 'c' | 'd' | 'e'| 'f' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F';
interface Character {
    upp: Hex[];
    skills: Skillset;
}

export const generate = (): Character => 
    wBgndSkills(newCharacter());

const assignAtZero = (acc: Skillset, skill: Skill): {} => 
    Object.assign(acc, { [skill]: 0 });
const UPP = (): Hex[] => times(rollCharacteristics, 6)
const rollCharacteristics = (): Hex => (roll() + roll())
    .toString(16) as Hex;
const roll = (): number => Math.ceil(Math.random() * 6);

export function wBgndSkills(char: Character): Character {
    return Object.assign(
        char,
        { 
        skills: take(DM(EDU(char))+3, SKILLS)
            .reduce(assignAtZero, {}) 
        }
    );
}

function DM(score: number): number {
    if (score > 14) return 3
    if (score > 11) return 2
    if (score > 8) return 1
    if (score > 5) return 0
    if (score > 2) return -1
    if (score > 0) return -2
    return -3
}
const newCharacter = (): Character => ({
    upp: UPP(),
    skills: {}
})


function EDU(char: Character) {
    return parseInt(char.upp[4], 16);
}
// describe("withBackgroundSkills", {
//     "it works"() {
//         expect(withBackgroundSkills(createCharacter()), is, {})
//     }
// })
