import Actor from "$lib/aura/scenes/actor";
import SpriteMaterial from "$lib/aura/materials/sprite-material";
import frameSprite from "$lib/ghost-house/sprites/action-sprite";
import Color from "$lib/aura/utils/color";
import type Scene from "$lib/aura/scenes/scene";

export default class ActionFrameActor extends Actor {
    constructor(scene: Scene) {
        super(scene, scene.region, new SpriteMaterial(frameSprite, Color.hex(0xB3B9D1)));
    }
}