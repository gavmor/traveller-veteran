import { take } from 'ramda';
import { shuffler } from "./shuffler";

const SKILLS = ["Admin", "Animals", "Art", "Athletics", "Carouse", "Drive", "Electronics", "Science", "Flyer", "Seafarer", "Language", "Streetwise", "Mechanic", "Survival", "Medic", "Vacc Suit", "Profession"] as const;
type Skill = (typeof SKILLS)[number];
const shuffle = shuffler(Math.random);
interface Character {
    upp: string;
    skills: Partial<Record<Skill, number>>;
}
;
export const generate = (): Character => ({
    upp: UPP().join(""),
    skills: take(3, shuffle(SKILLS)).reduce(
        (acc, skill) => Object.assign(acc, { [skill]: 0 }
        ), {})
});
const UPP = (): string[] => {
    return [char(), char(), char(), char(), char(), char()];
};
const char = (): string => (roll() + roll()).toString(16).toUpperCase();
const roll = (): number => Math.ceil(Math.random() * 6);
