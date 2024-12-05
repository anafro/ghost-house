import type {FurnitureContent} from "$lib/ghost-house/actors/furniture-actor";

export default class FurnitureContentDistributor {
    private ghosts: number;
    private items: number;

    constructor(ghosts: number, items: number) {
        this.ghosts = ghosts;
        this.items = items;
    }

    public nextContent(): FurnitureContent {
        if (this.ghosts > 0) {
            this.ghosts--;
            return "ghost";
        }

        if (this.items > 0) {
            this.items--;
            return "item";
        }

        return "empty";
    }
}