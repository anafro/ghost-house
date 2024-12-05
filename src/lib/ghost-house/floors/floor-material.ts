import Material from "$lib/aura/rendering/material";
import type Actor from "$lib/aura/scenes/actor";
import Vector2 from "$lib/aura/utils/vector-2";
import Pixel from "$lib/aura/rendering/pixel";
import Color from "$lib/aura/utils/color";
import type Floor from "$lib/ghost-house/floors/floor";
import {switchValue} from "$lib/aura/utils/switch";
import type {RegionSetIntersectionRule} from "$lib/aura/utils/region-set";
import keyboard from "$lib/aura/input/keyboard";
import {createMatrix, getMatrixElementSafely, setMatrixElementSafely} from "$lib/aura/utils/arrays";

export default class FloorMaterial extends Material {
    static readonly WALL_HEIGHT = 4;
    private static readonly WALL_COLOR = Color.hex(0x71413b);
    private static readonly FLOOR_COLOR_1 = Color.hex(0x3B1725);
    private static readonly FLOOR_COLOR_2 = Color.hex(0x73172D);
    private static readonly WALL_RULES: [RegionSetIntersectionRule, string][] = [
        [0, '@'],
        [211_011_202, '╚'],
        [112_110_202, '╝'],
        [202_011_211, '╔'],
        [202_110_112, '╗'],

        [110_111_111, '╚'],
        [11_111_111, '╝'],
        [111_111_110, '╔'],
        [111_111_011, '╗'],

        [111_111_111, '#'],
        [211_211_211, '║'],
        [112_112_112, '║'],
        [111_111_222, '═'],
        [222_111_111, '═'],

        [212_110_212, '╣'],
        [212_111_202, '╩'],
        [212_011_212, '╠'],
        [202_111_212, '╦'],

        [212_111_212, '╬'],
    ];
    private wallCache: boolean[][] | undefined;

    constructor() {
        super();
    }

    renderAt(actor: Actor, coordinate: Vector2): Pixel {
        this.setRenderCacheEnabled(actor.region.size, true);

        const floor = actor as Floor;
        const rooms = floor.getRoomRegions();

        if (rooms.matchesIntersectionRule(coordinate, 222_202_222) || this.isWall(floor, coordinate)) {
            let character = undefined;

            for (let y = coordinate.y + FloorMaterial.WALL_HEIGHT; y > coordinate.y; y--) {
                const rayCastCoordinate = new Vector2(coordinate.x, y);

                if (rooms.contains(rayCastCoordinate)) {
                    const belowCoordinate = new Vector2(rayCastCoordinate.x, rayCastCoordinate.y + 1);
                    const isEdge = rooms.matchesIntersectionRule(belowCoordinate, 222_021_222) || rooms.matchesIntersectionRule(belowCoordinate, 222_120_222)

                    character = y === coordinate.y + FloorMaterial.WALL_HEIGHT ? rooms.matchIntersectionRules(rayCastCoordinate, '@', FloorMaterial.WALL_RULES) : isEdge ? '║' : ' ';
                    break;
                }
            }

            if (character !== undefined) {
                return new Pixel(character === '#' ? '#' : character, character === '#' ? FloorMaterial.WALL_COLOR.times(.6) : FloorMaterial.WALL_COLOR);
            }
        }

        const character = rooms.matchIntersectionRules(coordinate, '@', FloorMaterial.WALL_RULES);

        const color = switchValue(Color.pickFromLinearGradient(FloorMaterial.FLOOR_COLOR_1, FloorMaterial.WALL_COLOR, .1), [
            [character === '@', FloorMaterial.WALL_COLOR.times(0.25)],
            [character === '#' && ((coordinate.x + coordinate.y) % 2 === 0), FloorMaterial.FLOOR_COLOR_1],
            [character === '#' && ((coordinate.x + coordinate.y) % 2 !== 0), FloorMaterial.FLOOR_COLOR_2],
        ]);

        return new Pixel(character, this.isWall(floor, coordinate) ? Color.CYAN : color);
    }

    public isWall(floor: Floor, coordinate: Vector2): boolean {
        if (this.wallCache === undefined) {
            this.wallCache = createMatrix(floor.region.height, floor.region.width);
        }

        const cache = getMatrixElementSafely(this.wallCache, undefined, coordinate.y, coordinate.x);

        if (cache !== undefined) {
            return cache;
        }

        const rooms = floor.getRoomRegions();
        let roomMet = false;

        for (let y = coordinate.y + FloorMaterial.WALL_HEIGHT; y >= coordinate.y; y--) {
            const rayCastCoordinate = new Vector2(coordinate.x, y);

            if (rooms.contains(rayCastCoordinate)) {
                roomMet = true;
            } else {
                setMatrixElementSafely(this.wallCache, roomMet, coordinate.y, coordinate.x);
                return roomMet;
            }
        }

        setMatrixElementSafely(this.wallCache, false, coordinate.y, coordinate.x);
        return false;
    }
}