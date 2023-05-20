
import {default as blessed} from "blessed";
import {
    grid as Grid, map as Map,
    log as Log} from "blessed-contrib"; 
import { generate } from './src/Lifepath.js';
import { setCharacterSheet } from "./src/setCharacterSheet.js";
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
const universe: Character[] = [];
const showSheet = (char) => {
  universe.push(char);
  const next = generate();
  oldest = maxBy(age)(next, oldest)
  if(next===oldest) updateDisplay(oldest);
  next.log.forEach((entry: string) => sheet.log.log(entry));
}

setInterval(() => showSheet(generate()), 500);

function updateDisplay(char: Character) {
  sheet.name.setContent(char.name);
  sheet.age.setContent(`${age(char)} years`);
  sheet.skills.setContent(classicSkillAnnotation(char.skills));
  sheet.birthdate.setContent(birthdate(char));
  screen.debug(universe.length.toString());
}

