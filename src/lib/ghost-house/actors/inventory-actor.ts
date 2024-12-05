import Actor from "$lib/aura/scenes/actor";
import type Scene from "$lib/aura/scenes/scene";
import SpriteMaterial from "$lib/aura/materials/sprite-material";
import inventorySprite from "$lib/ghost-house/sprites/inventory-sprite";
import Color from "$lib/aura/utils/color";

export default class InventoryActor extends Actor {
    constructor(scene: Scene) {
        super(scene, scene.region, new SpriteMaterial(inventorySprite, Color.hex(0xB3B9D1)));
    }
}