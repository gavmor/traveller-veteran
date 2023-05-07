import { times } from "ramda";
import { d6 } from "./Game.js";
import { shuffler } from "./lib/shuffler.js";

export const newCharacter = (upp:Hex[]=newUPP()): Character => ({
    upp, skills: {}
});

export const AcademicSkills = ["Admin", "Advocate", "Animals", "Animals.Training", "Animals.Veterinary", "Art", "Astrogation", "Electronics (any)", "Engineer (any)", "Language (any)", "Medic", "Navigation", "Profession (any)", "Science (any)"];
export const BackgroundSkills = ["Admin", "Animals", "Art", "Athletics", "Carouse", "Drive", "Electronics", "Science", "Flyer", "Seafarer", "Language", "Streetwise", "Mechanic", "Survival", "Medic", "Vacc Suit", "Profession"];
const AllSkills = [...new Set([
    ...BackgroundSkills,
    ...AcademicSkills
])];
export type Skill = (typeof AllSkills)[number];
export type Skillset = Partial<Record<Skill, number>>;
export const shuffle = shuffler(Math.random);
export type Hex = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F';
export interface Character {
    upp: Hex[];
    skills: Skillset;
}

export const newUPP = (): Hex[] => times(newCharacteristic, 6);
const newCharacteristic = (): Hex => (d6() + d6()).toString(16) as Hex;

