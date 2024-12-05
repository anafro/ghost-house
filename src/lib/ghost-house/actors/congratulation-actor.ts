import Actor from "$lib/aura/scenes/actor";
import type Scene from "$lib/aura/scenes/scene";
import CongratulationMaterial from "$lib/ghost-house/actors/congratulation-material";

export default class CongratulationActor extends Actor {
    constructor(scene: Scene) {
        super(scene, scene.region, new CongratulationMaterial());
    }
}