myApp

.config(function($stateProvider) {

  var carpetaCliente = 'templates/Cliente/';
  
  $stateProvider

  .state('app.cliente', {
    url: '/Cliente',
    templateUrl: carpetaCliente+'Cliente.html',
    controller: 'ClienteCtrl'
  })  
});

controllers

.controller('ClienteCtrl',function($state,$scope,$timeout,DashService){
	$scope.clickedProyecto = {};
	$scope.detallePeligro = {};
	console.log(DashService.idProyecto());

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