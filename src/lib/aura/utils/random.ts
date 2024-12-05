export function pickProperty<T>(object: Record<string, any>): T {
    const keys = Object.keys(object);
    return object[keys[keys.length * Math.random() << 0]] as T;
}

export function randomInt(min: number, max: number): number {
    return Math.floor(min + Math.random() * (max - min));
}

export function pick<T>(array: T[]) {
    if (array.length === 0) {
        throw new Error(`Can't pick from an empty array`);
    }

    return array[randomInt(0, array.length)];
}

export class Range {
    readonly min: number;
    readonly max: number;

    constructor(min: number, max: number) {
        this.min = min;
        this.max = max;
    }

    public pick(): number {
        return randomInt(this.min, this.max);
    }
}