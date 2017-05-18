interface Behaviour {
    char: Character;
    onKeyDown(e: KeyboardEvent): void;
    onKeyUp(e: KeyboardEvent): void;
    draw(): void
}