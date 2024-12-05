import Scene from "$lib/aura/scenes/scene";
import type Game from "$lib/aura/scenes/game";
import ActionFrameActor from "$lib/ghost-house/actors/action-frame-actor";
import TooltipActor from "$lib/ghost-house/actors/tooltip-actor";
import ExorcistFightActor from "$lib/ghost-house/actors/exorcist-fight-actor";
import GhostFightActor from "$lib/ghost-house/actors/ghost-fight-actor";
import FightWordActor from "$lib/ghost-house/actors/fight-word-actor";
import necronomicon from "$lib/ghost-house/globals/necronomicon";
import Vector2 from "$lib/aura/utils/vector-2";
import Time from "$lib/aura/time/time";
import tooltip from "$lib/ghost-house/globals/tooltip";
import player from "$lib/ghost-house/globals/player";

export default class FightScene extends Scene {
    private fightWords: FightWordActor[] = [];
    public static readonly TIME_PER_WORD: number = 3.000;
    public timeLeft: number = FightScene.TIME_PER_WORD;
    currentWordIndex: number = 0;

    constructor(game: Game) {
        super(game, 120, 60);
        this.fightWords = [];
    }

    start() {
        this.timeLeft = FightScene.TIME_PER_WORD;
        this.currentWordIndex = 0;
        this.fightWords = [];

        new ActionFrameActor(this);
        new TooltipActor(this);
        new ExorcistFightActor(this);
        new GhostFightActor(this);

        const words = necronomicon.pickWordsForFight();

        for (let i = 0; i < 4; i++) {
            const word = words[i];
            const fightWord = new FightWordActor(this, new Vector2(43, 10 + 10 * i), word, i);
            this.fightWords.push(fightWord);
        }

        super.start();
    }

    cleanUp() {
        this.actors.clear();
        super.cleanUp();
    }

    update() {
        tooltip.text = `HP: ${'♡'.repeat(player.health)}`
        this.timeLeft -= Time.getDeltaTime();

        if (this.timeLeft < 0) {
            const fightWord = this.fightWords[this.currentWordIndex];
            if (fightWord.charIndex < fightWord.word.length) {
                player.hit();
            }

            this.moveToNextWord();
        }

        super.update();
    }

    moveToNextWord() {
        this.timeLeft = FightScene.TIME_PER_WORD;
        this.currentWordIndex += 1;

        if (this.currentWordIndex >= 4) {
            return this.game.loadScene('Fight Result');
        }
    }

    public get ghostAlphaHealth() {
        return 1 - (this.currentWordIndex / 4);
    }
}