import { default as blessed } from "blessed";
const { box: Box } = blessed;
import { markdown as Markdown, log as Log } from "blessed-contrib";
import { age, birthdate, Character } from "./Character.js";
import { grid } from "../display.js";
import { classicSkillAnnotation } from "./classicSkillAnnotation.js";
import { CURRENT_YEAR, AGE_OF_MAJORITY } from "./Setting.js";

export function setCharacterSheet(char: Character) {
  grid.set(0, 0, 2, 12, Markdown, {
    label: "",
    content: "PERSONAL DATA",
    style: { fg: "magenta", border: { fg: "black" } },
  });

  grid.set(2 + 0, 7, 2, 5, Box, {
    label: "UPP",
    content: char.upp.join("").toUpperCase(),
    style: { fg: "white" },
  });
  grid.set(2 + 2, 0, 2, 3, Box, {
    label: "Noble Title",
    content: "Unimplemented",
    style: { fg: "white" },
  });
  grid.set(2 + 2, 3, 2, 3, Box, {
    label: "Military Rank",
    content: "Unimplemented",
    style: { fg: "white" },
  });
  grid.set(2 + 4, 6, 2, 6, Box, {
    label: "Birthworld",
    content: char.birthworld,
    style: { fg: "white" },
  });

  grid.set(2 + 9, 0, 2, 12, Markdown, {
    label: "",
    content: "SERVICE HISTORY",
    style: { fg: "magenta", border: { fg: "black" } },
  });

  return {
    name: grid.set(2 + 0, 0, 2, 7, Box, {
      label: "Name",
      content: char.name,
      style: { fg: "white" },
    }),
    log: grid.set(2, 12, 22, 12, Log, {
      label: "Lifepath",
    }),
    skills: grid.set(2 + 6, 0, 3, 12, Box, {
      label: "Skills",
      content: classicSkillAnnotation(char.skills),
      style: { fg: "white" },
    }),
    age: grid.set(2 + 4, 0, 2, 6, Box, {
      label: "Age",
      content: `${age(char)} years`,
      style: { fg: "white" },
    }),
    birthdate: grid.set(2 + 2, 6, 2, 6, Box, {
        label: "Birthdate",
        content: birthdate(char),
        style: { fg: "white" },
      })
  };
}

