import {alphaClamp, clamp} from "$lib/aura/math/clamp";

export default class Color {
    public static readonly MAGENTA = new Color(255, 0, 255);
    public static readonly CYAN = new Color(0, 255, 255);
    public static readonly GRAY = new Color(60, 60, 60);
    public static readonly BLACK = Color.hex(0x000000);
    public static readonly RED = Color.hex(0xFF0000);
    public static readonly GREEN = Color.hex(0x00FF00);
    public static readonly BLUE = Color.hex(0x0000FF);

    public r: number;
    public g: number;
    public b: number;

    constructor(r: number, g: number, b: number) {
        this.r = Color.clampColorComponent(r);
        this.g = Color.clampColorComponent(g);
        this.b = Color.clampColorComponent(b);
    }

    public static shadeOfGray(shade: number) {
        return new Color(shade, shade, shade);
    }

    public static alpha(r: number, g: number, b: number) {
        return new Color(255 * r, 255 * g, 255 * b);
    }

    public static hex(hex: number) {
        return new Color((hex & 0xFF0000) >> 16, (hex & 0x00FF00) >> 8, hex & 0x0000FF);
    }

    public get alphaR(): number {
        return this.r / 255;
    }

    public get alphaG(): number {
        return this.g / 255;
    }

    public get alphaB(): number {
        return this.b / 255;
    }

    public get luminance(): number {
        return 0.299 * this.alphaR + 0.587 * this.alphaG + 0.114 * this.alphaB;
    }

    public multiply(factor: number): void {
        this.r = Color.clampColorComponent(this.r * factor);
        this.g = Color.clampColorComponent(this.g * factor);
        this.b = Color.clampColorComponent(this.b * factor);
    }

    public times(factor: number): Color {
        const color = this.copy();
        color.multiply(factor);

        return color;
    }

    public add(color: Color): void {
        this.r = Color.clampColorComponent(this.r + color.r);
        this.g = Color.clampColorComponent(this.g + color.g);
        this.b = Color.clampColorComponent(this.b + color.b);
    }

    public mixWith(that: Color): Color {
        return new Color((this.r + that.r) / 2, (this.g + that.g) / 2, (this.b + that.b) / 2)
    }

    public toCssHexColor(): string {
        return `#` +
            Color.toCssHexColorComponent(this.r) +
            Color.toCssHexColorComponent(this.g) +
            Color.toCssHexColorComponent(this.b);
    }

    public isWhite(): boolean {
        return this.r === 255 && this.g === 255 && this.b === 255;
    }

    public copy(): Color {
        return new Color(this.r, this.g, this.b);
    }

    public static pickFromLinearGradient(thisColor: Color, thatColor: Color, alpha: number) {
        alpha = alphaClamp(alpha);

        return new Color(
            thisColor.r * (1 - alpha) + thatColor.r * alpha,
            thisColor.g * (1 - alpha) + thatColor.g * alpha,
            thisColor.b * (1 - alpha) + thatColor.b * alpha,
        );
    }

    private static clampColorComponent(colorComponent: number): number {
        return clamp(Math.floor(colorComponent), 0, 255);
    }

    private static toCssHexColorComponent(colorComponent: number): string {
        return colorComponent.toString(16).padStart(2, '0');
    }
}