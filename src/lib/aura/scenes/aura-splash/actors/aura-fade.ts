import Actor from "$lib/aura/scenes/actor";
import type Scene from "$lib/aura/scenes/scene";
import AuraSplashFadeMaterial from "$lib/aura/materials/aura-splash-fade-material";
import Time from "$lib/aura/time/time";
import {alphaClamp} from "$lib/aura/math/clamp";

export default class AuraFade extends Actor {
    public fadeAlpha: number = 1;
    private readonly fadeAlphaIncreasePerSecond = 1;
    private readonly nextSceneName: string;
    public isFadingStarted: boolean = false;

    constructor(scene: Scene, nextSceneName: string = '<no fade transition scene>') {
        super(scene, scene.region, new AuraSplashFadeMaterial());
        this.nextSceneName = nextSceneName;
    }

    update() {
        if (!this.isFadingStarted) {
            this.fadeAlpha -= this.fadeAlphaIncreasePerSecond * Time.getDeltaTime() * 2;
            this.fadeAlpha = alphaClamp(this.fadeAlpha);
            return;
        }

        this.fadeAlpha += this.fadeAlphaIncreasePerSecond * Time.getDeltaTime();

        if (this.fadeAlpha >= 1) {
            this.game.loadScene(this.nextSceneName);
        }
    }

    public fade(): void {
        this.isFadingStarted = true;
    }
}