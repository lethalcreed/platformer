class Character{
    
    public behaviour: Behaviour;
    public div: HTMLElement;
    public x: number;
    public y: number;
    public hat: Hat;
    public width: number;
    public height: number;
    public keyState: any = {};
    public character: any;

    constructor(parent: HTMLElement) {
        this.behaviour = new Idle(this);
        this.div = document.createElement("character");
        parent.appendChild(this.div);


        this.character = Matter.Bodies.rectangle(65, 350, 24, 40, { inertia: Infinity, friction: 0, frictionAir: 0.1 });

        this.width = 24;
        this.height = 40;

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
        this.x = this.character.position.x;
        this.y = this.character.position.y;
        this.behaviour.update();
        this.div.style.transform = "translate(" + this.x + "px," + this.y + "px)";
        this.hat.draw();
    }
}