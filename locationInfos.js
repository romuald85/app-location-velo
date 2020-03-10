//Class Controleur
class LocationInfos{
  // Point d'entrée de l'application
  constructor(){
    this.intervalTimer;//L'identifiant qui permet d'afficher le compte à rebours de façon régulière
    this.validSign();
    this.deleteRent();
  }

  //Affiche le timer
  static showTimer(){
    var time = LocationInfos.convertMilliseconds(countdown.getTimeLeft())
    document.getElementById('compteur').innerHTML = time;
  }

  //Affiche le message d'expiration de la location
  static showExpired(){
    LocationInfos.hideLocationInfo();
    document.getElementById('sectionLocation').style.display = 'block';
    document.getElementById('expiration-footer').style.display = 'block';
  }

  static showAnnulation(){
    LocationInfos.hideLocationInfo();
    document.getElementById('sectionLocation').style.display = 'block';
    document.getElementById('annulation-footer').style.display = 'block';
  }

  //Affiche les informations de la location
  static showLocationInfo(){
    LocationInfos.hideLocationInfo();
    document.getElementById('popup').style.display = 'none';
    document.querySelector('#sectionLocation').style.display = 'block';
    document.getElementById('titre-footer').style.display = 'block';
    document.getElementById('container-footer').style.display = 'flex';
    document.querySelector('#addressFooter').innerText = document.querySelector('#nom-de-station').value;
  }

  //Cache les informations de la location
  static hideLocationInfo(){
    document.getElementById('titre-footer').style.display      = 'none';
    document.getElementById('container-footer').style.display  = 'none';
    document.getElementById('expiration-footer').style.display = 'none';
    document.getElementById('annulation-footer').style.display = 'none';
    document.getElementById('sectionLocation').style.display   = 'none';
  }

  //Met en forme à partir de millisecondes au format '00:00' (minutes seconde)
  static convertMilliseconds(millisecondes){
    let reste = millisecondes / 1000;// Converti le temps exprimé en millisecondes en secondes 
    let secondes = Math.floor(reste % 60).toString().padStart(2, '0');// Récupère le reste de la division et la converti en secondes arrondi à la valeur inférieure et sur deux caratères
    let minutes = Math.floor(reste / 60).toString().padStart(2, '0');// Divise pour mettre en minutes arrondi à la valeur inférieure et sur deux caratères
    return minutes + ':' + secondes;
  }

  // A la validation de la signature lance le timer, raffraichit le timer toutes les secondes,
  // enregistre le nom et prénom dans le localstorage et les infos de la reservation dans le sessionstorage
  validSign(){
    document.querySelector('#sig-submitBtn').addEventListener('click', () => {
      countdown.start(Date.now());
      LocationInfos.showLocationInfo();
      this.intervalTimer = window.setInterval(LocationInfos.showTimer.bind(this), 1000);
      newStorage.saveName(
        formulaire.getLastName(),
        formulaire.getFirstName()
      );
      newStorage.saveStationData(
        document.getElementById('nom-de-station').value,
        document.getElementById('adresse').value,
        document.getElementById('statut').value,
        document.getElementById('nombre-de-velos').value,
        document.getElementById('nombre-de-place-dispo').value,
        countdown.getRentTime()
      );
    });
  }

  deleteRent(){
    // Annule la réservation, efface les données stockées, réinitialise le compte à rebours, cache le footer,
    //rajoute le vélo
    document.querySelector('#annulation').addEventListener('click', () => {
      countdown.stop();
      LocationInfos.showAnnulation();
      clearInterval(this.intervalTimer)
      var nbVelos = document.getElementById('nombre-de-velos');
        nbVelos.value ++;
        newStorage.clearSessionStorage();
    });
  }

  //Vérifie s'il y a une location en cours
  isRentInProgress(duration, timeLocation){
    // Initialise un nouveau compteur
    countdown.setRentTime(timeLocation);
    countdown.setDuration(duration);
    if(timeLocation == null ){//S'il n'y a pas de location return false
      return false;
    } else if(
      timeLocation > 0
      && countdown.getTimeLeft() > 0
    ){//S'il y a une location et que le temps de location n'est pas depassé return true
      return true;
    } else {// S'il y a une location mais que le temps de location est dépassé
      return false;
    }
  }

  loadRentInProgress(){
    if( newStorage.getTimeLocation() == null ){// S'il n'y a pas de location 
      console.log('Pas de location');
    } else if(this.isRentInProgress(duration, newStorage.getTimeLocation()) == true){// Vérifier dans les sessions storage si une location est en cours
      LocationInfos.showLocationInfo();// Affiche les informations de la location
      LocationInfos.showTimer();// Affiche le timer
      formulaire.setLastName(newStorage.loadLastName());// LocationInfos tient affiché le nom dans le formulaire au rechargement de la page
      formulaire.setFirstName(newStorage.loadFirstName());// LocationInfos tient affiché le prénom dans le formulaire au rechargement de la page
      formulaire.setAddress(newStorage.loadStationName());// LocationInfos tient affiché le nom de la station dans le footer au rechargement de la page
      countdown.start(newStorage.getTimeLocation());
      window.setInterval(LocationInfos.showTimer.bind(this), 1000);
    } else if(this.isRentInProgress(duration, newStorage.getTimeLocation()) == false) {// S'il y a une location mais que le temps de réservation est dépassé
      console.log('Temps de réservation expiré');
      LocationInfos.showExpired();
    } else {// Ne devrait jamais rentrer dans ce cas
      console.log('Erreur : cas improbable');
    }
  }
}

var duration = 1200000;//1200000

var newStorage = new Storage();
var countdown = new Countdown(LocationInfos.showExpired, duration);
var formulaire = new Form();
var locationInfos = new LocationInfos();
var signature = new Signature();

locationInfos.loadRentInProgress();
