myApp

.config(function($stateProvider) {

  var carpetaGtc = 'templates/Gtc/';

  $stateProvider

  .state('app.gtc.pasos', {
    url: '/Pasos',
    templateUrl: carpetaGtc+'Pasos.html',
    controller: 'GtcPasosCtrl'
  })
});

controllers

.controller('GtcPasosCtrl',function($state,$scope,$timeout,AjaxService){
  $scope.setLoaded($scope.mostrarloaded);
  $scope.setZonaEtapas({});
  $timeout(function(){    
      $scope.setLoaded(1);
    },200);
  $scope.zonas = function(){
    $state.go('app.gtc.zonas'); 
  }

  $scope.riesgos = function(){
    $state.go('app.gtc.riesgos'); 
  }

  $scope.intervencion = function(){
    $state.go('app.gtc.intervencion'); 
  }

  $scope.anterior = function(){
   $state.go('app.gtc.listaProyectos');  
  }

  if($scope.getClickedEmpresa().Id == undefined)
    $state.go('app.gtc.listaProyectos');
})