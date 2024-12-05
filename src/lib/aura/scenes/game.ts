import type Scene from "$lib/aura/scenes/scene";
import Time from "$lib/aura/time/time";
import PixelMatrix from "$lib/aura/rendering/pixel-matrix";
import CanvasRenderer from "$lib/aura/rendering/canvas-renderer";
import keyboard from "$lib/aura/input/keyboard";

export default class Game {
    public readonly name: string;
    private scenes: Map<string, Scene>;
    private loadedScene: Scene | undefined;
    private readonly fps: number = 60;
    private gameLoopInterval: number | undefined;
    private canvasRenderer: CanvasRenderer;
    private isDebugEnabled: boolean;
    public isSkippingUpdates: boolean;

    constructor(name: string, canvas: HTMLCanvasElement) {
        this.name = name;
        this.scenes = new Map();
        this.loadedScene = undefined;
        this.canvasRenderer = new CanvasRenderer(canvas, "Consolas", 32, 2, 1);
        this.isDebugEnabled = false;
        this.isSkippingUpdates = false;

        keyboard.startCapturingKeyboardEvents();
    }

    public addScene(name: string, newScene: Scene): void {
        this.scenes.set(name, newScene);
    }

    public loadScene(name: string): void {
        this.isSkippingUpdates = true;
        const sceneToLoad: Scene | undefined = this.scenes.get(name);

        if (sceneToLoad === undefined) {
            throw new Error(`A scene "${name}" is not in the game. You probably forgot to add it via game.addScene(), didn't you?`);
        }

        if (this.loadedScene !== undefined) {
            this.loadedScene.cleanUp();
        }

        this.loadedScene = sceneToLoad;
        this.canvasRenderer.updateCanvasSizeToFitScene(this.loadedScene);
        sceneToLoad.start();
        this.isSkippingUpdates = false;
    }

    public run(): void {
        const updateDelay: number = 1000 / this.fps;
        let previousTime: number = Date.now();
        let lagTime: number = 0.0;

        this.gameLoopInterval = setInterval(() => {
            if (this.isSkippingUpdates) {
                return;
            }

            if (this.loadedScene === undefined) {
                clearInterval(this.gameLoopInterval);
                throw new Error(`You can't run the game loop without loading a single scene. Load one with game.loadScene();`);
            }

            let currentTime: number = Date.now();
            let elapsedTime: number = currentTime - previousTime;

            previousTime = currentTime;
            lagTime += elapsedTime;
            Time.setCurrentTime(currentTime);

            try {
                while (lagTime >= updateDelay) {
                    this.loadedScene.update();
                    lagTime -= updateDelay;
                }

                const pixelMatrix = this.render();
                this.canvasRenderer.render(pixelMatrix);
            } catch (error) {
                clearInterval(this.gameLoopInterval);

                if (this.isDebugEnabled) {
                    alert("There's an error happened. Press F12 to see what went wrong.");
                }

                throw error;
            }
        }, 0);
    }

    public setDebugEnabled(enableDebug: boolean): void {
        this.isDebugEnabled = enableDebug;
    }

    private render(): PixelMatrix {
        if (this.loadedScene === undefined) {
            throw new Error(`You can't render the game without loading a single scene. Load one with game.loadScene();`);
        }

        return this.loadedScene.render();
    }
}