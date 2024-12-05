import Vector2 from "$lib/aura/utils/vector-2";
import Region from "$lib/aura/utils/region";
import {createMatrix, getMatrixElementSafely, maxProperty, setMatrixElementSafely} from "$lib/aura/utils/arrays";
import {pick} from "$lib/aura/utils/random";

export type RegionSetIntersection = number;
export type RegionSetIntersectionRule = number

export default class RegionSet {
    private regions: Region[];
    private boundingRegion: Region;
    private intersectionCache: RegionSetIntersection[][];

    constructor() {
        this.regions = [];
        this.intersectionCache = createMatrix(0, 0);
        this.boundingRegion = new Region(0, 0,0, 0);
    }

    public push(region: Region): void {
        this.regions.push(region);
        this.clearIntersectionCache();
    }

    public contains(point: Vector2): boolean {
        return this.regions.some(region => region.contains(point));
    }

    public get length(): number {
        return this.regions.length;
    }

    public overlaps(that: Region): boolean {
        return this.regions.some(region => region.overlaps(that));
    }

    public includes(that: Region): boolean {
        return this.regions.some(region => region.includes(that));
    }

    public intersect(point: Vector2): RegionSetIntersection {
        const cachedIntersection = getMatrixElementSafely(this.intersectionCache, 0b111_111_111, point.y, point.x);

        if (cachedIntersection !== undefined) {
            return cachedIntersection;
        }

        let setIntersection = 0;

        for (let y = point.y - 1; y <= point.y + 1; y++) {
            for (let x = point.x - 1; x <= point.x + 1; x++) {
                setIntersection <<= 1;
                setIntersection += this.contains(new Vector2(x, y)) ? 1 : 0;
            }
        }

        setMatrixElementSafely(this.intersectionCache, setIntersection, point.y, point.x)
        return setIntersection;
    }

    public matchesIntersectionRule(point: Vector2, rule: RegionSetIntersectionRule): boolean {
        let setIntersection = this.intersect(point);

        for (let index = 0; index < 9; index++) {
            const sideIntersection = setIntersection & 1;
            const sideRule = rule % 10;

            if (sideRule !== 2 && sideRule !== sideIntersection) {
                return false;
            }

            rule /= 10;
            rule = Math.trunc(rule);
            setIntersection >>= 1;
        }

        return true;
    }

    public matchIntersectionRules<T>(point: Vector2, byDefault: T, rules: [RegionSetIntersectionRule, T][]): T {
        for (const [rule, object] of rules) {
            if (this.matchesIntersectionRule(point, rule)) {
                return object;
            }
        }

        return byDefault;
    }

    public setBoundingRegion(boundingRegion: Region): void {
        this.boundingRegion = boundingRegion;
        this.clearIntersectionCache();
    }

    public toArray(): Region[] {
        return [...this.regions];
    }

    public pickCoordinates(): Vector2 {
        const region = pick(this.regions);
        return region.pickCoordinates();
    }

    private clearIntersectionCache(): void {
        this.intersectionCache = createMatrix(this.boundingRegion.height, this.boundingRegion.width);
    }
}