class Countdown {
  /**
   * @param {function} callback Méthode qui sera appelé à la fin du timer
   * @param {number} duration Le temps de réservation en millisecondes
   */
  constructor(callback, duration = 1200) {
    this.callback = callback;
    /** @var {bool} status Représente l'état du compte à rebours s'il est actif ou non */
    this.status = false;
    /** @var {number} rentTime Moment où la réservation a été effectué en millisecondes */
    this.rentTime = 0;
    /** @var {number} timeOutId L'identifiant du timer */
    this.timeOutId = 0;

    this.setDuration(duration);
  }

  /**
   * Lance le compte à rebours
   * @param {number} rentTime le moment où la location a été faite en millisecondes
  */
  start(rentTime) {
    this.status = true;
    this.setRentTime(rentTime);
    this.timeOutId = window.setTimeout(this.callback, this.duration);
  }

  /**
   * Arrete le compte à rebours 
   */
  stop() {
    this.status = false;
    window.clearTimeout(this.timeOutId);
  }

  /**
   * @param {number} duration Initialise le compte à rebours en millisecondes
   */
  setDuration(duration = this.duration) {
    this.duration = duration;
  }

  /**
   * affecte le moment ou la réservation est faite en millisecondes
   * @param {number} rentTime le moment où la location a été faite en millisecondes
   */ 
  setRentTime(rentTime) {
    this.rentTime = rentTime;
  }

  /**
   * Renvoi le moment de la location
   * @return {number}
   */
  getRentTime() {
    return this.rentTime;
  }

  /**
   * Calcul la différence entre le moment de la réservation et l'heure courante
   * @return {number} Ne pas retourner une duree de location qui ne soit pas en dessous de zéro 
   */
  getTimeLeft() {
    /** @var {number} locationTime Durée de location effective */
    let locationTime = Date.now() - this.rentTime;

    /** @var {number} reste Durée de location restante */
    let reste = this.duration - locationTime;

    return Math.max(0, reste); 
  }
}
