import SpriteMaterial from "$lib/aura/materials/sprite-material";
import Color from "$lib/aura/utils/color";
import BlendModes, {type BlendMode} from "$lib/aura/utils/blend-mode";
import type Actor from "$lib/aura/scenes/actor";
import Vector2 from "$lib/aura/utils/vector-2";
import Pixel from "$lib/aura/rendering/pixel";
import type Floor from "$lib/ghost-house/floors/floor";
import type FloorMaterial from "$lib/ghost-house/floors/floor-material";
import Time from "$lib/aura/time/time";

export default class FloorSpriteMaterial extends SpriteMaterial {
    public shining: boolean = false;
    private readonly floor: Floor;

    constructor(floor: Floor, sprite: string, color: Color, blendMode: BlendMode = BlendModes.normal) {
        super(sprite, color, blendMode);
        this.floor = floor;
    }

    renderAt(actor: Actor, coordinate: Vector2): Pixel | undefined {
        const floorMaterial = this.floor.material as FloorMaterial;
        const floorRegion = this.floor.region;
        const floorCoordinates = floorRegion.toCoordinates();
        const currentCoordinate = actor.region.toCoordinates().plus(coordinate).minus(floorCoordinates);
        const feetCoordinate = actor.region.toCoordinates().plus(new Vector2(0, this.size.height)).minus(floorCoordinates);

        if (floorMaterial.isWall(this.floor, currentCoordinate) && floorMaterial.isWall(this.floor, feetCoordinate)) {
            return undefined;
        }

        const shine = this.shining ? Math.max(
            0,
            Time.sinAnimate(1.000, 1, 1.8, (coordinate.x + coordinate.y) / 15.000) +
            Time.sinAnimate(0.500, 0, 0.2, (coordinate.x - coordinate.y) / 7.000)
        ) : 1;
        const pixel = super.renderAt(actor, coordinate);

        if (pixel !== undefined) {
            pixel.color = pixel.color.times(shine);
        }

        return pixel;
    }
}