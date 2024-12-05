import Actor from "$lib/aura/scenes/actor";
import {Range} from "$lib/aura/utils/random";
import type Scene from "$lib/aura/scenes/scene";
import FloorMaterial from "$lib/ghost-house/floors/floor-material";
import RegionSet from "$lib/aura/utils/region-set";
import Region from "$lib/aura/utils/region";
import Vector2 from "$lib/aura/utils/vector-2";
import Size from "$lib/aura/utils/size";
import FloorActor from "$lib/ghost-house/actors/floor-actor";

export default class Floor extends Actor {
    private readonly roomsRange = new Range(9, 12);
    private readonly roomWidthRange = new Range(16, 20);
    private readonly roomHeightRange = new Range(16, 24);
    private readonly roomLeftRange;
    private readonly roomTopRange;
    private readonly roomRegions: RegionSet = new RegionSet();
    private readonly corridorWidth = 5;

    constructor(scene: Scene, region: Region) {
        super(scene, region, new FloorMaterial());
        this.roomLeftRange = new Range(0, this.region.width - this.roomWidthRange.max);
        this.roomTopRange = new Range(FloorMaterial.WALL_HEIGHT, this.region.height - this.roomHeightRange.max);

        const rooms = this.roomsRange.pick();
        let attempts = 0;

        while (this.roomRegions.length < rooms) {
            const roomLeft = this.roomLeftRange.pick();
            const roomTop = this.roomTopRange.pick();
            const roomLocation = new Vector2(roomLeft, roomTop);
            const roomWidth = this.roomWidthRange.pick();
            const roomHeight = this.roomHeightRange.pick();
            const roomSize = new Size(roomWidth, roomHeight);
            const roomRegion = Region.createAtPointWithSize(roomLocation, roomSize);

            if (attempts >= 10000) {
                console.warn(`Could generate enough rooms`);
                break;
            }

            if (this.roomRegions.overlaps(roomRegion)) {
                attempts += 1;

            }

            this.roomRegions.push(roomRegion);
            attempts = 0;
        }

        this.roomRegions.setBoundingRegion(this.region);

        const roomRegions = this.roomRegions.toArray();
        for (let firstRoomIndex = 0; firstRoomIndex < roomRegions.length - 1; firstRoomIndex += 1) {
            let secondRoomIndex = firstRoomIndex + 1;
            let firstRoom = roomRegions[firstRoomIndex];
            let secondRoom = roomRegions[secondRoomIndex];

            const firstCenterX = firstRoom.centerX;
            const firstCenterY = firstRoom.centerY;
            const secondCenterX = secondRoom.centerX;
            const secondCenterY = secondRoom.centerY;

            const horizontalCorridor = new Region(
                Math.min(firstCenterX, secondCenterX) - this.corridorWidth / 2,
                firstCenterY - this.corridorWidth / 2,
                Math.max(firstCenterX, secondCenterX) + this.corridorWidth / 2,
                firstCenterY + this.corridorWidth / 2
            );

            const verticalCorridor = new Region(
                secondCenterX - this.corridorWidth / 2,
                Math.min(firstCenterY, secondCenterY) - this.corridorWidth / 2,
                secondCenterX + this.corridorWidth / 2,
                Math.max(firstCenterY, secondCenterY) + this.corridorWidth / 2
            );

            this.roomRegions.push(horizontalCorridor);
            this.roomRegions.push(verticalCorridor);
        }
    }

    public getRoomRegions(): RegionSet {
        return this.roomRegions;
    }

    public isOccupied(region: Region): boolean {
        for (const actor of this.scene.actors) {
            if (actor instanceof FloorActor && actor.region.overlaps(region)) {
                return true;
            }
        }

        return false;
    }

    public pickVacantRegion(size: Size) {
        let attempts = 0;

        while (attempts <= 10000) {
            const coordinates = this.roomRegions.pickCoordinates();
            const pickedRegion = Region.createAtPointWithSize(coordinates, size);

            if (!this.isOccupied(pickedRegion) && this.roomRegions.includes(pickedRegion)) {
                return pickedRegion;
            }

            attempts++;
        }

        throw new Error(`Can't pick a vacant region after a lot of attempts`);
    }
}