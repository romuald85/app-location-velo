class Storage {
  constructor(){
    /*console.log(this);
    this.restoreData();*/
  }

  restoreData(){/*
    const timeLocation = getTimeLocation();
    if(duration != null && duration > 0)
    {
      countdown.start(duration);
    }*/
  }

  //Stockage du prénom et du nom de l'utilisateur
  saveName(name, firstname){
    window.localStorage.setItem('name', name);
    window.localStorage.setItem('firstname', firstname);
  }

  // Stockage des données de la location
  saveStationData(name, address, status, available_bikes, available_bike_stands, timeLocation){
    window.sessionStorage.setItem('name', name);
    window.sessionStorage.setItem('address', address);
    window.sessionStorage.setItem('status', status);
    window.sessionStorage.setItem('available_bikes', available_bikes);
    window.sessionStorage.setItem('available_bike_stands', available_bike_stands);
    window.sessionStorage.setItem('timeLocation', timeLocation);
  }

  // Stockage du temps restant de réservation
  saveTimeLocation(timeLocation){
    window.sessionStorage.setItem('timeLocation', timeLocation);
  }

  //Récupération du prénom et du nom de l'utilisateur
  loadName(name, firstname){
    var name = window.localStorage.getItem('name');
    var firstname = window.localStorage.getItem('firstname');
    return name + ' ' + firstname;
  }
  

  // Recupere du temps restant de réservation
  getTimeLocation(){
    return window.sessionStorage.getItem('timeLocation');
  }

  // Récupère le nom
  loadLastName(){
    return window.localStorage.getItem('name');
  }

  //Récupère le prénom
  loadFirstName(){
    return window.localStorage.getItem('firstname');
  }

  //Récupère le nom de la station
  loadStationName(){
    return window.sessionStorage.getItem('name')
  }

  // Efface les données stockées dans la sessionStorage
  clearSessionStorage() {
    window.sessionStorage.clear();
  }
}
