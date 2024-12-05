import Material from "$lib/aura/rendering/material";
import Pixel from "../rendering/pixel";
import type Actor from "../scenes/actor";
import type Vector2 from "../utils/vector-2";
import BlendModes, {type BlendMode} from "$lib/aura/utils/blend-mode";
import type Color from "$lib/aura/utils/color";
import {isIndexInArrayBounds, maxProperty} from "$lib/aura/utils/arrays";
import {isIndexInStringBounds} from "$lib/aura/utils/strings";
import type Region from "$lib/aura/utils/region";
import Size from "$lib/aura/utils/size";


export function calculateSpriteSize(sprite: string): Size {
    const spriteLines = sprite.split('\n');
    return new Size(maxProperty(spriteLines, line => line.length, (a, b) => a - b), spriteLines.length);
}


export default class SpriteMaterial extends Material {
    private readonly spriteLines: string[];
    public readonly color: Color;
    public readonly size: Size;

    constructor(sprite: string, color: Color, blendMode: BlendMode = BlendModes.normal) {
        super(blendMode);
        this.spriteLines = sprite.split('\n');
        this.color = color;
        this.size = calculateSpriteSize(sprite);
    }
    
    public renderAt(actor: Actor, coordinate: Vector2): Pixel | undefined {
        if (!isIndexInArrayBounds(this.spriteLines, coordinate.y)) {
            return undefined;
        }
        
        const spriteLine = this.spriteLines[coordinate.y];
        
        if (!isIndexInStringBounds(spriteLine, coordinate.x)) {
            return undefined;
        }
        
        const character = spriteLine[coordinate.x];
        return new Pixel(character, this.color);
    }
}