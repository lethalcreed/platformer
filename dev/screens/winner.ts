/// <reference path="basescreen.ts"/>

class Winner extends BaseScreen {

    private win;

    constructor() {
        super('win');

        Game.audio.pause();
        this.win = new Audio('sounds/win.wav');
        this.win.play();

        let score = document.createElement("finalScore");
        this.div.appendChild(score);
        score.innerHTML = "You got all the coins!"

        let btn = document.createElement("gamebutton");
        this.div.appendChild(btn);
        btn.innerHTML = "Naar menu!";

        // click
        btn.addEventListener("click", this.onClick.bind(this));

    }

    private onClick(): void {
        this.win.pause();
        this.div.remove();
        Game.getInstance().showStartScreen();
    }
}