import { expect, is, test } from "@benchristel/taste";
import { times } from "ramda";
import { EducationTerm } from "./Education.js";
import { d6 } from "./Game.js";
import { AGE_OF_MAJORITY, CURRENT_YEAR } from "./Setting.js";
type UPP = [Hex, Hex, Hex, Hex, Hex, Hex];

export interface Character {
    name: string;
    allies: string[];
    upp: UPP;
    skills: Skillset;
    log: string[];
    age: number;
    birthworld: string;
    terms: EducationTerm[]
}

export const newCharacter = (
  upp: UPP = newUPP(),
  name: string = harmlessString(),
  birthworld: string = harmlessString()
): Character => ({
  upp,
  skills: {},
  log: ["---------",`Born`],
  allies: [],
  name,
  age: 0,
  birthworld,
  terms: []
});

export const AcademicSkills = ["Admin", "Advocate", "Animals", "Animals (Training)", "Animals (Veterinary)", "Art", "Astrogation", "Electronics (any)", "Engineer (any)", "Language (any)", "Medic", "Navigation", "Profession (any)", "Science (any)"] as const;
export const BackgroundSkills = ["Admin", "Animals", "Art", "Athletics", "Carouse", "Drive", "Electronics", "Science", "Flyer", "Seafarer", "Language", "Streetwise", "Mechanic", "Survival", "Medic", "Vacc Suit", "Profession"] as const;
export const AllSkills = [...new Set([
    ...BackgroundSkills,
    ...AcademicSkills
])] as const;
export type Skill = (typeof AllSkills)[number];
export type Skillset = Partial<Record<Skill, number>>;
export type Hex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F';


export const newUPP = (): UPP => times<Hex>(newCharacteristic, 6) as UPP;
const newCharacteristic = (): Hex => (d6() + d6()).toString(16) as Hex;
export type CharBuilder = (char: Character) => Character;

function harmlessString(): string {
    return (Math.random() + 1).toString(36).substring(7);
}


export const age = (char: Character) => AGE_OF_MAJORITY + char.terms.length * 4;
export const birthdate = (char: Character) => (CURRENT_YEAR - age(char)).toString()

test("birthdate", {
  "works"(){
    expect(birthdate(newCharacter()), is, "1131")
  }
})