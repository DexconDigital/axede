myApp

.config(function($stateProvider) {

  var carpetaEstrategia = 'templates/Estrategia/';

  $stateProvider

  .state('app.estrategia.principiosCorporativos', {
    url: '/PrincipiosCorporativos',
    templateUrl: carpetaEstrategia+'PrincipiosCorporativos.html',
    controller: 'EstrategiaPrincipiosCorporativosCtrl'
  })
});

controllers

.controller('EstrategiaPrincipiosCorporativosCtrl',function($state,$scope,$timeout,EstrategiaQuienesSomosService,AjaxService){
  $scope.setLoaded($scope.mostrarloaded);
  if($scope.clickedProyecto.Id != undefined)
    EstrategiaQuienesSomosService.getMatrizaxiologica($scope.clickedProyecto.Id,AjaxService.miAjax).then(function(Matriz){
      // EstrategiaQuienesSomosService.getMatrizaxiologica(1,AjaxService.miAjax).then(function(Matriz){
      $scope.nuevosPrincipios = Matriz;
      var reglas = {
        nuevosPrincipiosCantidadGruposdeReferencia:{
          required: true,
        },
        nuevosPrincipiosCantidadPrincipiosCorporativos:{
          required: true,
        }
      };

      activarFormulario(reglas);

      $scope.setLoaded(1);
      
      $('#nuevosPrincipiosCantidadGruposdeReferencia').unbind( "keyup", agregarGrupodeReferencia );
      $('#nuevosPrincipiosCantidadGruposdeReferencia').bind( "keyup", agregarGrupodeReferencia );
      $('#nuevosPrincipiosCantidadGruposdeReferencia').unbind( "change", agregarGrupodeReferencia );
      $('#nuevosPrincipiosCantidadGruposdeReferencia').bind( "change", agregarGrupodeReferencia );
      $('#nuevosPrincipiosCantidadPrincipiosCorporativos').unbind( "keyup", agregarPrincipioCorporativo );
      $('#nuevosPrincipiosCantidadPrincipiosCorporativos').bind( "keyup", agregarPrincipioCorporativo );
      $('#nuevosPrincipiosCantidadPrincipiosCorporativos').unbind( "change", agregarPrincipioCorporativo );
      $('#nuevosPrincipiosCantidadPrincipiosCorporativos').bind( "change", agregarPrincipioCorporativo );
      
      $timeout(function(){    
          $('select').not('.disabled').material_select();
        },200); 
    }, function(a){
      alert('Algo salio mal, intentelo de nuevo');
    });  
  else
    $state.go('app.estrategia.listaProyectos');  

  $scope.PorcentajePrincipio = function(id){
    var a = $scope.nuevosPrincipios.Matriz;
    var suma = 0;
    var cantidad = 0;
    for (var p in a) {
      if(p[0] == id){
        suma += a[p];
        cantidad++;
      }
    }
    return (suma/cantidad)*100;
  }

  $scope.PorcentajeGrupo = function(id){
    var a = $scope.nuevosPrincipios.Matriz;
    var suma = 0;
    var cantidad = 0;
    for (var p in a) {
      if(p[1] == id){
        suma += a[p];
        cantidad++;
      }
    }
    return (suma/cantidad)*100;
  }

  function agregarGrupodeReferencia(e){
    var a = parseInt(this.value);
    if(a>0 && a<11){
      var b = [];
      if($scope.nuevosPrincipios.GruposdeReferencia != null)
        b = $scope.nuevosPrincipios.GruposdeReferencia;
      if(b.length < a){
        for (var i = 0; i < a-b.length; i++) {
          b.push("");
        }
      }
      else if (b.length > a){
        for (var i = 0; i < b.length-a; i++) {
          b.pop();
        }
      }
      $scope.nuevosPrincipios.GruposdeReferencia = b;
      $timeout(function() {
        this.value = a;
      }, 10);
    }
    else{
      $scope.nuevosPrincipios.GruposdeReferencia = [];
    }
    actualizarMatriz();
  }

  function agregarPrincipioCorporativo(e){
    var a = parseInt(this.value);
    if(a>0 && a<11){
      var b = [];
      if($scope.nuevosPrincipios.PrincipiosCorporativos != null)
        b = $scope.nuevosPrincipios.PrincipiosCorporativos;
      if(b.length < a){
        for (var i = 0; i < a-b.length; i++) {
          b.push("");
        }
      }
      else if (b.length > a){
        for (var i = 0; i < b.length-a; i++) {
          b.pop();
        }
      }
      $scope.nuevosPrincipios.PrincipiosCorporativos = b;
      $timeout(function() {
        this.value = a;
      }, 10);
    }
    else{
      $scope.nuevosPrincipios.PrincipiosCorporativos = [];
    }
    actualizarMatriz();
  }

  function actualizarMatriz(){
    $scope.nuevosPrincipios.Matriz = {}
    for (var i = 0; i < $scope.nuevosPrincipios.CantidadGruposdeReferencia; i++) {
      for (var j = 0; j < $scope.nuevosPrincipios.CantidadPrincipiosCorporativos; j++) {

        $scope.nuevosPrincipios.Matriz[j+""+i] = 0;
      }
    }
  }

  $scope.siguiente = function(){
    console.log($scope.nuevosPrincipios);
    if(!$("#formValidate").valid())
    {
      console.log('invalid');
    }
    else
    {
      EstrategiaQuienesSomosService.editMatrizaxiologica($scope.nuevosPrincipios,$scope.clickedProyecto.Id,AjaxService.miAjax).then(function(a){
        alert('Principios Editados Correctamente');
        $state.go('app.estrategia.misionvision'); 
      }, function(a){
        alert('Algo salio mal, intentelo de nuevo');
      });  
    }
  }

  $scope.anterior = function(){
      $state.go('app.estrategia.pasos'); 
  }
})