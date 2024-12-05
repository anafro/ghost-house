export function lerp(leftEdge: number, rightEdge: number, alpha: number): number {
    return leftEdge + (rightEdge - leftEdge) * alpha;
}