import { roll, SOC } from "./Game.js";
import { take } from 'ramda';
import { d6, DM, EDU } from './Game.js';
import { Character, AcademicSkills, Skillset, Skill, BackgroundSkills as BACKGROUND_SKILLS, shuffle, newUPP, AllSkills } from './Character.js';
import { newCharacter } from "./Character.js";
import { equals, expect, not, test } from "@benchristel/taste";

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
        ? withHobby(withAdmission(char))
        : char;
}

function withAdmission(char: Character): Character {
  const [major, minor]: Skill[] = take<Skill>(2, shuffle(AcademicSkills))
  
  return withFields(minor, major, char)
}

const withHobby = (char: Character): Character => {
  const hobby: Skill = take(1, AllSkills)[0] as Skill
  return {
    ...char,
    skills: {
      ...char.skills,
      [hobby]: char.skills[hobby] || 0
    }
  };
}


const EducationEvents = {
    "Psionics": function(char) {
      // ...
    },
    "Tragedy": function(char) {
      // ...
    },
    "Prank": function(char) {
      // ...
    },
    "Party": function(char) {
      // ...
    },
    "Clique": function(char) {
      // ...
    },
    "LifeEvent": function(char) {
      // ...
    },
    "Politics": function(char) {
      // ...
    },
    "Hobby": function(char) {
      // ...
    },
    "Tutor": function(char) {
      // ...
    },
    "War": function(char) {
      // ...
    },
    "Recognition": function(char) {
      // ...
    }
  }

function withFields(minor: Skill, major: Skill, char: Character): Character {
  return {
    ...char,
    skills: {
      ...char.skills,
      [minor]: char.skills[minor] || 0,
      [major]: char.skills[major] || 1, // clobbers
    },
    events: [
      ...char.events,
      `Admitted to University`,
      `Majoring in ${major} with a minor in ${minor}`
    ]
  };
}

test("withFields", {
  "adds new skills"(){
    expect(withFields("Admin", "Animals", newCharacter()).skills, equals, {
      Admin: 0,
      Animals: 1
    })
  },
  "builds on background skills"(){
    expect(withFields("Admin", "Animals", withBackgroundSkills(newCharacter())).skills, hasProperties, {
      Admin: 0, // minor
      Animals: 1 // major
    })
  },
  "retains extant skills"(){
    const youth = withBackgroundSkills(newCharacter());
    expect(withFields("Admin", "Animals", youth).skills, hasProperties, youth.skills)
  }
})

function withMilitaryAcademy(char: Character): Character {
    return {
      ...char
    }
}

const assignAtZero = (acc: Skillset, skill: Skill): {} => Object.assign(acc, { [skill]: 0 });

export const withBackgroundSkills = (char: Character): Character => Object.assign(
    char,
    { 
        skills: sample<Skill>(
            DM(EDU(char)) + 3,
            BACKGROUND_SKILLS
        ).reduce(assignAtZero, {}) 
    }
);

test("withBackgroundSkills", {
    "provides 3 + EDU DM skills"(){
        const character = withBackgroundSkills(newCharacter(["6","6","6","6","6","6"]));
        expect(Object.keys(character.skills).length, equals, 3);
    }
});

const sample = <T>(n: number, items: T[]): T[] => take(n, shuffle(items));

function hasProperties(expected: any, actual: any): boolean {
  return equals({...expected,...actual}, actual);
}

test("hasProperties", {
  "returns true if two empty objects"(){
    expect({}, hasProperties, {});
  },
  "returns false if actual lacks expected properties"(){
    expect({}, not(hasProperties), {foo: "bar"});
  },
  "returns false if actual just has some other commensurate properties"(){
    expect({baz: "qux"}, not(hasProperties), {foo: "bar"});
  },
  "returns true if actual is superset of expected properties"(){
    expect({foo: "bar", baz: "qux"}, hasProperties, {foo: "bar"});
  }
})