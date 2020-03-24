myApp

.config(function($stateProvider) {

  var carpetaEmpresa = 'templates/Empresa/';
  
  $stateProvider

  .state('app.empresas', {
    url: '/Empresas',
    // views: {
      // 'menuContent': {
        templateUrl: carpetaEmpresa+'empresas.html',
        controller: 'EmpresasCtrl'
      // }
    // }
  })

  .state('app.empresas.listaEmpresas', {
    url: '/Lista',
    // views: {
      // 'menuContent': {
        templateUrl: carpetaEmpresa+'listaEmpresas.html',
        controller: 'ListaEmpresasCtrl'
      // }
    // }
  })

  .state('app.empresas.editarEmpresa', {
    url: '/Editar',
    // views: {
      // 'menuContent': {
        templateUrl: carpetaEmpresa+'editarEmpresa.html',
        controller: 'EditarEmpresaCtrl'
      // }
    // }
  })

  .state('app.empresas.editarEmpresa.pasosEditar', {
    url: '/Pasos',
    // views: {
      // 'menuContent': {
        templateUrl: carpetaEmpresa+'editarEmpresaPasos.html',
        controller: 'EditarEmpresaPasosCtrl'
      // }
    // }
  })

  .state('app.empresas.editarEmpresa.editarDatos', {
    url: '/Datos',
    // views: {
      // 'menuContent': {
        templateUrl: carpetaEmpresa+'editarEmpresaDatos.html',
        controller: 'EditarEmpresaDatosCtrl'
      // }
    // }
  })

  .state('app.empresas.editarEmpresa.editarCantidadProcesos', {
    url: '/CantidadProcesos',
    // views: {
      // 'menuContent': {
        templateUrl: carpetaEmpresa+'editarEmpresaCantidadProcesos.html',
        controller: 'EditarEmpresaCantidadProcesosCtrl'
      // }
    // }
  })

  .state('app.empresas.editarEmpresa.editarMacroprocesos', {
    url: '/Macroprocesos',
    // views: {
      // 'menuContent': {
        templateUrl: carpetaEmpresa+'editarEmpresaMacroprocesos.html',
        controller: 'EditarEmpresaMacroprocesosCtrl'
      // }
    // }
  })

  .state('app.empresas.editarEmpresa.editarProcesos', {
    url: '/Procesos',
    // views: {
      // 'menuContent': {
        templateUrl: carpetaEmpresa+'editarEmpresaProcesos.html',
        controller: 'EditarEmpresaProcesosCtrl'
      // }
    // }
  })

  .state('app.empresas.editarEmpresa.editarSubprocesos', {
    url: '/Subprocesos',
    // views: {
      // 'menuContent': {
        templateUrl: carpetaEmpresa+'editarEmpresaSubprocesos.html',
        controller: 'EditarEmpresaSubprocesosCtrl'
      // }
    // }
  })

  .state('app.empresas.editarEmpresa.editarZonas', {
    url: '/Zonas',
    // views: {
      // 'menuContent': {
        templateUrl: carpetaEmpresa+'editarEmpresaZonas.html',
        controller: 'EditarEmpresaZonasCtrl'
      // }
    // }
  })

  .state('app.empresas.editarEmpresa.editarCantidadZonas', {
    url: '/CantidadZonas',
    // views: {
      // 'menuContent': {
        templateUrl: carpetaEmpresa+'editarEmpresaCantidadZonas.html',
        controller: 'EditarEmpresaCantidadZonasCtrl'
      // }
    // }
  })
  
  .state('app.empresas.detalleEmpresa', {
    url: '/Detalle',
    // views: {
      // 'menuContent': {
        templateUrl: carpetaEmpresa+'detalleEmpresa.html',
        controller: 'DetalleEmpresaCtrl'
      // }
    // }
  })

  .state('app.empresas.nuevaEmpresa', {
    url: '/Nueva',
    // views: {
      // 'menuContent': {
        templateUrl: carpetaEmpresa+'nuevaEmpresa.html',
        controller: 'NuevaEmpresaCtrl'
      // }
    // }
  })

  .state('app.empresas.nuevaEmpresa.datos', {
    url: '/Datos',
    // views: {
      // 'menuContent': {
        templateUrl: carpetaEmpresa+'nuevaEmpresaDatos.html',
        controller: 'NuevaEmpresaDatosCtrl'
      // }
    // }
  })
})