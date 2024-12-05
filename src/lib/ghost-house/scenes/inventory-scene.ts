import Scene from "$lib/aura/scenes/scene";
import type Game from "$lib/aura/scenes/game";
import InventoryActor from "$lib/ghost-house/actors/inventory-actor";
import keyboard from "$lib/aura/input/keyboard";
import {CLOSE_INVENTORY_KEY} from "$lib/ghost-house/input/keys";
import mansion from "$lib/ghost-house/globals/mansion";
import ActionSelectorActor from "$lib/ghost-house/actors/action-selector-actor";

export default class InventoryScene extends Scene {
    constructor(game: Game) {
        super(game, 120, 60);
        new InventoryActor(this);
        new ActionSelectorActor(this);
    }

    update() {
        if (keyboard.isPressed(CLOSE_INVENTORY_KEY)) {
            return this.game.loadScene(mansion.getFloorSceneName());
        }

        super.update();
    }
}