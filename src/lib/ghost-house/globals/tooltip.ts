import Color from "$lib/aura/utils/color";

class Tooltip {
    public text: string;
    public color: Color;

    constructor(text: string, color: Color) {
        this.text = text;
        this.color = color;
    }
}

export default new Tooltip("", Color.hex(0xFFFFFF));