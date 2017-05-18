/// <reference path="screens/startscreen.ts"/>

class Game {
    private screen: any;

    private static instance: Game;
    private score:number = 0;
    public static audio;

    private constructor() {

    }

    public static getInstance() {
        if (!Game.instance) {
            Game.instance = new Game();
            Game.instance.showStartScreen();
        }
        return Game.instance;
    }

    public showStartScreen(): void {
        this.screen = new StartScreen();
    }

    public showLevel1(): void {
        this.screen = new Level1();
    }

    public gameOver():void{
        document.getElementById("current_level").remove();  
        Game.audio.pause();  
        this.screen = new GameOver();
    }

}