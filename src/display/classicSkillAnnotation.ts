import { Skillset } from "../game/Skills.js";
import { expect, is, test } from "@benchristel/taste";

export const classicSkillAnnotation = (skills: Skillset): string =>
  JSON.stringify(skills)
    .replace(/\"/g, "")
    .replace(/:/g, "-")
    .replace(/,/g, " ")
    .replace(/[}{]/g, "");

test("classicSkillAnnotation", {
  "handles empty skillset"() {
    expect(classicSkillAnnotation({}), is, "");
  },
  "handles small skillset"() {
    expect(
      classicSkillAnnotation({ Admin: 1, "Vacc Suit": 4 }),
      is,
      "Admin-1 Vacc Suit-4"
    );
  },
  "handles specialties"() {
    expect(
      classicSkillAnnotation({
        Animals: { Veterinary: 1 },
        Electronics: { Computers: 2 },
      }),
      is,
      "Animals-Veterinary-1 Electronics-Computers-2"
    );
  },
});
