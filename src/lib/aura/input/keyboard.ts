import {withoutFirst} from "$lib/aura/utils/arrays";

class Keyboard {
    private downKeys: string[] = [];
    private pressedKeys: string[] = [];

    public startCapturingKeyboardEvents() {
        document.addEventListener("keyup", (event) => this.onKeyUp(event));
        document.addEventListener("keydown", (event) => this.onKeyDown(event));
    }

    public isDown(wantedKey: string) {
        return this.downKeys.includes(wantedKey);
    }

    public isPressed(wantedKey: string) {
        const pressed = this.pressedKeys.includes(wantedKey);

        if (pressed) {
            this.pressedKeys = this.pressedKeys.filter(key => key !== wantedKey);
        }

        return pressed;
    }

    public capturePressedKeys(): string[] {
        const keys = [...this.pressedKeys];
        this.pressedKeys = [];
        return keys;
    }

    public getVerticalMovement(): number {
        let verticalMovement = 0;

        if (this.isDown("w")) {
            verticalMovement -= 1;
        }

        if (this.isDown("s")) {
            verticalMovement += 1;
        }

        return verticalMovement;
    }

    public getHorizontalMovement(): number {
        let horizontalMovement = 0;

        if (this.isDown("a")) {
            horizontalMovement -= 1;
        }

        if (this.isDown("d")) {
            horizontalMovement += 1;
        }

        return horizontalMovement;
    }

    private onKeyDown(keyboardEvent: KeyboardEvent) {
        if (keyboardEvent.repeat) {
            return;
        }

        this.downKeys.push(keyboardEvent.key);
        this.pressedKeys.push(keyboardEvent.key);
    }

    private onKeyUp(keyboardEvent: KeyboardEvent) {
        this.downKeys = this.downKeys.filter(key => key !== keyboardEvent.key);
        this.pressedKeys = this.pressedKeys.filter(key => key !== keyboardEvent.key);
    }
}

export default new Keyboard();