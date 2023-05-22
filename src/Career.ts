import { equals, expect, is, not, test } from "@benchristel/taste";
import { age, Character, newCharacter } from "./Character.js";
import { AllSkills, Skill } from "./game/Skills.js";
import { Die, DM, EDU, roll } from "./game/Mechanics.js";

test("withCareer", {
  "when qualified, and surviving, increases age by a term"() {
    const qualified = newCharacter([2, 2, 2, 2, 2, 2]);
    Die.rolls = [6, 6, 6, 6];
    expect(withCareer(qualified, Careers[0]).career.length, is, 1);
  },

  "when unqualified, does not alter character"() {
    const underqualified = newCharacter([2, 2, 2, 2, 2, 2]);
    Die.rolls = [1, 1];
    expect(withCareer(underqualified, Careers[0]), is, underqualified);
  },
  "when qualified, but fails to survive, dies with no career"() {
    Die.rolls = [6, 6, 1, 1];
    const doomed = withCareer(newCharacter([2, 2, 2, 2, 2, 2]), Careers[0]);
    expect(doomed.alive, is, false);
    expect(doomed.career, is, undefined);
  },
});

export function withCareer(
  char: Character,
  term = pickCareer()
): Character {
  const skill = pickSkill();
  return !rollToQualify(char, term)
    ? char
    : !rollToSurvive(char, term)
      ? withDeath(char, skill)
      : withTerm(char, term, skill)
}

export type Career = {
  stat: typeof EDU;
  threshold: number;
};

export const Careers: Career[] = [{ stat: EDU, threshold: 7 }];

test("pickCareer", {
  "returns something"() {
    expect(pickCareer(), not(is), undefined);
  },
});

test("withTerm", {
  "introduces skills"(){
    expect(withTerm(newCharacter([2,2,2,2,2,2]), Careers[0], "Astrogation").skills, equals, {
      "Astrogation": 1
    })
  },
  "advances skills"(){
    const astrogator = withTerm(newCharacter([2, 2, 2, 2, 2, 2]), Careers[0], "Astrogation");
    expect(withTerm(astrogator, Careers[0], "Astrogation").skills, equals, {
      "Astrogation": 2
    })
  }
})

function withDeath(char: Character, skill: Skill): Character {
  return { 
    ...char,
    alive: false,
    log: [
      ...char.log,
      `Died practicing ${skill} at the age of ${age(char)}`
    ]
  };
}

export function withTerm(char: Character, careerTerm: Career, skill: Skill): Character {
  return {
    ...char,
    log: [
      ...char.log,
      `Career in ${skill}`
    ],
    career: [...(char.career || []), careerTerm],
    skills: {
      ...char.skills,
      [skill]: (char.skills[skill] || 0) + 1
    }
  };
}

function pickSkill() {
  return AllSkills[Math.floor(Math.random() * AllSkills.length)];
}

function pickCareer(): Career {
  return Careers[Math.floor(Math.random() * Careers.length)];
}

function rollToQualify(char: Character, career: Career): boolean {
  return roll(DM(career.stat(char))) >= career.threshold;
}

function rollToSurvive(char: Character, career: Career): boolean {
  return roll(DM(career.stat(char))) >= career.threshold;
}
