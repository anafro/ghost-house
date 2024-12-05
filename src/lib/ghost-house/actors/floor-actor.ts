import Actor from "$lib/aura/scenes/actor";
import type Scene from "$lib/aura/scenes/scene";
import type Floor from "$lib/ghost-house/floors/floor";
import FloorSpriteMaterial from "$lib/ghost-house/floors/floor-sprite-material";
import Color from "$lib/aura/utils/color";
import {calculateSpriteSize} from "$lib/aura/materials/sprite-material";

export default class FloorActor extends Actor {
    protected readonly floor: Floor;

    constructor(scene: Scene, floor: Floor, sprite: string, color: Color) {
        super(scene, floor.pickVacantRegion(calculateSpriteSize(sprite)), new FloorSpriteMaterial(floor, sprite, color));
        this.floor = floor;
    }
}