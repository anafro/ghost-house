import Material from "$lib/aura/rendering/material";
import type Actor from "$lib/aura/scenes/actor";
import Pixel from "$lib/aura/rendering/pixel";
import Vector2 from "$lib/aura/utils/vector-2";
import Color from "$lib/aura/utils/color";
import {smoothStep} from "$lib/aura/math/clamp";
import Time from "$lib/aura/time/time";
import BlendModes from "$lib/aura/utils/blend-mode";
import {pickProperty} from "$lib/aura/utils/random";

export default class SimpleSphereMaterial extends Material {
    private readonly timeShift: number = Math.random() * 400.000;

    constructor() {
        super(pickProperty(BlendModes));
    }

    renderAt(actor: Actor, coordinate: Vector2): Pixel {
        const region = actor.getRegion();
        const resolution = region.getResolution();
        const uv = coordinate.times(2).minus(resolution).over(resolution.y).times(Time.sinAnimate(30.000, 0.7, 1.2, this.timeShift));

        const light1 = new Vector2(
            Time.sinAnimate(2.000, -0.2, 0.1, this.timeShift),
            Time.sinAnimate(20.000, -0.2, 0.1, this.timeShift)
        );

        const light2 = new Vector2(
            Time.sinAnimate(2.000, 0.15, 0.4, this.timeShift),
            Time.sinAnimate(30.000, 0.2, 0.5, this.timeShift)
        );

        const color1 = new Color(255 * Time.sinAnimate(6.000, .4, .8, this.timeShift), 255 * .6, 255 * .7);
        const color2 = new Color(255 * .9, 255 * Time.sinAnimate(6.000, .0, .8, this.timeShift), 255 * .6);

        color1.multiply(Time.sinAnimate(2.000, 0.8, 0.9, this.timeShift) - uv.distanceTo(light1));
        color2.multiply(.6 - uv.distanceTo(light2));

        const pixelColor = color1.mixWith(color2);
        const d = uv.length;
        const t = 1 - smoothStep(.6, .61, d);

        pixelColor.multiply(t + 0.2 * uv.y);
        pixelColor.multiply(3);

        return new Pixel('@', pixelColor);
    }
}