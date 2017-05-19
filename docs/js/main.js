var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Character = (function () {
    function Character(parent) {
        var _this = this;
        this.div = document.createElement("character");
        parent.appendChild(this.div);
        this.behaviour = new Idle(this);
        this.width = 24;
        this.height = 40;
        this.xspeed = 0;
        this.yspeed = 0;
        this.x = 50;
        this.y = 465;
        this.hat = new Hat(this.div);
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
        window.addEventListener("keyup", function (e) { return _this.onKeyUp(e); });
    }
    Character.prototype.onKeyDown = function (e) {
        this.behaviour.onKeyDown(e);
    };
    Character.prototype.onKeyUp = function (e) {
        this.behaviour.onKeyUp(e);
    };
    Character.prototype.draw = function () {
        this.behaviour.draw();
        this.div.style.transform = "translate(" + this.x + "px," + this.y + "px)";
        this.hat.draw();
    };
    return Character;
}());
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
        var btn = document.createElement("gamebutton");
        this.div.appendChild(btn);
        btn.innerHTML = "START DE GAME!";
        var character = document.createElement("start_character");
        this.div.appendChild(character);
        btn.addEventListener("click", this.onStartClick.bind(this));
    }
    StartScreen.prototype.onStartClick = function () {
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
        this.jumpDirection = -3;
        this.jumpHeight = 0;
        this.direction = "up";
        this.char = c;
        this.char.div.className = "dying";
    }
    Dying.prototype.draw = function () {
        this.char.y += this.jumpDirection;
        if (this.direction == "up") {
            this.jumpHeight++;
            if (this.jumpHeight > 25) {
                this.direction = "down";
            }
        }
        else if (this.direction == "down") {
            this.jumpDirection = 3;
            if (this.char.y > 600) {
                this.char.behaviour = new Idle(this.char);
                Game.getInstance().gameOver();
            }
        }
    };
    Dying.prototype.onKeyDown = function (e) {
    };
    Dying.prototype.onKeyUp = function (e) {
    };
    return Dying;
}());
var Idle = (function () {
    function Idle(c) {
        this.char = c;
    }
    Idle.prototype.draw = function () {
        this.char.xspeed = 0;
        this.char.div.className = "idle";
    };
    Idle.prototype.onKeyDown = function (e) {
        if (e.key == ' ' && this.char.behaviour instanceof Idle) {
            this.char.behaviour = new Jumping(this.char, "idle", "idle");
        }
        else if (e.key == 'ArrowRight' && this.char.behaviour instanceof Idle) {
            this.char.behaviour = new Running(this.char, "right");
        }
        else if (e.key == 'ArrowLeft' && this.char.behaviour instanceof Idle) {
            this.char.behaviour = new Running(this.char, "left");
        }
        else if (e.key == 'Control' && this.char.behaviour instanceof Idle) {
            this.char.behaviour = new Dying(this.char);
        }
    };
    Idle.prototype.onKeyUp = function (e) {
    };
    return Idle;
}());
var Jumping = (function () {
    function Jumping(c, prev, xdirection) {
        this.jumpDirection = -1;
        this.jumpHeight = 0;
        this.char = c;
        this.ydirection = "up";
        this.previous_state = prev;
        this.xdirection = xdirection;
        this.char.div.className = "jumping";
    }
    Jumping.prototype.draw = function () {
        this.char.x += this.char.xspeed;
        this.char.y += this.jumpDirection;
        if (this.ydirection == "up") {
            this.jumpHeight++;
            if (this.jumpHeight > 35) {
                this.ydirection = "down";
            }
        }
        else if (this.ydirection == "down") {
            this.jumpDirection = 1;
            this.jumpHeight--;
            if (this.jumpHeight < -1) {
                this.jumpHeight = 0;
                this.ydirection = "up";
                if (this.previous_state == "running") {
                    this.char.behaviour = new Running(this.char, this.xdirection);
                }
                else if (this.previous_state == "idle") {
                    this.char.behaviour = new Idle(this.char);
                }
            }
        }
    };
    Jumping.prototype.onKeyDown = function (e) {
    };
    Jumping.prototype.onKeyUp = function (e) {
        if (e.key == 'ArrowRight' && this.char.behaviour instanceof Jumping) {
            this.previous_state = "idle";
        }
        if (e.key == 'ArrowLeft' && this.char.behaviour instanceof Jumping) {
            this.previous_state = "idle";
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
            this.char.xspeed = 2;
        }
        else if (this.direction == "left") {
            this.char.xspeed = -2;
        }
    }
    Running.prototype.draw = function () {
        this.char.x += this.char.xspeed;
    };
    Running.prototype.onKeyDown = function (e) {
        if (e.key == 'ArrowRight' && this.char.behaviour instanceof Running) {
            this.char.xspeed = 2;
        }
        if (e.key == 'ArrowLeft' && this.char.behaviour instanceof Running) {
            this.char.xspeed = -2;
        }
        if (e.key == ' ' && this.char.behaviour instanceof Running) {
            this.char.behaviour = new Jumping(this.char, "running", this.direction);
        }
    };
    Running.prototype.onKeyUp = function (e) {
        if (e.key == 'ArrowRight' && this.char.behaviour instanceof Running) {
            this.char.xspeed = 0;
            this.char.behaviour = new Idle(this.char);
        }
        if (e.key == 'ArrowLeft' && this.char.behaviour instanceof Running) {
            this.char.xspeed = 0;
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
    };
    return GameObject;
}());
var Spike = (function (_super) {
    __extends(Spike, _super);
    function Spike(parent, x, y) {
        _super.call(this, parent, "spike", x, y, 20, 20);
    }
    return Spike;
}(GameObject));
var GameOver = (function (_super) {
    __extends(GameOver, _super);
    function GameOver() {
        _super.call(this, 'gameover');
        var btn = document.createElement("gamebutton");
        this.div.appendChild(btn);
        btn.innerHTML = "Probeer opnieuw!";
        btn.addEventListener("click", this.onClick.bind(this));
    }
    GameOver.prototype.onClick = function () {
        console.log("retry");
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
        Game.audio = new Audio("sounds/level1.mp3");
        Game.audio.play();
        Game.audio.loop = true;
        this.div.id = "current_level";
        this.character = new Character(this.div);
        this.spikes = new Array();
        for (var i = 0; i < 3; i++) {
            this.spikes.push(new Spike(this.div, (200 + (i * 200)), 485));
        }
        requestAnimationFrame(function () { return _this.gameLoop(); });
    }
    Level1.prototype.gameLoop = function () {
        var _this = this;
        this.character.draw();
        for (var _i = 0, _a = this.spikes; _i < _a.length; _i++) {
            var spike = _a[_i];
            spike.draw();
            if (Utilities.checkPlayerColission(this.character, spike)) {
                if (this.deathttrigger == false) {
                    this.character.behaviour = new Dying(this.character);
                    this.deathttrigger = true;
                }
            }
        }
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    return Level1;
}(BaseScreen));
//# sourceMappingURL=main.js.map