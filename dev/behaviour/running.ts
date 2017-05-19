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

    draw() {
        this.char.x += this.char.xspeed;
    }

    onKeyDown(e: KeyboardEvent) {
        if (e.key == 'ArrowRight' && this.char.behaviour instanceof Running) {
            this.char.xspeed = 2;
        }
        if (e.key == 'ArrowLeft' && this.char.behaviour instanceof Running) {
            this.char.xspeed = -2;
        }
        if (e.key == ' ' && this.char.behaviour instanceof Running) {
            this.char.behaviour = new Jumping(this.char, "running", this.direction);
        }
    }

    onKeyUp(e: KeyboardEvent) {
        if (e.key == 'ArrowRight' && this.char.behaviour instanceof Running) {
            this.char.xspeed = 0;
            this.char.behaviour = new Idle(this.char);
        }
        if (e.key == 'ArrowLeft' && this.char.behaviour instanceof Running) {
            this.char.xspeed = 0;
            this.char.behaviour = new Idle(this.char);
        }
    }
}