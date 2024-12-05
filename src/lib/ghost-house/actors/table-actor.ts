import type Floor from "$lib/ghost-house/floors/floor";
import Color from "$lib/aura/utils/color";
import type Scene from "$lib/aura/scenes/scene";
import tableSprite from "$lib/ghost-house/sprites/table-sprite";
import FurnitureActor, {type FurnitureContent} from "$lib/ghost-house/actors/furniture-actor";
import tableInspectionSprite from "$lib/ghost-house/sprites/table-inspection-sprite";

export default class TableActor extends FurnitureActor {
    constructor(scene: Scene, floor: Floor, content: FurnitureContent) {
        super("Table", "Inspect", tableInspectionSprite, content, scene, floor, tableSprite, Color.hex(0x8e5252));
    }
}