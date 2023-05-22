import { maxBy } from "ramda";
import { age, Character, UPP } from "./src/Character.js";
import { classicSkillAnnotation } from "./src/classicSkillAnnotation.js";
import { generate } from "./src/Lifepath.js";

let oldest = generate();
let gen: number = 0;
setInterval(() => {
  gen++;
  const next = generate();
  oldest = maxBy(age)(next, oldest);
  if (oldest === next) {
    console.clear();
    console.log(gen, oneLiner(oldest));
    console.log(classicSkillAnnotation(oldest.skills));
  }
}, 0);

function oneLiner(char: Character): string {
  const { name, upp, birthworld } = char;
  return `Age ${age(char)}: ${displayUPP(upp)} - ${name} (${birthworld})`;
}

function displayUPP(upp: UPP) {
  return upp.join("").toUpperCase();
}
