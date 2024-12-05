import {createMatrix} from "$lib/aura/utils/arrays";
import {updated} from "$app/stores";

class Actions {
    private actions: ([string, () => any] | undefined)[][];
    private selectedActionLoopingIndex = 0;

    constructor() {
        this.actions = [[undefined, undefined], [undefined, undefined]];
        this.clearActions();
    }

    public clearActions(): void {
        this.actions = createMatrix(2, 2);
    }

    public setActions(actions: ([string, () => any] | undefined)[][]) {
        console.debug("Requested an action change: ", actions);

        this.actions = actions;
        this.selectedActionLoopingIndex = 0;
    }

    public isActionSelected(x: number, y: number): boolean {
        const selectedActionIndex = this.getSelectedActionIndex();
        const selectedActionX = selectedActionIndex & 1;
        const selectedActionY = selectedActionIndex >> 1;

        return x === selectedActionX && y === selectedActionY;
    }

    public doSelectedAction(): void {
        const selectedAction = this.getSelectedAction();

        if (selectedAction === undefined) {
            return;
        }

        const [_, actionFunction] = selectedAction;
        actionFunction();
    }

    public getSelectedAction(): ([string, () => any] | undefined) {
        const selectedActionIndex = this.getSelectedActionIndex();
        const selectedActionX = selectedActionIndex & 1;
        const selectedActionY = selectedActionIndex >> 1;

        return this.actions[selectedActionY][selectedActionX];
    }

    public selectNext() {
        if (this.isEmpty()) {
            return;
        }

        do {
            this.selectedActionLoopingIndex++;
        } while (this.getSelectedAction() === undefined)
    }

    public toMatrix(): ([string, () => any] | undefined)[][] {
        return this.actions;
    }

    public getSelectedActionIndex() {
        return this.selectedActionLoopingIndex % 4;
    }

    public isEmpty(): boolean {
        return this.actions.flat().every(action => action === undefined);
    }
}

export default new Actions();