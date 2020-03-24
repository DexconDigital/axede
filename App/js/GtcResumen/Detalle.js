myApp

.config(function($stateProvider) {

  var carpetaGtcResumen = 'templates/GtcResumen/';
  
  $stateProvider

  .state('app.gtcresumen.detallePeligro', {
    url: '/Detalle',
    templateUrl: carpetaGtcResumen+'Detalle.html?version=1',
    controller: 'GtcResumenDetalleCtrl'
  })
});

controllers

.controller('GtcResumenDetalleCtrl',function($state,$scope,$timeout,AjaxService,GtcResumenService){
  $scope.setLoaded($scope.mostrarloaded);

  if($scope.getClickedPeligro().Id == undefined)
    $state.go('app.gtcresumen.resumen');
  else
    GtcResumenService.getGtcDetalle($scope.getClickedPeligro().Id,AjaxService.miAjax).then(function(peligroDetalle){
      $scope.peligroDetalle = peligroDetalle;
      $scope.setLoaded(1);  
    }, function(a){
      console.log(a);
    })

  $scope.anterior = function() {
    $state.go('app.gtcresumen.resumen'); 
  };

})