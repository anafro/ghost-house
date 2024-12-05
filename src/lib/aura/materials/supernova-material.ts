import Material from "$lib/aura/rendering/material";
import type Actor from "$lib/aura/scenes/actor";
import type Vector2 from "$lib/aura/utils/vector-2";
import Pixel from "$lib/aura/rendering/pixel";
import Vector3 from "$lib/aura/utils/vector-3";
import {alphaSin} from "$lib/aura/math/trigonometry";
import Time from "$lib/aura/time/time";
import {pick} from "$lib/aura/utils/random";
import {getElementAtAlphaIndex} from "$lib/aura/utils/arrays";
import {smoothStep} from "$lib/aura/math/clamp";

export default class SupernovaMaterial extends Material {
    renderAt(actor: Actor, coordinate: Vector2): Pixel | undefined {
        let resolution = actor.region.getResolution();
        let uv = coordinate.times(2).minus(resolution).over(resolution.y);
        let uv0 = uv.copy();
        let outputColorVector = new Vector3(0, 0, 0);

        for (let i = 1; i <= 3; i++) {
            let d = uv.length + alphaSin(100 * Math.atan2(uv.y, uv.x));
            let colorVector = new Vector3(2, i, 3);

            d *= alphaSin((-8 * d) + i + Time.getCurrentTimeSeconds() / 0.300) / 16 / i;
            d = 0.015 / d;
            d = Math.pow(d, 0.8);
            d /= Math.pow(i, i * i);
            colorVector.multiply(d);
            outputColorVector.add(colorVector);
        }

        outputColorVector.x -= smoothStep(0, 2, uv.length);
        let color = outputColorVector.toAlphaColor();
        let character = getElementAtAlphaIndex(`$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\\|()1{}[]?-_+~<>i!lI;:,"^\`'.`.split(''), 1 - color.luminance);

        return new Pixel(character, outputColorVector.toAlphaColor());
    }
}