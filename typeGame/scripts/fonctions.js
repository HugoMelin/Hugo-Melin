function afficherResultat (score,nbQuestion) {
    let outputScore = document.querySelector("#score span")
    outputScore.innerHTML = `${score} / ${nbQuestion}`
}

function afficherProposition(motAffiche) {
    let outputProposition = document.querySelector("#porposition")
    outputProposition.textContent = motAffiche
}

function lancerJeux() {
    affichePopUp()
    let inputChoixJoueur = document.querySelectorAll("#choixJoueur input")
    let choix = listeMots

    //Choix du mode de jeu
    for (let i = 0; i<inputChoixJoueur.length; i++) {
        inputChoixJoueur[i].addEventListener("change", () => {
            if (inputChoixJoueur[i].checked) {
                if (inputChoixJoueur[i].value === "mot"){
                    choix = listeMots
                    afficherProposition(choix[0])
                } else {
                    choix = listPhrases
                    afficherProposition(choix[0])
                }
            } 
        })
    }

    //boucle du jeu
    let i = 0 
    let score = 0

    let inputMotJoueur = document.getElementById("motJoueur")
    let inputBoutton = document.getElementById("bouttonEnvoyer")
    inputBoutton.addEventListener("click", ()=> {
        if (inputMotJoueur.value === choix[i]) {
            score++
        }
        i++
        afficherResultat(score, i)
        if (choix[i] === undefined) {
            afficherProposition("Le jeu est fini !")
            inputBoutton.disabled=true
        } else {
            afficherProposition(choix[i])
        }
        inputMotJoueur.value=""
    })

    //Gestion du partage
    gererFormulaire(score, choix)
}

function affichePopUp () {
    let partage = document.querySelector("#zonePartage button")
    let popUp = document.querySelector(".popUpPartage")

    let btFermer = document.getElementById("fermer")

    partage.addEventListener("click", () => {
        popUp.classList.add("active")
    })

    btFermer.addEventListener("click", (event) => {
        event.preventDefault()
        if (event.target === btFermer) {
            cacherPopUp()
        }
    })
}

function cacherPopUp() {
    let popUp = document.querySelector(".popUpPartage")

    popUp.classList.remove("active")
}

function envoiMail(nom, email, score, nbQuestion) {
    let sujetPartage = "Regarde le super score que j'ai fait"
    let messagePartage = `Woaw, c'est ${nom} et je viens de finir une partie d'Azertype et j'ai fait le score exceptionnel de ${score} points sur ${nbQuestion}.`
    let mailto = `mailto:${email}?subject=${sujetPartage}&body=${messagePartage}`
    location.href = mailto
}

function validerNom(nom) {
    if (nom.length < 2) {
        throw new Error(`Le Nom est trop cours.`)
    }
}

function validerEmail(email) {
    let regex = new RegExp("[a-zA-Z.\-_0-9]+@[a-zA-Z.\-_0-9]+\\.[a-zA-Z.\-_0-9]+")
    if (!regex.test(email)) {
        throw new Error("L'adresse mail n'est pas valide.")
    }
}

function gererFormulaire(score, choix) {
    let envoiPartage = document.getElementById("btEnvoyer")

    envoiPartage.addEventListener("click", (event) => {
        event.preventDefault()
        
        try {
            let popUpNom = document.getElementById("nom")
            validerNom(popUpNom.value)

            let popUpMail = document.getElementById("email")
            validerEmail(popUpMail.value)

            envoiMail(popUpNom.value, popUpMail.value, score, choix.length)
            cacherPopUp()
        } catch (erreur) {
            afficherMessageErreur(erreur.message)
        }
    })
}

function afficherMessageErreur(erreur) {
    let spanErreur = document.getElementById("erreurMessage")
    
    if (!spanErreur) {
        let divPopUP = document.querySelector(".popUp")
        spanErreur = document.createElement("span")
        spanErreur.id = "erreurMessage"

        divPopUP.append(spanErreur)
    }

    spanErreur.innerText = erreur
}