class Platform {

    public MatterBody: any;
    public x: number;
    public y: number;
    public w: number;
    public h: number;
    private div: HTMLElement;

    constructor(parent: HTMLElement, x: number, y: number, w: number, h: number) {

        this.MatterBody = Matter.Bodies.rectangle(x, y, w, h, { isStatic: true, friction: 0 })

        this.div = document.createElement("platform");
        this.div.style.width = w + "px";
        this.div.style.height = h + "px";
        parent.appendChild(this.div);
    }

    draw(): void {
        this.x = this.MatterBody.position.x - 35;
        this.y = this.MatterBody.position.y;
        this.div.style.transform = "translate(" + this.x + "px," + this.y + "px)";
    }

}