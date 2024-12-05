import Scene from "$lib/aura/scenes/scene";
import type Game from "$lib/aura/scenes/game";
import CongratulationActor from "$lib/ghost-house/actors/congratulation-actor";

export default class CongratulationScene extends Scene {
    constructor(game: Game) {
        super(game, 120, 60);
        new CongratulationActor(this);
    }
}