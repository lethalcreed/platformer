## Platformer Project

Dit is een Platformer project met de volgende instellingen:
- DIST folder bevat de website : html, css en javascript
- DEV folder bevat de typescript files
- DEV folder is opgedeelt in verschillende mapjes met functionaliteit
    - Behaviour: Bevat alles wat te maken heeft met het gedrag van de character
    - Gameobjects: Bevat alle gameobjects
    - Screens: Bevat de verschillende screens van de game
- tsconfig.json bevat instellingen voor het compileren naar javascript
- tasks.json bevat het 'build' commando. Dit voer je uit met CMD+SHIFT+B

Om dit project te installeren kun je een fork doen van de repository. Deze map moet je dan op jou localhost plaatsen. Afhankelijk van welk programma je gebruikt. 
Daarna moet je de TS files compilen. Deze komen dan terecht in de Docs folder. Door naar deze folder te navigeren kun je de game lokaal bekijken.

Sidenotes:
- De muziek is eventueel uit te zetten door Game.Audio.play(); uit te commenten in screens/level1.ts op regel 12.
- De game toont altijd eerst een start scherm. Daarna word level 1 geladen. Alle code voor het level is dus te vinden in screens/level1.ts


De programmeer principes zijn op de volgende plekken toegepast in het project: 
- Interface: De interface word gebruikt bij het gedrag van de character. In het mapje behaviour zit een interface genaamd behaviour.ts.
             Dit is de interface voor alle behaviour soorten.
- Static utility method: Deze word gebruikt in het bestand utilities.ts. Hierin staat de functie waarmee collision tussen een gameobject en de speler kan worden gedetecteerd.
- Singleton: De class Game in game.ts is een singleton. Zodat ik op iedere plek in de game gameover() kan aanroepen. 
- Strategy: Deze word gebruikt bij de character om het gedrag te scheiden uit de rest van de character code. Alle gedragstypes en de interface ervoor zijn te vinden in het behaviour mapje.

PRG04:

-   Encapsulation: Overal. Ieder variabele is private, public of protected gemaakt. 
-   Composition: De character heeft een hat. Dit is te vinden in character.ts en hat.ts
-   Inheritance: Het gameobject spike erft over van gameobjects.ts. Deze zijn te vinden in de map Gameobjects.

Klassendiagram:

![Klassendiagram](Platformer%20PRG08.png?raw=true "Klassendiagram")

