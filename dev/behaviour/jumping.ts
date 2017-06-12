class Jumping implements Behaviour {

    char: Character;
    private previous_state: string;
    private xdirection: string;
    private jumpTrigger: boolean;

    constructor(c: Character, prev: string, xdirection: string) {
        this.char = c;
        this.xdirection = xdirection;
        this.jumpTrigger = true;

        this.char.div.className = "jumping";
    }

    update() {
        if (this.char.keyState[Enumeration.Keys.LEFT]) {
            this.xdirection = "left";
            this.previous_state = "running";
        } else if (this.char.keyState[Enumeration.Keys.RIGHT]) {
            this.xdirection = "right";
            this.previous_state = "running";
        } else {
            this.previous_state = "idle";
        }

        this.draw();

        if (this.char.keyState[Enumeration.Keys.JUMP] == false) {
            if (this.jumpTrigger == false) {
                if (this.previous_state == "running") {
                    this.char.behaviour = new Running(this.char, this.xdirection);
                } else if (this.previous_state == "idle") {
                    this.char.behaviour = new Idle(this.char);
                }
            }
        }
    }

    draw() {
        if (this.jumpTrigger == true) {
            let audio = new Audio('sounds/jump.wav');
            audio.play();
            if (this.xdirection == "idle") {
                Matter.Body.applyForce(this.char.character, { x: 0, y: 0 }, { x: 0, y: -0.035 });
            } if (this.xdirection == "left") {
                Matter.Body.applyForce(this.char.character, { x: 0, y: 0 }, { x: -0.015, y: -0.035 });
            } if (this.xdirection == "right") {
                Matter.Body.applyForce(this.char.character, { x: 0, y: 0 }, { x: 0.015, y: -0.035 });
            }
            this.jumpTrigger = false;
        }


    }


}