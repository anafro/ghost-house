import Material from "$lib/aura/rendering/material";
import type Actor from "$lib/aura/scenes/actor";
import Vector2 from "$lib/aura/utils/vector-2";
import Pixel from "$lib/aura/rendering/pixel";
import Color from "$lib/aura/utils/color";
import Vector3 from "$lib/aura/utils/vector-3";
import Time from "$lib/aura/time/time";
import {clamp, step} from "$lib/aura/math/clamp";
import {alphaSin} from "$lib/aura/math/trigonometry";

export default class ThirdMaterial extends Material {
    renderAt(actor: Actor, coordinate: Vector2): Pixel | undefined {
        let character = '#';
        let resolution = actor.region.getResolution();
        let uv = coordinate.times(2).minus(resolution).over(resolution.y);
        let uv0 = uv.copy();

        uv.x += Math.sin(
            uv.y
            * Time.sinAnimate(5.000, 3.000, 5.000)
            + Time.getCurrentTimeSeconds()
        );

        uv.y += Math.sin(
            uv.x
            * Time.sinAnimate(15.000, 1.000, 3.000)
            + Time.getCurrentTimeSeconds()
        );

        let v1 = new Vector3(
            20,
            9,
            1,
        );
        let v2 = new Vector3(
            1,
            1,
            1,
        );
        let v3 = new Vector3(
            40,
            10,
            6,
        );

        v1.multiply(
            Math.sin(
                Time.getCurrentTimeSeconds() +
                -uv.x * 4.000 +
                +uv.y * 4.000
            )
        );

        v2.multiply(
            Math.sin(
                Time.getCurrentTimeSeconds() +
                +uv.x * 4.000 +
                +uv.y * 4.000
            )
        );

        v3.multiply(
            Math.sin(
                -Time.getCurrentTimeSeconds() +
                +uv.x * 1.500 +
                +uv.y * 1.500
            )
        );

        let v = v1.times(v2).times(v3);
        const l = Math.exp(Time.sinAnimate(10, 0, 1));

        v = v.apply(a => Math.abs(l / a));
        v = v.apply(a => Math.pow(a, 0.3));

        return new Pixel(character, v.toAlphaColor());
    }
}