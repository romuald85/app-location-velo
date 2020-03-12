class LocationInfos {
  /** @var {Object} sectionLocation id de la balise footer */
  static sectionLocation = document.getElementById('sectionLocation'); 

  /** @var {Object} expirationFooter div du message 'réservation expirée' */
  static expirationFooter = document.getElementById('expiration-footer');

  /**@var {Object} annulationFooter div du message 'réservation annulée' */
  static annulationFooter = document.getElementById('annulation-footer');

  /**@var {Object} titreFooter div du titre 'Location en cours */
  static titreFooter = document.getElementById('titre-footer');

  /**@var {Object} containerFooter div qui contient les informations de la location */
  static containerFooter = document.getElementById('container-footer');

  constructor() {
    /** @var {number} intervalTimer identifiant qui permet d'afficher le compte à rebours de façon régulière */
    this.intervalTimer; 
    
    this.validSign();
    this.deleteRent();
  }
  
  /**
   * Affiche le timer
   */
  static showTimer() {
    var time = LocationInfos.convertMilliseconds(countdown.getTimeLeft())
    document.getElementById('compteur').innerHTML = time;
  }

  /**
   * Affiche le message d'expiration de la location
   */
  static showExpired() {
    LocationInfos.hideLocationInfo();
    LocationInfos.showsectionLoc();
    LocationInfos.expirationFooter.style.display = 'block';
  }

  /**
   * Affiche le message d'annulation de la réservation
   */
  static showAnnulation() {
    LocationInfos.hideLocationInfo();
    LocationInfos.showsectionLoc();
    LocationInfos.annulationFooter.style.display = 'block';
  }

  /**
   * Affiche les informations de la location
   */
  static showLocationInfo() {
    LocationInfos.hideLocationInfo();
    document.getElementById('popup').style.display = 'none';
    LocationInfos.showsectionLoc();
    LocationInfos.titreFooter.style.display = 'block';
    LocationInfos.containerFooter.style.display = 'flex';
    document.querySelector('#addressFooter').innerText = document.querySelector('#nom-de-station').value;
  }

  /**
   * Cache les informations de la location
   */
  static hideLocationInfo() {
    LocationInfos.titreFooter.style.display = 'none';
    LocationInfos.containerFooter.style.display = 'none';
    LocationInfos.expirationFooter.style.display = 'none';
    LocationInfos.annulationFooter.style.display = 'none';
    LocationInfos.sectionLocation.style.display = 'none';
  }

  static showsectionLoc(){
    LocationInfos.sectionLocation.style.display = 'block';
  }

  /**
   * Met en forme à partir de millisecondes au format '00:00' (minutes seconde)
   * @param {number} millisecondes 
   * @return retourne minutes et secondes
   */
  static convertMilliseconds(millisecondes) {
    /** @var {number} reste Converti le temps exprimé en millisecondes en secondes */
    let reste = millisecondes / 1000; 

    /** @var {number} secondes Récupère le reste de la division et la converti en secondes arrondi à la valeur inférieure et sur deux caratères */
    let secondes = Math.floor(reste % 60).toString().padStart(2, '0'); 

    /** @var {number} minutes Divise pour mettre en minutes arrondi à la valeur inférieure et sur deux caratères */
    let minutes = Math.floor(reste / 60).toString().padStart(2, '0'); 
    return minutes + ':' + secondes;
  }

  /**
   * A la validation de la signature lance le timer, raffraichit le timer toutes les secondes, enregistre le nom et prénom dans le localstorage et les infos de la reservation dans le sessionstorage
   */
  validSign() {
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

  /**
   * Annule la réservation, efface les données stockées, réinitialise le compte à rebours, cache le footer, rajoute le vélo
   */
  deleteRent() {
    document.querySelector('#annulation').addEventListener('click', () => {
      countdown.stop();
      LocationInfos.showAnnulation();
      clearInterval(this.intervalTimer)
      var nbVelos = document.getElementById('nombre-de-velos');
      nbVelos.value++;
      newStorage.clearSessionStorage();
    });
  }

  /** 
   * Vérifie s'il y a une location en cours
   * @param {number} duration une durée de réservation
   * @param {number} timeLocation le moment où la réservation a été faite
   */
  isRentInProgress(duration, timeLocation) {
    /**
     * Initialise un nouveau compteur
     */
    countdown.setRentTime(timeLocation);
    countdown.setDuration(duration);
    if (timeLocation == null) { //S'il n'y a pas de location return false
      return false;
    } else if (
      timeLocation > 0 &&
      countdown.getTimeLeft() > 0
    ) { //S'il y a une location et que le temps de location n'est pas depassé return true
      return true;
    } else { // S'il y a une location mais que le temps de location est dépassé
      return false;
    }
  }

  /**
   * Au chargement de la page vérifie qu'une location est en cours et maintient affiché les informations de la location
   */
  loadRentInProgress() {
    if (newStorage.getTimeLocation() != null && this.isRentInProgress(duration, newStorage.getTimeLocation()) == true) { // Vérifier dans les sessions storage si une location est en cours
      LocationInfos.showLocationInfo(); // Affiche les informations de la location
      LocationInfos.showTimer(); // Affiche le timer
      formulaire.setLastName(newStorage.loadLastName()); // LocationInfos tient affiché le nom dans le formulaire au rechargement de la page
      formulaire.setFirstName(newStorage.loadFirstName()); // LocationInfos tient affiché le prénom dans le formulaire au rechargement de la page
      formulaire.setAddress(newStorage.loadStationName()); // LocationInfos tient affiché le nom de la station dans le footer au rechargement de la page
      countdown.start(newStorage.getTimeLocation());
      window.setInterval(LocationInfos.showTimer.bind(this), 1000);
    } else if (newStorage.getTimeLocation() != null && this.isRentInProgress(duration, newStorage.getTimeLocation()) == false) { // S'il y a une location mais que le temps de réservation est dépassé
      LocationInfos.showExpired();
    }
  }
}

/** @var {number} duration 1200000 millisecondes équivaut à 20 minutes */
var duration = 1200000; 

var newStorage = new Storage();
var countdown = new Countdown(LocationInfos.showExpired, duration);
var formulaire = new Form();
var locationInfos = new LocationInfos();
var signature = new Signature();

locationInfos.loadRentInProgress();
