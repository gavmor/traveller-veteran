
import {default as blessed} from "blessed";
import {
    grid as Grid, map as Map,
    log as Log} from "blessed-contrib"; 
import { generate } from './src/Lifepath.js';
import { setCharacterSheet } from "./setCharacterSheet.js";

export const screen = blessed.screen({debug: true});

export const grid = new Grid({
    rows: 24, cols: 24, screen: screen
})

screen.render()

screen.key(
    ['escape', 'q', 'C-c'], 
    () => process.exit(0)
);

setInterval(() => {
    const char = generate();
    setCharacterSheet(generate());
//     log.log(char.upp.join("").toUpperCase());
//     log.log("  " + JSON.stringify(char.skills))
//     log.log("  " + JSON.stringify(char.log))
    

    screen.render()
}, 500)