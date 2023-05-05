import { curry } from 'ramda'

function protoShuffler<Member>(random: () => number, list: Member[]) {
    let idx = -1;
    const len = list.length;
    let position: number;
    let result: Member[] = [];
    while (++idx < len) {
        position = Math.floor((idx + 1) * random());
        result[idx] = result[position];
        result[position] = list[idx];
    }
    return result;
};

export const shuffler = curry(protoShuffler);

const shuffle = shuffler(Math.random);

