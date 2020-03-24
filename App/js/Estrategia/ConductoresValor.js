myApp

.config(function($stateProvider) {

  var carpetaEstrategia = 'templates/Estrategia/';

  $stateProvider

  .state('app.estrategia.conductoresValor', {
    url: '/ConductoresValor',
    templateUrl: carpetaEstrategia+'ConductoresValor.html?version=2',
    controller: 'EstrategiaConductoresValorCtrl'
  })

});

controllers

.controller('EstrategiaConductoresValorCtrl',function($state,$scope,$timeout,EstrategiaCreacionValorService,AjaxService){
  $scope.setLoaded($scope.mostrarloaded);
  if($scope.clickedProyecto.Id != undefined)
    EstrategiaCreacionValorService.getConductoresValor($scope.clickedProyecto.Id,AjaxService.miAjax).then(function(conductoresValor){
    // EstrategiaCreacionValorService.getConductoresValor(1,AjaxService.miAjax).then(function(conductoresValor){
      $scope.conductoresValor = [];
      if(conductoresValor != 0){
        $scope.conductoresValor = conductoresValor;
        $scope.conductoresValorViejos = clone(conductoresValor);
      }
      $timeout(function(){      
          
        activarFormulario({});

        $scope.setLoaded(1);

      },200);
    }, function(a){
      console.log(a);
    })
  else
    $state.go('app.estrategia.listaProyectos');  

  $scope.borrarConductor = function(index){
    if($scope.conductoresValor[index].Id == null || confirm("Esta seguro de borrar este conductor?, si lo borra, tambien borrara las palancas asociadas a el")){
      $scope.conductoresValor.splice(index,1);
    }
  }

  $scope.agregarConductor = function(parent){
    var conductor = {
      ConductorValor:null,
      Id:null,
    }
    $scope.conductoresValor.push(conductor);
  }

  $scope.siguiente = function(){
    console.log($scope.conductoresValor);
    if(!$("#formValidate").valid()){
      console.log('invalid');
      }
    else
    {
      var nuevo = [];
      var editar = [];
      var borrar = [];

      for (var i = 0; i < $scope.conductoresValor.length; i++) {
        var c = $scope.conductoresValor[i];
        if(c.Id == null){
          nuevo.push(c);
        }
      }

      for (var i = 0; i < $scope.conductoresValorViejos.length; i++) {
        var cv = $scope.conductoresValorViejos[i];
        var c = ($.grep($scope.conductoresValor, function(e){ return e.Id == cv.Id; }))[0];
        if(c == null){
          borrar.push(cv.Id);
        }
        else if(c.ConductorValor != cv.ConductorValor){
          editar.push(c);
        }
      }

      if(nuevo.length == 0 && editar.length == 0 && borrar.length == 0){
        $scope.conductoresValor = {};
        $scope.setPaginaAnterior('app.estrategia.conductoresValor');
        $state.go('app.estrategia.palancas'); 
      }
      else
        EstrategiaCreacionValorService.editConductoresValor(nuevo,editar,borrar,$scope.clickedProyecto.Id,AjaxService.miAjax).then(function(a){
          alert('Conductores de Valor Actualizados Correctamente');
          $scope.conductoresValor = {};
          $scope.setPaginaAnterior('app.estrategia.conductoresValor');
          $state.go('app.estrategia.palancas'); 
        }, function(a){
          alert('Algo salio mal, intentelo de nuevo');
        });  
    }
  }

  $scope.anterior = function(){
    $scope.irPaginaAnterior('app.estrategia.pasos');
  }
})
