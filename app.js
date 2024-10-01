document.addEventListener("DOMContentLoaded", () => {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890 ";
    const dialogBox = document.getElementById('dialog-box');
    const nameRevealContainer = document.getElementById('name-reveal-container');
    const footerMessage = document.getElementById('footer-message');
    const joyeuxAnniversaire = document.getElementById('joyeux-anniversaire');
    
    const userName = prompt("Entrez votre nom");  // nom de la personne
    const letterFields = [];
    const scrollingIntervals = [];

    // Initialisation des champs de lettres
    function createLetterFields(name) {
        nameRevealContainer.innerHTML = '';  // Réinitialise le conteneur
        for (let i = 0; i < name.length; i++) {
            const letterSpan = document.createElement('span');
            letterSpan.classList.add('letter');
            letterSpan.textContent = 'A';  // Commence à 'A'
            nameRevealContainer.appendChild(letterSpan);
            letterFields.push(letterSpan);
        }
    }

    // Fonction pour démarrer le défilement des lettres
    function startScrolling() {
        letterFields.forEach((field, index) => {
            let charIndex = 0;
            const interval = setInterval(() => {
                charIndex = (charIndex + 1) % alphabet.length;
                field.textContent = alphabet[charIndex];
            }, 80);  // Définit la vitesse de défilement
            scrollingIntervals.push(interval);  // Garde la trace de chaque intervalle
        });
    }

    // Fonction pour arrêter le défilement et révéler le nom lettre par lettre
    function revealName(name) {
        let currentIndex = 0; 

        function revealNextLetter() {
            if (currentIndex >= name.length) {
                // Après le dévoilement complet, affiche le message final
                setTimeout(() => {
                    footerMessage.style.visibility = 'visible';
                    joyeuxAnniversaire.style.opacity = '1';  // Affiche "Joyeux Anniversaire"
                    setTimeout(() => {
                        document.getElementById('bible-verse').style.opacity = '1';
                    }, 1000);  // Affiche le verset biblique après 1 seconde
                }, 2000);
                return;
            }

            const currentLetter = name[currentIndex].toUpperCase();
            let charIndex = 0;

            // Arrête le défilement de la lettre actuelle
            clearInterval(scrollingIntervals[currentIndex]);

            const interval = setInterval(() => {
                charIndex = (charIndex + 1) % alphabet.length;
                letterFields[currentIndex].textContent = alphabet[charIndex];
                if (alphabet[charIndex] === currentLetter) {
                    clearInterval(interval);
                    currentIndex++;
                    setTimeout(revealNextLetter, 0);  // Pause de 2 secondes avant la lettre suivante
                }
            }, 100);  // Vitesse de défilement pour trouver la lettre
        }

        revealNextLetter();
    }

    // Bouton "Oui" pour démarrer le déchiffrement
    document.getElementById('yes-btn').addEventListener('click', () => {
        dialogBox.style.display = 'none';  // Cache la boîte de dialogue
        // Arrête le défilement dans tous les champs
        scrollingIntervals.forEach(clearInterval);
        revealName(userName);  // Commence à dévoiler le nom
    });

    // Bouton "Non" pour terminer le cycle de vie
    document.getElementById('no-btn').addEventListener('click', () => {
        dialogBox.innerHTML = "<p>Merci d'avoir participé!</p>";
        setTimeout(() => window.close(), 2000);  // Ferme la fenêtre après 2 secondes
    });

    // Initialisation
    createLetterFields(userName);
    startScrolling();  // Les champs défilent avant toute interaction
});