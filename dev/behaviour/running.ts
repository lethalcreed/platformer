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

<<<<<<< HEAD
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
=======
    update() {
        if (this.char.keyState[32]) {
            this.char.behaviour = new Jumping(this.char, "running", this.direction);
        } else if (this.char.keyState[37]) {
            this.char.xspeed = -2;
        } else if (this.char.keyState[39]) {
            this.char.xspeed = 2;
        } else {
            this.char.xspeed = 0;
>>>>>>> 4f5d8f9d6b597017ddd7a0a910f26ebf604f5826
            this.char.behaviour = new Idle(this.char);
        }
    }

    draw() {
        this.char.x += this.char.xspeed;
    }
}