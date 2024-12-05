import Material from "$lib/aura/rendering/material";
import Pixel from "../rendering/pixel";
import type Actor from "../scenes/actor";
import type Vector2 from "../utils/vector-2";
import type Color from "$lib/aura/utils/color";

export default class TextMaterial extends Material {
    protected text: string;
    protected color: Color;

    constructor(text: string, color: Color) {
        super();
        this.text = text;
        this.color = color;
    }

    public renderAt(actor: Actor, coordinate: Vector2): Pixel | undefined {
        if (coordinate.y === 0 && coordinate.x < this.text.length) {
            return new Pixel(this.text.charAt(coordinate.x), this.color);
        }

        return undefined;
    }
}