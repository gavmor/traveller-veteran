import { take, times } from 'ramda';
import { shuffler } from "./lib/shuffler";

const AcademicSkills = ["Admin", "Advocate", "Animals",  "Animals.Training", "Animals.Veterinary", "Art", "Astrogation", "Electronics (any)", "Engineer (any)", "Language (any)", "Medic", "Navigation", "Profession (any)", "Science (any)"]

const BackgroundSkills = ["Admin", "Animals", "Art", "Athletics", "Carouse", "Drive", "Electronics", "Science", "Flyer", "Seafarer", "Language", "Streetwise", "Mechanic", "Survival", "Medic", "Vacc Suit", "Profession"];
const AllSkills = [...new Set([
    ...BackgroundSkills,
    ...AcademicSkills
])];
type Skill = (typeof AllSkills)[number];
type Skillset = Partial<Record<Skill, number>>;
const shuffle = shuffler(Math.random);

type Hex = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | 'a' | 'b' | 'c' | 'd' | 'e'| 'f' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F';
interface Character {
    upp: Hex[];
    skills: Skillset;
}

function withEducation(char: Character): Character {
    switch (d6() % 3) {
        case 1: return withUniversity(char)
        case 2: return withMilitaryAcademy(char)
        default: return char;
    }
}

const roll = (mod: number): number => d6()+d6()+mod;
function withUniversity(char: Character): Character {
    return roll(EDU(char)) >= 7 
        ? withAdmission(withUniversity(char))
        : char;
}

function withAdmission(char: Character): Character {
    return {
      ...char,
        skills: {
            ...char.skills, // clobbers extant skills
            [pickSkills(1,AcademicSkills)[0]]: 0,
            [pickSkills(1,AcademicSkills)[0]]: 1, // clobbers
        }
    }
}

function withMilitaryAcademy(char: Character): Character {
    return {
      ...char
    }
}


export const generate = (): Character => 
    withEducation(wBgndSkills(newCharacter()));

const assignAtZero = (acc: Skillset, skill: Skill): {} => 
    Object.assign(acc, { [skill]: 0 });
const UPP = (): Hex[] => times(rollCharacteristics, 6)
const rollCharacteristics = (): Hex => (d6() + d6())
    .toString(16) as Hex;
const d6 = (): number => Math.ceil(Math.random() * 6);

export function wBgndSkills(char: Character): Character {
    return Object.assign(
        char,
        { 
            skills: pickSkills(
                DM(EDU(char)) + 3,
                BackgroundSkills
            ).reduce(assignAtZero, {}) 
        }
    );
}

const pickSkills = (n: number, skills: Skill[]): Skill[] => 
    take(n, shuffle(skills));

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