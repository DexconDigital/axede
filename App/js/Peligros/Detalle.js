myApp

.config(function($stateProvider) {

  var carpetaPeligros = 'templates/Peligros/';
  
  $stateProvider

  .state('app.peligros.detallePeligro', {
    url: '/Detalle',
    templateUrl: carpetaPeligros+'Detalle.html',
    controller: 'DetallePeligroCtrl'
  })
});

controllers

.controller('DetallePeligroCtrl',function($state,$scope,$timeout,AjaxService,PeligrosService){
  $scope.setLoaded($scope.mostrarloaded);
  if($scope.getClickedPeligro().Id == undefined)
    $state.go('app.peligros.listaPeligros');
    $scope.anterior = function() {
      $state.go('app.peligros.listaPeligros'); 
    };
  $timeout(function() {$scope.setLoaded(1);}, 10);
  
  $scope.editarPeligro = function(peligro){
    $state.go('app.peligros.nuevoPeligro'); 
    $scope.setClickedPeligro(peligro);
    // console.log($scope.nuevoPeligro);
  }
})