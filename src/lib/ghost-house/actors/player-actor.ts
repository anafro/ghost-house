import keyboard from "$lib/aura/input/keyboard";
import type FloorScene from "$lib/ghost-house/floors/floor-scene";
import type Scene from "$lib/aura/scenes/scene";
import Vector2 from "$lib/aura/utils/vector-2";
import playerSprite from "$lib/ghost-house/sprites/player-sprite";
import Color from "$lib/aura/utils/color";
import type Floor from "$lib/ghost-house/floors/floor";
import FloorActor from "$lib/ghost-house/actors/floor-actor";
import type FloorSpriteMaterial from "$lib/ghost-house/floors/floor-sprite-material";
import FurnitureActor from "$lib/ghost-house/actors/furniture-actor";
import tooltip from "$lib/ghost-house/globals/tooltip";
import actions from "$lib/ghost-house/globals/actions";
import inspection from "$lib/ghost-house/globals/inspection";
import {count} from "$lib/aura/utils/iterables";
import {pick} from "$lib/aura/utils/random";
import mansion from "$lib/ghost-house/globals/mansion";
import {calculateSpriteSize} from "$lib/aura/materials/sprite-material";

export default class PlayerActor extends FloorActor {
    constructor(scene: Scene, floor: Floor) {
        super(scene, floor, playerSprite, Color.hex(0xFF6600));
        const floorScene = this.scene as FloorScene;
        this.region.teleport(pick(floorScene.floor.getRoomRegions().toArray()).center.minus(new Vector2(0, calculateSpriteSize(playerSprite).height)));
    }

    public update() {
        const movement = new Vector2(keyboard.getHorizontalMovement(), keyboard.getVerticalMovement());
        const destinationCoordinates = this.getRegion().toCoordinates().plus(movement.plus(new Vector2(0, (this.material as FloorSpriteMaterial).size.height)));
        const floorCoordinates = this.floor.region.getAbsoluteCoordinates(destinationCoordinates);

        if (!this.floor.getRoomRegions().contains(floorCoordinates)) {
            return;
        }

        if (movement.is(0, 0)) {
            return;
        }

        let standsOnFurniture = false;
        for (const actor of this.scene.actors) {
            if (actor instanceof FurnitureActor) {
                if (actor.region.contains(destinationCoordinates)) {
                    if (actor.content === 'empty') {
                        tooltip.text = `Empty ${actor.name.toLowerCase()}`;
                    } else {
                        tooltip.text = actor.name;
                    }

                    actions.setActions([
                        [[actor.action, () => {
                            inspection.furniture = actor;
                            this.game.loadScene('Inspection');
                        }], undefined],
                        [undefined, undefined]
                    ]);

                    standsOnFurniture = true;
                    break;
                }
            }
        }

        const piecesOfFurniture = [...this.scene.actors].filter(actor => actor instanceof FurnitureActor) as FurnitureActor[];
        const ghostsLeft = count(piecesOfFurniture, furniture => furniture.content === 'ghost');

        if (!standsOnFurniture) {
            if (ghostsLeft === 0) {
                tooltip.text = `There are no ghosts left.`;
                actions.setActions([
                    [['Go upstairs', () => {
                        this.game.loadScene(mansion.getNextFloorSceneName());

                        if (!mansion.isAtLastFloor()) {
                            mansion.goUpstairs();
                        }
                    }], undefined],
                    [undefined, undefined]
                ]);
            } else {
                tooltip.text = `There are ${ghostsLeft} ghosts at the ${mansion.getFloorSceneName().toLowerCase()}`;
                actions.clearActions();
            }
        }

        this.region.move(keyboard.getHorizontalMovement(), keyboard.getVerticalMovement());
    }
}