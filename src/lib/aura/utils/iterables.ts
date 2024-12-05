export function count<T>(iterable: Iterable<T>, countCondition: (element: T) => boolean): number {
    let count = 0;

    for (const element of iterable) {
        if (countCondition(element)) {
            count += 1;
        }
    }

    return count;
}