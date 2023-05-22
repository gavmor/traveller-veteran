
import {default as blessed} from "blessed";
import {
    grid as Grid, map as Map,
    log as Log} from "blessed-contrib"; 
import { generate } from './src/Lifepath.js';
import { CharacterSheet, setCharacterSheet } from "./src/setCharacterSheet.js";
import { classicSkillAnnotation } from "./src/classicSkillAnnotation.js";
import { age, birthdate, Character } from "./src/Character.js";
import { maxBy } from "ramda";

export const screen = blessed.screen({debug: true});

export const grid = new Grid({
    rows: 24, cols: 24, screen: screen
})

screen.render()

screen.key(
    ['escape', 'q', 'C-c'], 
    () => process.exit(0)
);


let oldest = generate();
const sheet = setCharacterSheet(oldest);
updateDisplay(sheet, oldest);
const universe: Character[] = [];
const showSheet = (char) => {
  universe.push(char);
  const next = generate();
  oldest = maxBy(age)(next, oldest)
  if(next===oldest) updateDisplay(sheet, oldest);
  sheet.log.log("------")
  next.log.forEach((entry: string) => sheet.log.log(entry));
}

setInterval(() => showSheet(generate()), 500);

function updateDisplay(sheet: CharacterSheet, char: Character) {
  sheet.name.setContent(char.name);
  sheet.age.setContent(`${age(char)} years`);
  sheet.skills.setContent(classicSkillAnnotation(char.skills));
  sheet.birthdate.setContent(birthdate(char));
  sheet.history.setContent(JSON.stringify(char.log, null, 2))
}

