myApp

.config(function($stateProvider) {

  var carpetaEstrategia = 'templates/Estrategia/';

  $stateProvider

  .state('app.estrategia.matrizBCG', {
    url: '/MatrizBCG',
    templateUrl: carpetaEstrategia+'MatrizBCG.html',
    controller: 'EstrategiaMatrizBCGCtrl'
  })
});

controllers

.controller('EstrategiaMatrizBCGCtrl',function($state,$scope,$timeout,EstrategiaComoEstamosService,AjaxService){
  $scope.setLoaded($scope.mostrarloaded);
  if($scope.clickedProyecto.Id != undefined)
    EstrategiaComoEstamosService.getEstrategiaMatrizBCG($scope.clickedProyecto.Id,AjaxService.miAjax).then(function(matrizbcg){
    // EstrategiaComoEstamosService.getEstrategiaMatrizBCG(1,AjaxService.miAjax).then(function(matrizbcg){
      
      if(matrizbcg != 0)
        $scope.matrizbcg = matrizbcg[0];
      $scope.matrizbcg.IdProyecto = $scope.clickedProyecto.Id;
      $timeout(function(){      
          
        var reglas = {
          estrellas: {
            required: true,
          },
          interrogantes: {
            required: true,
          },
          vacaLechera: {
            required: true,
          },
          perro: {
            required: true,
          },
        };

        activarFormulario(reglas);

        $scope.setLoaded(1);
      },200);
    }, function(a){
      console.log(a);
    })
  else
    $state.go('app.estrategia.listaProyectos');  

  $scope.siguiente = function(){
    console.log($scope.matrizbcg);
    if(!$("#formValidate").valid()){
      console.log('invalid');
      }
    else
    {
      EstrategiaComoEstamosService.replaceEstrategiaMatrizBCG($scope.matrizbcg,$scope.clickedProyecto.Id,AjaxService.miAjax).then(function(a){
        alert('Matriz BCG Actualizada Correctamente');
        $scope.matrizbcg = {};
        $state.go('app.estrategia.matrizMPC');    
      }, function(a){
        alert('Algo salio mal, intentelo de nuevo');
      });  
    }
  }

  $scope.anterior = function(){    
    $state.go('app.estrategia.pasos'); 
  }
})