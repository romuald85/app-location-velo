/**
 * génère un carroussel à partir d'une liste d'images
 */
class Slide {
    /**
     * @param {string} selector selecteur css3 valide qui pointe sur une div contenant les images du carroussel
     * @param {Object} options liste d'options au format JSON
     */
    constructor(selector, options) {
        /** @var {number} currentItem L'index courant du slider */
        this.currentItem = 0;

        /** @var {bool} playing Informe sur l'état de marche du slider*/
        this.playing = true;

        /** @var {number} intervalId L'identifiant que le setInterval renvoie */
        this.intervalId;

        /** @var {Object} defaultOptions Liste des options par défaut au format JSON */
        let defaultOptions = {
            'interval': 5000
        };

        // Fusionne defaultOptions et options pour pouvoir écraser les options par défaut
        this.options = Object.assign(defaultOptions, options);

        /**
         * @var {HTMLElement} carroussel l'élément racine du carroussel
         * @var {Object} Object.assign fusionne les éléments defaultOptions et options
         */
        this.carroussel = document.getElementById(selector);

        /**
         * @var {DOMElement} figures l'élément racine du carroussel
         */
        this.figures = this.carroussel.getElementsByTagName('figure');

        /**
         * @var {number} maxItem représente le dernier élément du slider
         */
        this.maxItem = this.figures.length - 1;
 
        /*
         * for met les éléments du tableau en display none sauf le premier élément
         * i est définit à 1 pour que le premier élément du tableau qui est 0 soit affiché car il est en display block
         */
        for (let i = 1; i <= this.maxItem; i++) {
            this.figures[i].style.display = 'none';
        }

        this.createNavigation();
        this.playSlideshow();
    }

    /**
     * Permet de construire differents éléments du DOM.
     * @param {String} type définit le type d'élément commme input, button etc...
     * @param {Element} parent est l'élément parent de "element" 
     * @param {Object} options définit les options des éléments comme la class, l'id, value etc...
     * @param {String} text est définit de façon optionnelle avec les guillemets pour lui attribuer cette valeur optionnelle
     * @return {Elements}
     */
    makeElements(type, parent, options = {}, text = '') {
        let element = document.createElement(type);
        for (let key in options) {
            element.setAttribute(key, options[key]);
        }
        element.textContent = text;
        parent.appendChild(element);
        return element
    }

    /**
     * Construit les éléments du slider 
     * Gère les actions liés aux événements du slider en ajoutant des écouteurs d'événements
     */
    createNavigation() {
        let controlPanel = this.makeElements('div', this.carroussel, {
            'id': 'controlPanel'
        });
        this.button = this.makeElements('button', controlPanel, {
            'id': 'pause',
            'class': 'controls'
        }, 'Pause');
        let leftArrow = this.makeElements('input', controlPanel, {
            'class': 'fleche-gauche',
            'type': 'button',
            'value': '<',
            'readonly': 'true'
        });
        let rightArrow = this.makeElements('input', controlPanel, {
            'class': 'fleche-droite',
            'value': '    >',
            'readonly': 'true'
        });
        rightArrow.addEventListener('click', this.next.bind(this));
        leftArrow.addEventListener('click', this.prev.bind(this));
        this.button.addEventListener('click', this.toggleSlideShow.bind(this));
        document.addEventListener('keydown', this.keydown.bind(this));
    };

    /**
     * Affecte aux événements les touches clavier des bonnes actions du slider à déclencher 
     * ex : flèche droite fait avancer un slider d'un élément
     * @param {*} event "ArrowRight" ou "ArrowLeft" ou "Space"
     */
    keydown(event) {
        if (event.code === 'ArrowRight') {
            this.next();
        }
        if (event.code === 'ArrowLeft') {
            this.prev();
        }
        if (event.code === 'Space') {
            this.toggleSlideShow();
        }
    }

    /**
     * Sert à afficher l'élément suivant du slider
     * Gère le slider de façon à ne pas rester bloqué, le slider tourne sous forme de boucle
     * Passe du dernier élément au premier
     */
    next() {
        if (this.currentItem < this.maxItem) {
            this.goToItem(this.currentItem + 1);
        } else if (this.currentItem == this.maxItem) {
            this.goToItem(0);
        }
    }

    /**
     * Sert à afficher l'élément précédent du slider
     * Gère le slider de façon à ne pas rester bloqué, le slider tourne sous forme de boucle
     * Passe du premier élément au dernier élément
     */
    prev() {
        if (this.currentItem > 0) {
            this.goToItem(this.currentItem - 1);
        } else if (this.currentItem == 0) {
            this.goToItem(this.maxItem);
        }
    }

    /**
     * Déplace le carrousel vers l'élément ciblé
     * @param {number} index est l'élément vers lequel on va il est en display block
     * @var {*} this.currentItem est l'élément actuel il est en display none
     * @var {*} goToItem met en display none l'élément actuel "current" et envoie au prochain qui est en display block pour l'afficher
     */
    goToItem(index) {
        this.figures[index].style.display = 'block';
        this.figures[this.currentItem].style.display = 'none';
        this.currentItem = index;
    }

    /**
     * Met le slider en lecture
     */
    playSlideshow() {
        this.playing = true;
        this.intervalId = setInterval(this.next.bind(this), this.options.interval);
        this.button.textContent = 'Pause';
    }

    /** 
     * Met le slider en pause
     */ 
    pauseSlideshow() {
        this.playing = false;
        clearInterval(this.intervalId);
        this.button.textContent = 'Play';
    }

    /**
     * Met le slider en pause s'il est en lecture et le met en lecture s'il est en pause
     */
    toggleSlideShow() {
        if (this.playing == true) {
            this.pauseSlideshow();
        } else if (this.playing == false) {
            this.playSlideshow();
        }
    }
}
