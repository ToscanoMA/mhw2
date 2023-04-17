/* TODO: inserite il codice JavaScript necessario a completare il MHW! */

let Risposte =  {one: null, two: null, three: null};    //array contenitore di risposte

function onClick(event){
    const check = event.currentTarget;   //ricavo l'elemento cliccato

    let idQ=check.dataset.questionId; //memorizzo question-id della risp selezionata
    let idA=check.dataset.choiceId; //memorizzo choise-id della risposta

    for(let i of answer){   //scorro tutte le possibili risposte
        const image = i.querySelector(".checkbox")
        if(i.dataset.questionId===idQ){ //prendo solo quelle con lo stesso question-id
            if(i.dataset.choiceId===idA){  //prendo la risposta sulla quale ho cliccato per contrassegnarla
                i.classList.remove("unchecked");
                i.classList.add("checked");
                image.src="images/checked.png";
                Risposte[idQ]=idA;
            }
            else{  //deseleziono l'eventuale risposta selezionata in precedenza
                i.classList.remove("checked");
                i.classList.add("unchecked");
                image.src="images/unchecked.png";
            }
        }
    }

    if(Risposte.one !== null && Risposte.two !== null && Risposte.three !== null){ //controllo che tutte le risposte dell'array non siano nulle
        visualizzaRis();  //allora procedo alla visualizzazione del risultato
    }
}

function reset_function(){
    Risposte =  {one: null, two: null, three: null};  //svuoto l'array delle risposte

    for(let i of answer){
        const image = i.querySelector(".checkbox")
        i.classList.remove("checked");
        i.classList.remove("unchecked");
        console.log("rimosse le classi");
        image.src="images/unchecked.png";
        //riaggiungo gli event listener di click per ogni div
        i.addEventListener("click",onClick);
    }

    const result = document.querySelector(".ris");
    result.remove();   //rimuovo il div dei risultati
}


function visualizzaRis(){
    const div = document.createElement("div");  //creo gli elementi di visualizzazione del risultato
    const title = document.createElement("h1");
    const content = document.createElement("p");
    const button = document.createElement("button");
    const text = document.createElement("h3");

    div.classList.add("ris");
    button.classList.add("reset_butt");
    text.textContent = "Ricomincia!";

    if (Risposte.two == Risposte.three) {  //faccio un controllo sulle risposte per come richiesto dal testo del MHW
        console.log(Risposte.two);
        title.textContent = RESULTS_MAP[Risposte.two].title;
        content.textContent = RESULTS_MAP[Risposte.two].contents;
      }
      else{
        title.textContent = RESULTS_MAP[Risposte.one].title;
        console.log(Risposte.one);
        content.textContent = RESULTS_MAP[Risposte.one].contents;
      }


      
      div.appendChild(title);
      div.appendChild(content);
      div.appendChild(button);
      button.appendChild(text);
      document.querySelector("article").appendChild(div);       //inserisco gli elelenti al doc html
      
      button.addEventListener("click", reset_function);   //abilito il click per il pulsante di reset

      for(let i of answer) i.removeEventListener("click", onClick);   //rimuovo i listner sulle immagini, lasciando abilitato solo il click sul pulsante di reset


}



const answer = document.querySelectorAll(".choice-grid div");
for(let i of answer) i.addEventListener("click",onClick);  //aggiungo i listener sulle risposte
