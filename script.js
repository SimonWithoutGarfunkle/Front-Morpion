let prochainJoueur = 'X';
const joueurSuivant = document.getElementById('joueur'); 
let grilleActuelle = [];

async function nouvellePartie() {
    const reponse = await fetch("http://localhost:8080/api/partie", {method: 'POST', headers: { 'Content-Type': 'application/json' }});
    const numPartie = await reponse.json();
    console.log("nouvelle partie : " + numPartie);
    document.getElementById('numeroPartie').textContent = numPartie;
    grilleActuelle = await demanderGrille();
    actualiserGrille();
    prochainJoueur = 'X';
    joueurSuivant.textContent = prochainJoueur;
}

async function demanderGrille() {
    const reponse = await fetch("http://localhost:8080/api/partie/" + document.getElementById('numeroPartie').textContent);
    const grille = await reponse.json();
    console.log(grille);
    return grille;
}

async function envoyerTour(item) {
    let emplacement = item.id;
    let id = document.getElementById('numeroPartie').textContent;
    let url = 'http://localhost:8080/api/partie/' + id + '/tour?emplacement=' + emplacement;

    const reponse = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }});

    const resultat = await reponse.json();
    console.log(resultat);

    if (resultat === true) {
        actualiserGrille();
        grilleActuelle = await demanderGrille();
        item.classList.add('rotate');

        item.innerText = prochainJoueur;
        prochainJoueur = prochainJoueur === 'X' ? 'O' : 'X';
        joueurSuivant.textContent = prochainJoueur;
        
        
    }
}

function actualiserGrille() {
    for (let i = 0; i < 9; i++) {
        document.getElementById(i).innerText = grilleActuelle[i];
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const spanNumeroPartie = document.getElementById("numeroPartie");
    const gridContainer = document.getElementById("grid");

    if (spanNumeroPartie.innerText === "") {
        gridContainer.style.display = "none";
    }

    spanNumeroPartie.addEventListener("DOMSubtreeModified", function() {
        if (spanNumeroPartie.innerText === "") {
            gridContainer.style.display = "none";
        } else {
            gridContainer.style.display = "grid";
        }
    });
});
