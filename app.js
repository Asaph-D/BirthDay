// Lorsque le document est complètement chargé, exécuter ce bloc de code
document.addEventListener("DOMContentLoaded", () => {
    // Alphabet utilisé pour le défilement des lettres, y compris les chiffres et l'espace
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ -1234567890ÂÉÈÊÔ";
    
    // Référence à l'élément HTML qui contient la boîte de dialogue pour poser la question à l'utilisateur
    const dialogBox = document.getElementById('dialog-box');
    
    // Référence au conteneur où les lettres défilantes seront affichées
    const nameRevealContainer = document.getElementById('name-reveal-container');
    
    // Référence à l'élément qui affichera le message final au bas de la page
    const footerMessage = document.getElementById('footer-message');
    
    // Référence à l'élément "Joyeux Anniversaire" qui s'affichera après la révélation du nom
    const joyeuxAnniversaire = document.getElementById('joyeux-anniversaire');
    
    // Référence à l'élément qui affichera le verset biblique
    const bibleVerse = document.getElementById('bible-verse');

    // Musique
    let music1 = new Audio('assets/Happiest_Year_Of_My_Life__Afro_Mara__-_Dj_Omo_Ebira__Full_TikTok_Version_(360p).mp4');  // Première musique (remplace 'path_to_first_music.mp3' par le chemin de ton fichier audio)
    let music2 = new Audio('assets/Happy_Birthday(136).mp4');  // Deuxième musique (remplace 'path_to_second_music.mp3' par le chemin de ton fichier audio)

    // Demande à l'utilisateur d'entrer son nom via une boîte de dialogue
    
    // const urlParams = new URLSearchParams(window.location.search);
    // const userName = urlParams.get('name');
    
    const userName = prompt("Entrez votre nom");

    // Tableau qui stockera les éléments <span> représentant chaque lettre du nom
    const letterFields = [];
    
    // Tableau qui stockera les intervalles de défilement pour chaque lettre
    const scrollingIntervals = [];
    
    // Fonction pour créer des champs de lettres basés sur le nom de l'utilisateur
    function createLetterFields(name) {
        // Vide le conteneur pour éviter des doublons
        nameRevealContainer.innerHTML = '';
        
        // Pour chaque caractère dans le nom de l'utilisateur, créer un champ de lettre
        for (let i = 0; i < name.length; i++) {
            const letterSpan = document.createElement('span');  // Crée un élément <span>
            letterSpan.classList.add('letter');  // Ajoute une classe CSS 'letter' pour styliser chaque lettre
            letterSpan.textContent = 'A';  // Définit la lettre initiale à 'A' pour commencer le défilement
            nameRevealContainer.appendChild(letterSpan);  // Ajoute ce <span> au conteneur pour affichage
            letterFields.push(letterSpan);  // Stocke le <span> dans le tableau letterFields pour y accéder plus tard
        }
    }

    // Fonction pour démarrer le défilement des lettres
    function startScrolling() {
        // Pour chaque lettre du tableau letterFields, on fait défiler le texte
        letterFields.forEach((field, index) => {
            let charIndex = 0;  // L'index du caractère actuel dans l'alphabet, commence à 0 (A)
            
            // Démarre un intervalle pour changer le texte de la lettre toutes les 60ms
            const interval = setInterval(() => {
                charIndex = (charIndex + 1) % alphabet.length;  // Passe à la lettre suivante dans l'alphabet
                field.textContent = alphabet[charIndex];  // Met à jour la lettre affichée dans le <span>
            }, 60);  // Change la lettre toutes les 60 millisecondes
            
            scrollingIntervals.push(interval);  // Stocke l'intervalle dans scrollingIntervals pour plus tard (afin de l'arrêter)
        });
    }

    // Fonction pour arrêter le défilement et révéler le nom, une lettre à la fois
    function revealName(name) {
        let currentIndex = 0;  // Indice de la lettre actuellement révélée

        // Fonction récursive pour révéler les lettres une par une
        function revealNextLetter() {
            if (currentIndex >= name.length) {  // Si toutes les lettres sont révélées
                // Arrête la première musique et lance la deuxième
                music1.pause();
                music1.currentTime = 0;
                music2.play();

                // Affiche le message final après un délai de 2 secondes
                setTimeout(() => {
                    footerMessage.style.visibility = 'visible';  // Rendre visible le message du bas
                    joyeuxAnniversaire.style.opacity = '1';  // Affiche le texte "Joyeux Anniversaire"

                    setTimeout(() => {
                        document.querySelector('#header-message h1').classList.add('show');
                    }, 2000);  // Ajoute un délai de 2 secondes avant de commencer l'animation
                    
                    // Affiche un verset biblique avec un délai supplémentaire de 1 seconde
                    setTimeout(() => {
                        bibleVerse.style.opacity = '1';
                    }, 1000);
                }, 2000);
                return;  // Fin de la fonction si toutes les lettres sont révélées
            }

            // Récupère la lettre actuelle du nom que l'on veut révéler (en majuscule)
            const currentLetter = name[currentIndex].toUpperCase();
            let charIndex = 0;  // L'index du caractère dans l'alphabet, commence à 0

            // Arrête le défilement de la lettre actuelle en supprimant l'intervalle associé
            clearInterval(scrollingIntervals[currentIndex]);

            // Démarre un nouvel intervalle pour révéler progressivement la lettre correspondante
            const interval = setInterval(() => {
                charIndex = (charIndex + 1) % alphabet.length;  // Passe à la lettre suivante dans l'alphabet
                letterFields[currentIndex].textContent = alphabet[charIndex];  // Met à jour le texte affiché dans le champ
                
                // Si la lettre défilante correspond à la lettre du nom de l'utilisateur
                if (alphabet[charIndex] === currentLetter) {
                    clearInterval(interval);  // Arrête l'intervalle pour cette lettre
                    currentIndex++;  // Passe à la lettre suivante dans le nom
                    setTimeout(revealNextLetter, 100);  // Révèle la lettre suivante après un léger délai
                }
            }, 100);  // La vitesse de défilement pour révéler la lettre (toutes les 100 millisecondes)
        }

        revealNextLetter();  // Démarre la révélation du nom en appelant la première lettre
    } 

    // Fonction à exécuter lors du clic ou de l'appui sur Entrée
    const handleAction = () => {
        dialogBox.style.display = 'none';  // Cache la boîte de dialogue initiale
        music1.play();  // Joue la première musique
        createLetterFields(userName);  // Crée les champs pour chaque lettre du nom
        startScrolling();  // Démarre le défilement des lettres

        // Démarre la révélation du nom après un délai de 3 secondes
        setTimeout(() => {
            revealName(userName);
        }, 3000);
    };

    // Écoute l'événement de clic sur le bouton
    document.getElementById('yes-btn').addEventListener('click', handleAction);

    // Écoute l'événement de pression de touche sur le document
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {  // Vérifie si la touche appuyée est "Entrée"
            handleAction();
        }
    });


    // Écouteur d'événement pour le bouton "Non", qui cache simplement la boîte de dialogue
    document.getElementById('no-btn').addEventListener('click', () => {
        dialogBox.style.display = 'none';  // Cache la boîte de dialogue
        footerMessage.textContent = "Peut-être la prochaine fois !";  // Affiche un message de refus
        footerMessage.style.visibility = 'visible';  // Rend visible le message du bas
    });

    // Si l'utilisateur a entré un nom, on affiche la boîte de dialogue pour démarrer le processus
    function checkUserName(userName) {
        if (userName && userName.trim() !== '') {
            dialogBox.style.display = 'block';  // Affiche la boîte de dialogue avec les options Oui / Non
        } else {
            footerMessage.textContent = "Aucun nom n'a été saisi.";  // Message si l'utilisateur n'entre pas de nom
            footerMessage.style.visibility = 'visible';  // Affiche le message d'erreur au bas de la page
    
            // Optionnel : Terminer le programme ici
            return;  // Fin de la fonction
        }
    }
});
