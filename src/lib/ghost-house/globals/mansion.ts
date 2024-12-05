import necronomicon from "$lib/ghost-house/globals/necronomicon";
import {translate} from "$lib/aura/math/translate";

class Mansion {
    currentFloor: number = 1;
    readonly floors: number = 6;

    public isAtLastFloor(): boolean {
        return this.currentFloor >= this.floors;
    }

    public goUpstairs(): void {
        if (this.isAtLastFloor()) {
            throw new Error(`Can't go upstairs, cuz you are already at the last floor.`);
        }

        this.currentFloor += 1;
    }

    public setCurrentFloor(floor: number): void {
        this.currentFloor = floor;
    }

    public getCurrentFloor(): number {
        return this.currentFloor;
    }

    public getFloorSceneName(): string {
        return `Floor #${this.currentFloor}`;
    }

    public getNextFloorSceneName(): string {
        return (this.currentFloor + 1) === this.floors ? `Congratulation` : `Floor #${this.currentFloor + 1}`;
    }

    public getFloors(): number {
        return this.floors;
    }
}

export default new Mansion();