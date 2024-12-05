export function translate(number: number, originalLeftEdge: number, originalRightEdge: number, translationLeftEdge: number, translationRightEdge: number) {
    const originalRange = originalRightEdge - originalLeftEdge;
    const translationRange = translationRightEdge - translationLeftEdge;
    const alpha = (number - originalLeftEdge) / originalRange;

    return translationLeftEdge + alpha * translationRightEdge;
}
