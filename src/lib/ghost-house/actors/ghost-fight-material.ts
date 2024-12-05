import SpriteMaterial from "$lib/aura/materials/sprite-material";
import {pick} from "$lib/aura/utils/random";
import ghostFightSprites from "$lib/ghost-house/sprites/ghost-fight-sprites";
import Color from "$lib/aura/utils/color";
import type Actor from "$lib/aura/scenes/actor";
import type Vector2 from "$lib/aura/utils/vector-2";
import Pixel from "$lib/aura/rendering/pixel";
import ThirdMaterial from "$lib/aura/materials/third-material";
import type FightScene from "$lib/ghost-house/scenes/fight-scene";

export default class GhostFightMaterial extends SpriteMaterial {
    constructor() {
        super(pick(ghostFightSprites), Color.hex(0xdae0ea));
    }

    renderAt(actor: Actor, coordinate: Vector2): Pixel | undefined {
        const fight = actor.scene as FightScene;
        const renderedPixel = super.renderAt(actor, coordinate);
        const character = renderedPixel?.character ?? ' ';
        const color = new ThirdMaterial().renderAt(actor, coordinate)?.color ?? Color.BLACK;

        color.multiply(fight.ghostAlphaHealth);

        if (character === ' ') {
            return undefined;
        }

        return new Pixel(character, color);
    }
}