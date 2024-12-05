import Scene from "$lib/aura/scenes/scene";
import type Game from "$lib/aura/scenes/game";
import ActionFrameActor from "$lib/ghost-house/actors/action-frame-actor";
import ActionSelectorActor from "$lib/ghost-house/actors/action-selector-actor";
import TooltipActor from "$lib/ghost-house/actors/tooltip-actor";
import InspectionActor from "$lib/ghost-house/actors/inspection-actor";

export default class InspectionDescriptionScene extends Scene {
    constructor(game: Game) {
        super(game, 120, 60);
        new ActionFrameActor(this);
        new ActionSelectorActor(this);
        new TooltipActor(this);
        new InspectionActor(this, this.region.contracted(1, 1, 2, 7));
    }

    update() {
        super.update();
    }
}