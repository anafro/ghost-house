import Scene from "$lib/aura/scenes/scene";
import type Game from "$lib/aura/scenes/game";
import Aura from "$lib/aura/scenes/aura-splash/actors/aura";
import AuraPanel from "$lib/aura/scenes/aura-splash/actors/aura-panel";
import AuraLoadingBar from "$lib/aura/scenes/aura-splash/actors/aura-loading-bar";
import AuraFade from "$lib/aura/scenes/aura-splash/actors/aura-fade";
import Actor from "$lib/aura/scenes/actor";
import FpsMaterial from "$lib/aura/materials/fps-material";

export default class AuraSplashScene extends Scene {
    private readonly loadingBar: AuraLoadingBar;
    private readonly fade: AuraFade;

    constructor(game: Game, nextSceneName: string) {
        super(game, 120, 60);
        new Aura(this);
        new AuraPanel(this);
        this.loadingBar = new AuraLoadingBar(this);
        this.fade = new AuraFade(this, nextSceneName);
        new Actor(this, this.region, new FpsMaterial());
    }

    update() {
        if (this.loadingBar.isFull()) {
            this.fade.fade();
        }

        super.update();
    }
}