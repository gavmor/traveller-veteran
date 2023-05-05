import * as blessed from "blessed";
import {
    grid as Grid, map as Map,
    log as Log

} from "blessed-contrib";

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


type Skill = "Admin"| "Animals"| "Art"| "Athletics"| "Carouse"| "Drive"| "Electronics"| "Science"| "Flyer"| "Seafarer"| "Language"| "Streetwise"| "Mechanic"| "Survival"| "Medic"| "Vacc Suit"| "Profession"


interface Character {
    upp: string
    skills: Partial<Record<Skill, number>>
};

const generate = (): Character => ({
        upp: UPP().join(""),
        skills: {
            
        }
})


setInterval(() => log.log(generate().upp), 1000);

const UPP = (): string[] => {
    return [char(),char(),char(),char(),char(),char()]
}

const char = (): string => (roll()+roll()).toString(16).toUpperCase()
const roll = ():number => Math.ceil(Math.random() * 6);


