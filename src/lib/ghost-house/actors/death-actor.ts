import Actor from "$lib/aura/scenes/actor";
import type Scene from "$lib/aura/scenes/scene";
import DeathMaterial from "$lib/ghost-house/actors/death-material";

export default class DeathActor extends Actor {
    constructor(scene: Scene) {
        super(scene, scene.region, new DeathMaterial());
    }
}