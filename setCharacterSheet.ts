
import {default as blessed} from "blessed";
const {box: Box} = blessed;
import { markdown as Markdown, log as Log } from "blessed-contrib";
import { Character, Skillset } from "./src/Character.js";
import { grid } from "./display.js";
import {planetNameGenerator} from "planet-name-generator"

const CURRENT_YEAR = new Date().getFullYear() - 1979 + 1105;
const AGE_OF_MAJORITY = 18;
export function setCharacterSheet(char: Character) {
    grid.set(0, 0, 2, 12, Markdown, {
        label: '',
        content: "PERSONAL DATA",
        style: { fg: 'magenta', border: { fg: 'black' } }
    });
    grid.set(2 + 0, 0, 2, 7, Box, {
        label: 'Name',
        content: char.name,
        style: { fg: 'white', }
    });

    grid.set(2 + 0, 7, 2, 5, Box, {
        label: 'UPP',
        content: char.upp.join("").toUpperCase(),
        style: { fg: 'white', }
    });
    grid.set(2 + 2, 0, 2, 3, Box, {
        label: 'Noble Title',
        content: char.upp.join("").toUpperCase(),
        style: { fg: 'white', }
    });
    grid.set(2 + 2, 3, 2, 3, Box, {
        label: 'Military Rank',
        content: char.upp.join("").toUpperCase(),
        style: { fg: 'white', }
    });
    grid.set(2 + 2, 6, 2, 6, Box, {
        label: 'Birthdate',
        content: (CURRENT_YEAR - AGE_OF_MAJORITY - char.age*4).toString(),
        style: { fg: 'white', }
    });
    grid.set(2 + 4, 0, 2, 6, Box, {
        label: 'Age',
        content: `${AGE_OF_MAJORITY + char.age*4} years`,
        style: { fg: 'white', }
    });
    grid.set(2 + 4, 6, 2, 6, Box, {
        label: 'Birthworld',
        content: char.birthworld,
        style: { fg: 'white', }
    });

    grid.set(2 + 6, 0, 3, 12, Box, {
        label: 'Skills',
        content: classicSkillAnnotation(char.skills),
        style: { fg: 'white', }
    });

    grid.set(2 + 9, 0, 2, 12, Markdown, {
        label: '',
        content: "SERVICE HISTORY",
        style: { fg: 'magenta', border: { fg: 'black' } }
    });
    
    // grid.set(0, 12, 2, 12, Markdown, {
    //     label: '',
    //     content: "LIFE PATH",
    //     style: { fg: 'magenta', border: { fg: 'black' } }
    // });
    const log = grid.set(2,12,22,12, Log, {
        label: "Lifepath"
    })
    char.log.forEach((entry:string) => log.log(entry));
}

function classicSkillAnnotation(skills: Skillset): string {
    return JSON.stringify(skills).replace(/\"/g, '')
        .replace(/:/g, '-').replace(/,/g, ' ')
        .replace(/[}{]/g, '');
}

