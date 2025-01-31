
    //det første jeg gjør er å få tak i html fra html.index hvor jeg vil at navigerings linkene skal skrives ut
    //jeg henter ut html med id navigasjon og lagrer den informasjonen i en variabel jeg kaller navigasjon
    const navigasjon = document.getElementById('navigasjon');

    //deretter mapper jeg gjennom arrayen resources fra ressurser.js, for hvert objekt i arrayen gjennomføres funksjonen.
    //funksjonen returnerer det som skal skrives ut, en tempeplate literal string med en link med "navnet" som tilhører hver category i array resources med en en klasse (så jeg kan style den i css)
    const nyLink = resources.map(resource => `<a href ="#" class="kategori">${resource.category}</a>`)


    //så skriver jeg de ut i DOM, jeg kobler HTML til navigasjons seksjonen min til denne stringen over.
    
    navigasjon.innerHTML = nyLink;



    //deretter vil jeg koble en eventlistener til det som har blitt skrevet ut over. hvert navigasjonselement skal 
    //kunne trykkes også vil det skje noe (et event). 
    navigasjon.addEventListener('click', (event) => {
    

    //https://www.freecodecamp.org/news/event-delegation-javascript/ (lest mer om eventer)
    //når et element klikkes lagres det i variabelen target
    const target = event.target;

    console.log('clicked');


    //hvis det som klikkes inneholder klassen som jeg har satt tidligere så vil denne funksjonen
    //fjerne den aktive statusen for hver link som jeg har laget for kategori i css.
    if (target.classList.contains('kategori')) {
        //https://www.tutorialrepublic.com/faq/how-to-check-if-an-element-contains-a-class-in-javascript.php#:~:text=Answer%3A%20Use%20the%20contains(),()%20method%20of%20the%20Element.
        document.querySelectorAll('.kategori').forEach(link => {
            link.classList.remove('active');
        });

        //legger til klassen active på elementet som har blitt trykket på
        target.classList.add('active');



        console.log(target.textContent);
        //kaller på funksjonen min infoDisplay med parameter target.Textcontent, som sørger for at
        //teksten til den klikkede kategorien skrives ut med funksjonen infoDisplay. Når jeg kjører funksjonen med 
        //target.textContent som parameter vil infoDisplay "lete" etter objekt som passer til det som er klikket over og deretter skrive ut i HTML container. 
        infoDisplay(target.textContent);
    }
});


//definerer en funksjon med navn infoDisplay som har category som parameter. Jeg ønsker å oppdatere html basert på hvilken 
//categori fra ressurser.js som klikkes. 
function infoDisplay (category) {

    //(kilder brukt til å lære mer om find)
    //https://www.youtube.com/watch?v=cOoP8-NPLSo
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
    //resources.find søker gjennom resources arrayen i ressurser.js og finner objekt som passer med mitt parameter. 
    //jeg prøvde først å bruke filter og map her, men etter å søke på "how do i find something in array javascript" på google
    //fant jeg ut at det var bedre å bruke find.
    //detter sjekker min funksjon i linjen under om resource stemmer overens med parameteren over (category). Hvis den ikke gjør det returnes funksjjenn.

    const resource = resources.find(resource => resource.category === category);
    if (!resource) return;


    //finner element i html jeg ønsker at det skal skrives ut i som er med id container.
    const container = document.getElementById("container");
    //skriver ut denne strengen i template literal med h2, p og en ul med alt innhold fra arrayen.
    container.innerHTML = `
    <h2>${resource.category}</h2>
    <p>${resource.text}</p>
    <ul>
        ${resource.sources.map(source=> `
            <li><a href="${source.url}">${source.title}</a></li>
            `) .join ('')}    
        </ul>
    `;

    console.log(container);

}



