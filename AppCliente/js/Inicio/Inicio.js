myApp

.config(function($stateProvider) {

  var carpetaTemplates = 'templates/Inicio/';

  $stateProvider

  .state('inicio.principal', {
    url: '/Principal',
    // cached : false,
    // views: {
      // 'menuContent': {
        templateUrl: carpetaTemplates + 'Inicio.html?version=1',
        controller : 'InicioCtrl'
      // }
    // }
  })

});

controllers

.controller('InicioCtrl',function($state,$scope,$timeout){
  $scope.setLoaded($scope.mostrarloaded);
  $("body").height(window.innerHeight);
  $timeout(function() {
    $scope.setLoaded(1);  
  }, 1000);
  
})