myApp

.config(function($stateProvider) {

  var carpetaEstrategia = 'templates/Estrategia/';

  $stateProvider

  .state('app.estrategia.iniciativas', {
    url: '/Iniciativas',
    templateUrl: carpetaEstrategia+'Iniciativas.html?version=8',
    controller: 'EstrategiaIniciativasCtrl'
  })
});

controllers

.controller('EstrategiaIniciativasCtrl',function($state,$scope,$timeout,EstrategiaCreacionValorService,AjaxService){
  $scope.setLoaded($scope.mostrarloaded);
  if($scope.clickedProyecto.Id != undefined)
    EstrategiaCreacionValorService.getIniciativas($scope.clickedProyecto.Id,AjaxService.miAjax).then(function(estrategias){
    // EstrategiaCreacionValorService.getIniciativas(1,AjaxService.miAjax).then(function(estrategias){
      $scope.estrategias = estrategias;
      $scope.estrategiasViejos = clone(estrategias);
      $timeout(function(){      
          
        activarFormulario({},"errorIniciativas");

        $('.datepicker').pickadate({
            selectMonths: true, // Creates a dropdown to control month
            selectYears: 15, // Creates a dropdown of 15 years to control year
          });

        $scope.setLoaded(1);

      },200);
    }, function(a){
      console.log(a);
    })
  else
    $state.go('app.estrategia.listaProyectos');  

  $scope.borrarIniciativa = function(index,parent){
    if(($scope.estrategias[parent].Iniciativas[index].Id == null && $scope.estrategias[parent].Iniciativas[index].Actividades.length == 0) || confirm("Esta seguro de borrar esta Iniciativa?")){
      $scope.estrategias[parent].Iniciativas.splice(index,1);
    }
  }

  $scope.agregarIniciativa = function(parent, idEstrategia){
    var iniciativa = {
      Iniciativa:null,
      IdEstrategia:idEstrategia,
      Id:null,
      Actividades:[],
    }
    var tam = $scope.estrategias[parent].Iniciativas.length;
    $scope.estrategias[parent].Iniciativas.push(iniciativa);
  }

  $scope.borrarActividad = function(parentindex,parent,index){
    if($scope.estrategias[parentindex].Iniciativas[parent].Actividades[index].Id == null || confirm("Esta seguro de borrar esta Actividad?")){
      $scope.estrategias[parentindex].Iniciativas[parent].Actividades.splice(index,1);
    }
  }

  $scope.agregarActividad = function(parentIndex,parent,idIniciativa){
    var actividad = {
      Actividad:null,
      IdIniciativa:idIniciativa,
      Id:null,
      Responsable:null,
      Recursos:null,
    }
    var tam = $scope.estrategias[parentIndex].Iniciativas[parent].Actividades.length;
    $scope.estrategias[parentIndex].Iniciativas[parent].Actividades.push(actividad);
    $timeout(function(){      
      $('#'+parentIndex+'iniciativa'+parent+'inicio'+tam).pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 15, // Creates a dropdown of 15 years to control year
      });

      $('#'+parentIndex+'iniciativa'+parent+'final'+tam).pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 15, // Creates a dropdown of 15 years to control year
      });

      var $input1 = $('#'+parentIndex+'iniciativa'+parent+'inicio'+tam).pickadate();
      var $input2 = $('#'+parentIndex+'iniciativa'+parent+'final'+tam).pickadate();

      // Use the picker object directly.
      var picker1 = $input1.pickadate('picker');
      var picker2 = $input2.pickadate('picker');

      picker1.set('select', new Date()); 
      picker2.set('select', new Date()); 
      
      $scope.estrategias[parentIndex].Iniciativas[parent].Actividades[tam].Inicio = picker1.get('select', 'yyyy-mm-dd');
      $scope.estrategias[parentIndex].Iniciativas[parent].Actividades[tam].Final = picker2.get('select', 'yyyy-mm-dd');
      
      picker1.on({
        close: function() {
          $scope.estrategias[parentIndex].Iniciativas[parent].Actividades[tam].Inicio = picker1.get('select', 'yyyy-mm-dd');
        },
      })

      picker2.on({
        close: function() {
          $scope.estrategias[parentIndex].Iniciativas[parent].Actividades[tam].Final = picker2.get('select', 'yyyy-mm-dd');
        },
      })
    },200);
  }

  $scope.siguiente = function(){
    console.log($scope.estrategias);
    if(!$("#formValidate").valid()){
      console.log('invalid');
      }
    else
    {
      var nuevaIniciativa = [];
      var editarIniciativa = [];
      var borrarIniciativa = [];
      var nuevaActividad = [];
      var editarActividad = [];
      var borrarActividad = [];

      for (var i = 0; i < $scope.estrategias.length; i++) {
        var tempEst = $scope.estrategias[i];
        for (var j = 0; j < tempEst.Iniciativas.length; j++) {
          var c = tempEst.Iniciativas[j];
          if(c.Id == null){
            nuevaIniciativa.push(c);
          }
        }
      }

      for (var i = 0; i < $scope.estrategiasViejos.length; i++) {
        var tempEst = $scope.estrategiasViejos[i];
        for (var j = 0; j < tempEst.Iniciativas.length; j++) {
          var cv = tempEst.Iniciativas[j];
          var c = ($.grep($scope.estrategias[i].Iniciativas, function(e){ return e.IdIniciativa == cv.IdIniciativa; }))[0];
          if(c == null){
            borrarIniciativa.push(cv.IdIniciativa);
          }
          else{
            if(c.Iniciativa != cv.Iniciativa){
              editarIniciativa.push([c.IdIniciativa,c.Iniciativa]);
            }
            for (var k = 0; k < c.Actividades.length; k++) {
              var act = c.Actividades[k];
              if(act.Id == null){
                nuevaActividad.push(act);
              }
            }

            for (var k = 0; k < cv.Actividades.length; k++) {
              var tempAct = cv.Actividades[k];
              var act = ($.grep(c.Actividades, function(e){ return e.Id == tempAct.Id; }))[0];
              if(act == null){
                borrarActividad.push(tempAct.Id);
              }
              else if(tempAct.Actividad != act.Actividad || tempAct.Responsable != act.Responsable || tempAct.Inicio != act.Inicio || tempAct.Final != act.Final || tempAct.Recursos != act.Recursos){
                editarActividad.push(act);
              }
            }
          } 
        }
      }

      if(nuevaIniciativa.length == 0 && editarIniciativa.length == 0 && borrarIniciativa.length == 0 && nuevaActividad.length == 0 && editarActividad.length == 0 && borrarActividad.length == 0){
        $scope.estrategias = {};
        $state.go('app.estrategia.kpi'); 
      }
      else
        EstrategiaCreacionValorService.editIniciativas(nuevaIniciativa,editarIniciativa,borrarIniciativa,nuevaActividad,editarActividad,borrarActividad,AjaxService.miAjax).then(function(a){
          alert('Iniciativas Actualizadas Correctamente');
          $scope.estrategias = {};
          $scope.setPaginaAnterior('app.estrategia.iniciativas');
          $state.go('app.estrategia.kpi'); 
        }, function(a){
          alert('Algo salio mal, intentelo de nuevo');
        });  
    }
  }

  $scope.anterior = function(){    
    $scope.irPaginaAnterior('app.estrategia.pasos');
  }
})
