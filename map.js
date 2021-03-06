/**
 * Carte dynamique provenant du système de cartographie LeafletJS (API), gère aussi les données de JC Decaux (API)
 */
class Map {
  constructor() {
    this.map = this.initMap();
    this.markers = []; //affectation du tableau des marqueurs
    this.validation = document.getElementById('sig-submitBtn');
    var ajax = new Ajax();
    ajax.getJson("https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=b31c3f3e5afad063284bb4c8cdc18da4114cadc0", (stations) => {
      this.refreshMarkersMap(stations, this.map, this.markers);
    });
  }

  /**
   * initialise la carte via l'API Leaflet
   */
  initMap() {
    let map = L.map('map').setView([45.750000, 4.850000], 12); //initialise la position de la carte et un niveau de zoom
    L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=jXE1OGVV9TKZEJe3LoeF', {
      attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
    }).addTo(map); //configuration de la carte
    return map;
  }

  /**
   * Met à jour tous les marqueurs
   * @param {Object} stations liste de station au format JSON
   * @param {Object} map represente la carte
   * @param {Object} markers tableau de markers
   */
  refreshMarkersMap(stations, map, markers) {
    this.removeMarkers(markers);
    this.addMarkers(stations, map, markers);
  }

  /**
   * Supprime tous les marqueurs de la carte
   * @param {Object} markers tableau des markers de la carte 
   */
  removeMarkers(markers) {
    for (let i = 0; i < markers.length; i++) {
      markers[i].remove();
    }
  }

  /**
   * Ajoute un marker pour chaque poition de station à la carte
   * @param {Object} stations liste de station au format JSON
   * @param {Object} map represente la carte
   * @param {Object} markers tableau de markers
   */
  addMarkers(stations, map, markers) {
    for (let i = 0; i < stations.length; i++) {// boucle sur chaque stations 
      markers[i] = L.marker(//affect a un markeur du tableau, un marqueur de la carte, qui correspont a une station
        [stations[i].position.lat, stations[i].position.lng], {// assigne au marqueur en cours la position de la station en cours
          title: stations[i].name,// assigne au marqueur en cours le nom de la station en cours comme titre
        }
      ).addTo(map);
      markers[i].on('click', function () {
        var name = stations[i].name;
        var address = stations[i].address;
        var status = stations[i].status;
        var available_bikes = stations[i].available_bikes;
        var available_bike_stands = stations[i].available_bike_stands;

        document.getElementById('formreq').elements['nom-de-station'].value = name;
        document.getElementById('formreq').elements['adresse'].value = address;
        document.getElementById('formreq').elements['statut'].value = status;
        document.getElementById('formreq').elements['nombre-de-velos'].value = available_bikes;
        document.getElementById('formreq').elements['nombre-de-place-dispo'].value = available_bike_stands;

        if (status === 'CLOSED') {
          document.getElementById('impossible-de-reserver').style.display = 'block';
          document.getElementById('submit').style.display = 'none';
        } else if (available_bikes === 0) {
          document.getElementById('impossible-de-reserver').style.display = 'block';
          document.getElementById('submit').style.display = 'none';
        } else {
          document.getElementById('impossible-de-reserver').style.display = 'none';
          document.getElementById('submit').style.display = 'block';
        }
      })
    }
  }
}
