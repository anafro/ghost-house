import type Floor from "$lib/ghost-house/floors/floor";
import chestSprite from "$lib/ghost-house/sprites/chest-sprite";
import Color from "$lib/aura/utils/color";
import type Scene from "$lib/aura/scenes/scene";
import FurnitureActor, {type FurnitureContent} from "$lib/ghost-house/actors/furniture-actor";
import chestInspectionSprite from "$lib/ghost-house/sprites/chest-inspection-sprite";

export default class ChestActor extends FurnitureActor {
    constructor(scene: Scene, floor: Floor, content: FurnitureContent) {
        super("Chest", "Open", chestInspectionSprite, content, scene, floor, chestSprite, Color.hex(0xba756a));
    }
}