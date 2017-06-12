class Score implements Observer {

    private score: HTMLElement;
    private coins: number = 0;
    private goal: number;

    constructor(parent: HTMLElement, ref: Level1, goal: number) {
        ref.subscribe(this);
        this.goal = goal;
        this.score = document.createElement("score");
        this.score.innerHTML = "Coins: 0/" + this.goal;
        parent.appendChild(this.score);
    }

    public notify():void {
        let audio = new Audio('sounds/coin.wav');
        audio.play();
        this.coins++;
        this.score.innerHTML = "Coins: " + this.coins + "/" + this.goal;

        if (this.coins == this.goal) {
            Game.getInstance().win();
        }
    }
}