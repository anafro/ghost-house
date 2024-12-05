import Actor from "$lib/aura/scenes/actor";
import type Scene from "$lib/aura/scenes/scene";
import Vector2 from "$lib/aura/utils/vector-2";
import SpriteMaterial from "$lib/aura/materials/sprite-material";
import Color from "$lib/aura/utils/color";
import type Region from "$lib/aura/utils/region";
import Time from "$lib/aura/time/time";
import exorcistFightSprite from "$lib/ghost-house/sprites/exorcist-fight-sprite";

export default class GhostFightActor extends Actor {
    private originalRegion: Region;

    constructor(scene: Scene) {
        super(scene, new Vector2(10, 10), new SpriteMaterial(exorcistFightSprite, Color.hex(0xdae0ea)));
        this.originalRegion = this.region.copy();
    }

    update() {
        this.region = this.originalRegion.moved(0, Math.round(Time.sinAnimate(2.750, 0, 1, 1.500)));
        super.update();
    }
}