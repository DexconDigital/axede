myApp

.config(function($stateProvider) {

  var carpetaProfesionales = 'templates/Profesionales/';
  
  $stateProvider

  .state('app.profesionales', {
    url: '/Profesionales',
    // views: {
      // 'menuContent': {
        templateUrl: carpetaProfesionales+'Profesionales.html',
        controller: 'ProfesionalesCtrl'
      // }
    // }
  })

  .state('app.profesionales.listaProfesionales', {
    url: '/ListaProfesionales',
    // views: {
      // 'menuContent': {
        templateUrl: carpetaProfesionales+'Lista.html',
        controller: 'ListaProfesionalesCtrl'
      // }
    // }
  })

  .state('app.profesionales.nuevoProfesional', {
    url: '/NuevoProfesional',
    // views: {
      // 'menuContent': {
        templateUrl: carpetaProfesionales+'Nuevo.html',
        controller: 'NuevoProfesionalCtrl'
      // }
    // }
  })

  .state('app.profesionales.detalleProfesional', {
    url: '/DetalleProfesional',
    // views: {
      // 'menuContent': {
        templateUrl: carpetaProfesionales+'Detalle.html',
        controller: 'DetalleProfesionalCtrl'
      // }
    // }
  })

})