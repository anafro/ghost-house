import Material from "$lib/aura/rendering/material";
import type Actor from "$lib/aura/scenes/actor";
import type Vector2 from "$lib/aura/utils/vector-2";
import Pixel from "$lib/aura/rendering/pixel";
import type AuraLoadingBar from "$lib/aura/scenes/aura-splash/actors/aura-loading-bar";
import BlendMode from "$lib/aura/utils/blend-mode";
import Color from "$lib/aura/utils/color";
import {switchValue} from "$lib/aura/utils/switch";
import {charAtSafely, isIndexInStringBounds} from "$lib/aura/utils/strings";
import {clamp} from "$lib/aura/math/clamp";

export default class AuraLoadingBarMaterial extends Material {
    constructor() {
        super(BlendMode.hardLight);
    }

    renderAt(actor: Actor, coordinate: Vector2): Pixel | undefined {
        const loadingBar = actor as AuraLoadingBar;
        const progressAlpha = loadingBar.displayedPercents / loadingBar.maxPercents;
        const coordinatesAlpha = coordinate.x / (loadingBar.region.width);
        const progressText = clamp(loadingBar.displayedPercents, 0, 100).toFixed(2) + '%'
        const progressTextIndex = coordinate.x - actor.region.centerX + Math.floor(progressText.length);
        const character = switchValue('╸', [
            [isIndexInStringBounds(progressText, progressTextIndex), charAtSafely(progressText, progressTextIndex)],
            [coordinate.x === 0, '<'],
            [coordinate.x === actor.region.width - 1, '>'],
        ])

        return new Pixel(character, coordinatesAlpha >= progressAlpha && !isIndexInStringBounds(progressText, progressTextIndex) ? Color.shadeOfGray(0x33) : Color.shadeOfGray(0xCC));
    }
}