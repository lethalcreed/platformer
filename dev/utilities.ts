class Utilities {
    public static checkPlayerColission(p: Character, o: GameObject): boolean {
        return (p.x < o.x + o.width &&
            p.x + p.width > o.x &&
            p.y < o.y + o.height &&
            p.height + p.y > o.y)
    }

}
