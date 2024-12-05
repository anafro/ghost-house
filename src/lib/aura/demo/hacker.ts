import Actor from "$lib/aura/scenes/actor";
import  Pixel from "$lib/aura/rendering/pixel";
import Time from "$lib/aura/time/time";
import Vector2 from "$lib/aura/utils/vector-2";
import Color from "$lib/aura/utils/color";
import PixelMatrix from "$lib/aura/rendering/pixel-matrix";

export default class Hacker extends Actor {
    private static readonly bitTrailLength = 8;
    private static readonly bitSpawnDelay = .050;
    private static readonly bitShiftDelay = .020;
    private timeUntilNextBitSpawn = Hacker.bitSpawnDelay;
    private timeUntilNextBitShift = Hacker.bitShiftDelay;
    private bits: Vector2[] = [];

    update() {
        this.timeUntilNextBitSpawn -= Time.getDeltaTime();

        if (this.timeUntilNextBitSpawn <= 0) {
            this.spawnBit();
            this.timeUntilNextBitSpawn = Hacker.bitSpawnDelay;
        }

        this.timeUntilNextBitShift -= Time.getDeltaTime();

        if (this.timeUntilNextBitShift <= 0) {
            this.shiftBits();
            this.timeUntilNextBitShift = Hacker.bitShiftDelay;
        }
    }

    private spawnBit(): void {
        this.bits.push(new Vector2(Math.random() * this.region.width, 0));
    }

    private shiftBits(): void {
        for (const bit of this.bits) {
            bit.moveDown();
        }

        this.bits = this.bits.filter(bit => this.region.bottom + Hacker.bitTrailLength > bit.y);
    }

    renderAt(x: number, y: number): Pixel {
        return Pixel.BLANK;
    }

    render(): PixelMatrix {
        const renderMatrix: PixelMatrix = PixelMatrix.createBlank(this.region.width, this.region.height);

        for (const bit of this.bits) {
            for (let y = bit.y; y >= bit.y - Hacker.bitTrailLength; y -= 1) {
                const alpha = 1 - (bit.y - y) / Hacker.bitTrailLength;
                const color = new Color(
                    0,
                    255 * alpha,
                    (85 + 150 * (Math.sin(Time.getCurrentTime() * Math.PI / 3000 + alpha) / 2 + 0.5)) * alpha
                );

                const character = Math.random() < 0.8 ? '0' : '1';

                renderMatrix.setPixelAt(bit.x, y, new Pixel(character, color));
            }
        }

        return renderMatrix;
    }
}