import FloorActor from "$lib/ghost-house/actors/floor-actor";
import type Scene from "$lib/aura/scenes/scene";
import type Floor from "$lib/ghost-house/floors/floor";
import Color from "$lib/aura/utils/color";
import type FloorSpriteMaterial from "$lib/ghost-house/floors/floor-sprite-material";
import inspection from "$lib/ghost-house/globals/inspection";

export type FurnitureContent = 'empty' | 'ghost' | 'item';

export default class FurnitureActor extends FloorActor {
    public readonly name: string;
    public readonly action: string;
    public readonly inspectionSprite: string;
    public content: FurnitureContent;

    constructor(name: string, action: string, inspectionSprite: string, content: FurnitureContent, scene: Scene, floor: Floor, sprite: string, color: Color) {
        super(scene, floor, sprite, color);
        this.name = name;
        this.action = action;
        this.inspectionSprite = inspectionSprite;
        this.content = content;
    }

    public get color() {
        return (this.material as FloorSpriteMaterial).color;
    }

    update() {
        (this.material as FloorSpriteMaterial).shining = this.content !== 'empty';
    }
}