class Idle implements Behaviour {
    char: Character;

    constructor(c: Character) {
        this.char = c;
    }

<<<<<<< HEAD
    draw() {
        Character.xspeed = 0;
        this.char.div.className = "idle";
    }

    onKeyDown(e: KeyboardEvent) {
        if (e.keyCode == Enumeration.Keys.JUMP && this.char.behaviour instanceof Idle) {
            this.char.behaviour = new Jumping(this.char, "idle", "idle");
        } else if (e.keyCode == Enumeration.Keys.RIGHT && this.char.behaviour instanceof Idle) {
            this.char.behaviour = new Running(this.char, "right");
        } else if (e.keyCode == Enumeration.Keys.LEFT && this.char.behaviour instanceof Idle) {
            this.char.behaviour = new Running(this.char, "left");
=======
    update() {
        if (this.char.keyState[32]) {
            this.char.behaviour = new Jumping(this.char, "idle", "idle");
        } else if (this.char.keyState[37]) {
            this.char.behaviour = new Running(this.char, "left");
        } else if (this.char.keyState[39]) {
            this.char.behaviour = new Running(this.char, "right");
        } else if (this.char.keyState[17]) {
            this.char.behaviour = new Dying(this.char);
>>>>>>> 4f5d8f9d6b597017ddd7a0a910f26ebf604f5826
        }
    }

    draw() {
        this.char.xspeed = 0;
        this.char.div.className = "idle";
    }
}