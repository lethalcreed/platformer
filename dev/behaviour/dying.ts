class Dying implements Behaviour {

    char: Character;
    private jumpHeight: number = 0;
    private direction: string = "up";

    constructor(c: Character) {
        this.char = c;

        this.char.div.className = "dying";
    }

    update() {
        if (this.direction == "up") {
            if (this.jumpHeight == 0) {
                Game.audio.pause();
                let audio = new Audio('sounds/dead.wav');
                audio.play();
                Matter.Body.applyForce(this.char.character, { x: 0, y: 0 }, { x: 0, y: -0.05 });0
            }
            this.jumpHeight++;
            if (this.jumpHeight > 60) {
                Game.getInstance().gameOver();
            }
        }
    }
}