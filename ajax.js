 // Méthode Ajax qui permettra de récupérer la liste des stations 
class Ajax{
    constructor(){
        this.request = new XMLHttpRequest(); // Création d'une requête HTTP
    }
    getJson(url, callback){// Requête HTTP GET asynchrone
            this.request.onreadystatechange = function() {
            if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                // Appelle de "callback" en lui passant la réponse de la requête
                var response = JSON.parse(this.responseText);
                callback(response);
            }
        };
        this.request.open("GET", url);
        this.request.send(); // Envoi de la requête
    }
}
