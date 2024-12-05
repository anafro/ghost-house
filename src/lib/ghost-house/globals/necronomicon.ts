import {maxProperty} from "$lib/aura/utils/arrays";
import {translate} from "$lib/aura/math/translate";
import mansion from "$lib/ghost-house/globals/mansion";
import {clamp} from "$lib/aura/math/clamp";

class Necronomicon {
    private readonly words: string[] = [
        "vox", "vis", "cor", "pax", "par", "nox", "mos", "lex", "ira", "abi", "fur", "ius", "lux", "res", "tus",
        "vita", "onus", "mors", "mora", "fuga", "deus", "spes", "ordo", "nemo", "homo", "sors", "tege", "vale", "exul", "prex",
        "poena", "omnis", "salus", "odium", "fraus", "dolor", "solus", "quies", "miser", "metus",
        "servus", "hostis", "gestus", "crimen", "maeror", "bestia", "fletus",
        "oportet", "lacrima", "iniuria", "malitia", "religio",
    ];

    public getWordsOfLength(length: number): string[] {
        const wordsOfLength = this.words.filter(word => word.length === length);

        if (wordsOfLength.length === 0) {
            throw new Error(`There are no ${length}-letters words in necronomicon.`);
        }

        return wordsOfLength;
    }

    public get maxWordLength(): number {
        return maxProperty(this.words, word => word.length, (a, b) => a - b);
    }

    public get minWordLength(): number {
        return maxProperty(this.words, word => word.length, (a, b) => b - a);
    }

    public pickWordsForFight(): string[] {
        const wordLength = clamp(Math.round(translate(mansion.currentFloor, 1, mansion.floors, this.minWordLength, this.maxWordLength)), this.minWordLength, this.maxWordLength);
        const words = this.getWordsOfLength(wordLength);

        return words.toSorted(() => .5 - Math.random()).slice(0, 4);
    }
}

export default new Necronomicon();