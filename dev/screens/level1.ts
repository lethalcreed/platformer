/// <reference path="basescreen.ts"/>

class Level1 extends BaseScreen {

    private character: Character;

    constructor() {
        super("level1");
        Game.audio = new Audio("sounds/level1.mp3");
        // Game.audio.play();
        Game.audio.loop = true;
        this.div.id = "current_level";
        this.character = new Character(this.div);

        requestAnimationFrame(() => this.gameLoop());
    }

    private gameLoop() {
        this.character.draw();
        requestAnimationFrame(() => this.gameLoop());
    }
}