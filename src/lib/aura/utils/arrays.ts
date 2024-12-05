export function createMatrix<T>(height: number, width: number): T[][] {
    const matrix: T[][] = new Array(height);

    for (let y = 0; y < height; y += 1) {
        matrix[y] = new Array(width).fill(undefined);
    }

    return matrix;
}

export function setMatrixElementSafely<T>(matrix: T[][], newElement: T, y: number, x: number): void {
    if (!isIndexInArrayBounds(matrix, y)) {
        return;
    }

    const line = matrix[y];

    if (!isIndexInArrayBounds(line, x)) {
        return;
    }

    line[x] = newElement;
}

export function getMatrixElementSafely<T>(matrix: T[][], byDefault: T, y: number, x: number): T {
    if (!isIndexInArrayBounds(matrix, y)) {
        return byDefault;
    }

    const line = matrix[y];

    if (!isIndexInArrayBounds(line, x)) {
        return byDefault;
    }

    return line[x];
}

export function withoutFirst<T>(array: T[], element: T): T[] {
    const index = array.indexOf(element);

    if (index !== -1) {
        array = array.splice(index, 1);
    }

    return array;
}

export function isIndexInArrayBounds<T>(array: T[], index: number): boolean {
    return 0 <= index && index < array.length;
}

export function getElementAtAlphaIndex<T>(array: T[], alpha: number): T {
    const index = Math.round(alpha * (array.length - 1));
    return array[index];
}

export function maxProperty<T, V>(array: T[], getProperty: (element: T) => V, compare: (a: V, b: V) => number): V {
    let max = getProperty(array[0]);

    for (const element of array) {
        const property = getProperty(element);
        if (compare(property, max) > 0) {
            max = property;
        }
    }

    return max;
}