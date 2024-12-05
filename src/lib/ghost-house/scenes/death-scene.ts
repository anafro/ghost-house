import Scene from "$lib/aura/scenes/scene";
import type Game from "$lib/aura/scenes/game";
import DeathActor from "$lib/ghost-house/actors/death-actor";

export default class DeathScene extends Scene {
    constructor(game: Game) {
        super(game, 120, 60);
        new DeathActor(this);
    }
}