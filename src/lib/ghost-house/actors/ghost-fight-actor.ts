import Actor from "$lib/aura/scenes/actor";
import type Scene from "$lib/aura/scenes/scene";
import Vector2 from "$lib/aura/utils/vector-2";
import SpriteMaterial from "$lib/aura/materials/sprite-material";
import Color from "$lib/aura/utils/color";
import type Region from "$lib/aura/utils/region";
import Time from "$lib/aura/time/time";
import ghostFightSprites from "$lib/ghost-house/sprites/ghost-fight-sprites";
import {pick} from "$lib/aura/utils/random";
import GhostFightMaterial from "$lib/ghost-house/actors/ghost-fight-material";
import type FightScene from "$lib/ghost-house/scenes/fight-scene";

export default class GhostFightActor extends Actor {
    private originalRegion: Region;

    constructor(scene: Scene) {
        super(scene, new Vector2(scene.region.centerX + 23, 20), new GhostFightMaterial());
        this.originalRegion = this.region.copy();
    }

    update() {
        const fight = this.scene as FightScene;
        this.region = this.originalRegion.moved(
            Math.floor((3 + 2 * (1 - fight.ghostAlphaHealth)) * Time.sinAnimate(2.750, -1, 1, 1.500)),
            Math.floor((3 + 5 * (1 - fight.ghostAlphaHealth)) * Time.sinAnimate(2.000, -1, 1))
        );

        super.update();
    }
}