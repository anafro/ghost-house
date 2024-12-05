import Region from "$lib/aura/utils/region";
import Vector3 from "$lib/aura/utils/vector-3";

export default class Vector2 {
    public x: number;
    public y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public toRegion(): Region {
        return new Region(this.x, this.y, this.x + 1, this.y + 1);
    }

    public plus(that: Vector2): Vector2 {
        return new Vector2(this.x + that.x, this.y + that.y);
    }

    public add(number: number): Vector2 {
        return new Vector2(this.x + number, this.y + number);
    }

    public minus(that: Vector2): Vector2 {
        return new Vector2(this.x - that.x, this.y - that.y);
    }

    public subtract(number: number): Vector2 {
        return new Vector2(this.x - number, this.y - number);
    }

    public times(n: number): Vector2 {
        return new Vector2(n * this.x, n * this.y);
    }

    public over(n: number): Vector2 {
        return new Vector2(this.x / n, this.y / n);
    }

    public cos(): Vector2 {
        return new Vector2(Math.cos(this.x), Math.cos(this.y));
    }

    public distanceTo(that: Vector2): number {
        return Math.sqrt(Math.pow(this.x - that.x, 2) + Math.pow(this.y - that.y, 2));
    }

    public dot(that: Vector2): number {
        return this.x * that.x + this.y * that.y;
    }

    public moveUp(offset: number = 1) {
        this.y -= offset;
    }

    public moveDown(offset: number = 1) {
        this.y += offset;
    }

    public moveLeft(offset: number = 1) {
        this.x -= offset;
    }

    public moveRight(offset: number = 1) {
        this.x += offset;
    }

    public get length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    public copy(): Vector2 {
        return new Vector2(this.x, this.y);
    }

    public mod(factor: number = 1): Vector2 {
        return new Vector2(this.x % factor, this.y % factor);
    }

    public toVector3(): Vector3 {
        return new Vector3(this.x, this.y, 0);
    }

    public is(x: number, y: number) {
        return this.x === x && this.y === y;
    }
}