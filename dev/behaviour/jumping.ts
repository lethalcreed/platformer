class Jumping implements Behaviour {

    char: Character;
    private jumpDirection: number = -1;
    private jumpHeight: number = 0;
    private ydirection: string;
    private previous_state: string;
    private xdirection: string;

    constructor(c: Character, prev: string, xdirection: string) {
        this.char = c;
        this.ydirection = "up";
        this.previous_state = prev;
        this.xdirection = xdirection;

        this.char.div.className = "jumping";
    }

    draw() {
        this.char.x += Character.xspeed;
        this.char.y += this.jumpDirection;

        if (this.ydirection == "up") {
            this.jumpHeight++;
            if (this.jumpHeight > 40) {
                this.ydirection = "down";
            }
        } else if (this.ydirection == "down") {
            this.jumpDirection = 1;
            this.jumpHeight--;
            if (this.jumpHeight < -1) {
                this.jumpHeight = 0;
                this.ydirection = "up";
                if (this.previous_state == "running") {
                    this.char.behaviour = new Running(this.char, this.xdirection);
                } else if (this.previous_state == "idle") {
                    this.char.behaviour = new Idle(this.char);
                }
            }
        }
    }

    onKeyDown(e: KeyboardEvent) {

    }
    onKeyUp(e: KeyboardEvent) {
        if (e.keyCode == Enumeration.Keys.RIGHT && this.char.behaviour instanceof Jumping) {

            this.previous_state = "idle";
        }
        if (e.keyCode == Enumeration.Keys.LEFT && this.char.behaviour instanceof Jumping) {

            this.previous_state = "idle";
        }
    }
}