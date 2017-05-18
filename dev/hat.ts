class Hat {
    private div: HTMLElement;
    private x: number;
    public y: number;

    public speed: number;

    constructor(parent: HTMLElement) {
        this.div = document.createElement("hat");
        parent.appendChild(this.div);

        this.x = 0;
        this.y = 3;
        this.speed = 0;
    }

    public draw(): void {
        this.y += this.speed;
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    }
}