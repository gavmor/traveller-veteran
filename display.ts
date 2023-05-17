
import {default as blessed} from "blessed";
import {
    grid as Grid, map as Map,
    log as Log} from "blessed-contrib"; 
import { generate } from './src/Lifepath.js';
import { setCharacterSheet } from "./src/setCharacterSheet.js";
import { classicSkillAnnotation } from "./src/classicSkillAnnotation.js";
import { age, birthdate, Character } from "./src/Character.js";

export const screen = blessed.screen({debug: true});

export const grid = new Grid({
    rows: 24, cols: 24, screen: screen
})

screen.render()

screen.key(
    ['escape', 'q', 'C-c'], 
    () => process.exit(0)
);


const sheet = setCharacterSheet(generate());
const universe: Character[] = [];
const showSheet = (char) => {
    universe.push(char);
    sheet.name.setContent(char.name);
    sheet.age.setContent(`${age(char)} years`)
    sheet.skills.setContent(classicSkillAnnotation(char.skills));
    sheet.birthdate.setContent(birthdate(char))
    char.log.forEach((entry:string) => sheet.log.log(entry))
    screen.debug(universe.length.toString())
}

setInterval(() => showSheet(generate()), 500);
