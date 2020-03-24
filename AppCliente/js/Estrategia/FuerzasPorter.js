myApp

.config(function($stateProvider) {

  var carpetaEstrategia = 'templates/Estrategia/';

  $stateProvider

  .state('app.estrategia.fuerzasPorter', {
    url: '/FuerzasPorter',
    templateUrl: carpetaEstrategia+'FuerzasPorter.html',
    controller: 'EstrategiaFuerzasPorterCtrl'
  })
});

controllers

.controller('EstrategiaFuerzasPorterCtrl',function($state,$scope,$timeout,EstrategiaComoEstamosService,AjaxService){
  $scope.setLoaded($scope.mostrarloaded);
  if($scope.clickedProyecto.Id != undefined)
    EstrategiaComoEstamosService.getEstrategiaFuerzasPorter($scope.clickedProyecto.Id,AjaxService.miAjax).then(function(fuerzasPorter){
    // EstrategiaComoEstamosService.getEstrategiaFuerzasPorter(1,AjaxService.miAjax).then(function(fuerzasPorter){
      $scope.fuerzasPorter = {};
      if(fuerzasPorter != 0)
        $scope.fuerzasPorter = fuerzasPorter[0];
      $scope.fuerzasPorter.IdProyecto = $scope.clickedProyecto.Id;
      $timeout(function(){      
          
        var reglas = {
          fuerzasPorterF1: {
            required: true,
          },
          fuerzasPorterF2: {
            required: true,
          },
          fuerzasPorterF3: {
            required: true,
          },
          fuerzasPorterF4: {
            required: true,
          },
          fuerzasPorterF5: {
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
    console.log($scope.fuerzasPorter);
    if(!$("#formValidate").valid()){
      console.log('invalid');
      }
    else
    {
      EstrategiaComoEstamosService.replaceEstrategiaFuearzasPorter($scope.fuerzasPorter,$scope.clickedProyecto.Id,AjaxService.miAjax).then(function(a){
        alert('Fuerzas de Porter Actualizadas Correctamente');
        $scope.fuerzasPorter = {};
        $state.go('app.estrategia.analisisDofa');    
      }, function(a){
        alert('Algo salio mal, intentelo de nuevo');
      });  
    }
  }

  $scope.anterior = function(){    
    $state.go('app.estrategia.pasos'); 
  }
})