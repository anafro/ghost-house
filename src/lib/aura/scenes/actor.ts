import Vector2 from "$lib/aura/utils/vector-2";
import Scene from "$lib/aura/scenes/scene";
import Region from "$lib/aura/utils/region";
import type Pixel from "$lib/aura/rendering/pixel";
import PixelMatrix from "$lib/aura/rendering/pixel-matrix";
import type Material from "$lib/aura/rendering/material";
import BlendModes from "$lib/aura/utils/blend-mode";
import type Game from "$lib/aura/scenes/game";
import type Size from "$lib/aura/utils/size";
import SpriteMaterial from "$lib/aura/materials/sprite-material";

export default class Actor {
    scene: Scene;
    public region: Region;
    material: Material;

    constructor(scene: Scene, region: Region | Vector2, material: Material | SpriteMaterial) {
        this.scene = scene;
        this.material = material;
        this.scene.addActor(this);

        if (region instanceof Vector2 && material instanceof SpriteMaterial) {
            this.region = Region.createAtPointWithSize(region, material.size);
        } else {
            this.region = region instanceof Vector2 ? region.toRegion() : region;
        }
    }

    public start(): void {}
    public update(): void {}
    public cleanUp(): void {}

    public renderAt(x: number, y: number): Pixel | undefined {
        return this.material.getPixelAt(this, new Vector2(x, y));
    }

    public render(): PixelMatrix {
        const renderMatrix: PixelMatrix = PixelMatrix.createBlank(this.region.width, this.region.height);

        for (let y = 0; y < this.region.height; y += 1) {
            for (let x = 0; x < this.region.width; x += 1) {
                renderMatrix.setPixelAt(x, y, this.renderAt(x, y), BlendModes.normal);
            }
        }

        return renderMatrix;
    }

    public destroy(): void {
        this.scene.destroy(this);
    }

    public getRegion(): Region {
        return this.region;
    }

    public getMaterial(): Material {
        return this.material;
    }

    protected get game(): Game {
        return this.scene.game;
    }
}