myApp

.config(function($stateProvider) {

  var carpetaEstrategia = 'templates/Estrategia/';
  
  $stateProvider

  .state('app.estrategia', {
    url: '/Estrategia',
    templateUrl: carpetaEstrategia+'Estrategia.html',
    controller: 'EstrategiaCtrl'
  })
});

controllers

.controller('EstrategiaCtrl',function($state,$scope,$timeout,DashService){
  console.log(DashService.idProyecto());
  $scope.clickedProyecto = {
    FechaFinal:"2018-07-07",
    FechaInicio:"2017-07-07",
    Id:"6",
    IdEmpresa:"4",
    IdNorma:"2",
    NitEmpresa:"900054789",
    NoContrato:"897230",
    NombreEmpresa:"NETCO LTDA.",
  };
  $scope.clickedEmpresa = {
    Id:"4",
    Nit:"900054789",
    Nombre:"NETCO LTDA.",
  };

  $scope.diagnostico = [];

  $scope.analisis = [];

  $scope.matrizbcg = [];

  $scope.factores = [];

  $scope.lugar = "";

  $scope.setClickedProyecto = function(a){
    $scope.clickedProyecto = a;
  }

  $scope.setClickedEmpresa = function(a){
    $scope.clickedEmpresa = a;
  }
  
  $scope.setTipoDiagnostico = function(a){
    $scope.tipoDiagnostico = a;
  }

  $scope.setLugar = function(a){
    $scope.lugar = a;
  }
})