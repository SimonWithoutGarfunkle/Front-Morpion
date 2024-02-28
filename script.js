let prochainJoueur = 'X';
const joueurSuivant = document.getElementById('joueur'); 

let grilleActuelle = [];

async function nouvellePartie() {
    const reponse = await fetch("http://localhost:8080/api/partie/new");
    const numPartie = await reponse.json();
    console.log("nouvelle partie : " + numPartie);
    document.getElementById('numeroPartie').textContent = numPartie;
    grilleActuelle = await demanderGrille();
    actualiserGrille();
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
        joueurSuivant.textContent = prochainJoueur;
        prochainJoueur = prochainJoueur === 'X' ? 'O' : 'X';
        
    }
}

function actualiserGrille() {
    for (let i = 0; i < 9; i++) {
        document.getElementById(i).innerText = grilleActuelle[i];
    }
}