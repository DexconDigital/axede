myApp

.config(function($stateProvider) {

  var carpetaEstrategia = 'templates/Estrategia/';

  $stateProvider

  .state('app.estrategia.pasos', {
    url: '/Pasos',
    templateUrl: carpetaEstrategia+'Pasos.html?version=5',
    controller: 'EstrategiaPasosCtrl'
  })
});

controllers

.controller('EstrategiaPasosCtrl',function($state,$scope,$timeout){
  $scope.setLoaded($scope.mostrarloaded);
  $timeout(function(){    
      $scope.setLoaded(1);
    },1000);

  $scope.empresa = function(){
    $state.go('app.estrategia.empresa'); 
  }

  $scope.principiosCorporativos = function(){
    $state.go('app.estrategia.principiosCorporativos'); 
  }

  $scope.misionvision = function(lugar){
    $scope.setLugar(lugar);
    $state.go('app.estrategia.misionvision'); 
  }

  $scope.diagnostico = function(diagnostico){
    $scope.setTipoDiagnostico(diagnostico);
    $state.go('app.estrategia.'+diagnostico); 
  }

  $scope.dofaResumido = function(){
    $state.go('app.estrategia.dofaResumido'); 
  }

  $scope.fuerzasPorter = function(){
    $state.go('app.estrategia.fuerzasPorter'); 
  }

  $scope.analisisDofa = function(){
    $state.go('app.estrategia.analisisDofa'); 
  }

  $scope.matrizBCG = function(){
    $state.go('app.estrategia.matrizBCG'); 
  }

  $scope.analisisVulnerabilidad = function(){
   $state.go('app.estrategia.analisisVulnerabilidad');  
  }

  $scope.matrizMPC = function(){
   $state.go('app.estrategia.matrizMPC');  
  }

  $scope.estrategiasDireccionamiento = function(){
   $state.go('app.estrategia.estrategiasDireccionamiento');   
  }

  $scope.conductoresValor = function(){
    $scope.setPaginaAnterior('app.estrategia.pasos');
    $state.go('app.estrategia.conductoresValor');   
  }

  $scope.palancas = function(){
    $scope.setPaginaAnterior('app.estrategia.pasos');
    $state.go('app.estrategia.palancas');   
  }

  $scope.estrategias = function(){
    $scope.setPaginaAnterior('app.estrategia.pasos');
    $state.go('app.estrategia.estrategias');   
  }

  $scope.iniciativas = function(){
    $scope.setPaginaAnterior('app.estrategia.pasos');
    $state.go('app.estrategia.iniciativas');   
  }

  $scope.kpi = function(){
    $scope.setPaginaAnterior('app.estrategia.pasos');
    $state.go('app.estrategia.kpi');   
  }

  $scope.anterior = function(){
   $state.go('app.estrategia.listaProyectos');  
  }

  if($scope.clickedEmpresa.Id != undefined)
    $scope.setLoaded(1); 
  else
    $state.go('app.estrategia.listaProyectos');
})