# real-estate-care

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Launch my JSON server

json-server db.json
json-server --watch db.json

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

## Starter info vóór start applicatie

JSON-server moet draaien om gegevens te kunnen ophalen.
Zonder gegevens kan er niet ingelogd worden.
command: json-server db.json
json-server --watch db.json

Inloggen:
Personeelsnr: 11235813
Pin: fibonacci

## Proces

Een goed begin is het halve werk: dit heb ik onderschat. Vooraf zo veel mogelijk de opzet/functionaliteit uitwerken in een flowchart blijkt heel waardevol.
Het geeft niet alleen van te voren overzicht in mijn hoofd, het is tevens al deels een soort roadmap/plan van aanpak voor het project. Waar begin ik? Welk onderdeel moet er nog? Hoe moet dat ongeveer werken?
In een flowchart is dat in 1 oogopslag duidelijk. Plus als je van te voren zoveel mogelijk probeert uit te werken, loop je gaande weg niet tegen simpele fouten aan.
In dit project kwam ik er gaandeweg achter dat ik een component beter in twee componenten kon onderverdelen. Meer aandacht voordat ik begin met bouwen kan dergelijke fouten mogelijk al laten zien.

U schrijft een korte verantwoording over het toepassen
– of nog niet hebben kunnen toepassen –
van security, usability (a.d.h.v. de 10 heuristieken van Jacob Nielsen),
accessibility en style guides/best practices van het betreffende framework binnen uw prototype en voegt dit toe aan uw markdown-document.
Beschrijf hierin ook of uw applicatie wel of niet voldoet aan de WCAG 2.1-richtlijnen en wat er eventueel nog ontbreekt.

## Niet volledig werkzame onderdelen:

Darkmode:
Deze werkt tot op het moment dat men naar een andere pagina navigeert.
Dan zijn er een aantal nieuwe elementen met een witte kleur waar ik van te voren niet bij kan.

currentInspection:
Na het updaten van de currentInspection wordt de nieuwe data niet ondergebracht in this.currentInspection.
Ik weet niet zo goed waarom: ik patch eerst db.json, en daarna update ik mijn store door opnieuw de fetchUsers setCurrentInspection te callen die de data
uit db.json trekt (en die heb ik net gepatched).

CRUD/Deployment issue:
JSON-server:
Normaal ga ik in de command line naar mijn project directory en run daar de JSON command json-server --watch db.json.
Nadat deployment hoort de user de json server te starten. Ik krijg dit voor mijzelf niet werkend, maar ook geen error / request header.

db.json:
De db.json file bevondt zich eerst op public/data/db.json, momenteel is deze verplaatst naar de root directory.
Omdat json-server mijn db.json file lokaal watched, triggered er een refresh nadat ik via axios een patch/post request maak naar db.json (deze update immers de lokale file).
De oplossing van de docent was om db.json in de rootfolder te zetten, dan houdt het builden geen rekening met de db.json file en triggert er geen reload.

## Best practises

- Houdt NPM packages up to date.
- Gebruik altijd v-for i.c.m. :key.
- Gebruik nooi v-for i.c.m. v-if.
- Gebruik altijd kebab Casing voor events.
- Componenten willen een multi-word naam.
- Zo min mogelijk computations in HTML template. Een voorbeeld hiervan is de slicedDate() computed prop in modalComponent.vue.
- Gebruik passende data types voor alle variabelen (TypeScript is hier fijn voor).
- Schrijf consistente code (hanteer zelfde naam, etc).
- Gebruik captcha's. Ik maak gebruik van 2FA, al wordt dit wel gesimuleerd.

## Style guides

De stijl is gebaseerd op de aangeleverde huisstijl van Real Estate Care.
De geheime code om in te loggen wordt over algemeen pin genoemd, echter is de id van input element wachtwoord.
Darktheme heet soms ook darkmode of darkMode. Dit voor mijn eigen onderscheid in het element (input id=pin), value van element (pin.value), functie, userprop (user.pin), etc.
Maar eigenlijk is dit inconsistent en bad practise. Het loont in de toekomst over preciezere benaming te denken.

## Security

Login met 2fa.
Eigen code met zo min mogelijk libraries/externe code.

## 10 heuristieken:

### De status van het product of systeem moet zichtbaar zijn .

Spinner voor loading, error handling.

### Elementen (zoals tekst, afbeeldingen en interacties met het systeem) moeten herkenbaar zijn voor iedere gebruiker en moeten ook aan deze verwachting voldoen

Login button icon kan duidelijker.

### De gebruiker moet in controle blijven en ook dit gevoel hebben

Mogelijkheid tot data-aanpassingen.
Voorkeuren instellen.

### De bediening moet consequent zijn (eenzelfde term, menu, knop of pictogram heeft in alle gevallen eenzelfde betekenis

In de UI heeft alles eenzelfde naam en hebben knoppen (etc) een consistente layout.

### Het systeem moet helpen voorkomen dat de gebruiker een vergissing maakt

Validation patterns via regex op inputvelden helpen bij te sturen waar nodig.

### Herkennen gaat voor op herinneren: het is beter dat elementen duidelijk zijn en (waar nodig) uitgelegd worden dan de gebruiker veel te laten onthouden

Login button icon kan duidelijker.

### De bediening moet flexibel en eenvoudig te leren zijn

App oogt vrij intuitief, alles wordt geregeld adhv touch events.

### Het systeem moet niet meer informatie laten zien dan nodig is om het te gebruiken

Het oog om je pin te laten zien is wellicht gevoelig.

### Het systeem moet de gebruiker van goede feedback voorzien, met name wanneer laatstgenoemde een vergissing maakt. In dat geval dient het systeem de gebruiker te helpen deze te herstellen

Error handling en regex pattern op inputvelden.

### Er moet een mogelijkheid zijn om meer informatie te vinden, zoals help of contact

De app wordt getest met gebruikers uit de doelgroep. Intern is er bij het bedrijf een aanspreekpunt en die koppelt terug aan de developers.
