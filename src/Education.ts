import { d66Table, INT, roll, SOC } from "./Game.js";
import * as ramda from 'ramda';
import { d6, DM, EDU } from './Game.js';
import { Character, AcademicSkills, Skill, shuffle, CharBuilder } from './Character.js';
import { newCharacter } from "./Character.js";
import { equals, expect, test } from "@benchristel/taste";
import { d66 } from "./Game.js";
import { withBackgroundSkills } from "./Background.js";
import { exists, includes, hasProperties } from "./lib/taste.js";

export function withEducation(char: Character): Character {
  return (d6() % 2) > 0 ? tryUniversity(char) : withMilitaryAcademy(char);
}

function tryUniversity(char: Character): Character {
  return rollToMatriculate(char) 
    ? matriculate(selectCourse(), char) 
    : char;
}

function tryGraduation(term: EducationTerm, char: Character): Character {
  return rollToGraduate(char) 
    ? applyPromotion(term, char) 
    : char;
}

const rollToMatriculate = (char: Character): Boolean => roll(DM(EDU(char)) + (SOC(char) > 8 ? 1 : 0)) >= 7;
const rollToGraduate = (char: Character): Boolean => roll(DM(INT(char))) > 6;

function matriculate(course: EducationTerm, char: Character): Character {
  return tryGraduation(course, withEducationEvent[d66()](applyTerm(course, char)));
}

function selectCourse(): EducationTerm {
  const [major, minor]: Skill[] = ramda.take<Skill>(2, shuffle(AcademicSkills));;
  return {major, minor}
}

const flunk = ramda.identity;



test("withEducationEvent", {
  "Clique logs an entry"() {
    expect(withEducationEvent[6](newCharacter()).log, includes, "Born");
    expect(withEducationEvent[6](newCharacter()).log, includes, "Joined a Clique");
  },
  "Clique adds d3 allies"() {
    expect(withEducationEvent[6](newCharacter()).allies, includes, "Bjorn");
  }
});

export const withEducationEvent: d66Table<CharBuilder> = {
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

export type EducationTerm = {
  minor: Skill
  major: Skill
};


export function applyPromotion({major, minor}: EducationTerm, char: Character): Character {
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

export function applyTerm({minor, major}: EducationTerm, char: Character): Character {
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

test("applyTerm", {
  "adds new skills"(){
    expect(applyTerm({minor:"Admin", major: "Animals"}, newCharacter()).skills, equals, {
      Admin: 0,
      Animals: 1
    })
  },
  "builds on background skills"(){
    expect(applyTerm({minor:"Admin", major: "Animals"}, withBackgroundSkills(newCharacter())).skills, hasProperties, {
      Admin: 0, // minor
      Animals: 1 // major
    })
  },
  "retains extant skills"(){
    const youth = withBackgroundSkills(newCharacter());
    expect(applyTerm({major:"Admin", minor: "Animals"}, youth).skills, hasProperties, youth.skills)
  }
})

export function withMilitaryAcademy(char: Character): Character {
  return {
    ...char,
    log: [ ...char.log, "Admitted to Military Academy"],
  }
}