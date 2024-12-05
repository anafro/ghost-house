import Material from "$lib/aura/rendering/material";
import type Actor from "$lib/aura/scenes/actor";
import type Vector2 from "$lib/aura/utils/vector-2";
import Pixel from "$lib/aura/rendering/pixel";
import type FightWordActor from "$lib/ghost-house/actors/fight-word-actor";
import Color from "$lib/aura/utils/color";
import {charAtSafely} from "$lib/aura/utils/strings";
import FightScene from "$lib/ghost-house/scenes/fight-scene";

export default class FightWordMaterial extends Material {
    renderAt(actor: Actor, coordinate: Vector2): Pixel | undefined {
        const fightWord = actor as FightWordActor;
        const word = fightWord.word.toUpperCase();
        const fight = actor.scene as FightScene;
        const isCurrent = fightWord.index === fight.currentWordIndex;
        const progressAlpha = fight.timeLeft / FightScene.TIME_PER_WORD;
        const isHighlighted = progressAlpha <= (coordinate.x / actor.region.width);

        if (coordinate.y !== 1) {
            if (isCurrent) {
                return new Pixel('~', isHighlighted ? Color.hex(0x73172d) : Color.hex(0xf9a31b));
            } else {
                return new Pixel(' ', Color.shadeOfGray(0x55));
            }
        }

        const charIndex = coordinate.x - Math.round(actor.region.width / 2) + Math.round(word.length / 2);
        const character = charAtSafely(word, charIndex);

        return new Pixel(character, charIndex >= fightWord.charIndex ? Color.hex(0xf9a31b) : Color.hex(0x73172d));
    }
}