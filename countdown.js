class Countdown {
  constructor(callback, duration = 1200){
    this.callback = callback;//Méthode qui sera appelé à la fin du timer
    this.status = false;//Représente l'état du compte à rebours s'il est actif ou non
    this.rentTime = 0;//Moment où la réservation a été effectué en millisecondes
    this.timeOutId = 0;//L'identifiant du timer INT
    this.setDuration(duration);//Le compte à rebours en millisecondes
  }

  // Lance le compte à rebours
  start(rentTime){
    this.status = true;
    this.setRentTime(rentTime);
    this.timeOutId = window.setTimeout(this.callback, this.duration);// L'identifiant que renvoi le settimeout
  }

  // Arrete le compte à rebours
  stop(){
    this.status = false;
    window.clearTimeout(this.timeOutId);
  }

  //Initialise le compte à rebours en millisecondes
  setDuration(duration = this.duration){
    this.duration = duration;
  }

  //enregistre le moment ou la réservation est faite en millisecondes
  setRentTime(rentTime){
    this.rentTime = rentTime;
  }

  //Renvoi le moment de la location
  getRentTime(){
    return this.rentTime;
  }

  //Calcul la différence entre le moment de la réservation et l'heure courante
  getTimeLeft(){
    let locationTime = Date.now() - this.rentTime;// Durée de location effective
    let reste = this.duration - locationTime;// Durée de location restante
    
    return Math.max(0, reste);// Ne pas retourner une duree de location qui ne soit pas en dessous de zéro 
  }
}
