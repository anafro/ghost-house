import Size from "$lib/aura/utils/size";
import type Scene from "$lib/aura/scenes/scene";
import type PixelMatrix from "$lib/aura/rendering/pixel-matrix";
import Color from "$lib/aura/utils/color";

export default class CanvasRenderer {
    private static readonly WIDEST_CHARACTER = 'W';
    private readonly canvas: HTMLCanvasElement;
    private readonly fontName: string;
    private readonly fontSize: number;
    private readonly verticalGap: number;
    private readonly horizontalGap: number;

    public constructor(canvas: HTMLCanvasElement, fontName: string, fontSize: number, verticalGap: number, horizontalGap: number) {
        this.canvas = canvas;
        this.fontName = fontName;
        this.fontSize = fontSize;
        this.verticalGap = verticalGap;
        this.horizontalGap = horizontalGap;
    }

    public render(pixelMatrix: PixelMatrix): void {
        const context = this.getCanvasContext();
        context.fillStyle = Color.BLACK.toCssHexColor()
        context.fillRect(0, 0, this.canvas.width, this.canvas.height);

        const pixelSize = this.calculatePixelSize();

        for (let y = 0; y < pixelMatrix.height; y += 1) {
            for (let x = 0; x < pixelMatrix.width; x += 1) {
                const renderX = x * (pixelSize.width + this.horizontalGap);
                const renderY = (y + 1) * (pixelSize.height + this.verticalGap);
                const pixel = pixelMatrix.getPixelAt(x, y);

                if (pixel === undefined) {
                    continue;
                }

                context.fillStyle = pixel.color.toCssHexColor();
                context.font = `bold ${this.fontSize}px "${this.fontName}"`;
                context.fillText(pixel.character ?? ' ', renderX, renderY);
            }
        }
    }

    public updateCanvasSizeToFitScene(scene: Scene): void {
        const newSceneSize: Size = this.calculateCanvasSizeByScene(scene);

        this.canvas.width = newSceneSize.width;
        this.canvas.height = newSceneSize.height;
    }

    private calculateCanvasSizeByScene(scene: Scene): Size {
        const pixelSize: Size = this.calculatePixelSize();

        return new Size(
            scene.width * (pixelSize.width + this.horizontalGap),
            scene.height * (pixelSize.height + this.verticalGap),
        );
    }

    private calculatePixelSize(): Size {
        this.updateFont();

        const context = this.getCanvasContext();
        const metrics = context.measureText(CanvasRenderer.WIDEST_CHARACTER);

        return new Size(
            metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight,
            metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent
        );
    }

    private getCanvasContext(): CanvasRenderingContext2D {
        const context = this.canvas.getContext("2d");

        if (context === null) {
            throw new Error(`The context of the canvas is not present.`);
        }

        return context;
    }

    private updateFont(): void {
        const context = this.getCanvasContext();
        context.font = `100 ${this.fontSize}px "${this.fontName}"`;
    }
}