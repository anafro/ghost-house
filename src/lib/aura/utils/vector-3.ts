import Color from "$lib/aura/utils/color";

export default class Vector3 {
    public x: number;
    public y: number;
    public z: number;

    constructor(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    public multiply(factor: number): void {
        this.x *= factor;
        this.y *= factor;
        this.z *= factor;
    }

    public add({x, y, z}: Vector3): void {
        this.x += x;
        this.y += y;
        this.z += z;
    }

    public times({x, y, z}: Vector3): Vector3 {
        return new Vector3(this.x * x, this.y * y, this.z * z);
    }

    public toAlphaColor(): Color {
        return Color.alpha(this.x, this.y, this.z);
    }

    public apply(f: (a: number) => number): Vector3 {
        return new Vector3(f(this.x), f(this.y), f(this.z));
    }
}