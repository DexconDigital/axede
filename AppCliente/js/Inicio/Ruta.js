myApp

.config(function($stateProvider) {
  
  var carpetaTemplates = 'templates/Inicio/';
  
  $stateProvider

  .state('inicio', {
    url: '/Inicio',
    views: {
      'menuContent': {
        templateUrl: carpetaTemplates+'Base.html?version=1',
        controller: 'AppCtrl'
      }
    }
  })
})