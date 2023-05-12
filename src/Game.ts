import { is, test, expect } from '@benchristel/taste';
import { Character } from './Character.js';

export const INT = (char: Character) => parseInt(char.upp[3], 16);
export const EDU = (char: Character) => parseInt(char.upp[4], 16);
export const SOC = (char: Character) => parseInt(char.upp[5], 16);

export function DM(score: number): number { 
    if (score > 14) return 3;
    if (score > 11) return 2;
    if (score > 8) return 1;
    if (score > 5) return 0;
    if (score > 2) return -1;
    if (score > 0) return -2;
    return -3; 
}
export const d6 = (): number => Die.roll().next().value

export const roll = (mod: number): number => d66()+mod;
export type d66Result = 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type d66Table<T> = Record<d66Result, T>;
export const d66 = ():d66Result => d6()+d6() as d66Result;


const Die = {
    *roll(): Generator<number, number>{
        yield this.rolls.shift() || Math.ceil(Math.random() * 6)
        return 3
    },
    rolls: []
}


test("Dice", {
    "roll() pulls from rolls()"(){
        Die.rolls = [42]
        expect(Die.roll().next().value, is, 42)
    }
})