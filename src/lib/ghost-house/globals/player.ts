export class Player {
    health: number = 10;
    private level: number = 0;
    private insanity: number = 0;
    private strength: number = 1;

    public hit(): void {
        this.health -= 1;
    }

    public heal(healPoints: number = 1): void {
        this.health += healPoints;
    }

    public isDead(): boolean {
        return this.health <= 0;
    }
}

export default new Player();