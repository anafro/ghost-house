import type Pixel from "$lib/aura/rendering/pixel";
import type Actor from "$lib/aura/scenes/actor";
import type Vector2 from "$lib/aura/utils/vector-2";
import BlendModes from "$lib/aura/utils/blend-mode";
import type {BlendMode} from "$lib/aura/utils/blend-mode";
import PixelMatrix from "$lib/aura/rendering/pixel-matrix";
import type Size from "$lib/aura/utils/size";

export default abstract class Material {
    private renderCache: PixelMatrix | undefined;
    private readonly blendMode: BlendMode;

    constructor(blendMode: BlendMode = BlendModes.normal) {
        this.blendMode = blendMode;
    }

    public abstract renderAt(actor: Actor, coordinate: Vector2): Pixel | undefined;

    public getBlendMode(): BlendMode {
        return this.blendMode;
    }

    protected setRenderCacheEnabled(size: Size, enableRenderCache: boolean): void {
        if (enableRenderCache && this.isRenderCacheEnabled()) {
            return;
        }

        if (enableRenderCache) {
            this.createAndSetCleanRenderCache(size);
        } else {
            this.removeRenderCache();
        }
    }

    private isRenderCacheEnabled() {
        return this.renderCache !== undefined;
    }

    private createAndSetCleanRenderCache(size: Size) {
        this.renderCache = PixelMatrix.createBlank(size.width, size.height)
    }

    private removeRenderCache() {
        this.renderCache = undefined;
    }

    public getPixelAt(actor: Actor, coordinate: Vector2) {
        if (this.renderCache !== undefined) {
            const cachedPixel = this.renderCache.getPixelAt(coordinate.x, coordinate.y);

            if (cachedPixel !== undefined) {
                return cachedPixel;
            }
        }

        const renderedPixel = this.renderAt(actor, coordinate);

        if (this.renderCache !== undefined) {
            this.renderCache.setPixelAt(coordinate.x, coordinate.y, renderedPixel, BlendModes.normal);
        }

        return renderedPixel;
    }
}