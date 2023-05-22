import { expect, is, test } from "@benchristel/taste";
import { maxBy, times } from "ramda";
import { Careers, withCareer } from "./Career.js";
import { UniversityTerm as EducationTerm } from "./Education.js";
import { d6, Die } from "./game/Mechanics.js";
import { AGE_OF_MAJORITY, CURRENT_YEAR } from "./game/Setting.js";
import { Skillset } from "./game/Skills.js";

export type UPP = [Hex, Hex, Hex, Hex, Hex, Hex];

export interface Character {
    name: string;
    upp: UPP;
    skills: Skillset;
    log: string[];
    birthworld: string;
    education?: EducationTerm[]
    allies?: string[]
    career?: Array<typeof Careers[number]>,
    alive: boolean
}

export const newCharacter = (
  upp: UPP = newUPP(),
  name: string = harmlessString(),
  birthworld: string = harmlessString()
): Character => ({
  upp,
  skills: {},
  log: [],
  name,
  birthworld,
  alive: true
});

export type Hex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F';


export const newUPP = (): UPP => times<Hex>(newCharacteristic, 6) as UPP;
const newCharacteristic = (): Hex => (d6() + d6()).toString(16) as Hex;
export type CharBuilder = (char: Character) => Character;

function harmlessString(): string {
    return (Math.random() + 1).toString(36).substring(7);
}

test("age", {
  "works"(){
    expect(age(newCharacter([2,2,2,2,2,2,])), is, 18)
  },
  "works with maxBy"(){
    const younger = newCharacter([2, 2, 2, 2, 2, 2]);
    Die.rolls= [6,6,6,6]
    const older = withCareer(newCharacter([2, 2, 2, 2, 2, 2]));
    expect(maxBy(age, younger, younger), is, younger)
  }
})

export const age = ({education, career}: Character) => 
  AGE_OF_MAJORITY + ((education||[]).length+(career||[]).length) * 4;

export const birthdate = (char: Character) => (CURRENT_YEAR - age(char)).toString()

test("birthdate", {
  "matches imperial year"(){
    Die.test=false
    expect(birthdate(newCharacter()), is, "1131")
    Die.test=true
  }
})