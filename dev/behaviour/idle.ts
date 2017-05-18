class Idle implements Behaviour {
    char: Character;

    constructor(c: Character) {
        this.char = c;
    }

    draw() {
        this.char.xspeed = 0;
        this.char.div.className = "idle";
    }

    onKeyDown(e: KeyboardEvent) {
        if (e.key == ' ' && this.char.behaviour instanceof Idle) {
            this.char.behaviour = new Jumping(this.char, "idle", "idle");
        } else if (e.key == 'ArrowRight' && this.char.behaviour instanceof Idle) {
            this.char.behaviour = new Running(this.char, "right");
        } else if (e.key == 'ArrowLeft' && this.char.behaviour instanceof Idle) {
            this.char.behaviour = new Running(this.char, "left");
        } else if (e.key == 'Control' && this.char.behaviour instanceof Idle) {
            this.char.behaviour = new Dying(this.char);
        }
    }
    onKeyUp(e: KeyboardEvent) {

    }
}