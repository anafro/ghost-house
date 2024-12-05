import Material from "$lib/aura/rendering/material";
import type Actor from "$lib/aura/scenes/actor";
import type Vector2 from "$lib/aura/utils/vector-2";
import Pixel from "$lib/aura/rendering/pixel";
import actions from "$lib/ghost-house/globals/actions";
import Time from "$lib/aura/time/time";
import Color from "$lib/aura/utils/color";
import {isIndexInArrayBounds} from "$lib/aura/utils/arrays";
import {charAtSafely} from "$lib/aura/utils/strings";

export default class ActionSelectorMaterial extends Material {
    private static readonly ACTION_LINE = 2;
    private static readonly ACTION_HEIGHT = 3;
    private static readonly ACTION_WIDTH = 20;

    renderAt(actor: Actor, coordinate: Vector2): Pixel | undefined {
        const availableActions = actions.toMatrix();
        const actionY = Math.floor(coordinate.y / ActionSelectorMaterial.ACTION_HEIGHT);
        const actionX = Math.floor(coordinate.x / ActionSelectorMaterial.ACTION_WIDTH);

        if (
            !isIndexInArrayBounds(availableActions, actionY) ||
            !isIndexInArrayBounds(availableActions[0], actionX)
        ) {
            return undefined;
        }

        const action = availableActions[actionY][actionX];

        if (action === undefined) {
            return undefined;
        }

        const [actionLabel, _] = action;
        const isSelected = actions.isActionSelected(actionX, actionY);
        const actionText = isSelected ? `> ${actionLabel} <` : actionLabel;
        const actionLine = coordinate.y % ActionSelectorMaterial.ACTION_HEIGHT;
        const actionCharIndex = coordinate.x % ActionSelectorMaterial.ACTION_WIDTH - Math.round(ActionSelectorMaterial.ACTION_WIDTH / 2) + Math.round(actionText.length / 2);

        if (actionLine !== ActionSelectorMaterial.ACTION_LINE) {
            return undefined;
        }

        const character = charAtSafely(actionText, actionCharIndex);
        const color = isSelected ? Color.pickFromLinearGradient(Color.hex(0x285cc4), Color.hex(0x20d6c7), Time.sinAnimate(1.000, 0, 1)) : Color.hex(0xdae0ea);


        return new Pixel(character, color);
    }
}