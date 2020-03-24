myApp

.config(function($stateProvider) {

  var carpetaGtc = 'templates/Gtc/';
  
  $stateProvider

  .state('app.gtc', {
    url: '/Gtc',
    templateUrl: carpetaGtc+'Gtc.html',
    controller: 'GtcCtrl'
  }) 
});

controllers

.controller('GtcCtrl',function($state,$scope,$timeout){
  $scope.zonaEtapas = {};
  $scope.peligrosEtapas = {};
  $scope.clickedProyecto = {};
  $scope.clickedEmpresa = {};
  $scope.peligros = [];
  // $scope.nuevoProyecto = {
  //   Empresa:"1",
  //   NoContrato: 123,
  //   Responsable: 'Daniel',
  //   Cargo: 'Desarrollador',
  //   Cedula: 123,
  //   // ProfesionalEncargado: "1",
  // };
  $scope.nuevoProyecto = {}; 

  $scope.setZonaEtapas = function(a){
    $scope.zonaEtapas = a;
  }
  $scope.getZonaEtapas = function(){
    return $scope.zonaEtapas;
  }

  $scope.setPeligrosEtapas = function(a){
    $scope.peligrosEtapas = a;
  }
  $scope.getPeligrosEtapas = function(){
    return $scope.peligrosEtapas;
  }

  $scope.setClickedProyecto = function(a){
    $scope.clickedProyecto = a;
  }
  $scope.getClickedProyecto = function(){
    return $scope.clickedProyecto;
  }

  $scope.setPeligros = function(a){
    $scope.peligros = a;
  }
  
  $scope.getPeligros = function(){
    return $scope.peligros;
  }

  $scope.setClickedEmpresa = function(a){
    $scope.clickedEmpresa = a;
  }
  
  $scope.getClickedEmpresa = function(){
    return $scope.clickedEmpresa;
  }

  $scope.getNombreEtapa = function(id){
    if(Object.keys($scope.zonaEtapas).length > 0)
      return $.grep($scope.zonaEtapas, function(e){ return e.IdEtapa == id; })[0].Proceso;
    else
      return 'nada';
  }
})