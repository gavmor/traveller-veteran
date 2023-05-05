import { take } from 'ramda';
import { shuffler } from "./lib/shuffler";

const SKILLS = ["Admin", "Animals", "Art", "Athletics", "Carouse", "Drive", "Electronics", "Science", "Flyer", "Seafarer", "Language", "Streetwise", "Mechanic", "Survival", "Medic", "Vacc Suit", "Profession"] as const;
type Skill = (typeof SKILLS)[number];
const shuffle = shuffler(Math.random);
type Skillset = Partial<Record<Skill, number>>;

interface Character {
    upp: string;
    skills: Skillset;
}
;
const assignAtZero = (acc: Skillset, skill: Skill): {} => Object.assign(acc, { [skill]: 0 });

export const generate = (): Character => ({
    upp: UPP().join(""),
    skills: take(3, SKILLS).reduce(assignAtZero, {})
});
const UPP = (): string[] => {
    return [char(), char(), char(), char(), char(), char()];
};
const char = (): string => (roll() + roll()).toString(16).toUpperCase();
const roll = (): number => Math.ceil(Math.random() * 6);
