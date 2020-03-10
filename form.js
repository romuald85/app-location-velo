class Form{
    constructor(){
        this.validation = document.getElementById('submit');
        this.nom = document.getElementById('last-name');
        this.nomManquant = document.getElementById('missing-last-name');
        this.prenom = document.getElementById('first-name');
        this.prenomManquant = document.getElementById('missing-first-name');
        this.nomValide = /^[a-zA-ZéèîïÉÈîÏ][a-zéèêàçîï]+([-'\s][a-zA-ZéèîïÉÈîÏ][a-zéèêàçîï]+)?/;
        this.prenomValide = /^[a-zA-ZéèîïÉÈîÏ][a-zéèêàçîï]+([-'\s][a-zA-ZéèîïÉÈîÏ][a-zéèêàçîï]+)?/;
        this.numberAvailableBike;

        this.submit();
        this.hidePopup();
        this.closePopup();
       
    }

    submit(){
        this.validation.addEventListener('click', this.valid.bind(this));
        this.validation.addEventListener('click', function(e){
            e.preventDefault();// si l'événement n'est pas traité explicitement, son action par défaut ne doit pas être prise en compte 
        })
    }

    hidePopup(){
        document.getElementById('popup-content').classList.remove('isVisible');
    }

    closePopup(){
        document.getElementById('close').addEventListener('click', function(){
            document.getElementById('popup-content').style.display = 'none';
            document.getElementById('popup').style.display = 'none';
        });
    } 

    valid(e){// Vérification des champs et de la validité des informations entrées au clic sur "réservez"
        if((this.nom.validity.valueMissing) && (this.prenom.validity.valueMissing)){
            e.preventDefault();
            this.nomManquant.textContent = 'Nom manquant';
            this.nomManquant.style.color = 'red';
            this.prenomManquant.textContent = 'Prenom manquant';
            this.prenomManquant.style.color = 'red';
            this.hidePopup();
        }else if(this.nomValide.test(this.nom.value) == false || this.prenomValide.test(this.prenom.value) == false){
            event.preventDefault();
            this.nomManquant.textContent = 'Format incorrect';
            this.nomManquant.style.color = 'orange';
            this.prenomManquant.textContent = 'Format incorrect';
            this.prenomManquant.style.color = 'orange';
            this.hidePopup();
        }else if(this.nomValide.test(this.nom.value) == true || this.prenomValide.test(this.prenom.value) == true){
            document.getElementById('popup-content').style.display = 'block';
            document.getElementById('popup').style.display = 'block';
        }
    }

    setLastName(lastname){
        document.getElementById('last-name').value = lastname;
    }

    getLastName(){
        return document.getElementById('last-name').value;
    }

    setFirstName(firstname){
        document.getElementById('first-name').value = firstname;
    }

    getFirstName(){
        return document.getElementById('first-name').value;
    }

    setAddress(address){
        document.getElementById('addressFooter').innerText = address;
    }

}
