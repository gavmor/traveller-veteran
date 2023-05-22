import { d66Table, Die, INT, roll, SOC } from "./Game.js";
import * as ramda from 'ramda';
import { d6, DM, EDU } from './Game.js';
import { Character, AcademicSkills, Skill, CharBuilder } from './Character.js';
import { shuffle } from "./lib/shuffler.js";
import { newCharacter } from "./Character.js";
import { equals, expect, is, not, test } from "@benchristel/taste";
import { d66 } from "./Game.js";
import { withBackgroundSkills } from "./Background.js";
import { includes, hasProperties } from "./lib/taste.js";
import { last } from "ramda";
import { Career, withTerm as withCareerTerm } from "./Career.js";

test("withEducation", {
  "permits only two terms"(){
    const priorTerm: UniversityTerm = { major: "Medic", minor: "Advocate"};
    const graduate = withTerm(priorTerm, withTerm(priorTerm, newCharacter([1, 1, 1, 1, 1, 1])))
    expect(graduate.education.length, is, 2)
    Die.rolls=[6,6]
    expect(withEducation(graduate, true), is, graduate)
  },
  "permits no adult education"(){
    const priorTerm: Career = { stat: c => 1, threshold: 2 };
    const graduate = withCareerTerm(withCareerTerm(newCharacter(["C", "C", "C", "C", "C", "C"]), priorTerm, "Streetwise"), priorTerm, "Seafarer")
    expect(graduate.career.length, is, 2)
    Die.rolls=[6,6,6,6,6,6,6,6,6]
    expect(withEducation(graduate, true).education, is, undefined)
  },
  "without admission changes nothing"(){
    const neophyte = newCharacter([1, 1, 1, 1, 1, 1]);
    Die.rolls=[2, 2, 2, 2,]
    expect(withEducation(neophyte, true), equals, neophyte)
  },
  "graduates doubly"(){
    Die.rolls=[6,6,6,6]
    expect(withEducation(
      newCharacter([6,6,6,6,6,6]),
      true,
      {major: "Advocate", minor: "Medic"},
      c=>c
    ).skills, equals, {
      Advocate: 2,
      Medic: 1
    })
  },
  "merely attends"(){
    Die.rolls=[6,6,1,1]
    expect(withEducation(newCharacter([6,6,6,6,6,6]), true, {major: "Art", minor: "Navigation"}, c=>c).skills, equals, {
      Art: 1,
      Navigation: 0
    })
  },
})

export function withEducation(
  char: Character,
  picksUniversity: boolean = Math.random() > 0.5,
  term: UniversityTerm = pickCourse(),
  withEvent: CharBuilder = withEducationEvent[d66()],
): Character {
  if((char.education||[]).length > 1) return char
  if(!!char.career) return char


  return !picksUniversity
    ? withMilitaryAcademy(char)
    : !rollToQualify(char) 
      ? char
      : maybeGraduate(withEvent(withTerm(term, char)))
}

const rollToQualify = (char: Character): boolean => roll(DM(EDU(char)) + (SOC(char) > 8 ? 1 : 0)) >= 7;
const rollToGraduate = (char: Character): boolean => roll(DM(INT(char))) > 6;

const maybeGraduate = (undergrad: Character): Character => 
  rollToGraduate(undergrad) ? withGraduation(undergrad) : undergrad;


type AcademicSkill = typeof AcademicSkills[number];
function pickCourse(): UniversityTerm {
  // @ts-expect-error 
  const [major, minor]: Skill[] = ramda.take<AcademicSkill>( 2, shuffle(AcademicSkills) );
  return {major, minor}
}

const flunk = ramda.identity;

test("withEducationEvent", {
  "Clique() logs an entry"() {
    expect(withEducationEvent[6](newCharacter([2,2,2,2,2,2])).log, includes, "Joined a Clique");
  },
  "Clique adds d3 allies"() {
    expect(withEducationEvent[6](newCharacter([2,2,2,2,2,2])).allies, includes, "Bjorn");
  }
});

const newAlly = () => "Bjorn";

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
  6: function Clique(char): Character {
    return {
      ...char,
      log: [...char.log, "Joined a Clique"],
      allies: ramda.times(newAlly, 1 + (Math.ceil(Math.random()*2))),
      
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

export type UniversityTerm = Record<"major"|"minor", typeof AcademicSkills[number]>


export function withGraduation(char: Character): Character {
return {
  ...char,
  skills: {
    ...char.skills,
    [last(char.education).minor]: 1,
    [last(char.education).major]: 2,
  }
};
}

interface Educated extends Character {
  education: [UniversityTerm] // at least one
}

export function withTerm(
  { minor, major }: UniversityTerm,
  char: Character
): Character {
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
      `Majoring in ${major} with a minor in ${minor}`,
    ],
    education: [
      ...(char.education||[]),
      { minor, major }
    ],
  };
}

test("withTerm", {
  "adds new skills"(){
    const char = newCharacter([2,2,2,2,2,2]);
    expect(withTerm({minor:"Admin", major: "Animals"}, char).skills, equals, {
      Admin: 0,
      Animals: 1
    })
  },
  "builds on background skills"(){
    const youth = withBackgroundSkills(newCharacter([2,2,2,2,2,2]));
    expect(withTerm({minor:"Admin", major: "Animals"}, youth).skills, hasProperties, {
      Admin: 0, // minor
      Animals: 1 // major
    })
  },
  "retains extant skills"(){
    const youth = withBackgroundSkills(newCharacter([2,2,2,2,2,2]));
    expect(withTerm({major:"Admin", minor: "Animals"}, youth).skills, hasProperties, youth.skills)
  },
  "appends to education"(){
    const char = newCharacter([2,2,2,2,2,2])
    const term: UniversityTerm = { major: "Animals (Training)", minor: "Art" };
    expect(withTerm(term, char).education.length, is, 1)
    expect(withTerm(term, withTerm(term, char)).education.length, is, 2)
  }
})

export function withMilitaryAcademy(char: Character): Character {
  return {
    ...char,
    log: [ ...char.log, "Admitted to Military Academy"],
    education: [
      ...(char.education||[]),
      {major: "Medic", minor: "Admin"}
    ]
  }
}