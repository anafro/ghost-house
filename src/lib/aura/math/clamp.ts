export function smoothStep(leftEdge: number, rightEdge: number, value: number): number {
    const scaledValue = alphaClamp((value - leftEdge) / (rightEdge - leftEdge));
    return scaledValue * scaledValue * (3.0 - 2.0 * scaledValue);
}

export function step(edge: number, value: number): number {
    return value < edge ? 0 : 1;
}

export function clamp(value: number, leftEdge: number, rightEdge: number): number {
    if (value > rightEdge) {
        return rightEdge;
    }

    if (value < leftEdge) {
        return leftEdge;
    }

    return value;
}

export function alphaClamp(value: number): number {
    return clamp(value, 0, 1);
}