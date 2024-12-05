export function trigonometricAlphaClamp(trigonometricResult: number): number {
    return trigonometricResult / 2 + 0.5;
}

export function alphaSin(argument: number): number {
    return trigonometricAlphaClamp(Math.sin(argument));
}