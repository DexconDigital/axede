myApp

.config(function($stateProvider) {

  var carpetaEstrategia = 'templates/Estrategia/';

  $stateProvider

  .state('app.estrategia.misionvision', {
    url: '/MisionVision',
    templateUrl: carpetaEstrategia+'MisionVision.html',
    controller: 'EstrategiaMisionVisionCtrl'
  })
});

controllers

.controller('EstrategiaMisionVisionCtrl',function($state,$scope,$timeout,EstrategiaQuienesSomosService,AjaxService){
  $scope.setLoaded($scope.mostrarloaded);
  if($scope.clickedProyecto.Id != undefined)
    EstrategiaQuienesSomosService.getEstrategiaMisionVision($scope.clickedProyecto.Id,AjaxService.miAjax).then(function(misionvision){
    // EstrategiaQuienesSomosService.getEstrategiaMisionVision(20,AjaxService.miAjax).then(function(misionvision){
      $scope.misionvision = {};
      if(misionvision != 0)
        $scope.misionvision = misionvision[0];
      $scope.misionvision.IdProyecto = $scope.clickedProyecto.Id;
      $timeout(function(){      
          
        var reglas = {
          misionvisionMision: {
            required: true,
          },
          misionvisionVision: {
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
    console.log($scope.misionvision);
    if(!$("#formValidate").valid()){
      console.log('invalid');
      }
    else
    {
      EstrategiaQuienesSomosService.replaceEstrategiaMisionVision($scope.misionvision,AjaxService.miAjax).then(function(a){
        alert('Informacion Actualizada Correctamente');
        $scope.misionvision = {};
        if($scope.lugar == "QuienesSomos"){
          $scope.setTipoDiagnostico('pci');
          $state.go('app.estrategia.pci');   
        }
        else if($scope.lugar == "DondeQueremosEstar"){
          $state.go('app.estrategia.estrategiasDireccionamiento');    
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