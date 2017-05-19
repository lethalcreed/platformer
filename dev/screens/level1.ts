/// <reference path="basescreen.ts"/>

class Level1 extends BaseScreen {

    private character: Character;
    private spikes: Array<Spike>;
    private deathttrigger: Boolean = false;

    constructor() {
        super("level1");
        Game.audio = new Audio("sounds/level1.mp3");
        Game.audio.play();
        Game.audio.loop = true;
        this.div.id = "current_level";
        this.character = new Character(this.div);
        this.spikes = new Array<Spike>();

        for (let i = 0; i < 3; i++) {
            this.spikes.push(new Spike(this.div, (200 + (i * 200)), 485));
        }

        requestAnimationFrame(() => this.gameLoop());
    }

    private gameLoop() {
        this.character.draw();
        for (let spike of this.spikes) {
            spike.draw();
            if (Utilities.checkPlayerColission(this.character, spike)) {
                if (this.deathttrigger == false) {
                    this.character.behaviour = new Dying(this.character);
                    this.deathttrigger = true;
                }
            }
        }
        requestAnimationFrame(() => this.gameLoop());
    }
}