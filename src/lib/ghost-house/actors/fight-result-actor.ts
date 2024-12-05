import Actor from "$lib/aura/scenes/actor";
import type Scene from "$lib/aura/scenes/scene";
import FightResultMaterial from "$lib/ghost-house/actors/fight-result-material";

export default class FightResultActor extends Actor {
    constructor(scene: Scene) {
        super(scene, scene.region, new FightResultMaterial());
    }
}