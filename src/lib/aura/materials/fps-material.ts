import TextMaterial from "$lib/aura/materials/text-material";
import Color from "$lib/aura/utils/color";
import type Actor from "$lib/aura/scenes/actor";
import type Vector2 from "$lib/aura/utils/vector-2";
import type Pixel from "$lib/aura/rendering/pixel";
import Time from "$lib/aura/time/time";
import {translate} from "$lib/aura/math/translate";

export default class FpsMaterial extends TextMaterial {
    constructor() {
        super("Initializing...", Color.MAGENTA);
    }

    renderAt(actor: Actor, coordinate: Vector2): Pixel | undefined {
        if (Time.isNthFrame(2)) {
            const fps = Time.getFps();

            this.text = `${fps} fps`;
            this.color = Color.pickFromLinearGradient(new Color(0xFF, 0x00, 0x00), new Color(0x00, 0xFF, 0x00), translate(fps, 10, 30, 0, 1));
        }

        return super.renderAt(actor, coordinate);
    }
}