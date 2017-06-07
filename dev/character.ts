class Character {
    public behaviour: Behaviour;

    public div: HTMLElement;
    public x: number;
    public y: number;
    public hat: Hat;
    public static xspeed: number;
    public yspeed: number;
    public width: number;
    public height: number;
    public keyState: any = {};

    constructor(parent: HTMLElement) {
        this.div = document.createElement("character");
        parent.appendChild(this.div);

        this.behaviour = new Idle(this);

        this.width = 24;
        this.height = 40;
        Character.xspeed = 0;
        this.yspeed = 0;
        // Base 1 (background) start values
        // this.x = 100;
        // this.y = 402;

        // Base 2 (background) start values
        this.x = 50;
        this.y = 465;

        this.hat = new Hat(this.div);

        window.addEventListener('keydown', this.onKeyDown.bind(this));
        window.addEventListener('keyup', this.onKeyUp.bind(this));
    }

    private onKeyDown(e: KeyboardEvent): void {
        this.keyState[e.keyCode || e.which] = true;
    }

    private onKeyUp(e: KeyboardEvent): void {
        this.keyState[e.keyCode || e.which] = false;
    }

    public draw(): void {
        this.behaviour.update();
        this.behaviour.draw();
        this.div.style.transform = "translate(" + this.x + "px," + this.y + "px)";
        this.hat.draw();
    }
}