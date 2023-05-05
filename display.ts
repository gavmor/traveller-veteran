import * as blessed from "blessed";
import {
    grid as Grid, map as Map,
    log as Log

} from "blessed-contrib";

const screen = blessed.screen()

const grid = new Grid({
    rows: 12, cols: 12, screen: screen
})

const Characteristics = grid.set(0, 0, 4, 4, Log, {
    label: 'Characteristcs'
})

screen.render()

screen.key(
    ['escape', 'q', 'C-c'], 
    () => process.exit(0)
);


screen.key(
    ['n'], 
    () => Characteristics.log(
        UPP().join("")
    )
);

const UPP = (): number[] => {
    return [char(),char(),char(),char(),char(),char()]
}

const char = (): string => (roll()+roll()).toString(16).toUpperCase()
const roll = ():number => Math.ceil(Math.random() * 6);


