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

.controller('EstrategiaCtrl',function($state,$scope,$timeout){
  $scope.clickedProyecto = {};
  $scope.clickedEmpresa = {};

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