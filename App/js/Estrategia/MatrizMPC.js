myApp

.config(function($stateProvider) {

  var carpetaEstrategia = 'templates/Estrategia/';

  $stateProvider

  .state('app.estrategia.matrizMPC', {
    url: '/Matriz MPC',
    templateUrl: carpetaEstrategia+'MatrizMPC.html',
    controller: 'EstrategiaMatrizMPCCtrl'
  })
});

controllers

.controller('EstrategiaMatrizMPCCtrl',function($state,$scope,$timeout,EstrategiaComoEstamosService,AjaxService){
  $scope.setLoaded($scope.mostrarloaded);
  if($scope.clickedProyecto.Id != undefined)
    EstrategiaComoEstamosService.getAnalisisVulnerabilidad($scope.clickedProyecto.Id,AjaxService.miAjax).then(function(factores){
    // EstrategiaComoEstamosService.getAnalisisVulnerabilidad(3,AjaxService.miAjax).then(function(factores){
      
      // if(factores != 0)
        // $scope.factores = factores;
      $timeout(function(){      
          
        activarFormulario({},'errorVulnerabilidad');

        $scope.setLoaded(1);

      },200);
    }, function(a){
      console.log(a);
    })
  else
    $state.go('app.estrategia.listaProyectos');  

  $scope.borrarFactor = function(index,parent){
    $scope.factores.splice(index,1);
  }

  $scope.agregarFactor = function(parent){
    var factor = {
      Descripcion:null,
      Importancia:0,
      PuntosE:0,
      Puntos1C:0,
      Puntos2C:0,
      Puntos3C:0,
      Puntos4C:0,
      Puntos5C:0,
      Id:null,
    }
    $scope.factores.push(factor);
  }

  $scope.getSumaPorcentaje = function(){
    var a = 0;
    for (var i = 0; i < $scope.factores.length; i++) {
      a += $scope.factores[i].Importancia;
    }
    return a.toFixed(1);
  }

  $scope.getSuma = function(Parte){
    var a = 0;
    for (var i = 0; i < $scope.factores.length; i++) {
      a += $scope.factores[i][Parte] * $scope.factores[i].Importancia * 0.01;
    }
    return a.toFixed(2);
  }

  $scope.siguiente = function(){
    console.log($scope.diagnostico);
    if(!$("#formValidate").valid()){
      console.log('invalid');
      }
    else
    {
      // EstrategiaComoEstamosService.editAnalisisVulnerabilidad($scope.analisis,$scope.clickedProyecto.Id,AjaxService.miAjax).then(function(a){
        alert('Matriz MPC Actualizada Correctamente');
        $scope.factores = {};
        $state.go('app.estrategia.pasos'); 
      // }, function(a){
        // alert('Algo salio mal, intentelo de nuevo');
      // });  
    }
  }

  $scope.anterior = function(){    
    $state.go('app.estrategia.pasos'); 
  }
})