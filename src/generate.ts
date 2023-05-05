import { take, times } from 'ramda';
import { shuffler } from "./lib/shuffler";

const SKILLS = ["Admin", "Animals", "Art", "Athletics", "Carouse", "Drive", "Electronics", "Science", "Flyer", "Seafarer", "Language", "Streetwise", "Mechanic", "Survival", "Medic", "Vacc Suit", "Profession"] as const;
type Skill = (typeof SKILLS)[number];
type Skillset = Partial<Record<Skill, number>>;
const shuffle = shuffler(Math.random);

type Hex = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | 'a' | 'b' | 'c' | 'd' | 'e'| 'f' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F';
interface Character {
    upp: Hex[];
    skills: Skillset;
}

export const generate = (): Character => ({
    upp: UPP(),
    skills: take(3, SKILLS).reduce(assignAtZero, {})
});

const assignAtZero = (acc: Skillset, skill: Skill): {} => 
    Object.assign(acc, { [skill]: 0 });
const UPP = (): Hex[] => times(rollCharacteristics, 6)
const rollCharacteristics = (): Hex => (roll() + roll())
    .toString(16) as Hex;
const roll = (): number => Math.ceil(Math.random() * 6);
