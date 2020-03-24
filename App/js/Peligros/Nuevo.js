myApp

.config(function($stateProvider) {

  var carpetaPeligros = 'templates/Peligros/';
  
  $stateProvider

  .state('app.peligros.nuevoPeligro', {
    url: '/Nuevo',
    templateUrl: carpetaPeligros+'Nuevo.html',
    controller: 'NuevoPeligroCtrl'
  })
});

controllers

.controller('NuevoPeligroCtrl',function($state,$scope,$timeout,AjaxService,PeligrosService){
  $scope.setLoaded($scope.mostrarloaded);
  $timeout(function(){  

    var reglas = {
      nuevoPeligroDescripcion: {
        required: true,
      },
      nuevoPeligroClasificacion: {
        required: true,
      },
      selectListaConsecuencia: {
        required: true,
      },
      nuevoPeligroRequisito: {
        required: true,
      },
      nuevoPeligroCantidadEfectos:{
        required: true,
      },
      nuevoPeligroCantidadPeorConsecuencia:{
        required: true,
      }
    }

    activarFormulario(reglas);

    $scope.setLoaded(1);
    
    $('#nuevoPeligroCantidadEfectos').unbind( "keyup", agregarEfectos );
    $('#nuevoPeligroCantidadEfectos').bind( "keyup", agregarEfectos );
    $('#nuevoPeligroCantidadEfectos').unbind( "change", agregarEfectos );
    $('#nuevoPeligroCantidadEfectos').bind( "change", agregarEfectos );
    $('#nuevoPeligroCantidadPeorConsecuencia').unbind( "keyup", agregarPeorConsecuencia );
    $('#nuevoPeligroCantidadPeorConsecuencia').bind( "keyup", agregarPeorConsecuencia );
    $('#nuevoPeligroCantidadPeorConsecuencia').unbind( "change", agregarPeorConsecuencia );
    $('#nuevoPeligroCantidadPeorConsecuencia').bind( "change", agregarPeorConsecuencia );
    
    $timeout(function(){    
        $('select').not('.disabled').material_select();
      },200); 
  },200);

  function agregarEfectos(e){
    var a = parseInt(this.value);
    if(a>0 && a<11){
      $scope.nuevoPeligro.Efectos = [];    
      for (var i = 0; i < a; i++) {
        $scope.nuevoPeligro.Efectos.push("");
      }
      $timeout(function() {
        this.value = a;
      }, 10);
    }
    else{
      $scope.nuevoPeligro.Efectos = [];
    }
  }

  function agregarPeorConsecuencia(e){
    var a = parseInt(this.value);
    if(a>0 && a<11){
      $scope.nuevoPeligro.PeorConsecuencia = [];    
      for (var i = 0; i < a; i++) {
        $scope.nuevoPeligro.PeorConsecuencia.push("");
      }
      $timeout(function() {
        this.value = a;
      }, 10);
    }
    else{
      $scope.nuevoPeligro.PeorConsecuencia = [];
    }
  }

  $scope.siguiente = function(){
    // console.log($scope.nuevoPeligro);
    if(!$("#formValidate").valid())
    {
      console.log('invalid');
    }
    else
    {
      if($scope.nuevoPeligro.Id != null){
        PeligrosService.editPeligro($scope.nuevoPeligro,AjaxService.miAjax).then(function(a){
          alert('Peligro Editado Correctamente');
          $state.go('app.peligros.listaPeligros'); 
        }, function(a){
          alert('Algo salio mal, intentelo de nuevo');
        });  
      }
      else{
        PeligrosService.insertPeligro($scope.nuevoPeligro,AjaxService.miAjax).then(function(a){
          alert('Peligro Agregado');
          if($scope.getPaginaAnterior() == ''){            
            $state.go('app.peligros.listaPeligros'); 
          }
          else{
            $state.go($scope.getPaginaAnterior()); 
          }
        }, function(a){
          alert('Algo salio mal, intentelo de nuevo');
        });  
      }
    }
  }

  $scope.anterior = function(){
    $scope.irPaginaAnterior('app.peligros.listaPeligros');
  }
})