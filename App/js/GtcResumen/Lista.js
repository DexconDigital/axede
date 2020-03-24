myApp

.config(function($stateProvider) {

  var carpetaGtcResumen = 'templates/GtcResumen/';

  $stateProvider

  .state('app.gtcresumen.listaProyectos', {
    url: '/ListaProyectos',
    templateUrl: carpetaGtcResumen+'Lista.html?version=1',
    controller: 'GtcResumenListaProyectosCtrl'
  })
});

controllers

.controller('GtcResumenListaProyectosCtrl',function($state,$scope,GtcResumenService,AjaxService){
	$scope.setLoaded($scope.mostrarloaded); 
	if($scope.clickedNorma.Id != undefined)    
		GtcResumenService.getListaGtc(AjaxService.miAjax).then(function(proyectos){
			$scope.setLoaded(1);  
			$scope.proyectos = proyectos;
		}, function(a){
		})  
	else
		$state.go('app.principal'); 

	$scope.editProyecto = function(proyecto){
		$scope.setClickedProyecto(proyecto);
		$state.go('app.gtcresumen.resumen'); 
	}
})