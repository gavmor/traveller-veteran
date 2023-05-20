import { maxBy } from "ramda";
import { age, Character } from "./src/Character.js";
import { generate } from "./src/Lifepath.js";

let oldest = generate();

setInterval(() => {
  oldest = maxBy(age)(generate(), oldest)
  console.log(oneLiner(oldest));
}, 0)

function oneLiner({name, upp, birthworld, education}: Character): string {
  return `${upp.join("").toUpperCase()} - ${name} (${birthworld}): ${JSON.stringify(education)}`;
}
