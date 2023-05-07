import { roll, SOC } from "./Game.js";
import * as ramda from 'ramda';
import { d6, DM, EDU } from './Game.js';
import { Character, AcademicSkills, Skillset, Skill, BackgroundSkills as BACKGROUND_SKILLS, shuffle, newUPP, AllSkills } from './Character.js';
import { newCharacter } from "./Character.js";
import { curry, equals, expect, not, test } from "@benchristel/taste";
import { d66 } from "./Game.js";
import { d66Table } from "./Game.js";

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
  const [major, minor]: Skill[] = ramda.take<Skill>(2, shuffle(AcademicSkills))
  
  return withEducationEvent[d66()](withFields(minor, major, char))
}



const includes = curry(ramda.includes, "includes");

test("withEducationEvent", {
  "Clique logs an entry"(){
    expect(withEducationEvent[6](newCharacter()).log, includes, "Born")
    expect(withEducationEvent[6](newCharacter()).log, includes, "Joined a Clique")
  },
  "Clique adds d3 allies"(){
    expect(withEducationEvent[6](newCharacter()).allies, includes, "Bjorn")
  }
})

type CharBuilder = (char: Character) => Character;

const withEducationEvent: d66Table<CharBuilder> = {
    2: function Psionics(char) {
      return char;
    },
    3: function Tragedy(char) {
      return char;
    },
    4: function Prank(char) {
      return char;
    },
    5: function Party(char) {
      return char;
    },
    6: function Clique(char) {
      return {
        ...char,
        log: [...char.log, "Joined a Clique"],
        allies: [
          ...char.allies,
          ...ramda.times(() => "Bjorn",(d6()%3)+1)
        ]
      };
    },
    7: function LifeEvent(char) {
      return char;
    },
    8: function Politics(char) {
      return char;
    },
    9: function Hobby(char) {
      return char;
    },
    10: function Tutor(char) {
      return char;
    },
    11: function War(char) {
      return char;
    },
    12: function Recognition(char) {
      return char;
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
    log: [
      ...char.log,
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

const sample = <T>(n: number, items: T[]): T[] => ramda.take(n, shuffle(items));

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

