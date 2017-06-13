var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Character = (function () {
    function Character(parent) {
        this.keyState = {};
        this.behaviour = new Idle(this);
        this.div = document.createElement("character");
        parent.appendChild(this.div);
        this.character = Matter.Bodies.rectangle(65, 350, 24, 40, { inertia: Infinity, friction: 0, frictionAir: 0.1 });
        this.width = 24;
        this.height = 40;
        this.hat = new Hat(this.div);
        window.addEventListener('keydown', this.onKeyDown.bind(this));
        window.addEventListener('keyup', this.onKeyUp.bind(this));
    }
    Character.prototype.onKeyDown = function (e) {
        this.keyState[e.keyCode || e.which] = true;
    };
    Character.prototype.onKeyUp = function (e) {
        this.keyState[e.keyCode || e.which] = false;
    };
    Character.prototype.draw = function () {
        this.x = this.character.position.x;
        this.y = this.character.position.y;
        this.behaviour.update();
        this.div.style.transform = "translate(" + this.x + "px," + this.y + "px)";
        this.hat.draw();
    };
    return Character;
}());
var Enumeration;
(function (Enumeration) {
    (function (Keys) {
        Keys[Keys["LEFT"] = 37] = "LEFT";
        Keys[Keys["RIGHT"] = 39] = "RIGHT";
        Keys[Keys["JUMP"] = 32] = "JUMP";
    })(Enumeration.Keys || (Enumeration.Keys = {}));
    var Keys = Enumeration.Keys;
})(Enumeration || (Enumeration = {}));
var BaseScreen = (function () {
    function BaseScreen(name) {
        this.div = document.createElement(name);
        this.container = document.getElementById('container');
        this.container.appendChild(this.div);
    }
    return BaseScreen;
}());
var StartScreen = (function (_super) {
    __extends(StartScreen, _super);
    function StartScreen() {
        _super.call(this, 'start');
        Game.audio = new Audio('sounds/menu.mp3');
        Game.audio.play();
        Game.audio.loop = true;
        var btn = document.createElement("gamebutton");
        this.div.appendChild(btn);
        btn.innerHTML = "START DE GAME!";
        var character = document.createElement("start_character");
        this.div.appendChild(character);
        btn.addEventListener("click", this.onStartClick.bind(this));
    }
    StartScreen.prototype.onStartClick = function () {
        var startsound = new Audio('sounds/start.ogg');
        startsound.play();
        this.div.remove();
        Game.getInstance().showLevel1();
    };
    return StartScreen;
}(BaseScreen));
var Game = (function () {
    function Game() {
        this.score = 0;
    }
    Game.getInstance = function () {
        if (!Game.instance) {
            Game.instance = new Game();
            Game.instance.showStartScreen();
        }
        return Game.instance;
    };
    Game.prototype.showStartScreen = function () {
        this.screen = new StartScreen();
    };
    Game.prototype.showLevel1 = function () {
        this.screen = new Level1();
    };
    Game.prototype.gameOver = function () {
        document.getElementById("current_level").remove();
        Game.audio.pause();
        this.screen = new GameOver();
    };
    Game.prototype.win = function () {
        document.getElementById("current_level").remove();
        Game.audio.pause();
        this.screen = new Winner();
    };
    return Game;
}());
var Hat = (function () {
    function Hat(parent) {
        this.div = document.createElement("hat");
        parent.appendChild(this.div);
        this.x = 0;
        this.y = 3;
        this.speed = 0;
    }
    Hat.prototype.draw = function () {
        this.y += this.speed;
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    };
    return Hat;
}());
window.addEventListener("load", function () {
    Game.getInstance();
});
var Score = (function () {
    function Score(parent, ref, goal) {
        this.coins = 0;
        ref.subscribe(this);
        this.goal = goal;
        this.score = document.createElement("score");
        this.score.innerHTML = "Coins: 0/" + this.goal;
        parent.appendChild(this.score);
    }
    Score.prototype.notify = function () {
        var audio = new Audio('sounds/coin.wav');
        audio.play();
        this.coins++;
        this.score.innerHTML = "Coins: " + this.coins + "/" + this.goal;
        if (this.coins == this.goal) {
            Game.getInstance().win();
        }
    };
    return Score;
}());
var Utilities = (function () {
    function Utilities() {
    }
    Utilities.checkPlayerColission = function (p, o) {
        return (p.x < o.x + o.width &&
            p.x + p.width > o.x &&
            p.y < o.y + o.height &&
            p.height + p.y > o.y);
    };
    return Utilities;
}());
var Dying = (function () {
    function Dying(c) {
        this.jumpHeight = 0;
        this.direction = "up";
        this.char = c;
        this.char.div.className = "dying";
    }
    Dying.prototype.update = function () {
        if (this.direction == "up") {
            if (this.jumpHeight == 0) {
                Game.audio.pause();
                var audio = new Audio('sounds/dead.wav');
                audio.play();
                Matter.Body.applyForce(this.char.character, { x: 0, y: 0 }, { x: 0, y: -0.05 });
                0;
            }
            this.jumpHeight++;
            if (this.jumpHeight > 60) {
                Game.getInstance().gameOver();
            }
        }
    };
    return Dying;
}());
var Idle = (function () {
    function Idle(c) {
        this.char = c;
    }
    Idle.prototype.update = function () {
        this.char.div.className = "idle";
        if (this.char.keyState[Enumeration.Keys.JUMP]) {
            this.char.behaviour = new Jumping(this.char, "idle", "idle");
        }
        else if (this.char.keyState[Enumeration.Keys.LEFT]) {
            this.char.behaviour = new Running(this.char, "left");
        }
        else if (this.char.keyState[Enumeration.Keys.RIGHT]) {
            this.char.behaviour = new Running(this.char, "right");
        }
    };
    return Idle;
}());
var Jumping = (function () {
    function Jumping(c, prev, xdirection) {
        this.char = c;
        this.xdirection = xdirection;
        this.jumpTrigger = true;
        this.char.div.className = "jumping";
    }
    Jumping.prototype.update = function () {
        if (this.char.keyState[Enumeration.Keys.LEFT]) {
            this.xdirection = "left";
            this.previous_state = "running";
        }
        else if (this.char.keyState[Enumeration.Keys.RIGHT]) {
            this.xdirection = "right";
            this.previous_state = "running";
        }
        else {
            this.previous_state = "idle";
        }
        this.draw();
        if (this.char.keyState[Enumeration.Keys.JUMP] == false) {
            if (this.jumpTrigger == false) {
                if (this.previous_state == "running") {
                    this.char.behaviour = new Running(this.char, this.xdirection);
                }
                else if (this.previous_state == "idle") {
                    this.char.behaviour = new Idle(this.char);
                }
            }
        }
    };
    Jumping.prototype.draw = function () {
        if (this.jumpTrigger == true) {
            var audio = new Audio('sounds/jump.wav');
            audio.play();
            if (this.xdirection == "idle") {
                Matter.Body.applyForce(this.char.character, { x: 0, y: 0 }, { x: 0, y: -0.035 });
            }
            if (this.xdirection == "left") {
                Matter.Body.applyForce(this.char.character, { x: 0, y: 0 }, { x: -0.015, y: -0.035 });
            }
            if (this.xdirection == "right") {
                Matter.Body.applyForce(this.char.character, { x: 0, y: 0 }, { x: 0.015, y: -0.035 });
            }
            this.jumpTrigger = false;
        }
    };
    return Jumping;
}());
var Running = (function () {
    function Running(c, direction) {
        this.char = c;
        this.char.div.className = "running";
        this.direction = direction;
        if (this.direction == "right") {
        }
        else if (this.direction == "left") {
        }
    }
    Running.prototype.update = function () {
        if (this.char.keyState[Enumeration.Keys.JUMP]) {
            this.char.behaviour = new Jumping(this.char, "running", this.direction);
        }
        else if (this.char.keyState[Enumeration.Keys.LEFT]) {
            Matter.Body.applyForce(this.char.character, { x: 0, y: 0 }, { x: -0.001, y: 0 });
        }
        else if (this.char.keyState[Enumeration.Keys.RIGHT]) {
            Matter.Body.applyForce(this.char.character, { x: 0, y: 0 }, { x: 0.001, y: 0 });
        }
        else {
            this.char.behaviour = new Idle(this.char);
        }
    };
    return Running;
}());
var GameObject = (function () {
    function GameObject(parent, name, x, y, w, h) {
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.div = document.createElement(name);
        parent.appendChild(this.div);
    }
    GameObject.prototype.draw = function () {
        this.div.style.transform = "translate(" + this.x + "px," + this.y + "px)";
        if (this.x < (0 - this.width)) {
            this.div.remove();
        }
    };
    return GameObject;
}());
var Coin = (function (_super) {
    __extends(Coin, _super);
    function Coin(parent, x, y) {
        _super.call(this, parent, "coin", x, y, 15, 15);
    }
    return Coin;
}(GameObject));
var Platform = (function () {
    function Platform(parent, x, y, w, h) {
        this.MatterBody = Matter.Bodies.rectangle(x, y, w, h, { isStatic: true, friction: 0 });
        this.div = document.createElement("platform");
        this.div.style.width = w + "px";
        this.div.style.height = h + "px";
        parent.appendChild(this.div);
    }
    Platform.prototype.draw = function () {
        this.x = this.MatterBody.position.x - 35;
        this.y = this.MatterBody.position.y;
        this.div.style.transform = "translate(" + this.x + "px," + this.y + "px)";
    };
    return Platform;
}());
var Spike = (function (_super) {
    __extends(Spike, _super);
    function Spike(parent, x, y) {
        _super.call(this, parent, "spike", x, y, 20, 15);
    }
    return Spike;
}(GameObject));
var GameOver = (function (_super) {
    __extends(GameOver, _super);
    function GameOver() {
        _super.call(this, 'gameover');
        Game.audio.pause();
        this.gameover = new Audio('sounds/gameover.wav');
        this.gameover.play();
        this.gameover.loop = true;
        var btn = document.createElement("gamebutton");
        this.div.appendChild(btn);
        btn.innerHTML = "Probeer opnieuw!";
        btn.addEventListener("click", this.onClick.bind(this));
    }
    GameOver.prototype.onClick = function () {
        this.gameover.pause();
        this.div.remove();
        Game.getInstance().showStartScreen();
    };
    return GameOver;
}(BaseScreen));
var Level1 = (function (_super) {
    __extends(Level1, _super);
    function Level1() {
        var _this = this;
        _super.call(this, "level1");
        this.deathttrigger = false;
        this.observers = [];
        this.div.id = "current_level";
        this.character = new Character(this.div);
        this.score = new Score(this.div, this, 5);
        this.gameObjects = new Array();
        this.platforms = new Array();
        this.platformdivs = new Array();
        this.engine = Matter.Engine.create();
        this.gameObjects.push(new Coin(this.div, 150, 485));
        this.gameObjects.push(new Coin(this.div, 750, 515));
        this.gameObjects.push(new Coin(this.div, 357, 415));
        this.gameObjects.push(new Coin(this.div, 450, 325));
        this.gameObjects.push(new Coin(this.div, 770, 325));
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
        for (var _i = 0, _a = this.platformdivs; _i < _a.length; _i++) {
            var platformDiv = _a[_i];
            this.platforms.push(platformDiv.MatterBody);
        }
        this.platforms.push(this.character.character);
        Matter.World.add(this.engine.world, this.platforms);
        requestAnimationFrame(function () { return _this.gameLoop(); });
    }
    Level1.prototype.gameLoop = function () {
        var _this = this;
        this.character.draw();
        this.run();
        var gameObjectCounter = 0;
        for (var _i = 0, _a = this.platformdivs; _i < _a.length; _i++) {
            var platform = _a[_i];
            platform.draw();
        }
        for (var _b = 0, _c = this.gameObjects; _b < _c.length; _b++) {
            var gameObject = _c[_b];
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
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    Level1.prototype.run = function () {
        Matter.Engine.update(this.engine, 1000 / 60);
    };
    Level1.prototype.subscribe = function (o) {
        this.observers.push(o);
    };
    Level1.prototype.unsubscribe = function () {
    };
    return Level1;
}(BaseScreen));
var Winner = (function (_super) {
    __extends(Winner, _super);
    function Winner() {
        _super.call(this, 'win');
        Game.audio.pause();
        this.win = new Audio('sounds/win.wav');
        this.win.play();
        var score = document.createElement("finalScore");
        this.div.appendChild(score);
        score.innerHTML = "You got all the coins!";
        var btn = document.createElement("gamebutton");
        this.div.appendChild(btn);
        btn.innerHTML = "Naar menu!";
        btn.addEventListener("click", this.onClick.bind(this));
    }
    Winner.prototype.onClick = function () {
        this.win.pause();
        this.div.remove();
        Game.getInstance().showStartScreen();
    };
    return Winner;
}(BaseScreen));
//# sourceMappingURL=main.js.map