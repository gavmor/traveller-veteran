import { take } from "ramda";
import { shuffle } from "./shuffler.js";

export const sample = <T>(items: T[], n: number = 1) => take<T>(n, shuffle(items));
