import Actor from "$lib/aura/scenes/actor";
import type Scene from "$lib/aura/scenes/scene";
import Region from "$lib/aura/utils/region";
import Vector2 from "$lib/aura/utils/vector-2";
import Size from "$lib/aura/utils/size";
import ActionSelectorMaterial from "$lib/ghost-house/actors/action-selector-material";
import keyboard from "$lib/aura/input/keyboard";
import actions from "$lib/ghost-house/globals/actions";
import tooltip from "$lib/ghost-house/globals/tooltip";

export default class ActionSelectorActor extends Actor {
    constructor(scene: Scene) {
        super(scene, Region.createAtPointWithSize(new Vector2(0, scene.region.height - 7), new Size(40, 7)), new ActionSelectorMaterial());
    }

    update() {
        if (keyboard.isPressed('r')) {
            actions.selectNext();
        }

        if (keyboard.isPressed(' ')) {
            actions.doSelectedAction();
        }
    }

    cleanUp() {
        tooltip.text = '';
        actions.clearActions();

        super.cleanUp();
    }
}