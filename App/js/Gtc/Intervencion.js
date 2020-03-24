myApp

.config(function($stateProvider) {

  var carpetaGtc = 'templates/Gtc/';

  $stateProvider

  .state('app.gtc.intervencion', {
    url: '/Intervencion',
    templateUrl: carpetaGtc+'Intervencion.html?1',
    controller: 'GtcIntervencionCtrl'
  })
});

controllers

.controller('GtcIntervencionCtrl',function($state,$scope,GtcIntervencionService,GtcRiesgosService,AjaxService,$timeout){
  $scope.setLoaded($scope.mostrarloaded); 
  $scope.Intervencion = {};
  if($scope.getClickedEmpresa().Id != undefined){
    GtcRiesgosService.getGtcRiesgosEtapas($scope.getClickedProyecto().Id,AjaxService.miAjax).then(function(peligros){
    // GtcRiesgosService.getGtcRiesgosEtapas(1,AjaxService.miAjax).then(function(peligros){
      $scope.setLoaded(1);  
      $scope.setPeligrosEtapas(peligros);
    }, function(a){
    console.log(a);
    })
  }
  else
    $state.go('app.gtc.listaProyectos');

  function continuarModal(){
    $('#crear').prop('disabled', false);
      $('#modalinfo').openModal();

      var reglas = {
        nuevaIntervencionAdministrativo: {
          required: true,
          minlength: 10,
        },
        nuevaIntervencionSustitucion:{
          required: true,
        },
        nuevaIntervencionIngenieria: {
          required: true,
        },
        nuevaIntervencionEpp:{
          required: true,
        },
        nuevaIntervencionEliminacion:{
          required: true,
        }, 
      }

      activarFormulario(reglas);
  }

  $scope.editarIntervencion = function(index,m){
    var indexes = $.map($scope.peligrosEtapas, function(obj, index) {
        if(obj.IdEtapa== m) {
            return index;
        }
    })
    $scope.nuevaIntervencion = clone($scope.peligrosEtapas[indexes[0]].Peligros[index]);
    $scope.nuevaIntervencion.idEtapa = m;
    $scope.nuevaIntervencion.idPeligroAnterior = $scope.peligrosEtapas[indexes[0]].Peligros[index].IdPeligro;
    $scope.nuevaIntervencion.indexPeligro = index;
    // console.log($scope.nuevaIntervencion);
    $scope.setTemplateModal(modales+'modalNuevoIntervencionGtc.html','Editar');
    $timeout(function() {
      continuarModal();
    }, 100);
  }

  $scope.finModal = function(){
    $('#crear').prop('disabled', true);
    console.log($scope.nuevaIntervencion);
    if(!$("#formValidate").valid()){
      console.log('invalid');
      $('#crear').prop('disabled', false);
    }
    else{
      $scope.Nuevoproceso();      
    }
  }

  $scope.cancelarModal = function(){
    setTimeout(function() {
      $('#modalinfo').closeModal();
      $scope.setTemplateModal(modales+'modalAlert.html');
      $scope.nuevaIntervencion = {};
    }, 500);
  }

  $scope.Nuevoproceso = function(){
    var m = $scope.nuevaIntervencion.idEtapa;
    var nuevaIntervencionModal = {
      IdIntervencion: $scope.nuevaIntervencion.IdIntervencion,
      Eliminacion: $scope.nuevaIntervencion.Eliminacion,
      Sustitucion: $scope.nuevaIntervencion.Sustitucion,
      Ingenieria: $scope.nuevaIntervencion.Ingenieria,
      Administrativo: $scope.nuevaIntervencion.Administrativo,
      Epp: $scope.nuevaIntervencion.Epp,
      NombreEpp: $scope.nuevaIntervencion.NombreEpp,
    };
    var indexes = $.map($scope.peligrosEtapas, function(obj, index) {
        if(obj.IdEtapa== m) {
            return index;
        }
    })    

    GtcIntervencionService.editGtcIntervencion(nuevaIntervencionModal,AjaxService.miAjax).then(function(a){
      $scope.peligrosEtapas[indexes[0]].Peligros[$scope.nuevaIntervencion.indexPeligro].Eliminacion = nuevaIntervencionModal.Eliminacion;
      $scope.peligrosEtapas[indexes[0]].Peligros[$scope.nuevaIntervencion.indexPeligro].Sustitucion = nuevaIntervencionModal.Sustitucion;
      $scope.peligrosEtapas[indexes[0]].Peligros[$scope.nuevaIntervencion.indexPeligro].Ingenieria = nuevaIntervencionModal.Ingenieria;
      $scope.peligrosEtapas[indexes[0]].Peligros[$scope.nuevaIntervencion.indexPeligro].Administrativo = nuevaIntervencionModal.Administrativo;
      $scope.peligrosEtapas[indexes[0]].Peligros[$scope.nuevaIntervencion.indexPeligro].Epp = nuevaIntervencionModal.Epp;
      $scope.peligrosEtapas[indexes[0]].Peligros[$scope.nuevaIntervencion.indexPeligro].NombreEpp = nuevaIntervencionModal.NombreEpp;
      $scope.cancelarModal();
      alert('Intervencion editada')
    }, function(a){
      alert('Intervencion no editada, Intentelo de nuevo')
      $('#crear').prop('disabled', false);
    });
  }

  $scope.getNombrePeligro = function(idPeligro){
    return $.grep($scope.peligros, function(e){ return e.Id == idPeligro; })[0].Descripcion;
  }

  $scope.siguiente = function(){
    $state.go('app.gtc.listaProyectos'); 
  }

  $scope.anterior = function(){
   $state.go('app.gtc.riesgos');  
  }
})
