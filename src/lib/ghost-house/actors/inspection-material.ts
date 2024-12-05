import Material from "$lib/aura/rendering/material";
import type Actor from "$lib/aura/scenes/actor";
import Vector2 from "$lib/aura/utils/vector-2";
import Pixel from "$lib/aura/rendering/pixel";
import SpriteMaterial from "$lib/aura/materials/sprite-material";
import Color from "$lib/aura/utils/color";
import inspection from "$lib/ghost-house/globals/inspection";

export default class InspectionMaterial extends Material {
    renderAt(actor: Actor, coordinate: Vector2): Pixel | undefined {
        const sprite = inspection.furniture?.inspectionSprite ?? '';
        const spriteMaterial = new SpriteMaterial(sprite, inspection.furniture?.color ?? Color.hex(0x8B93AF));
        const spriteRenderOffsetX = actor.region.centerX - Math.floor(spriteMaterial.size.width / 2);
        const spriteRenderOffsetY = actor.region.centerY - Math.floor(spriteMaterial.size.height / 2);
        const spriteRenderOffset = new Vector2(spriteRenderOffsetX, spriteRenderOffsetY);

        const spriteCoordinate = coordinate.minus(spriteRenderOffset);

        return spriteMaterial.renderAt(actor, spriteCoordinate);
    }
}