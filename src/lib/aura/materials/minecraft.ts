import Material from "$lib/aura/rendering/material";
import type Actor from "$lib/aura/scenes/actor";
import Vector2 from "$lib/aura/utils/vector-2";
import Pixel from "$lib/aura/rendering/pixel";
import Time from "$lib/aura/time/time";
import {radians} from "$lib/aura/math/angles";
import Matrix2x2 from "$lib/aura/math/matrix";
import Color from "$lib/aura/utils/color";

export default class Minecraft extends Material {
    private static readonly SKY = new Color(0x71, 0xad, 0xf7);
    private static readonly NIGHT = new Color(0x00, 0x00, 0x08);
    private static readonly GRASS = new Color(0x50, 0x56, 0x37);
    private static readonly DIRT = new Color(0xce, 0xbe, 0x91);
    private readonly character = '█';

    renderAt(actor: Actor, coordinate: Vector2): Pixel {
        const {x} = coordinate;
        const y = actor.getRegion().height - coordinate.y + 1;
        const skyAlpha = Time.sinAnimate(20.000, 0, 1);
        let skyColor = Color.pickFromLinearGradient(Minecraft.SKY, Minecraft.NIGHT, skyAlpha)

        if (coordinate.x === 0 && coordinate.y === 0) {
            return new Pixel(this.character, skyColor);
        }

        const region = actor.getRegion();
        const resolution = region.getResolution();
        const originalUv = new Vector2(x, y).over(resolution.x);
        const [depth, uv] = this.getWorldSpacePosition(originalUv, 0);

        return new Pixel(this.character, this.getColor(uv, depth));
    }

    private getColor(uv: Vector2, depth: number): Color {
        const rotationAngle = radians(Time.getCurrentTimeSeconds() * 45 / 2);
        const colorVector = this.getRotation2d(rotationAngle).times(uv).times(2 * Math.PI).cos().times(0.5).add(0.5);
        const colorAlpha = Math.floor(colorVector.x + colorVector.y);
        let skyAlpha = Time.sinAnimate(20.000, 0, 1);
        let skyColor = Color.pickFromLinearGradient(Minecraft.SKY, Minecraft.NIGHT, skyAlpha);
        let color = Color.pickFromLinearGradient(Minecraft.DIRT, Minecraft.GRASS, colorAlpha);
        color.multiply(1 + 0.2 * Math.random());

        color = Color.pickFromLinearGradient(color, skyColor, (1 - Math.sqrt(1 - depth - 0.05) * 2));

        return color;
    }

    private getWorldSpacePosition(uv: Vector2, depth: number): [number, Vector2] {
        const height = 1;
        uv = uv.copy();

        uv.y += 0.5;
        depth = uv.y * height - height + 1 + 0.1;

        uv = uv.times(2).subtract(1).over(1 - depth);

        return [depth, uv];
    }

    private getRotation2d(angle: number): Matrix2x2 {
        return new Matrix2x2(
            Math.cos(angle), Math.sin(angle),
            Math.sin(angle), -Math.cos(angle),
        );
    }
}