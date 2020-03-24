myApp

.config(function($stateProvider) {

  var carpetaTemplates = 'templates/Inicio/';

  $stateProvider

  .state('inicio.registrar', {
    url: '/Registrar',
    // cached : false,
    // views: {
      // 'menuContent': {
        templateUrl: carpetaTemplates + 'Registrar.html?version=1',
        controller : 'RegistrarCtrl'
      // }
    // }
  })

});

controllers

.controller('RegistrarCtrl',function($state,$scope,$timeout){
  $scope.setLoaded($scope.mostrarloaded);
  $("body").height(window.innerHeight);
  $timeout(function() {
    $scope.setLoaded(1);  
  }, 100);
  
})