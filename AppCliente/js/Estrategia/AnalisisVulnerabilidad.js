myApp

.config(function($stateProvider) {

  var carpetaEstrategia = 'templates/Estrategia/';

  $stateProvider

  .state('app.estrategia.analisisVulnerabilidad', {
    url: '/Analisis Vulnerabilidad',
    templateUrl: carpetaEstrategia+'AnalisisVulnerabilidad.html',
    controller: 'EstrategiaAnalisisVulnerabilidadCtrl'
  })
});

controllers

.controller('EstrategiaAnalisisVulnerabilidadCtrl',function($state,$scope,$timeout,EstrategiaComoEstamosService,AjaxService,$sce){
  $scope.setLoaded($scope.mostrarloaded);
  if($scope.clickedProyecto.Id != undefined)
    EstrategiaComoEstamosService.getAnalisisVulnerabilidad($scope.clickedProyecto.Id,AjaxService.miAjax).then(function(analisis){
    // EstrategiaComoEstamosService.getAnalisisVulnerabilidad(3,AjaxService.miAjax).then(function(analisis){
      if(analisis != 0)
        $scope.analisis = analisis;
      $timeout(function(){      
          
        activarFormulario({},'errorVulnerabilidad');

        $scope.setLoaded(1);

      },200);
    }, function(a){
      console.log(a);
    })
  else
    $state.go('app.estrategia.listaProyectos');  

  $scope.borrarPuntal = function(index,parent){
    $scope.analisis.splice(index,1);
  }

  $scope.agregarPuntal = function(parent){
    var puntal = {
      Puntal:null,
      Amenaza:null,
      Consecuencia:null,
      Impacto:null,
      Probabilidad:null,
      Reaccion:null,
      Vulnerabilidad:null,
      Id:null,
    }
    $scope.analisis.push(puntal);
  }

  $scope.getVulnerabilidad = function(index){
    var a = $scope.analisis[index];
    var y = a.Impacto * a.Probabilidad;
    var x = a.Reaccion;
    if(y>=5){
      if(x>=5)
        return toHtml("II En Peligro");
      else
        return toHtml("I Indefensa");
    }
    else{
      if(x>=5)
        return toHtml("III Preparada");
      else
        return toHtml("IV Vulnerable");
    }
  }

  function toHtml(texto) {
    return $sce.trustAsHtml(texto);
  };

  $scope.siguiente = function(){
    console.log($scope.diagnostico);
    if(!$("#formValidate").valid()){
      console.log('invalid');
      }
    else
    {
      EstrategiaComoEstamosService.editAnalisisVulnerabilidad($scope.analisis,$scope.clickedProyecto.Id,AjaxService.miAjax).then(function(a){
        alert('Analisis de Vulnerabilidad Actualizado Correctamente');
        $scope.analisis = {};
        $state.go('app.estrategia.matrizBCG'); 
      }, function(a){
        alert('Algo salio mal, intentelo de nuevo');
      });  
    }
  }

  $scope.anterior = function(){    
    $state.go('app.estrategia.pasos'); 
  }
})