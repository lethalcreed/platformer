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
- Abstract: De class Utils is abstract. Dit is zodat er geen instance van gemaakt kan worden. 

### PRG04

-   Encapsulation: Overal. Ieder variabele is private, public of protected gemaakt. 
-   Composition: De character heeft een hat. Dit is te vinden in character.ts en hat.ts
-   Inheritance: Het gameobject spike erft over van gameobjects.ts. Deze zijn te vinden in de map Gameobjects.


## Klassendiagram:

![Klassendiagram](week7.png?raw=true "Klassendiagram")



## Peerbeoordeling Week 4

- Singleton: Van de game is een singleton gemaakt en de game instance is toegepast zoals we deze geleerd hebben.
- Static utils class: Alle deze methods zijn static en de collision method mag worden toegepast op de player met alle gameobjects.
- Interface: Voor de player behavior is een interface op de juiste manier gemaakt, in het klassendiagram mag deze nog een <<Interface>> krijgen
- Strategy patterns: Idle, Jumping, Running en Dying zijn 4 classes die de volgens de behavior interface werken en worden op de goede manier aangeroepen.

Conclusie: Platformer krijgt van mij een dikke voldoende, alle vereisten zijn behandeld en verwerkt.


## Verbetering Week 4

Hangende input van ingedrukte toetsen verbeterd, het inhouden van een toets op het keyboard zorgt dat de player nu meteen kan lopen door gebruik te maken van keystates in de gameloop in plaats van keyevents. Om dit toe te passen heb ik de gameloop verdeeld in update() en draw() stappen, de update() handeld de behavior en de draw() doet de visuals.


## Peerbeoordeling Week 7

Youri, je game is tof! Vet gedaan. Ik zie dat de game helemaal af is, Van begin tot eind is het spel speelbaar. Ik ben ook nog geen bugs tegengekomen. In je git project staat een klassendiagram, hierin is de structuur van je game goed uitgelegd. Hier kan ik ook in aflezen dat alle criteria in de game zitten. 

Zo heb je bijvoorbeeld matter.js als library gebruikt in je spel. Ook heb je encapsulation (private variables in verschillende objecten), Composition (Character heeft een hat) en inheritance gebruikt (Gameobject wordt een aantal keer ge-extend). 

De game zelf is gebouwd als een singleton. Doordat je score heel het level observeert maak je gebruik van een observer. En door de player verschillende states te geven maak je gebruik van het strategy pattern.

Verder bevat je game een interface, namelijk in de Observer class bijvoorbeeld. De collision van je player wordt afgehandeld als een static function. En ook die class uit je utilities is abstract.

Je hebt je keys van je keyboard in een enumeratie gezet, dit zit tegelijk ook in een namespace. En daarnaast is het Array dat ge-extende game objects ontvangt een voorbeeld van Polymorphism.

Uiteindelijk loopt heel de game op een Gameloop en dit stuk schrijf ik in de README.md met verder info hierboven ^.

Tof spel gemaakt Youri, goed gedaan!

