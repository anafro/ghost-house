import Material from "$lib/aura/rendering/material";
import Pixel from "../rendering/pixel";
import type Actor from "../scenes/actor";
import type Vector2 from "../utils/vector-2";
import BlendMode from "$lib/aura/utils/blend-mode";
import Color from "$lib/aura/utils/color";
import Time from "$lib/aura/time/time";

export default class AuraSplashMaterial extends Material {
    private static readonly TITLE_OFFSET_X = 3;
    private static readonly TITLE_OFFSET_Y = 5;
    private static readonly TITLE = "Loading Aura: Terminal Game Engine v1.0.0 build 1 [Browser Prototype]"
    private static readonly SUBTITLE = "Created by Anatoly Frolov"

    constructor() {
        super(BlendMode.hardLight);
    }

    public renderAt(actor: Actor, coordinate: Vector2): Pixel | undefined {
        if (
            coordinate.x === 0 && coordinate.y === 0 ||
            coordinate.x === actor.getRegion().width - 1 && coordinate.y === 0
        ) {
            return undefined;
        }

        if (
            coordinate.x == AuraSplashMaterial.TITLE_OFFSET_X &&
            coordinate.y == AuraSplashMaterial.TITLE_OFFSET_Y
        ) {
            return new Pixel('-\\|/'.charAt((Time.getCurrentTimeSeconds() * 8) % '-\\|/'.length), Color.shadeOfGray(0xCC))
        }

        if (
            coordinate.x >= AuraSplashMaterial.TITLE_OFFSET_X + 2 &&
            coordinate.y == AuraSplashMaterial.TITLE_OFFSET_Y &&
            coordinate.x < AuraSplashMaterial.TITLE.length + AuraSplashMaterial.TITLE_OFFSET_X + 2 &&
            AuraSplashMaterial.TITLE.charAt(coordinate.x - AuraSplashMaterial.TITLE_OFFSET_X - 2) !== ' '
        ) {
            return new Pixel(AuraSplashMaterial.TITLE.charAt(coordinate.x - AuraSplashMaterial.TITLE_OFFSET_X - 2), Color.shadeOfGray(0xCC))
        }

        if (
            coordinate.x >= AuraSplashMaterial.TITLE_OFFSET_X &&
            coordinate.y == AuraSplashMaterial.TITLE_OFFSET_Y + 2 &&
            coordinate.x < AuraSplashMaterial.SUBTITLE.length + AuraSplashMaterial.TITLE_OFFSET_X &&
            AuraSplashMaterial.SUBTITLE.charAt(coordinate.x - AuraSplashMaterial.TITLE_OFFSET_X) !== ' '
        ) {
            return new Pixel(AuraSplashMaterial.SUBTITLE.charAt(coordinate.x - AuraSplashMaterial.TITLE_OFFSET_X), Color.shadeOfGray(0x88))
        }

        return new Pixel('#', Color.shadeOfGray(Time.sinAnimate(1.800, 0x09, 0x22)));
    }
}