class Running implements Behaviour {
    char: Character;

    private direction: string;

    constructor(c: Character, direction: string) {
        this.char = c;
        this.char.div.className = "running";
        this.direction = direction;

        if (this.direction == "right") {
            Character.xspeed = 1;
        } else if (this.direction == "left") {
            Character.xspeed = -1;
        }
    }

    draw() {
        this.char.x += Character.xspeed;
    }

    onKeyDown(e: KeyboardEvent) {
        if (e.keyCode == Enumeration.Keys.RIGHT && this.char.behaviour instanceof Running) {
            Character.xspeed = 1;
        }
        if (e.keyCode == Enumeration.Keys.LEFT && this.char.behaviour instanceof Running) {
            Character.xspeed = -1;
        }
        if (e.keyCode == Enumeration.Keys.JUMP && this.char.behaviour instanceof Running) {
            this.char.behaviour = new Jumping(this.char, "running", this.direction);
        }
    }

    onKeyUp(e: KeyboardEvent) {
        if (e.keyCode == Enumeration.Keys.RIGHT && this.char.behaviour instanceof Running) {
            Character.xspeed = 0;
            this.char.behaviour = new Idle(this.char);
        }
        if (e.keyCode == Enumeration.Keys.LEFT && this.char.behaviour instanceof Running) {
            Character.xspeed = 0;
            this.char.behaviour = new Idle(this.char);
        }
    }
}