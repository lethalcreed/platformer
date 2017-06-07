class Idle implements Behaviour {
    char: Character;

    constructor(c: Character) {
        this.char = c;
    }

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
        }
    }
    onKeyUp(e: KeyboardEvent) {

    }
}