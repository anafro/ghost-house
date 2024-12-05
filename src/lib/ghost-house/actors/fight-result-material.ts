import Material from "$lib/aura/rendering/material";
import type Actor from "$lib/aura/scenes/actor";
import type Vector2 from "$lib/aura/utils/vector-2";
import Pixel from "$lib/aura/rendering/pixel";
import tooltip from "$lib/ghost-house/globals/tooltip";
import {charAtSafely} from "$lib/aura/utils/strings";
import Color from "$lib/aura/utils/color";

export default class FightResultMaterial extends Material {
    renderAt(actor: Actor, coordinate: Vector2): Pixel | undefined {
        const color = Color.hex(0x9cdb43);
        const text = 'Ghost is defeated.';

        if (coordinate.y !== Math.round(actor.region.height / 2)) {
            return;
        }

        const charIndex = coordinate.x - Math.round(actor.region.width / 2) + Math.round(text.length / 2);
        const character = charAtSafely(text, charIndex);

        return new Pixel(character, color);
    }
}