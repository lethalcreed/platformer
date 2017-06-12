/// <reference path="basescreen.ts"/>

class Level1 extends BaseScreen implements Observable {

    private character: Character;
    private gameObjects: Array<GameObject>;
    private deathttrigger: Boolean = false;
    private platforms: Array<any>;
    private platformdivs: Array<Platform>;
    private score: Score;

    public engine: Matter.Engine;
    public world: Matter.World;
    public observers: Array<Observer> = [];

    constructor() {
        super("level1");

        this.div.id = "current_level";
        this.character = new Character(this.div);
        this.score = new Score(this.div, this, 5);
        this.gameObjects = new Array<GameObject>();
        this.platforms = new Array<Matter.Bodies>();
        this.platformdivs = new Array<Platform>();

        this.engine = Matter.Engine.create();

        // Coins
        this.gameObjects.push(new Coin(this.div, 150, 485));
        this.gameObjects.push(new Coin(this.div, 750, 515));
        this.gameObjects.push(new Coin(this.div, 357, 415));
        this.gameObjects.push(new Coin(this.div, 450, 325));
        this.gameObjects.push(new Coin(this.div, 770, 325));

        // Enemies
        this.gameObjects.push(new Spike(this.div, 415, 515));
        this.gameObjects.push(new Spike(this.div, 680, 515));
        this.gameObjects.push(new Spike(this.div, 225, 420));


        this.platformdivs.push(new Platform(this.div, 70, 500, 95, 20));
        this.platformdivs.push(new Platform(this.div, 220, 500, 95, 20));
        this.platformdivs.push(new Platform(this.div, 145, 430, 180, 20));
        this.platformdivs.push(new Platform(this.div, 555, 525, 500, 20));
        this.platformdivs.push(new Platform(this.div, 775, 465, 100, 20));
        this.platformdivs.push(new Platform(this.div, 565, 450, 50, 20));
        this.platformdivs.push(new Platform(this.div, 450, 425, 75, 20));


        for (let platformDiv of this.platformdivs) {
            this.platforms.push(platformDiv.MatterBody);
        }
        this.platforms.push(this.character.character);
        Matter.World.add(this.engine.world, this.platforms);

        requestAnimationFrame(() => this.gameLoop());
    }

    private gameLoop() {
        this.character.draw();
        this.run();

        let gameObjectCounter = 0;

        for (let platform of this.platformdivs) {
            platform.draw();
        }
        for (let gameObject of this.gameObjects) {
            gameObject.draw();
            if (Utilities.checkPlayerColission(this.character, gameObject)) {
                if (this.deathttrigger == false && gameObject instanceof Spike) {
                    this.character.behaviour = new Dying(this.character);
                    this.deathttrigger = true;
                }
                if (gameObject instanceof Coin) {
                    gameObject.div.remove();
                    this.gameObjects.splice(gameObjectCounter, 1);
                    this.score.notify();
                }
            }
            if (Utilities.checkPlayerColission(this.character, gameObject) == false) {
                gameObjectCounter++;
            }
        }
        if (this.character.y >= 600 && this.deathttrigger == false) {
            this.character.behaviour = new Dying(this.character);
        }

        requestAnimationFrame(() => this.gameLoop());
    }

    private run() {
        Matter.Engine.update(this.engine, 1000 / 60);

    }

    public subscribe(o: Observer): void {
        this.observers.push(o);
    }

    public unsubscribe(): void {

    }


}