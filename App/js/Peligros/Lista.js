myApp

.config(function($stateProvider) {

  var carpetaPeligros = 'templates/Peligros/';

  $stateProvider

  .state('app.peligros.listaPeligros', {
    url: '/Lista',
    templateUrl: carpetaPeligros+'Lista.html',
    controller: 'ListaPeligrosCtrl'
  })
});

controllers

.controller('ListaPeligrosCtrl',function($state,$scope,$timeout,AjaxService,PeligrosService){
  $scope.setLoaded($scope.mostrarloaded);
  PeligrosService.getPeligros(AjaxService.miAjax).then(function(peligros){
    $scope.setLoaded(1);
    $scope.peligros = peligros;
  }, function(a){
    //console.log(a);
  });

  $scope.nuevaPeligro = function(){
    $scope.setClickedPeligro({});
    $state.go('app.peligros.nuevoPeligro'); 
  }

  $scope.editarPeligro = function(peligro){
    $state.go('app.peligros.nuevoPeligro'); 
    $scope.setClickedPeligro(peligro);
    // console.log($scope.nuevoPeligro);
  }

  $scope.detallesPeligro = function(peligro){
    $state.go('app.peligros.detallePeligro'); 
    $scope.setClickedPeligro(peligro);
  }
})