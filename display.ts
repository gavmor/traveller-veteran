
import {default as blessed} from "blessed";
import {
    grid as Grid, map as Map,
    log as Log, markdown as Markdown
} from "blessed-contrib"; 
const {box: Box} = blessed;
import { generate } from './src/Lifepath.js';
import { newUPP } from "./src/Character.js";

const screen = blessed.screen()

const grid = new Grid({
    rows: 24, cols: 24, screen: screen
})

screen.render()

screen.key(
    ['escape', 'q', 'C-c'], 
    () => process.exit(0)
);

// setInterval(() => {
    const char = generate();
//     log.log(char.upp.join("").toUpperCase());
//     log.log("  " + JSON.stringify(char.skills))
//     log.log("  " + JSON.stringify(char.log))
    grid.set(0, 0, 2, 12, Markdown, {
        label: '',
        content: "PERSONAL DATA",
        style: { fg: 'magenta', border: { fg: 'black' } }
    })
    grid.set(2+0, 0, 2, 7, Box, {
        label: 'Name',
        content: "John",
        style: { fg: 'white', }
    })
    
    grid.set(2+0, 7, 2, 5, Box, {
        label: 'UPP',
        content: char.upp.join("").toUpperCase(),
        style: { fg: 'white', }
    })
    grid.set(2+2, 0, 2, 3, Box, {
        label: 'Noble Title',
        content: char.upp.join("").toUpperCase(),
        style: { fg: 'white', }
    })
    grid.set(2+2, 3, 2, 3, Box, {
        label: 'Military Rank',
        content: char.upp.join("").toUpperCase(),
        style: { fg: 'white', }
    })
    grid.set(2+2, 6, 2, 6, Box, {
        label: 'Birthdate',
        content: char.upp.join("").toUpperCase(),
        style: { fg: 'white', }
    })
    grid.set(2+4, 0, 2, 6, Box, {
        label: 'Age Modifiers',
        content: char.upp.join("").toUpperCase(),
        style: { fg: 'white', }
    })
    grid.set(2+4, 6, 2, 6, Box, {
        label: 'Birthworld',
        content: char.upp.join("").toUpperCase(),
        style: { fg: 'white', }
    })
    grid.set(2+6, 0, 2, 12, Markdown, {
        label: '',
        content: "SERVICE HISTORY",
        style: { fg: 'magenta', border: { fg: 'black' } }
    })


    screen.render()

// }, 100);