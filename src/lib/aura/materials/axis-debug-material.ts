import Material from "$lib/aura/rendering/material";
import type Actor from "$lib/aura/scenes/actor";
import Pixel from "$lib/aura/rendering/pixel";
import Color from "$lib/aura/utils/color";
import Time from "$lib/aura/time/time";
import type Vector2 from "$lib/aura/utils/vector-2";

export default class AxisDebugMaterial extends Material {
    renderAt(actor: Actor, coordinates: Vector2): Pixel {
        const {x, y} = coordinates;
        const axis = Math.floor(Time.getCurrentTime() / 3000) % 2 == 0 ? 'X' : 'Y';

        if (x == 0 && y == 0) {
            return new Pixel(axis, new Color(255, 0, 0));
        }

        const axisDigit = (axis === 'X' ? x : y) % 10;

        return new Pixel(String(axisDigit), (x % 10 == 0 && y % 10 == 0) ? Color.MAGENTA : (x % 10 == 0 || y % 10 == 0 ? Color.CYAN : Color.GRAY));
    }
}