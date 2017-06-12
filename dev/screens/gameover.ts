/// <reference path="basescreen.ts"/>

class GameOver extends BaseScreen {

    private gameover;

    constructor() {
        super('gameover');

        Game.audio.pause();
        this.gameover = new Audio('sounds/gameover.wav');
        this.gameover.play();
        this.gameover.loop = true;

        let btn = document.createElement("gamebutton");
        this.div.appendChild(btn);
        btn.innerHTML = "Probeer opnieuw!";

        // click
        btn.addEventListener("click", this.onClick.bind(this));

    }

    private onClick(): void {
        this.gameover.pause();
        this.div.remove();
        Game.getInstance().showStartScreen();
    }
}