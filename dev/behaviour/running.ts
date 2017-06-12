class Running implements Behaviour {

    char: Character;
    private direction: string;

    constructor(c: Character, direction: string) {
        this.char = c;
        this.char.div.className = "running";
        this.direction = direction;

        if (this.direction == "right") {
            // Character.xspeed = 1;

        } else if (this.direction == "left") {
            // Character.xspeed = -1;

        }
    }
    // draw() {
    //     this.char.x += Character.xspeed;
    // }
    update() {
        if (this.char.keyState[Enumeration.Keys.JUMP]) {
            this.char.behaviour = new Jumping(this.char, "running", this.direction);
        } else if (this.char.keyState[Enumeration.Keys.LEFT]) {
            // Character.xspeed = -1;
            Matter.Body.applyForce(this.char.character, { x: 0, y: 0 }, { x: -0.001, y: 0 })
        } else if (this.char.keyState[Enumeration.Keys.RIGHT]) {
            // Character.xspeed = 1;
            Matter.Body.applyForce(this.char.character, { x: 0, y: 0 }, { x: 0.001, y: 0 })
        } else {
            this.char.behaviour = new Idle(this.char);
        }
    }

}