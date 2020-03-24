myApp

.config(function($stateProvider) {

  var carpetaEstrategia = 'templates/Estrategia/';

  $stateProvider

  .state('app.estrategia.empresa', {
    url: '/Empresa',
    templateUrl: carpetaEstrategia+'Empresa.html',
    controller: 'EstrategiaEmpresaCtrl'
  })

});

controllers

.controller('EstrategiaEmpresaCtrl',function($state,$scope,$timeout,EstrategiaQuienesSomosService,AjaxService){
  $scope.setLoaded($scope.mostrarloaded);
  if($scope.clickedProyecto.Id != undefined)
    EstrategiaQuienesSomosService.getEstrategiaEmpresa($scope.clickedProyecto.Id,AjaxService.miAjax).then(function(planeacion){
    // EstrategiaQuienesSomosService.getEstrategiaEmpresa(20,AjaxService.miAjax).then(function(planeacion){
      $scope.planeacion = {};
      if(planeacion != 0)
        $scope.planeacion = planeacion[0];
      $scope.planeacion.IdProyecto = $scope.clickedProyecto.Id;
      $timeout(function(){      
          
        var reglas = {
          planeacionAnoInicial: {
            required: true,
            number: true,
            range: [2000, 2100]
          },
          planeacionAnoFinal: {
            required: true,
            number: true,
            range: [2000, 2100]
          },
          planeacionEstrategas: {
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
    console.log($scope.planeacion);
    if(!$("#formValidate").valid()){
      console.log('invalid');
      }
    else
    {
      EstrategiaQuienesSomosService.replaceEstrategiaEmpresa($scope.planeacion,AjaxService.miAjax).then(function(a){
        alert('Informacion Actualizada Correctamente');
        $scope.planeacion = {};
        $state.go('app.estrategia.principiosCorporativos'); 
      }, function(a){
        alert('Algo salio mal, intentelo de nuevo');
      });  
    }
  }

  $scope.anterior = function(){    
    $state.go('app.estrategia.pasos'); 
  }
})