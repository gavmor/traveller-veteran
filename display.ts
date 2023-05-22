
import {default as blessed} from "blessed";
import {
    grid as Grid, map as Map,
    log as Log} from "blessed-contrib"; 
import { generate } from './src/Lifepath.js';
import { CharacterSheet, setCharacterSheet as initializeSheet } from "./src/setCharacterSheet.js";
import { classicSkillAnnotation } from "./src/classicSkillAnnotation.js";
import { age, birthdate, Character } from "./src/Character.js";
import { maxBy } from "ramda";

const screen = blessed.screen({debug: true});
export const grid = new Grid({ screen, rows: 24, cols: 24 })
screen.render()

screen.key(
    ['escape', 'q', 'C-c'], 
    () => process.exit(0)
);

let oldest: Character = generate();
const universe: Character[] = [];
const updateDisplay = (sheet: CharacterSheet, next: Character) => {
  universe.push(next)
  oldest = maxBy(age)(next, oldest)
  if(next===oldest) updateSheet(sheet, oldest);
  sheet.log.log("------")
  next.log.forEach((entry: string) => sheet.log.log(entry));
}

function updateSheet(sheet: CharacterSheet, char: Character) {
  sheet.upp.setContent(char.upp.join("").toUpperCase())
  sheet.name.setContent(char.name);
  sheet.age.setContent(`${age(char)} years`);
  sheet.skills.setContent(classicSkillAnnotation(char.skills));
  sheet.birthdate.setContent(birthdate(char));
  sheet.history.setContent(JSON.stringify(char.log, null, 2))
}

const sheet = initializeSheet(oldest);
setInterval(() => updateDisplay(sheet, generate()), 500);


