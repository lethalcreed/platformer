/// <reference path="basescreen.ts"/>

class StartScreen extends BaseScreen {
    constructor() {
        super('start');

        Game.audio = new Audio('sounds/menu.mp3');
        // Game.audio.play();
        Game.audio.loop = true;

        // sub elementen in de screen div. dan kunnen we alles in 1x weghalen
        let btn = document.createElement("gamebutton");
        this.div.appendChild(btn);
        btn.innerHTML = "START DE GAME!";

        let character = document.createElement("start_character");
        this.div.appendChild(character);

        // click
        btn.addEventListener("click", this.onStartClick.bind(this));

    }

    private onStartClick(): void {
        let startsound = new Audio('sounds/start.ogg');
        startsound.play();
        this.div.remove();
        Game.getInstance().showLevel1();
    }
}