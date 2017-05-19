class Character {
    public behaviour: Behaviour;

    public div: HTMLElement;
    public x: number;
    public y: number;
    public hat: Hat;
    public xspeed: number;
    public yspeed: number;
    public width:number;
    public height: number;

    constructor(parent: HTMLElement) {
        this.div = document.createElement("character");
        parent.appendChild(this.div);

        this.behaviour = new Idle(this);

        this.width = 24;
        this.height = 40;
        this.xspeed = 0;
        this.yspeed = 0;
        // Base 1 values
        // this.x = 100;
        // this.y = 402;

        // Base 2 values
        this.x = 50;
        this.y = 465;

        this.hat = new Hat(this.div);

        window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e));
        window.addEventListener("keyup", (e: KeyboardEvent) => this.onKeyUp(e));
    }

    private onKeyDown(e: KeyboardEvent): void {
        this.behaviour.onKeyDown(e);
    }
        private onKeyUp(e: KeyboardEvent): void {
        this.behaviour.onKeyUp(e);
    }
    public draw(): void {
        this.behaviour.draw();

        this.div.style.transform = "translate(" + this.x + "px," + this.y + "px)";
        this.hat.draw();
    }
}