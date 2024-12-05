import Vector2 from "$lib/aura/utils/vector-2";
import Size from "$lib/aura/utils/size";
import {randomInt} from "$lib/aura/utils/random";


export default class Region {
    public left: number;
    public top: number;
    public right: number;
    public bottom: number;

    constructor(left: number, top: number, right: number, bottom: number) {
        this.top = Math.floor(Math.min(top, bottom));
        this.left = Math.floor(Math.min(left, right));
        this.bottom = Math.floor(Math.max(top, bottom));
        this.right = Math.floor(Math.max(left, right));
    }

    public static createAtPointWithSize({x, y}: Vector2, {width, height}: Size) {
        return new Region(x, y, x + width, y + height);
    }

    public get width(): number {
        return this.right - this.left;
    }

    public get height(): number {
        return this.bottom - this.top;
    }

    public get size(): Size {
        return new Size(this.width, this.height);
    }

    public get centerX(): number {
        return this.left + Math.floor(this.width / 2);
    }

    public get centerY(): number {
        return this.top + Math.floor(this.height / 2);
    }

    public get center(): Vector2 {
        return new Vector2(this.centerX, this.centerY);
    }

    public getAbsoluteX(relativeX: number): number {
        return relativeX - this.left;
    }

    public getAbsoluteY(relativeY: number): number {
        return relativeY - this.top;
    }

    public getAbsoluteCoordinates({x: relativeX, y: relativeY}: Vector2) {
        return new Vector2(this.getAbsoluteX(relativeX), this.getAbsoluteY(relativeY));
    }

    public getTextureX(relativeX: number): number {
        return relativeX / this.width;
    }

    public getTextureY(relativeY: number): number {
        return relativeY / this.height;
    }

    public getTextureCoordinates(relativeX: number, relativeY: number): Vector2 {
        return new Vector2(this.getTextureX(relativeX), this.getTextureY(relativeY));
    }

    public getResolution(): Vector2 {
        return new Vector2(this.width, this.height);
    }

    public contains(point: Vector2): boolean {
        return this.left <= point.x && point.x < this.right && this.top <= point.y && point.y < this.bottom;
    }

    public overlaps(that: Region): boolean {
        return !(
            this.top > that.bottom ||
            that.top > this.bottom ||
            this.left > that.right ||
            that.left > this.right
        );
    }

    public includes(that: Region): boolean {
        return (
            this.top < that.top &&
            this.left < that.left &&
            this.bottom > that.bottom &&
            this.right > that.right
        );
    }

    public copy(): Region {
        return new Region(this.left, this.top, this.right, this.bottom);
    }

    public subdivide(subdivisionsX: number, subdivisionsY: number): Region[] {
        const width = this.width / (subdivisionsX + 1);
        const height = this.height / (subdivisionsY + 1);
        const regions: Region[] = [];

        for (let subdivisionX = 0; subdivisionX < subdivisionsX + 1; subdivisionX += 1) {
            for (let subdivisionY = 0; subdivisionY < subdivisionsY + 1; subdivisionY += 1) {
                regions.push(new Region(width * subdivisionX, height * subdivisionY, width * (subdivisionX + 1), height * (subdivisionY + 1)))
            }
        }

        return regions;
    }

    public teleport({x: newLeft, y: newTop}: Vector2) {
        const offsetX = newLeft - this.left;
        const offsetY = newTop - this.top;

        this.move(offsetX, offsetY);
    }

    public move(offsetX: number, offsetY: number) {
        this.left += offsetX;
        this.right += offsetX;
        this.top += offsetY;
        this.bottom += offsetY;
    }

    public moved(offsetX: number, offsetY: number) {
        const region = this.copy();
        region.move(offsetX, offsetY);

        return region;
    }

    public resized(factor: number): Region {
        return new Region(
            this.left + (this.width / 2) * (1 - factor),
            this.top + (this.height / 2) * (1 - factor),
            this.right - (this.width / 2) * (1 - factor),
            this.bottom - (this.height / 2) * (1 - factor),
        );
    }

    public contracted(leftContract: number, topContract: number, rightContract: number, bottomContract: number): Region {
        return new Region(this.left + leftContract, this.top + topContract, this.right - rightContract, this.bottom - bottomContract);
    }

    public pickCoordinates(): Vector2 {
        return new Vector2(randomInt(this.left + 1, this.right - 1), randomInt(this.top - 1, this.bottom - 1));
    }

    public toCoordinates(): Vector2 {
        return new Vector2(this.left, this.top);
    }
}