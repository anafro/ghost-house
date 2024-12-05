import Actor from "$lib/aura/scenes/actor";
import type Scene from "$lib/aura/scenes/scene";
import type Vector2 from "$lib/aura/utils/vector-2";
import Region from "$lib/aura/utils/region";
import Size from "$lib/aura/utils/size";
import FightWordMaterial from "$lib/ghost-house/actors/fight-word-material";
import keyboard from "$lib/aura/input/keyboard";
import type FightScene from "$lib/ghost-house/scenes/fight-scene";
import player from "$lib/ghost-house/globals/player";

export default class FightWordActor extends Actor {
    public readonly word: string;
    public readonly index: number;
    public charIndex = 0;

    constructor(scene: Scene, coordinate: Vector2, word: string, index: number) {
        super(scene, Region.createAtPointWithSize(coordinate, new Size(30, 3)), new FightWordMaterial());
        this.word = word;
        this.index = index;
    }

    update() {
        const fight = this.scene as FightScene;

        if (fight.currentWordIndex !== this.index) {
            return;
        }

        const characters = keyboard.capturePressedKeys();
        characters.length && console.log(characters);

        for (const character of characters) {
            const originalCharacter = this.word[this.charIndex];

            if (character.toLowerCase() !== originalCharacter) {
                player.hit();

                if (player.isDead()) {
                    this.game.loadScene("Death");
                }
            }

            this.charIndex += 1;

            if (this.charIndex >= this.word.length) {
                fight.moveToNextWord();
                this.destroy();
            }
        }
    }
}