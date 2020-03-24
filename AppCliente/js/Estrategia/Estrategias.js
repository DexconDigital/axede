myApp

.config(function($stateProvider) {

  var carpetaEstrategia = 'templates/Estrategia/';

  $stateProvider

  .state('app.estrategia.estrategias', {
    url: '/Estrategias',
    templateUrl: carpetaEstrategia+'Estrategias.html?version=4',
    controller: 'EstrategiaEstrategiasCtrl'
  })
});

controllers

.controller('EstrategiaEstrategiasCtrl',function($state,$scope,$timeout,EstrategiaCreacionValorService,AjaxService){
  $scope.setLoaded($scope.mostrarloaded);
  if($scope.clickedProyecto.Id != undefined)
    EstrategiaCreacionValorService.getEstrategias($scope.clickedProyecto.Id,AjaxService.miAjax).then(function(palancas){
    // EstrategiaCreacionValorService.getEstrategias(1,AjaxService.miAjax).then(function(palancas){
      $scope.tipoEstrategias = clone(palancas[1]); 
      $scope.palancas = palancas[0];
      $scope.palancasViejos = clone(palancas[0]);
      $timeout(function(){      
        $('select').not('.disabled').material_select();
        activarFormulario({});

        $scope.setLoaded(1);

      },200);
    }, function(a){
      console.log(a);
    })
  else
    $state.go('app.estrategia.listaProyectos');  

  $scope.borrarEstrategia = function(index,parent){
    if($scope.palancas[parent].Estrategias[index].Id == null || confirm("Esta seguro de borrar esta Estrategia?, si la borra, tambien borrara las iniciativas asociadas a ella")){
      $scope.palancas[parent].Estrategias.splice(index,1);
    }
  }

  $scope.agregarEstrategia = function(parent, idPalanca){
    var estrategia = {
      Estrategia:null,
      IdPalanca:idPalanca,
      Id:null,
      Tipo:"1",
    }
    $scope.palancas[parent].Estrategias.push(estrategia);
    $timeout(function(){      
        $('select').not('.disabled').material_select();
      },200);
  }

  $scope.siguiente = function(){
    console.log($scope.palancas);
    if(!$("#formValidate").valid()){
      console.log('invalid');
      }
    else
    {
      var nuevo = [];
      var editar = [];
      var borrar = [];

      for (var i = 0; i < $scope.palancas.length; i++) {
        var tempPal = $scope.palancas[i];
        for (var j = 0; j < tempPal.Estrategias.length; j++) {
          var c = tempPal.Estrategias[j];
          if(c.Id == null){
            nuevo.push(c);
          }
        }
      }

      for (var i = 0; i < $scope.palancasViejos.length; i++) {
        var tempPal = $scope.palancasViejos[i];
        for (var j = 0; j < tempPal.Estrategias.length; j++) {
          var cv = tempPal.Estrategias[j];
          var c = ($.grep($scope.palancas[i].Estrategias, function(e){ return e.Id == cv.Id; }))[0];
          if(c == null){
            borrar.push(cv.Id);
          }
          else if(c.Estrategia != cv.Estrategia || c.Tipo != cv.Tipo){
            editar.push(c)
          }
        }
      }

      if(nuevo.length == 0 && editar.length == 0 && borrar.length == 0){
        $scope.palancas = {};
        $scope.setPaginaAnterior('app.estrategia.estrategias');
        $state.go('app.estrategia.iniciativas'); 
      }
      else
        EstrategiaCreacionValorService.editEstrategias(nuevo,editar,borrar,AjaxService.miAjax).then(function(a){
          alert('Estrategias Actualizadas Correctamente');
          $scope.palancas = {};
          $scope.setPaginaAnterior('app.estrategia.estrategias');
          $state.go('app.estrategia.iniciativas'); 
        }, function(a){
          alert('Algo salio mal, intentelo de nuevo');
        });  
    }
  }

  $scope.anterior = function(){    
    $scope.irPaginaAnterior('app.estrategia.pasos');
  }
})
