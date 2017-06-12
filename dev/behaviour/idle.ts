class Idle implements Behaviour {
    char: Character;

    constructor(c: Character) {
        this.char = c;
    }

    update() {
        this.char.div.className = "idle";
        if (this.char.keyState[Enumeration.Keys.JUMP]) {
            this.char.behaviour = new Jumping(this.char, "idle", "idle");
        } else if (this.char.keyState[Enumeration.Keys.LEFT]) {
            this.char.behaviour = new Running(this.char, "left");
        } else if (this.char.keyState[Enumeration.Keys.RIGHT]) {
            this.char.behaviour = new Running(this.char, "right");
        } 
    }

}