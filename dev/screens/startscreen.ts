/// <reference path="basescreen.ts"/>

class StartScreen extends BaseScreen {
    constructor() {
        super('start');

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
        this.div.remove();
        Game.getInstance().showLevel1();
    }
}