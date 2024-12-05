import Material from "$lib/aura/rendering/material";
import type Actor from "$lib/aura/scenes/actor";
import type Vector2 from "$lib/aura/utils/vector-2";
import Pixel from "$lib/aura/rendering/pixel";
import Color from "$lib/aura/utils/color";
import {charAtSafely} from "$lib/aura/utils/strings";

export default class DeathMaterial extends Material {
    renderAt(actor: Actor, coordinate: Vector2): Pixel | undefined {
        const color = Color.hex(0xe86a73);
        const text = 'You were killed by a ghost. Reload the page to play again';

        if (coordinate.y !== Math.round(actor.region.height / 2)) {
            return;
        }

        const charIndex = coordinate.x - Math.round(actor.region.width / 2) + Math.round(text.length / 2);
        const character = charAtSafely(text, charIndex);

        return new Pixel(character, color);
    }
}