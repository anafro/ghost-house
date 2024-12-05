import Material from "$lib/aura/rendering/material";
import type Actor from "$lib/aura/scenes/actor";
import type Vector2 from "$lib/aura/utils/vector-2";
import Pixel from "$lib/aura/rendering/pixel";
import Vector3 from "$lib/aura/utils/vector-3";
import Time from "$lib/aura/time/time";
import {clamp, smoothStep, step} from "$lib/aura/math/clamp";
import {alphaSin} from "$lib/aura/math/trigonometry";

export default class FireRingMaterial extends Material {
    renderAt(actor: Actor, coordinate: Vector2): Pixel | undefined {
        let character = '#';
        let resolution = actor.region.getResolution();
        let uv = coordinate.times(2).minus(resolution).over(resolution.y);
        let uv0 = uv.copy();
        let outputColorVector = new Vector3(12, 7 + Time.sinAnimate(3.000, 0, 1), 6);

        uv.x += 0.012 * Math.sin(10 * uv.y + Time.getCurrentTimeSeconds() / 0.150);

        let d = uv.length;
        d *= 1.2 + 0.15 * (Math.abs(1 - Math.abs(clamp(0, 2 * Math.PI, Math.atan2(uv.x, uv.y) - Math.PI)) / Math.PI)) * Math.random();
        d -= 1.8;
        d = Math.abs(d);
        d *= Time.sinAnimate(2.000, 1, 2);
        d = 0.055 / d;

        outputColorVector.multiply(d);

        let g = 0.8
            + 0.300 * alphaSin(+1.1 * uv.x - 6.1 * uv.y - Time.getCurrentTimeSeconds() / 3.075)
            + 0.300 * alphaSin(-3.3 * uv.x - 2.3 * uv.y + Time.getCurrentTimeSeconds() / 0.175)
            + 0.040 * alphaSin(+3.3 * uv.x + 12.3 * uv.y + Time.getCurrentTimeSeconds() / 0.035);

        g = Math.pow(g, 2.4)
        outputColorVector.multiply(g);

        return new Pixel(character, outputColorVector.toAlphaColor());
    }
}