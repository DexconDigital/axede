myApp

.config(function($stateProvider) {

  var carpetaGtcResumen = 'templates/GtcResumen/';
  
  $stateProvider

  .state('app.gtcresumen', {
    url: '/GtcResumen',
    templateUrl: carpetaGtcResumen+'GtcResumen.html',
    controller: 'GtcResumenMainCtrl'
  })  
});

controllers

.controller('GtcResumenMainCtrl',function($state,$scope,$timeout){
	$scope.clickedProyecto = {};
	$scope.detallePeligro = {};

	$scope.setClickedProyecto = function(a){
		$scope.clickedProyecto = a;
	}
	$scope.getClickedProyecto = function(){
		return $scope.clickedProyecto;
	}

	$scope.setClickedPeligro = function(a){
		$scope.detallePeligro = a;
	}
	$scope.getClickedPeligro = function(){
		return $scope.detallePeligro;
	}
})