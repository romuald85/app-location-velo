window.addEventListener('DOMContentLoaded', (event) => {
  /** @var {number} duration 1200000 millisecondes équivaut à 20 minutes */
  duration = 1200000;

  
  monSlider = new Slide('carroussel');
  myMap = new Map();

  newStorage = new Storage();
  countdown = new Countdown(LocationInfos.showExpired, duration);
  formulaire = new Form();
  locationInfos = new LocationInfos();
  signature = new Signature();

  locationInfos.loadRentInProgress();
});
