# Platformer Project


## Beschrijving

Dit is een Platformer project met de volgende instellingen:
- DIST folder bevat de website : html, css en javascript
- DEV folder bevat de typescript files
- DEV folder is opgedeelt in verschillende mapjes met functionaliteit
    - Behaviour: Bevat alles wat te maken heeft met het gedrag van de character
    - Gameobjects: Bevat alle gameobjects
    - Screens: Bevat de verschillende screens van de game
- tsconfig.json bevat instellingen voor het compileren naar javascript
- tasks.json bevat het 'build' commando. Dit voer je uit met CMD+SHIFT+B


## Installatie

- Om dit project te installeren kun je een fork doen van de repository. Deze map moet je dan op jou localhost plaatsen. Afhankelijk van welk programma je gebruikt.
- Daarna moet je de TS files compilen. Deze komen dan terecht in de Docs folder. Door naar deze folder te navigeren kun je de game lokaal bekijken.
- Matter.JS word gebruikt in deze game. Alle files hiervoor staan in de repository. Als deze niet goed werkt moet je Matter.js handmatig toevoegen aan het mapje docs/js.

## Uitwerking

### PRG08

- Interface: De interface word gebruikt bij het gedrag van de character. In het mapje behaviour zit een interface genaamd behaviour.ts.
             Dit is de interface voor alle behaviour soorten.
- Static utility method: Deze word gebruikt in het bestand utilities.ts. Hierin staat de functie waarmee collision tussen een gameobject en de speler kan worden gedetecteerd.
- Singleton: De class Game in game.ts is een singleton. Zodat ik op iedere plek in de game gameover() kan aanroepen. 
- Strategy: Deze word gebruikt bij de character om het gedrag te scheiden uit de rest van de character code. Alle gedragstypes en de interface ervoor zijn te vinden in het behaviour mapje.
- Observer pattern: Deze word gebruikt door de score en het level. Het level is de observable. De score is de Observer. Deze krijgt wordt genotifyed wanneer de speler een coin op pakt. De score verhoogt zichzelf dan
- Enumerations & Namespaces: De key codes van de toetsen die gebruikt worden om de game te besturen zijn enumerations in hun eigen namespace. Deze zijn te vinden in enum.ts

### PRG04

-   Encapsulation: Overal. Ieder variabele is private, public of protected gemaakt. 
-   Composition: De character heeft een hat. Dit is te vinden in character.ts en hat.ts
-   Inheritance: Het gameobject spike erft over van gameobjects.ts. Deze zijn te vinden in de map Gameobjects.


## Klassendiagram Week 4:

![Klassendiagram](week4.png?raw=true "Klassendiagram")



## Peerbeoordeling Week 4

- Singleton: Van de game is een singleton gemaakt en de game instance is toegepast zoals we deze geleerd hebben.
- Static utils class: Alle deze methods zijn static en de collision method mag worden toegepast op de player met alle gameobjects.
- Interface: Voor de player behavior is een interface op de juiste manier gemaakt, in het klassendiagram mag deze nog een <<Interface>> krijgen
- Strategy patterns: Idle, Jumping, Running en Dying zijn 4 classes die de volgens de behavior interface werken en worden op de goede manier aangeroepen.

Conclusie: Platformer krijgt van mij een dikke voldoende, alle vereisten zijn behandeld en verwerkt.


## Verbetering Week 4

Hangende input van ingedrukte toetsen verbeterd, het inhouden van een toets op het keyboard zorgt dat de player nu meteen kan lopen door gebruik te maken van keystates in de gameloop in plaats van keyevents. Om dit toe te passen heb ik de gameloop verdeeld in update() en draw() stappen, de update() handeld de behavior en de draw() doet de visuals.

## Klassendiagram Week 7: 

![Klassendiagram](week7.png?raw=true "Klassendiagram")


## Peerbeoordeling Week 7



## Verbetering Week 7


