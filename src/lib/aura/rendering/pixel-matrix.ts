import Pixel from "$lib/aura/rendering/pixel";
import {createMatrix, isIndexInArrayBounds, setMatrixElementSafely} from "$lib/aura/utils/arrays";
import type {BlendMode} from "$lib/aura/utils/blend-mode";
import Color from "$lib/aura/utils/color";
import Time from "$lib/aura/time/time";

export default class PixelMatrix {
    private pixelMatrix: Pixel[][];

    public constructor(pixelMatrix: Pixel[][]) {
        this.pixelMatrix = pixelMatrix;
    }

    public getColorAt(x: number, y: number): Color {
        const pixel = this.getPixelAt(x, y);

        if (pixel === undefined) {
            throw new Error(`The pixel at ${x}, ${y} is blank, so I can't get its color.`);
        }

        return pixel.color;
    }

    public getPixelAt(x: number, y: number): Pixel | undefined {
        if (!isIndexInArrayBounds(this.pixelMatrix, y)) {
            return Pixel.BLANK;
        }

        return this.pixelMatrix[y][x];
    }

    public setPixelAt(x: number, y: number, pixel: Pixel | undefined, blendMode: BlendMode): void {
        if (pixel === undefined) {
            return;
        }

        const currentPixel = this.getPixelAt(x, y);
        if (currentPixel === undefined) {
            return setMatrixElementSafely(this.pixelMatrix, pixel, y, x);
        }

        const beneathColor = this.getColorAt(x, y);
        const blendColor = pixel.color;

        setMatrixElementSafely(this.pixelMatrix, new Pixel(pixel.character ?? currentPixel.character ?? ' ', blendMode(beneathColor, blendColor)), y, x);
    }

    public toPixels(): Pixel[][] {
        return this.pixelMatrix;
    }

    public get width(): number {
        return this.height === 0 ? 0 : this.pixelMatrix[0].length;
    }

    public get height(): number {
        return this.pixelMatrix.length;
    }

    public static createBlank(width: number, height: number): PixelMatrix {
        return new PixelMatrix(createMatrix<Pixel>(height, width));
    }
}