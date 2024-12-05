import Color from "$lib/aura/utils/color";

export type BlendMode = (beneathColor: Color, blendColor: Color) => Color;

function alphaBlend(beneathColor: Color, blendColor: Color, blendingFunction: (beneathColorComponent: number, blendColorComponent: number) => number): Color {
    return new Color(
        blendingFunction(beneathColor.r / 255, blendColor.r / 255) * 255,
        blendingFunction(beneathColor.g / 255, blendColor.g / 255) * 255,
        blendingFunction(beneathColor.b / 255, blendColor.b / 255) * 255,
    );
}

export default {
    normal: (beneathColor: Color, blendColor: Color) => blendColor,
    multiply: (beneathColor: Color, blendColor: Color) => alphaBlend(beneathColor, blendColor, (a, b) => a * b),
    screen: (beneathColor: Color, blendColor: Color) => alphaBlend(beneathColor, blendColor, (a, b) => 1 - (1 - a) * (1 - b)),
    overlay: (beneathColor: Color, blendColor: Color) => alphaBlend(beneathColor, blendColor, (a, b) => a < 0.5 ? 2 * a * b : 1 - 2 * (1 - a) * (1 - b)),
    hardLight: (beneathColor: Color, blendColor: Color) => alphaBlend(beneathColor, blendColor, (a, b) => b < 0.5 ? 2 * a * b : 1 - 2 * (1 - a) * (1 - b)),
    softLight: (beneathColor: Color, blendColor: Color) => alphaBlend(beneathColor, blendColor, (a, b) => b < 0.5 ? 2 * a * b + a * a * (1 - 2 * b) : 2 * a * (1 - b) + Math.sqrt(a) * (2 * b - 1)),
    colorDodge: (beneathColor: Color, blendColor: Color) => alphaBlend(beneathColor, blendColor, (a, b) => a / (1 - b)),
    linearDodge: (beneathColor: Color, blendColor: Color) => alphaBlend(beneathColor, blendColor, (a, b) => a + b),
    vividLight: (beneathColor: Color, blendColor: Color) => alphaBlend(beneathColor, blendColor, (a, b) => b > 0.5 ? 1 - (1 - a) / (2 * (b - 0.5)) : a / (1 - 2 * b)),
    pinLight: (beneathColor: Color, blendColor: Color) => alphaBlend(beneathColor, blendColor, (a, b) => b > 0.5 ? Math.max(a, 2 * (b - 0.5)) : Math.min(a, 2 * b)),
    difference: (beneathColor: Color, blendColor: Color) => alphaBlend(beneathColor, blendColor, (a, b) => Math.abs(a - b)),
    exclusion: (beneathColor: Color, blendColor: Color) => alphaBlend(beneathColor, blendColor, (a, b) => 0.5 - 2 * (a - 0.5) * (b - 0.5)),
}