import {take} from 'ramda'

import * as blessed from "blessed";
import {
    grid as Grid, map as Map,
    log as Log

} from "blessed-contrib";
import { shuffler } from "./shuffler";

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

const SKILLS = ["Admin", "Animals", "Art", "Athletics", "Carouse", "Drive", "Electronics", "Science", "Flyer", "Seafarer", "Language", "Streetwise", "Mechanic", "Survival", "Medic", "Vacc Suit", "Profession"] as const
type Skill = typeof SKILLS[number];

const shuffle = shuffler(Math.random);


interface Character {
    upp: string
    skills: Partial<Record<Skill, number>>
};

const generate = (): Character => ({
        upp: UPP().join(""),
        skills: take(3, shuffle(SKILLS)) .reduce(
            (acc, skill) => Object.assign( acc, {[skill]: 0}
        ), {})
})


setInterval(() => {
    const char = generate();
    log.log(char.upp)
    log.log("  " + JSON.stringify(char.skills))
}, 1000);

const UPP = (): string[] => {
    return [char(),char(),char(),char(),char(),char()]
}

const char = (): string => (roll()+roll()).toString(16).toUpperCase()
const roll = ():number => Math.ceil(Math.random() * 6);


