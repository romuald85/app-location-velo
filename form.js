class Form {
    constructor() {
        /** @var {Object} validation bouton de validation du formulaire */
        this.validation = document.getElementById('submit');

        /** @var {Object} close croix de la popup pour la fermer */
        this.close = document.getElementById('close');

        /** @var {Object} nom input du formulaire */
        this.nom = document.getElementById('last-name');

        /** @var {Object} nomManquant message d'erreur si le nom est manquant */
        this.nomManquant = document.getElementById('missing-last-name');

        /** @var {Object} prenom input du formulaire */
        this.prenom = document.getElementById('first-name');

        /** @var {Object} prenomManquant message d'erreur si le prénom est manquant */
        this.prenomManquant = document.getElementById('missing-first-name');

        /** @var {Object} nomValide expression régulière qui verifie le format du nom */
        this.nomValide = /^[a-zA-ZéèîïÉÈîÏ][a-zéèêàçîï]+([-'\s][a-zA-ZéèîïÉÈîÏ][a-zéèêàçîï]+)?/;

        /** @var {Object} prenomValide expression régulière qui vérifie le format du prénom */
        this.prenomValide = /^[a-zA-ZéèîïÉÈîÏ][a-zéèêàçîï]+([-'\s][a-zA-ZéèîïÉÈîÏ][a-zéèêàçîï]+)?/;

        this.init();
    }

    /**
     * Initialise les écouteurs d'événement
     */
    init() {
        this.validation.addEventListener('click', this.valid.bind(this));
        this.close.addEventListener('click', this.hidePopup.bind(this));
    }

    /**
     * Vérification des champs et de la validité des informations entrées au clic sur "réservez"
     * @param {Object} e event 
     */
    valid(e) {
        e.preventDefault();
        if ((this.nom.validity.valueMissing) && (this.prenom.validity.valueMissing)) {
            this.nomManquant.textContent = 'Nom manquant';
            this.nomManquant.style.color = 'red';
            this.prenomManquant.textContent = 'Prenom manquant';
            this.prenomManquant.style.color = 'red';
        } else if (this.nomValide.test(this.nom.value) == false || this.prenomValide.test(this.prenom.value) == false) {
            this.nomManquant.textContent = 'Format incorrect';
            this.nomManquant.style.color = 'orange';
            this.prenomManquant.textContent = 'Format incorrect';
            this.prenomManquant.style.color = 'orange';
        } else if (this.nomValide.test(this.nom.value) == true || this.prenomValide.test(this.prenom.value) == true) {
            this.showPopup();
        }
    }

    /**
     * Affiche la popup
     */
    showPopup(){
        document.getElementById('popup-content').style.display = 'block';
        document.getElementById('popup').style.display = 'block';
    }

    /**
     * Cache la popup
     */
    hidePopup(){
        document.getElementById('popup-content').style.display = 'none';
        document.getElementById('popup').style.display = 'none';
    }

    /**
     * assigne le nom du client
     * @param {String} lastname nom du client
     */
    setLastName(lastname) {
        document.getElementById('last-name').value = lastname;
    }

    /**
     * retourne le nom du client
     * @return {String} 
     */
    getLastName() {
        return document.getElementById('last-name').value;
    }

    /**
     * assigne le prénom du client
     * @param {String} firstname prénom du client
     */
    setFirstName(firstname) {
        document.getElementById('first-name').value = firstname;
    }

    /**
     * retourne le prénom du client
     * @return {String} 
     */
    getFirstName() {
        return document.getElementById('first-name').value;
    }

    /**
     * Assigne l'adresse à la balise HTML dans le footer
     * @param {String} address Adresse de la station
     */
    setAddress(address) {
        document.getElementById('addressFooter').innerText = address;
    }
}
