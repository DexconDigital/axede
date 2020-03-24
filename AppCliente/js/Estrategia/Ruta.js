myApp

.config(function($stateProvider) {

  var carpetaEstrategia = 'templates/Estrategia/';
  
  $stateProvider

  .state('app.estrategia.nuevo', {
    url: '/Nuevo',
    templateUrl: proyectos+'Nuevo.html',
    controller: 'ProyectoNuevoCtrl'
  })

  // .state('app.estrategia.listaProyectos', {
    // url: '/ListaProyectos',
    // templateUrl: proyectos+'Lista.html',
    // controller: 'ListaProyectosCtrl'
  // })
})