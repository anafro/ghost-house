import Actor from "$lib/aura/scenes/actor";
import type Scene from "$lib/aura/scenes/scene";
import {pick} from "$lib/aura/utils/random";
import SupernovaMaterial from "$lib/aura/materials/supernova-material";
import FireRingMaterial from "$lib/aura/materials/fire-ring-material";
import ThirdMaterial from "$lib/aura/materials/third-material";

export default class Aura extends Actor {
    constructor(scene: Scene) {
        super(scene, scene.region, pick([new SupernovaMaterial(), new FireRingMaterial(), new ThirdMaterial()]));
    }
}