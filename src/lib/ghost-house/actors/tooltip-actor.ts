import Actor from "$lib/aura/scenes/actor";
import type Scene from "$lib/aura/scenes/scene";
import Region from "$lib/aura/utils/region";
import TooltipMaterial from "$lib/ghost-house/actors/tooltip-material";

export default class TooltipActor extends Actor {
    constructor(scene: Scene) {
        super(scene, new Region(40, scene.region.height - 7, scene.region.width - 1, scene.region.height - 1), new TooltipMaterial());
    }
}