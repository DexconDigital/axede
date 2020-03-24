myApp

.config(function($stateProvider) {

  var carpetaTemplates = 'templates/Inicio/';

  $stateProvider

  .state('inicio.recuperar', {
    url: '/Recuperar',
    // cached : false,
    // views: {
      // 'menuContent': {
        templateUrl: carpetaTemplates + 'Recuperar.html',
        controller : 'RecuperarCtrl'
      // }
    // }
  })

});

controllers

.controller('RecuperarCtrl',function($state,$scope,$timeout){
  $scope.setLoaded($scope.mostrarloaded);
  $("body").height(window.innerHeight);
  $timeout(function() {
    $scope.setLoaded(1);  
  }, 100);
  
})