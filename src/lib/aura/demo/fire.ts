import Actor from "$lib/aura/scenes/actor";
import Pixel from "$lib/aura/rendering/pixel";
import Color from "$lib/aura/utils/color";

export default class Fire extends Actor {
    private static characterGradient = `.-':_,^=;><+!rc*/z?sLTv)J7(|Fi{C}fI31tlu[neoZ5Yxjya]2ESwqkP6h9d4VpOGbUAKXHm8RD#$Bg0MNWQ%&@`;

    renderAt(x: number, y: number): Pixel {
        const intensity = Math.random();
        const fireColor = new Color(
            255 * (y / this.getRegion().height + 0.2) * intensity - 30 * Math.random(),
            185 * (y / this.getRegion().height) * intensity - 140 * Math.random(),
            255 * (y / this.getRegion().height) - 200,
        );

        return new Pixel(this.getCharacter(y), fireColor);
    }

    public getCharacter(y: number) {
        const alpha = (y / this.region.height + 0.4 * Math.random()) * 0.1;
        const index = Math.floor(Fire.characterGradient.length * alpha);

        return Fire.characterGradient[index];
    }
}