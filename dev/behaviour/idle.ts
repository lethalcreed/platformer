class Idle implements Behaviour {
    char: Character;

    constructor(c: Character) {
        this.char = c;
    }

    update() {
        if (this.char.keyState[32]) {
            this.char.behaviour = new Jumping(this.char, "idle", "idle");
        } else if (this.char.keyState[37]) {
            this.char.behaviour = new Running(this.char, "left");
        } else if (this.char.keyState[39]) {
            this.char.behaviour = new Running(this.char, "right");
        } else if (this.char.keyState[17]) {
            this.char.behaviour = new Dying(this.char);
        }
    }

    draw() {
        this.char.xspeed = 0;
        this.char.div.className = "idle";
    }
}