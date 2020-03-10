/**
 * Méthode Ajax qui permettra de récupérer la liste des stations 
 */
class Ajax {
    constructor() {
        this.request = new XMLHttpRequest(); // Création d'une requête HTTP
    }

    /**
     * Défini une requête HTTP de façon asynchrone avec la méthode GET et l'envoi
     * @param {String} url Adresse de l'API 
     * @param {function} callback Méthode qui sera appelé à la fin de la fonction
     */
    getJson(url, callback) {
        this.request.onreadystatechange = function () {
            if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {// Si la requête s'est terminée sans problème
                var response = JSON.parse(this.responseText);// Transforme la réponse au format string en un objet manipulable
                callback(response);// Appelle de "callback" en lui passant la réponse de la requête
            }
        };
        this.request.open("GET", url);
        this.request.send(); // Envoi de la requête
    }
}
