// Objet signature  ==>  Le canvas
class Signature {
    // Attributs
    constructor() {
        this.ecriture = false; // Attribut d'activation de l'écriture
        this.canvas = document.getElementById("signature"); // Sélection du canvas dans le HTML
        this.context = null; // Définira le contexte d'utilisation du canvas
        this.signatureImg = null;
        this.rect;

        this.init();
    }


    init() {
        // Appel des méthodes sur écrans tactiles
        this.canvas.addEventListener("touchstart", this.convertTouchEvent);
        this.canvas.addEventListener("touchmove", this.convertTouchEvent);
        this.canvas.addEventListener("touchend", this.convertTouchEvent);
        this.canvas.addEventListener("touchend", function () {
            document.getElementById('sig-submitBtn').style.display = 'block';
        });

        // Appel des méthodes sur PC
        this.canvas.addEventListener("mousedown", this.activationDessin.bind(this));
        this.canvas.addEventListener("mousemove", this.deplacementSouris.bind(this));
        this.canvas.addEventListener("mouseup", this.desactivationDessin.bind(this));
        this.canvas.addEventListener("mouseup", function () {
            document.getElementById('sig-submitBtn').style.display = 'block';
        });

        // Appel de la méthode d'effacement du canvas lors de l'appui sur le bouton "effacer"
        document.getElementById("sig-clearBtn").addEventListener("click", (function () {
            this.clearCanvas();
            document.getElementById('sig-submitBtn').style.display = 'none';
        }).bind(this));
        /*document.getElementById("sig-clearBtn").addEventListener("click", this.clearCanvas.bind(this));*/

        // validation de la signature
        document.getElementById('sig-submitBtn').addEventListener("click", () => {
            // mise à jour du nombre de vélos disponibles
            var nbVelos = document.getElementById('nombre-de-velos');
            nbVelos.value = nbVelos.value - 1;
        });

    }

    // Méthode qui traduit l'événement Touch en Évent pour écrans tactiles
    convertTouchEvent(ev) {
        let touch, ev_type, mouse_ev;
        touch = ev.targetTouches[0];// Pointe sur l'élément actuel du DOM
        ev.preventDefault();
        switch (ev.type) {
            case 'touchstart':// Cela indique qu'un nouveau toucher s'est produit
                // S'assure qu'un doigt est sur la cible
                if (ev.targetTouches.length != 1) {
                    return;
                }
                touch = ev.targetTouches[0];
                ev_type = 'mousedown';// Est déclenché à partir d'un élément lorsqu'on appuie sur le bouton comme la souris
                break;
            case 'touchmove':// Est déclenché lorsque le doigt bouge
                // S'assure qu'un doigt est sur la cible
                if (ev.targetTouches.length != 1) {
                    return;
                }
                touch = ev.targetTouches[0];
                ev_type = 'mousemove';// Est déclenché à partir d'un élément lorqu'un dispositif comme la souris est déplacé
                break;
            case 'touchend':// Événement déclenché lorsqu'un utilisateur enlève son doigt de la surface
                // Sassure que le doigt a été enlever de la cible
                if (ev.changedTouches.length != 1) {
                    return;
                }
                touch = ev.changedTouches[0];
                ev_type = 'mouseup';// Est déclenché à partir d'un élément lorque le bouton de la souris est relaché
                break;
            default:
                return;
        }

        mouse_ev = document.createEvent("MouseEvents");// Création de l'événement MouseEvents
        mouse_ev.initMouseEvent(
            ev_type, // Genre de l'événement
            true,
            true,
            window, // Vue de l'événement
            0, // Compte de clic de souris
            touch.screenX, // Coordonnée X de l'écran
            touch.screenY, // Coordonnée Y de l'écran
            touch.clientX, // Coordonnée X du client
            touch.clientY, // Coordonnée Y du client
            ev.ctrlKey, // Vérifie si la touche contrôle a été appuyée
            ev.altKey, // Vérifie si la touche alt a été appuyée
            ev.shiftKey, // Vérifie si la touche majuscule a été appuyée
            ev.metaKey, // Vérifie si la touche meta a été appuyée
            0, // Bouton de la souris
            null // Cible
        );
        this.dispatchEvent(mouse_ev);
    }

    // Méthode qui récupére les coordonnées de l'Élément de pointage (souris, doigt...)
    getMousePos(event) {
        this.rect = this.canvas.getBoundingClientRect(); // Renvoie la taille d'un élément et sa position relative par rapport à la zone d'affichage

        return {
            x: event.clientX - this.rect.left,
            y: event.clientY - this.rect.top
        };
    }

    // Méthode qui détermine le déplacement de l'élément de pointage
    deplacementSouris(event) {
        this.sourisPosition = this.getMousePos(event); // Coordonnées de l'élément de pointage retourner par la méthode "getMousePos"
        this.positionX = this.sourisPosition.x;
        this.positionY = this.sourisPosition.y;
        this.dessin(this.positionX, this.positionY);
    }

    // Méthode qui permet de dessiner dans le canvas
    dessin(positionX, positionY) {
        this.context = this.canvas.getContext("2d"); // Contexte du canvas
        this.context.lineWidth = 5; // Largeur du tracer

        if (this.ecriture) {
            this.context.lineTo(positionX, positionY); // Désigne le point d'arrivé du tracer
            this.context.stroke(); // Effectue le tracer
        }
    }

    // Méthode qui permet de désactiver l'écriture
    desactivationDessin() {
        this.ecriture = false; // Désactive l'écriture dans le canvas
    }

    // Méthode qui active et débute l'écriture dans le canvas
    activationDessin() {
        this.ecriture = true; // Active l'écriture sur le canvas
        this.context.beginPath(); // Commence un nouveau chemin de dessin
        this.context.moveTo(this.positionX, this.positionY); // Désigne le début du tracer
    }

    // Méthode qui permet d'effacer le canvas
    clearCanvas() {
        this.context.clearRect(0, 0, 800, 200); // Réinitialise le canvas
    }
}

