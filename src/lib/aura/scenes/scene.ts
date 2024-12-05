import type Actor from "$lib/aura/scenes/actor";
import Region from "$lib/aura/utils/region";
import PixelMatrix from "$lib/aura/rendering/pixel-matrix";
import type Game from "$lib/aura/scenes/game";

export default class Scene {
    public readonly game: Game;
    public readonly region: Region;
    actors: Set<Actor>;

    constructor(game: Game, width: number, height: number) {
        this.game = game;
        this.region = new Region(0, 0, width, height);
        this.actors = new Set();
    }

    public render(): PixelMatrix {
        const sceneRenderMatrix: PixelMatrix = PixelMatrix.createBlank(this.width, this.height);

        for (const actor of this.actors) {
            const actorRenderMatrix: PixelMatrix = actor.render();
            const actorRegion: Region = actor.getRegion();

            for (let relativeY = actorRegion.top; relativeY < actorRegion.bottom; relativeY += 1) {
                for (let relativeX = actorRegion.left; relativeX < actorRegion.right; relativeX += 1) {
                    const absoluteX = actorRegion.getAbsoluteX(relativeX);
                    const absoluteY = actorRegion.getAbsoluteY(relativeY);
                    const actorPixel = actorRenderMatrix.getPixelAt(absoluteX, absoluteY);

                    if (actorPixel === undefined || actorPixel.character === '\0') {
                        continue;
                    }

                    sceneRenderMatrix.setPixelAt(relativeX, relativeY, actorPixel, actor.getMaterial().getBlendMode());
                }
            }
        }

        return sceneRenderMatrix;
    }

    public destroy(actor: Actor): void {
        this.actors.delete(actor);
    }

    public start(): void {
        for (const actor of this.actors) {
            actor.start();
        }
    }

    public update(): void {
        for (const actor of this.actors) {
            actor.update();

            if (this.game.isSkippingUpdates) {
                break;
            }
        }
    }

    public cleanUp(): void {
        for (const actor of this.actors) {
            actor.cleanUp();
        }
    }

    public addActor(actor: Actor) {
        this.actors.add(actor);
    }

    public get width(): number {
        return this.region.width;
    }

    public get height(): number {
        return this.region.height;
    }
}