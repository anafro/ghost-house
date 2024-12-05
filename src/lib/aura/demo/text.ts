import Actor from "$lib/aura/scenes/actor";
import Pixel from "$lib/aura/rendering/pixel";
import Scene from "$lib/aura/scenes/scene";
import Region from "$lib/aura/utils/region";
import Vector2 from "$lib/aura/utils/vector-2";
import Color from "$lib/aura/utils/color";

export default class Text extends Actor {
    private string: string;

    constructor(scene: Scene, region: Region | Vector2, string: string) {
        super(scene, region);
        this.string = string;
    }

    renderAt(x: number, y: number): Pixel {
        return x >= this.string.length ? Pixel.BLANK : new Pixel(this.string.charAt(x), new Color(255, 175 * Math.random(), 0));
    }
}