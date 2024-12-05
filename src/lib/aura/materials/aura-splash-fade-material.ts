import Material from "$lib/aura/rendering/material";
import Pixel from "../rendering/pixel";
import type Actor from "../scenes/actor";
import type Vector2 from "../utils/vector-2";
import type AuraFade from "$lib/aura/scenes/aura-splash/actors/aura-fade";
import Color from "$lib/aura/utils/color";
import BlendMode from "$lib/aura/utils/blend-mode";

export default class AuraSplashFadeMaterial extends Material {
    constructor() {
        super(BlendMode.multiply);
    }

    public renderAt(actor: Actor, coordinate: Vector2): Pixel | undefined {
        const auraFade = actor as AuraFade;
        const alpha = auraFade.fadeAlpha;
        const color = Color.shadeOfGray((1 - alpha) * 0xFF);

        return auraFade.fadeAlpha === 0 ? undefined : new Pixel(undefined, color);
    }
}