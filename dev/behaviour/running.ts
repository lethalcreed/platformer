class Running implements Behaviour {

    char: Character;
    private direction: string;

    constructor(c: Character, direction: string) {
        this.char = c;
        this.char.div.className = "running";
        this.direction = direction;

        if (this.direction == "right") {
            this.char.xspeed = 2;
        } else if (this.direction == "left") {
            this.char.xspeed = -2;
        }
    }

    update() {
        if (this.char.keyState[32]) {
            this.char.behaviour = new Jumping(this.char, "running", this.direction);
        } else if (this.char.keyState[37]) {
            this.char.xspeed = -2;
        } else if (this.char.keyState[39]) {
            this.char.xspeed = 2;
        } else {
            this.char.xspeed = 0;
            this.char.behaviour = new Idle(this.char);
        }
    }

    draw() {
        this.char.x += this.char.xspeed;
    }
}