myApp

.config(function($stateProvider) {

  var carpetaPeligros = 'templates/Peligros/';
  
  $stateProvider

  .state('app.peligros', {
    url: '/Peligros',
    templateUrl: carpetaPeligros+'Peligros.html',
    controller: 'PeligrosCtrl'
  }) 
});

controllers

.controller('PeligrosCtrl',function($state,$scope,$timeout,AjaxService,EmpresasService){
  $scope.peligros = [];
  $scope.nuevoPeligro = {
    // Descripcion: 'Digitación, Uso de mouse y teclado.',
    // Clasificacion: 'Biomecánica: movimientos repetitivos, posturas inadecuadas.',
    // CantidadPeorConsecuencia: 2,
    // CantidadEfectos: 2,
    // PeorConsecuencia: ['1','2'],
    // Efectos: ['1','2'],
    // Consecuencia: "1",
    // Requisito: 'si'
  };

  $scope.consecuencias = ['Mortal o Catastrófico','Muy grave','Grave','Leve'];

  $scope.setClickedPeligro = function(a){
    $scope.nuevoPeligro = a;
  }
  $scope.getClickedPeligro = function(){
    return $scope.nuevoPeligro;
  }
})