myApp

.config(function($stateProvider) {

  var carpetaCliente = 'templates/Cliente/';
  
  $stateProvider

  .state('app.cliente.detallePeligro', {
    url: '/Detalle',
    templateUrl: carpetaCliente+'Detalle.html?version=1',
    controller: 'GtcResumenDetalleClienteCtrl'
  })
});

controllers

.controller('GtcResumenDetalleClienteCtrl',function($state,$scope,$timeout,AjaxService,ResumenClienteService){
  $scope.setLoaded($scope.mostrarloaded);

  if($scope.getClickedPeligro().Id == undefined)
    $state.go('app.cliente.resumen');
  else
    ResumenClienteService.getGtcDetalle($scope.getClickedPeligro().Id,AjaxService.miAjax).then(function(peligroDetalle){
      $scope.peligroDetalle = peligroDetalle;
      console.log(peligroDetalle);
      $scope.setLoaded(1);  
    }, function(a){
      console.log(a);
    })

  $scope.anterior = function() {
    $state.go('app.cliente.resumen'); 
  };

})