import { Character } from './Character.js';

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
export const d6 = (): number => Math.ceil(Math.random() * 6);

export const roll = (mod: number): number => d6()+d6()+mod;

