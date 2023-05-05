
import * as blessed from "blessed";
import {
    grid as Grid, map as Map,
    log as Log
} from "blessed-contrib"; // @ts-ignore
import { generate } from './src/generate';

const screen = blessed.screen()

const grid = new Grid({
    rows: 12, cols: 12, screen: screen
})

const log = grid.set(0, 0, 4, 4, Log, {
    label: 'UPP'
})

screen.render()

screen.key(
    ['escape', 'q', 'C-c'], 
    () => process.exit(0)
);

setInterval(() => {
    const char = generate();
    log.log(char.upp.join("").toUpperCase());
    log.log("  " + JSON.stringify(char.skills))
}, 1000);