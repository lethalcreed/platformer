/// <reference path="basescreen.ts"/>

class GameOver extends BaseScreen {
    constructor() {
        super('gameover');
        let btn = document.createElement("gamebutton");
        this.div.appendChild(btn);
        btn.innerHTML = "Probeer opnieuw!";

        // click
        btn.addEventListener("click", this.onClick.bind(this));

    }

    private onClick(): void {
        console.log("retry");
        this.div.remove();
        Game.getInstance().showStartScreen();
    }
}