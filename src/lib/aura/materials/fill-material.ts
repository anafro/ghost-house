import Material from "$lib/aura/rendering/material";
import type Actor from "$lib/aura/scenes/actor";
import type Vector2 from "$lib/aura/utils/vector-2";
import type Pixel from "$lib/aura/rendering/pixel";

export default class FillMaterial extends Material {
    private readonly pixel: Pixel;

    constructor(pixel: Pixel) {
        super();
        this.pixel = pixel;
    }

    renderAt(actor: Actor, coordinate: Vector2): Pixel {
        return this.pixel;
    }

}