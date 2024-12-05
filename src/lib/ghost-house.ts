import Game from "$lib/aura/scenes/game";
import AuraSplashScene from "$lib/aura/scenes/aura-splash/aura-splash-scene";
import FloorScene from "$lib/ghost-house/floors/floor-scene";
import InventoryScene from "$lib/ghost-house/scenes/inventory-scene";
import mansion from "$lib/ghost-house/globals/mansion";
import InspectionScene from "$lib/ghost-house/scenes/inspection-scene";
import FightScene from "$lib/ghost-house/scenes/fight-scene";
import FightResultScene from "$lib/ghost-house/scenes/fight-result-scene";
import CongratulationScene from "$lib/ghost-house/scenes/congratulation-scene";
import DeathScene from "$lib/ghost-house/scenes/death-scene";

export default class GhostHouse extends Game {
    constructor(canvas: HTMLCanvasElement) {
        super(`Ghost House`, canvas);


        while (true) {
            const floorScene = new FloorScene(this);
            this.addScene(mansion.getFloorSceneName(), floorScene);
            mansion.goUpstairs();

            if (mansion.isAtLastFloor()) {
                mansion.setCurrentFloor(1);
                break;
            }
        }

        this.addScene('Aura Splashscreen', new AuraSplashScene(this, mansion.getFloorSceneName()));
        this.addScene('Inventory', new InventoryScene(this));
        this.addScene('Inspection', new InspectionScene(this));
        this.addScene('Fight', new FightScene(this));
        this.addScene('Fight Result', new FightResultScene(this));
        this.addScene('Congratulation', new CongratulationScene(this));
        this.addScene('Death', new DeathScene(this));

        this.loadScene('Aura Splashscreen');
    }
}