export function switchValue<T>(byDefault: T, branches: [boolean, T][]): T {
    for (const [condition, value] of branches) {
        if (condition === true) {
            return value;
        }
    }

    return byDefault
}