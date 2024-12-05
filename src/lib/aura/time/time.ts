import {alphaSin} from "$lib/aura/math/trigonometry";

export default class Time {
    private static deltaTime: number = 0;
    private static previousTime: number = Date.now();
    private static currentTime: number = Date.now();
    private static frame: number = 0;

    public static setCurrentTime(currentTime: number): void {
        this.previousTime = this.currentTime;
        this.currentTime = currentTime;
        this.deltaTime = (this.currentTime - this.previousTime) / 1000;
        this.frame += 1;
    }

    public static getDeltaTime(): number {
        return this.deltaTime;
    }

    public static getCurrentTime(): number {
        return this.currentTime;
    }

    public static getCurrentTimeSeconds(): number {
        return this.currentTime / 1000;
    }

    public static getFps(): number {
        return Math.trunc(1 / this.deltaTime);
    }

    public static isNthFrame(n: number): boolean {
        return this.frame % n === 0;
    }

    public static animate(f: (argument: number) => number, periodTime: number, lowerBound: number = 0, upperBound: number = 1, timeShift: number = 0): number {
        return f((this.currentTime + timeShift * 1000) / (periodTime * 1000)) * (upperBound - lowerBound) + lowerBound;
    }

    public static sinAnimate(periodTime: number, lowerBound: number = 0, upperBound: number = 1, timeShift: number = 0) {
        return this.animate(alphaSin, periodTime / (2 * Math.PI), lowerBound, upperBound, timeShift);
    }
}