import { INT, roll, SOC } from "./Game.js";
import * as ramda from 'ramda';
import { d6, DM, EDU } from './Game.js';
import { Character, AcademicSkills, Skillset, Skill, BackgroundSkills as BACKGROUND_SKILLS, shuffle, newUPP, AllSkills } from './Character.js';
import { newCharacter } from "./Character.js";
import { curry, equals, expect, is, not, test } from "@benchristel/taste";
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
        ? matriculate(char)
        : char;
}

function matriculate(char: Character): Character {
  const [major, minor]: Skill[] = ramda.take<Skill>(2, shuffle(AcademicSkills))
  
  return attemptGraduation({major,minor},withEducationEvent[d66()](declare({major, minor}, char)))
}

function attemptGraduation({minor, major}: EducationTerm, char: Character): Character {
  return roll(DM(INT(char))) > 6 ? graduate(char, minor, major) : flunk(char)
}

const flunk = ramda.identity

const exists = not(is(undefined));

test('withGraduation', {
  "graduates some students"() {
    const studentBody = ramda.times(() => newCharacter(), 30)
      .map((char) => attemptGraduation({major: "Admin", minor: "Animals"}, char))
    expect(studentBody.find(({skills}) => skills.Admin === 2), exists)
  },
  "flunks some students"() {
    const studentBody = ramda.times(() => newCharacter(), 30)
     .map((char) => attemptGraduation({major: "Admin", minor: "Animals"}, char))
    expect(studentBody.find(({skills}) => skills.Admin === undefined), exists)
  }
})


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
// TODO: Curry these CharBuilder to enable pipeline syntax

const withEducationEvent: d66Table<CharBuilder> = {
    2: function Psionics(char) {
      return char; // TODO: Implement Education Event
    },
    3: function Tragedy(char) {
      return char; // TODO: Implement Education Event
    },
    4: function Prank(char) {
      return char; // TODO: Implement Education Event
    },
    5: function Party(char) {
      return char; // TODO: Implement Education Event
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
      return char; // TODO: Implement Education Event
    },
    8: function Politics(char) {
      return char; // TODO: Implement Education Event
    },
    9: function Hobby(char) {
      return char; // TODO: Implement Education Event
    },
    10: function Tutor(char) {
      return char; // TODO: Implement Education Event
    },
    11: function War(char) {
      return char; // TODO: Implement Education Event
    },
    12: function Recognition(char) {
      return char; // TODO: Implement Education Event
    }
  }

type EducationTerm = {
  minor: Skill
  major: Skill
};

function graduate(char: Character, minor: string, major: string): Character {
  return {
    ...char,
    skills: {
      ...char.skills,
      [minor]: 1,
      [major]: 2,
    },
    log: [
      ...char.log,
      `Graduated with a degree in ${major} and a minor in ${minor}`
    ]
  };
}

function declare({minor, major}: EducationTerm, char: Character): Character {
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
    expect(declare({minor:"Admin", major: "Animals"}, newCharacter()).skills, equals, {
      Admin: 0,
      Animals: 1
    })
  },
  "builds on background skills"(){
    expect(declare({minor:"Admin", major: "Animals"}, withBackgroundSkills(newCharacter())).skills, hasProperties, {
      Admin: 0, // minor
      Animals: 1 // major
    })
  },
  "retains extant skills"(){
    const youth = withBackgroundSkills(newCharacter());
    expect(declare({major:"Admin", minor: "Animals"}, youth).skills, hasProperties, youth.skills)
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

