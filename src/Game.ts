import { is, test, expect, not } from '@benchristel/taste';
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

const EndOfRollsError = new Error("Predestined Rolls Exceeded!");

export const Die = {
  *roll(): Generator<number, number> {
    if (this.test) {
      if(this.rolls.length===0) { throw EndOfRollsError }
      yield this.rolls.shift();
    } else {
      yield Math.ceil(Math.random() * 6);
    }
    return 3;
  },
  rolls: [],
  test: false,
};


test("Dice", {
    "when test is true, and rolls is empty, throws an error"(){
        let error;
        try {
            Die.roll().next().value
        } catch (e) {
            error = e
        }
        expect(error.message, is, "Predestined Rolls Exceeded!")
    },
    "when test is true, roll() pulls from #rolls"(){
        Die.test = true
        Die.rolls = [42]
        expect(Die.roll().next().value, is, 42)
    },
    "when test is false, roll() is still defined"(){
        Die.test=false
        expect(Die.roll().next().value, not(is), undefined)
        Die.test=true
    },
    "when test is false, roll() returns novel results"(){
        Die.test=false
        expect(
            [Die.roll().next().value, Die.roll().next().value],
            not(is),
            [Die.roll().next().value, Die.roll().next().value]
        )
        Die.test=true
    }
})