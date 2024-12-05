import Scene from "$lib/aura/scenes/scene";
import type Game from "$lib/aura/scenes/game";
import FightResultActor from "$lib/ghost-house/actors/fight-result-actor";
import AuraFade from "$lib/aura/scenes/aura-splash/actors/aura-fade";
import mansion from "$lib/ghost-house/globals/mansion";
import Time from "$lib/aura/time/time";
import inspection from "$lib/ghost-house/globals/inspection";

export default class FightResultScene extends Scene {
    private fade: AuraFade | undefined;
    private fadeDelay: number = 1.000;

    constructor(game: Game) {
        super(game, 120, 60);
    }

    start() {
        if (inspection.furniture !== undefined) {
            inspection.furniture.content = 'empty';
        }

        new FightResultActor(this);
        this.fade = new AuraFade(this, mansion.getFloorSceneName());
        super.start();
    }

    cleanUp() {
        this.fadeDelay = 1.000;
        this.actors.clear();
        super.cleanUp();
    }

    update() {
        if (this.fadeDelay <= 0) {
            this.fade?.fade();
        }

        this.fadeDelay -= Time.getDeltaTime();
        super.update();
    }
}