myApp

.config(function($stateProvider) {

  var carpetaEstrategia = 'templates/Estrategia/';

  $stateProvider

  .state('app.estrategia.pci', {
    url: '/PCI',
    templateUrl: carpetaEstrategia+'Diagnostico.html',
    controller: 'EstrategiaDiagnosticoCtrl'
  })

  .state('app.estrategia.pce', {
    url: '/PCE',
    templateUrl: carpetaEstrategia+'Diagnostico.html',
    controller: 'EstrategiaDiagnosticoCtrl'
  })
});

controllers

.controller('EstrategiaDiagnosticoCtrl',function($state,$scope,$timeout,EstrategiaComoEstamosService,AjaxService){
  $scope.setLoaded($scope.mostrarloaded);
  if($scope.clickedProyecto.Id != undefined)
    EstrategiaComoEstamosService.getEstrategiaDiagnostico($scope.clickedProyecto.Id,$scope.tipoDiagnostico,AjaxService.miAjax).then(function(diagnostico){
    // EstrategiaComoEstamosService.getEstrategiaDiagnostico(3,"pci",AjaxService.miAjax).then(function(diagnostico){
      $scope.diagnostico = diagnostico;
      $timeout(function(){      
          
        activarFormulario({});

        $scope.setLoaded(1);

        $timeout(function(){    
          $('select').not('.disabled').material_select();
          $("select").change(function(){
            var id = "";
            var id2 = "";
            var id3 = this.name.substring(0,1);
            if(this.name.substring(15,10) == "Nivel"){
              id = this.name.substring(15);
              id2 =this.name.substring(17);
            }
            else if(this.name.substring(17,10) == "Impacto"){
              id = this.name.substring(17);
              id2 =this.name.substring(19)
            }
            if(this.name.substring(10,1) == "Debilidad"){
              $('select[name='+id3+'FortalezaNivel'+id+']').val("");
              $('select[name='+id3+'FortalezaImpacto'+id+']').val("");
              $scope.diagnostico.Items[id3].Descripciones[id2].FortalezaImpacto = 0;
              $scope.diagnostico.Items[id3].Descripciones[id2].FortalezaNivel = 0;

            }
            else if(this.name.substring(10,1) == "Fortaleza"){
              $('select[name='+id3+'DebilidadNivel'+id+']').val("");
              $('select[name='+id3+'DebilidadImpacto'+id+']').val("");
              $scope.diagnostico.Items[id3].Descripciones[id2].DebilidadImpacto = 0;
              $scope.diagnostico.Items[id3].Descripciones[id2].DebilidadNivel = 0;
            }
          $('select').not('.disabled').material_select();
          })
        },200); 

      },200);
    }, function(a){
      console.log(a);
    })
  else
    $state.go('app.estrategia.listaProyectos');  

  $scope.borrarDescripcion = function(index,parent){
    $scope.diagnostico.Items[parent].Descripciones.splice(index,1);
  }

  $scope.agregarDescripcion = function(parent){
    var descripcion = {
      DebilidadImpacto:null,
      DebilidadNivel:null,
      Descripcion:null,
      FortalezaImpacto:null,
      FortalezaNivel:null,
      Id:null,
    }
    $scope.diagnostico.Items[parent].Descripciones.push(descripcion);
    $timeout(function(){    
      $('select').not('.disabled').material_select();
      $("select").change(function(){
        var id = "";
        var id2 = "";
        var id3 = this.name.substring(0,1);
        if(this.name.substring(15,10) == "Nivel"){
          id = this.name.substring(15);
          id2 =this.name.substring(17);
        }
        else if(this.name.substring(17,10) == "Impacto"){
          id = this.name.substring(17);
          id2 =this.name.substring(19)
        }
        if(this.name.substring(10,1) == "Debilidad"){
          $('select[name='+id3+'FortalezaNivel'+id+']').val("");
          $('select[name='+id3+'FortalezaImpacto'+id+']').val("");
          $scope.diagnostico.Items[id3].Descripciones[id2].FortalezaImpacto = 0;
          $scope.diagnostico.Items[id3].Descripciones[id2].FortalezaNivel = 0;

        }
        else if(this.name.substring(10,1) == "Fortaleza"){
          $('select[name='+id3+'DebilidadNivel'+id+']').val("");
          $('select[name='+id3+'DebilidadImpacto'+id+']').val("");
          $scope.diagnostico.Items[id3].Descripciones[id2].DebilidadImpacto = 0;
          $scope.diagnostico.Items[id3].Descripciones[id2].DebilidadNivel = 0;
        }
      $('select').not('.disabled').material_select();
      })
    },200); 
  }

  $scope.getCalificacion = function(parent,tipo){
    var a = $scope.diagnostico.Items[parent].Descripciones;
    var cantidad = a.length;
    var suma = 0;
    for (var i = 0; i < a.length; i++) {
      if(tipo == 0){
        var x = a[i].FortalezaImpacto * a[i].FortalezaNivel
        suma += x;
        if(x == 0)
          cantidad--;
      }
      else if(tipo == 1){
        var x = a[i].DebilidadImpacto * a[i].DebilidadNivel; 
        suma += x;
        if(x == 0)
          cantidad--;
      }
    }

    if(cantidad == 0)
      cantidad = 1;

    var porcentaje = Math.round(suma/9/cantidad*10000)/100;

    return porcentaje;
  }

  $scope.siguiente = function(){
    console.log($scope.diagnostico);
    if(!$("#formValidate").valid()){
      console.log('invalid');
      }
    else
    {
      EstrategiaComoEstamosService.editDiagnostico($scope.diagnostico,$scope.clickedProyecto.Id,AjaxService.miAjax).then(function(a){
        alert('Diagnostico '+ $scope.tipoDiagnostico+' Actualizado Correctamente');
        $scope.diagnostico = {};
        if($scope.tipoDiagnostico == "pci"){
          $scope.setTipoDiagnostico('pce');
          $state.go('app.estrategia.pce');   
        }
        else{
          $state.go('app.estrategia.dofaResumido'); 
        }
        
      }, function(a){
        alert('Algo salio mal, intentelo de nuevo');
      });  
    }
  }

  $scope.anterior = function(){    
    $state.go('app.estrategia.pasos'); 
  }
})
