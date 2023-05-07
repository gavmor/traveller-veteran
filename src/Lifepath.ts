import { roll, SOC } from "./Game.js";
import { take } from 'ramda';
import { d6, DM, EDU } from './Game.js';
import { Character, AcademicSkills, Skillset, Skill, BackgroundSkills, shuffle, newUPP } from './Character.js';
import { newCharacter } from "./Character.js";
import { equals, expect, test } from "@benchristel/taste";

export const generate = (): Character => withEducation(withBackgroundSkills(newCharacter()));

function withEducation(char: Character): Character {
    switch (d6() % 3) {
        case 1: return withUniversity(char)
        case 2: return withMilitaryAcademy(char)
        default: return char;
    }
}

function withUniversity(char: Character): Character {
    return roll(DM(EDU(char)) + (SOC(char) > 8 ? 1 : 0)) >= 7 
        ? withAdmission(char)
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

const assignAtZero = (acc: Skillset, skill: Skill): {} => Object.assign(acc, { [skill]: 0 });

export const withBackgroundSkills = (char: Character): Character => Object.assign(
    char,
    { 
        skills: pickSkills(
            DM(EDU(char)) + 3,
            BackgroundSkills
        ).reduce(assignAtZero, {}) 
    }
);

test("withBackgroundSkills", {
    "provides 3 + EDU DM skills"(){
        const character = withBackgroundSkills(newCharacter(["6","6","6","6","6","6"]));
        expect(Object.keys(character.skills).length, equals, 3);
    }
});

const pickSkills = (n: number, skills: Skill[]): Skill[] => take(n, shuffle(skills));