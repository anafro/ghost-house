import Vector2 from "$lib/aura/utils/vector-2";

export default class Matrix2x2 {
    private readonly element00: number;
    private readonly element01: number;
    private readonly element10: number;
    private readonly element11: number;

    public constructor(element00: number, element01: number, element10: number, element11: number) {
        this.element00 = element00;
        this.element01 = element01;
        this.element10 = element10;
        this.element11 = element11;
    }

    public times(that: Vector2): Vector2 {
        return new Vector2(
            this.element00 * that.x + this.element01 * that.y,
            this.element10 * that.x + this.element11 * that.y,
        );
    }

    public static createRotationMatrix(angle: number) {
        return new Matrix2x2(
            Math.cos(angle), Math.sin(angle),
            Math.sin(angle), -Math.cos(angle),
        );
    }
}