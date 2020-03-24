myApp

.config(function($stateProvider) {

  var carpetaEstrategia = 'templates/Estrategia/';

  $stateProvider

  .state('app.estrategia.dofaResumido', {
    url: '/DofaResumido',
    templateUrl: carpetaEstrategia+'DofaResumido.html',
    controller: 'EstrategiaDofaResumidoCtrl'
  })
});

controllers

.controller('EstrategiaDofaResumidoCtrl',function($state,$scope,$timeout,EstrategiaComoEstamosService,AjaxService){
  $scope.setLoaded($scope.mostrarloaded);
  if($scope.clickedProyecto.Id != undefined)
    EstrategiaComoEstamosService.getEstrategiaDofaResumido($scope.clickedProyecto.Id,AjaxService.miAjax).then(function(dofaresumido){
    // EstrategiaComoEstamosService.getEstrategiaDofaResumido(1,AjaxService.miAjax).then(function(dofaresumido){
      $scope.dofaResumido = dofaresumido;
      $scope.dofaResumido.Resumen = dofaresumido[0].Resumen;
      console.log(dofaresumido);

      $timeout(function(){      
          
        var reglas = {
          dofaresumidoresumen: {
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
    console.log($scope.dofaResumido);
    if(!$("#formValidate").valid()){
      console.log('invalid');
      }
    else
    {
      EstrategiaComoEstamosService.replaceEstrategiaDofaResumido($scope.dofaResumido,$scope.clickedProyecto.Id,AjaxService.miAjax).then(function(a){
        alert('Resumen Actualizado Correctamente');
        $scope.dofaResumido = {};
        $state.go('app.estrategia.fuerzasPorter');    
      }, function(a){
        alert('Algo salio mal, intentelo de nuevo');
      });  
    }
  }

  $scope.anterior = function(){    
    $state.go('app.estrategia.pasos'); 
  }
})