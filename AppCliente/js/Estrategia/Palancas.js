myApp

.config(function($stateProvider) {

  var carpetaEstrategia = 'templates/Estrategia/';

  $stateProvider

  .state('app.estrategia.palancas', {
    url: '/Palancas',
    templateUrl: carpetaEstrategia+'Palancas.html?version=7',
    controller: 'EstrategiaPalancasCtrl'
  })
});

controllers

.controller('EstrategiaPalancasCtrl',function($state,$scope,$timeout,EstrategiaCreacionValorService,AjaxService){
  $scope.setLoaded($scope.mostrarloaded);
  if($scope.clickedProyecto.Id != undefined)
    EstrategiaCreacionValorService.getPalancas($scope.clickedProyecto.Id,AjaxService.miAjax).then(function(conductoresValor){
    // EstrategiaCreacionValorService.getPalancas(1,AjaxService.miAjax).then(function(conductoresValor){
      $scope.conductoresValor = conductoresValor;
      $scope.conductoresValorViejos = clone(conductoresValor);
      $timeout(function(){      
          
        activarFormulario({});

        $scope.setLoaded(1);

      },200);
    }, function(a){
      console.log(a);
    })
  else
    $state.go('app.estrategia.listaProyectos');  

  $scope.borrarPalanca = function(index,parent){
    if($scope.conductoresValor[parent].Palancas[index].Id == null || confirm("Esta seguro de borrar esta Palanca?, si la borra, tambien borrara las estrategias asociadas a ella")){
      $scope.conductoresValor[parent].Palancas.splice(index,1);
    }
  }

  $scope.agregarPalanca = function(parent, idConductor){
    var palanca = {
      Palanca:null,
      IdConductor:idConductor,
      Id:null,
    }
    $scope.conductoresValor[parent].Palancas.push(palanca);
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
        var tempCon = $scope.conductoresValor[i];
        for (var j = 0; j < tempCon.Palancas.length; j++) {
          var c = tempCon.Palancas[j];
          if(c.Id == null){
            nuevo.push(c);
          }
        }
      }

      for (var i = 0; i < $scope.conductoresValorViejos.length; i++) {
        var tempCon = $scope.conductoresValorViejos[i];
        for (var j = 0; j < tempCon.Palancas.length; j++) {
          var cv = tempCon.Palancas[j];
          var c = ($.grep($scope.conductoresValor[i].Palancas, function(e){ return e.Id == cv.Id; }))[0];
          if(c == null){
            borrar.push(cv.Id);
          }
          else if(c.Palanca != cv.Palanca){
            editar.push(c);
          }
        }
      }

      if(nuevo.length == 0 && editar.length == 0 && borrar.length == 0){
        $scope.conductoresValor = {};
        $scope.setPaginaAnterior('app.estrategia.palancas');
        $state.go('app.estrategia.estrategias'); 
      }
      else
        EstrategiaCreacionValorService.editPalancas(nuevo,editar,borrar,AjaxService.miAjax).then(function(a){
          alert('Palancas Actualizadas Correctamente');
          $scope.conductoresValor = {};
          $scope.setPaginaAnterior('app.estrategia.palancas');
          $state.go('app.estrategia.estrategias'); 
        }, function(a){
          alert('Algo salio mal, intentelo de nuevo');
        });  
    }
  }

  $scope.anterior = function(){    
    $scope.irPaginaAnterior('app.estrategia.pasos');
  }
})
