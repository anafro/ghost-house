import Actor from "$lib/aura/scenes/actor";
import AuraLoadingBarMaterial from "$lib/aura/materials/aura-loading-bar-material";
import type Scene from "$lib/aura/scenes/scene";
import Region from "$lib/aura/utils/region";
import Time from "$lib/aura/time/time";
import {lerp} from "$lib/aura/math/lerp";
import Vector2 from "$lib/aura/utils/vector-2";
import Size from "$lib/aura/utils/size";

export default class AuraLoadingBar extends Actor {
    private static readonly PADDING = 3;
    private progressPercents: number = 0;
    public displayedPercents: number = 0;
    public readonly maxPercents: number = 100;
    private readonly speed = Math.random() * 10 + 5;

    constructor(scene: Scene) {
        super(scene, Region.createAtPointWithSize(new Vector2(AuraLoadingBar.PADDING, scene.region.height - 7), new Size(scene.width - AuraLoadingBar.PADDING * 2, 1)), new AuraLoadingBarMaterial());
    }

    update() {
        if (Time.isNthFrame(Math.floor(Math.random() * 40))) {
            this.progressPercents += Math.random() * this.speed;
        }

        this.displayedPercents = lerp(this.displayedPercents, this.progressPercents, 0.2);
    }

    public isFull(): boolean {
        return this.displayedPercents >= this.maxPercents;
    }
}