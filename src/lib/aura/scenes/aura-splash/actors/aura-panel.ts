import Actor from "$lib/aura/scenes/actor";
import Region from "$lib/aura/utils/region";
import AuraSplashMaterial from "$lib/aura/materials/aura-splash-material";
import type Scene from "$lib/aura/scenes/scene";

export default class AuraPanel extends Actor {
    constructor(scene: Scene) {
        super(scene, new Region(0, scene.region.height - 9, scene.region.width, scene.region.height), new AuraSplashMaterial());
    }
}