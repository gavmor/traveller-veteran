import { Skillset } from "./src/Character.js";

export function classicSkillAnnotation(skills: Skillset): string {
    return JSON.stringify(skills).replace(/\"/g, '')
        .replace(/:/g, '-').replace(/,/g, ' ')
        .replace(/[}{]/g, '');
}
