import Color from "$lib/aura/utils/color";


export default class Pixel {
    public static readonly BLANK: Pixel | undefined = undefined;
    public character: string | undefined;
    public color: Color;

    constructor(character: string | undefined, color: Color) {
        this.character = character?.charAt(0);
        this.color = color;
    }
}