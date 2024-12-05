export function charAtSafely(string: string, index: number): string {
    if (!isIndexInStringBounds(string, index)) {
        return '';
    }

    return string.charAt(index);
}

export function isIndexInStringBounds(string: string, index: number): boolean {
    return index >= 0 && index < string.length;
}