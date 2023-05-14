import { d66Table, INT, roll, SOC } from "./Game.js";
import * as ramda from 'ramda';
import { d6, DM, EDU } from './Game.js';
import { Character, AcademicSkills, Skill, shuffle, CharBuilder } from './Character.js';
import { newCharacter } from "./Character.js";
import { equals, expect, test } from "@benchristel/taste";
import { d66 } from "./Game.js";
import { withBackgroundSkills } from "./Background.js";
import { includes, hasProperties } from "./lib/taste.js";
import { last } from "ramda";

export function withEducation(
  char: Character,
  term: EducationTerm = selectCourse(),
  withEvent: CharBuilder = withEducationEvent[d66()],
  selectsUniversity: boolean = Math.random() > 0.5,
): Character {
  return selectsUniversity
    ? rollToQualify(char) 
      ? maybeGraduate(withEvent(withTerm(term, char)))
      : char
    : withMilitaryAcademy(char);
}

const rollToQualify = (char: Character): boolean => roll(DM(EDU(char)) + (SOC(char) > 8 ? 1 : 0)) >= 7;
const rollToGraduate = (char: Character): boolean => roll(DM(INT(char))) > 6;

const maybeGraduate = (undergrad: Character): Character => 
  rollToGraduate(undergrad) ? withGraduation(undergrad) : undergrad;


function selectCourse(): EducationTerm {
  const [major, minor]: Skill[] = ramda.take<Skill>(2, shuffle(AcademicSkills));;
  return {major, minor}
}

const flunk = ramda.identity;

// test("WithEducation", {
//   "attempts matriculation"(){},
//   "if matriculated, adds skills"(){
//     expect(Object.values(withEducation(newCharacter()).skills), equals, [0,1])
//   },
//   // "if graduated, adds more"(){
//   //   expect(withEducation(newCharacter()), equals, {})
//   // }
// })

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


export function withGraduation(char: Character): Character {
return {
  ...char,
  skills: {
    ...char.skills,
    [last(char.terms).minor]: 1,
    [last(char.terms).major]: 2,
  }
};
}

export function withTerm({minor, major}: EducationTerm, char: Character): Character {
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
    expect(withTerm({minor:"Admin", major: "Animals"}, newCharacter()).skills, equals, {
      Admin: 0,
      Animals: 1
    })
  },
  "builds on background skills"(){
    expect(withTerm({minor:"Admin", major: "Animals"}, withBackgroundSkills(newCharacter())).skills, hasProperties, {
      Admin: 0, // minor
      Animals: 1 // major
    })
  },
  "retains extant skills"(){
    const youth = withBackgroundSkills(newCharacter());
    expect(withTerm({major:"Admin", minor: "Animals"}, youth).skills, hasProperties, youth.skills)
  }
})

export function withMilitaryAcademy(char: Character): Character {
  return {
    ...char,
    log: [ ...char.log, "Admitted to Military Academy"],
  }
}