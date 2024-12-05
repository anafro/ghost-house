import Material from "$lib/aura/rendering/material";
import type Actor from "$lib/aura/scenes/actor";
import type Vector2 from "$lib/aura/utils/vector-2";
import Pixel from "$lib/aura/rendering/pixel";
import Color from "$lib/aura/utils/color";
import BlendMode from "$lib/aura/utils/blend-mode";

export default class MinecraftBar extends Material {
    private static readonly BORDER = new Color(0x94, 0x97, 0x93);
    private static readonly STICK = new Color(0x82, 0x66, 0x2D);
    private static readonly DIAMOND_HAND = new Color(0x4a, 0x7f, 0x7f);

    constructor() {
        super((a, b) => b.isWhite() ? a : BlendMode.normal(a, b));
    }

    renderAt(actor: Actor, coordinate: Vector2): Pixel {
        if (coordinate.x % 2 === 0 && coordinate.y === 0) {
            return new Pixel(this.getCharacter(), coordinate.x < actor.getRegion().width / 2 ? new Color(255, 0, 0) : new Color(120, 80, 0));
        }

        if (coordinate.y === 2 || coordinate.y === actor.getRegion().height - 2) {
            return new Pixel(this.getCharacter(), MinecraftBar.BORDER);
        }

        if (coordinate.y > 2 && coordinate.y < actor.getRegion().height - 2) {
            if (coordinate.x % 4 === 0) {
                return new Pixel(this.getCharacter(), MinecraftBar.BORDER);
            } else {
                return new Pixel(
                    this.getCharacter(),
                    coordinate.y === 3 && coordinate.x === 1 ||
                    coordinate.y === 4 && coordinate.x === 2
                        ? new Color(0, 255, 255) :
                    coordinate.y === 5 && coordinate.x === 3 ?
                        MinecraftBar.STICK :
                    coordinate.y === 4 && coordinate.x === 3 ||
                    coordinate.y === 5 && coordinate.x === 2 ?
                        MinecraftBar.DIAMOND_HAND :
                        Color.shadeOfGray(50)
                );
            }
        }

        return Pixel.BLANK;
    }

    private getCharacter() {
        return '█';
    }
}