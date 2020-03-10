/**
 * génère un carroussel à partir d'une liste d'images
 */
class Slide {
    /**
     * 
     * @param {string} selector selecteur css3 valide qui pointe sur une div contenant les images du carroussel
     */
    constructor(selector, options){
        this.currentItem = 0;
        this.currentFigcaption = 0;
        this.playing = true;
        this.intervalId;
        let defaultOptions = {'interval': 5000};
        this.options = Object.assign(defaultOptions, options);
        /**
         * @param {HTMLElement} carroussel l'élément racine du carroussel
         * @param {Object} Object.assign fusionne les éléments defaultOptions et options
         */
        this.carroussel = document.getElementById(selector);

        /**
         * @param {*} figures l'élément racine du carroussel
         * @param {*} for i est définit à 1 pour que le premier élément du tableau qui est 0 soit affiché car il est en display block for met l'index en display none
         */
        this.figures = this.carroussel.getElementsByTagName('figure');
        this.maxItem = this.figures.length-1;
        for(let i = 1; i <= this.maxItem; i++){
           this.figures[i].style.display = 'none';
        }

        this.createNavigation();
        this.playSlideshow();
    }
    
   /**
    * 
    * @param {*} type définit le type d'élément commme input, button etc...
    * @param {*} options définit les options des éléments comme la class, l'id, value etc...
    * @param {*} text est définit de façon optionnelle avec les guillemets pour lui attribuer cette valeur optionnelle
    * @param {*} parent est l'élément parent de "element" 
    * @return Elements
    * @param {*} 
    */
    makeElements(type, parent, options={}, text=''){
        let element = document.createElement(type);
        for(let key in options){
            element.setAttribute(key, options[key]);
        }
        element.textContent = text;
        parent.appendChild(element);
        return element
    }

    
    createNavigation (){
        let controlPanel = this.makeElements('div', this.carroussel, {'id': 'controlPanel'});
        this.button = this.makeElements('button', controlPanel, {'id': 'pause', 'class':'controls'}, 'Pause');
        let leftArrow = this.makeElements('input', controlPanel, {'class': 'fleche-gauche', 'type':'button', 'value':'<', 'readonly':'true'});
        let rightArrow = this.makeElements('input', controlPanel, {'class': 'fleche-droite','value':'    >', 'readonly':'true'});
        rightArrow.addEventListener('click', this.next.bind(this));
        leftArrow.addEventListener('click', this.prev.bind(this));
        this.button.addEventListener('click', this.toggleSlideShow.bind(this));
        document.addEventListener('keydown', this.keydown.bind(this));
    };

    keydown (event){
        if(event.code === 'ArrowRight'){
            this.next();
        }
        if(event.code === 'ArrowLeft'){
            this.prev();
        }
        if(event.code === 'Space'){
            this.toggleSlideShow();
        }
    }

    next(){
        if(this.currentItem < this.maxItem){
            this.goToItem(this.currentItem + 1);
        }
        else if (this.currentItem == this.maxItem){
            this.goToItem(0);
        }
    }

    prev(){
        if(this.currentItem > 0){
            this.goToItem(this.currentItem - 1);
        }
        else if (this.currentItem == 0){
            this.goToItem(this.maxItem);
        }
    }

    /**
     * Déplace le carrousel vers l'élément ciblé
     * @param {number} index est l'élément vers lequel on va il est en display block
     * @param {*} this.currentItem est l'élément actuel il est en display none
     * @param {*} goToItem met en display none l'élément actuel "current" et envoie au prochain qui est en display block pour l'afficher
     */
    goToItem(index){
        this.figures[index].style.display = 'block';
        this.figures[this.currentItem].style.display = 'none';
        this.currentItem = index;
    }

    playSlideshow(){
        this.playing = true;
        this.intervalId = setInterval(this.next.bind(this), this.options.interval);
        this.button.textContent = 'Pause';
    }

    pauseSlideshow(){
        this.playing = false;
        clearInterval(this.intervalId);
        this.button.textContent = 'Play';
    }

    toggleSlideShow(){
        if(this.playing == true){
            this.pauseSlideshow();
        } else if(this.playing == false){
            this.playSlideshow();
        }    
    }
}

window.addEventListener('DOMContentLoaded', (event) => {
    const monSlider = new Slide('carroussel');
});