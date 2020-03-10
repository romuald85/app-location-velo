class Storage {
  constructor() {}

  /**
   * Sauvergarde le nom et prénom en localStorage
   * @param {String} name Stockage du nom de l'utilisateur
   * @param {String} firstname Stockage du prénom de l'utilisateur
   */
  saveName(name, firstname) {
    window.localStorage.setItem('name', name);
    window.localStorage.setItem('firstname', firstname);
  }

  /**
   * Sauvegarde les données de la station dans le sessionStorage
   * @param {String} name nom de la station
   * @param {String} address adresse de la station
   * @param {String} status état de la station si ouverte ou fermée (OPEN|CLOSE)
   * @param {Number} available_bikes nombre de vélos restant
   * @param {Number} available_bike_stands nombre de places restantes
   * @param {Number} timeLocation durée de la location
   */
  saveStationData(name, address, status, available_bikes, available_bike_stands, timeLocation) {
    window.sessionStorage.setItem('name', name);
    window.sessionStorage.setItem('address', address);
    window.sessionStorage.setItem('status', status);
    window.sessionStorage.setItem('available_bikes', available_bikes);
    window.sessionStorage.setItem('available_bike_stands', available_bike_stands);
    window.sessionStorage.setItem('timeLocation', timeLocation);
  }

  /**
   * Sauvegarde le temps de location en session storage
   * @param {number} timeLocation temps de réservation en millisecondes
   */
  saveTimeLocation(timeLocation) {
    window.sessionStorage.setItem('timeLocation', timeLocation);
  }

  /**
   * Retourne le nom et le prénom concaténé
   * @return {String}
   */
  loadName() {
    /** @var {String} name Récupération du nom de l'utilisateur en localstorage */
    var name = this.loadLastName();
    
    /** @var {String} prénom Récupération du prénom de l'utilisateur en localstorage */
    var firstname = this.loadFirstName();
    return name + ' ' + firstname;
  }


  /**
   * Récupèration du temps où la réservation a été faite
   * @return {number} 
   */
  getTimeLocation() {
    return window.sessionStorage.getItem('timeLocation');
  }

  /**
   * retourne le nom du localstorage
   * @return {String}  
   */
  loadLastName() {
    return window.localStorage.getItem('name');
  }

  /**
   * retourne le prénom du localstorage
   * @return {String} 
   */
  loadFirstName() {
    return window.localStorage.getItem('firstname');
  }

  /**
   * Récupère le nom de la station de la sessionstorage
   * @return {String} 
   */
  loadStationName() {
    return window.sessionStorage.getItem('name')
  }

  /**
   * Efface les données stockées dans la sessionStorage
   */
  clearSessionStorage() {
    window.sessionStorage.clear();
  }
}