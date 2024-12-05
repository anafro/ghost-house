import Scene from "$lib/aura/scenes/scene";
import Floor from "$lib/ghost-house/floors/floor";
import PlayerActor from "$lib/ghost-house/actors/player-actor";
import Actor from "$lib/aura/scenes/actor";
import FpsMaterial from "$lib/aura/materials/fps-material";
import AuraFade from "$lib/aura/scenes/aura-splash/actors/aura-fade";
import type Game from "$lib/aura/scenes/game";
import ChestActor from "$lib/ghost-house/actors/chest-actor";
import TableActor from "$lib/ghost-house/actors/table-actor";
import ActionFrameActor from "$lib/ghost-house/actors/action-frame-actor";
import keyboard from "$lib/aura/input/keyboard";
import {OPEN_INVENTORY_KEY} from "$lib/ghost-house/input/keys";
import ActionSelectorActor from "$lib/ghost-house/actors/action-selector-actor";
import TooltipActor from "$lib/ghost-house/actors/tooltip-actor";
import FurnitureContentDistributor from "$lib/aura/furniture/furniture-content-distributor";
import mansion from "$lib/ghost-house/globals/mansion";

export default class FloorScene extends Scene {
    public floor: Floor;

    constructor(game: Game) {
        super(game, 120, 60);

        new ActionFrameActor(this);
        new ActionSelectorActor(this);
        new TooltipActor(this);
        this.floor = new Floor(this, this.region.contracted(1, 1, 2, 7));

        try {
            const contentDistributor = new FurnitureContentDistributor(3, 5);

            for (let _ = 0; _ < 5; _ += 1) {
                new ChestActor(this, this.floor, contentDistributor.nextContent());
            }

            for (let _ = 0; _ < 5; _ += 1) {
                new TableActor(this, this.floor, contentDistributor.nextContent());
            }
        } catch(error) {
            console.warn(`Could not fill the floor enough`);
            console.warn(error);
        }

        new PlayerActor(this, this.floor);
        new AuraFade(this, mansion.getNextFloorSceneName());
    }

    update() {
        if (keyboard.isPressed(OPEN_INVENTORY_KEY)) {
            return this.game.loadScene("Inventory");
        }

        super.update();
    }
}