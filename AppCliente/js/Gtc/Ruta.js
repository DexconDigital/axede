myApp

.config(function($stateProvider) {
  
  var carpetaPeligros = 'templates/Peligros/';
  
  $stateProvider

  .state('app.gtc.listaProyectos', {
    url: '/ListaProyectos',
    templateUrl: proyectos+'Lista.html',
    controller: 'ListaProyectosCtrl'
  })

  .state('app.gtc.peligros', {
    url: '/Peligros',
    templateUrl: carpetaPeligros+'Peligros.html',
    controller: 'PeligrosCtrl'
  })

  .state('app.gtc.peligros.nuevoPeligro', {
    url: '/NuevoPeligro',
    templateUrl: carpetaPeligros+'Nuevo.html',
    controller: 'NuevoPeligroCtrl'
  })
})