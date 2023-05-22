import { maxBy } from "ramda";
import { age, Character, UPP } from "./src/Character.js";
import { classicSkillAnnotation } from "./src/display/classicSkillAnnotation.js";
import { generate } from "./src/Lifepath.js";

let oldest = generate();
const updateDisplay = (next: Character) => {
  oldest = maxBy(age)(next, oldest);
  if (oldest === next) updateSheet(oldest);
};

function updateSheet(char: Character) {
  console.clear();
  console.log(
    `Age ${age(char)}: 
    ${char.upp.join("").toUpperCase()}
    ${char.name} (${char.birthworld})`
  );
  console.log(classicSkillAnnotation(char.skills));
}


setInterval(() => updateDisplay(generate()), 0);
