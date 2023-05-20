import { maxBy } from "ramda";
import { age, Character } from "./src/Character.js";
import { classicSkillAnnotation } from "./src/classicSkillAnnotation.js";
import { generate } from "./src/Lifepath.js";

let oldest = generate();
let gen: number = 0
setInterval(() => {
  gen++
  oldest = maxBy(age)(generate(), oldest)
  console.log(gen, oneLiner(oldest));
  console.log(classicSkillAnnotation(oldest.skills))
}, 0)

function oneLiner({name, upp, birthworld, skills}: Character): string {
  return `${upp.join("").toUpperCase()} - ${name} (${birthworld}):}`;
}
