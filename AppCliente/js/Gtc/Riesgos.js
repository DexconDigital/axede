myApp

.config(function($stateProvider) {

  var carpetaGtc = 'templates/Gtc/';

  $stateProvider

  .state('app.gtc.riesgos', {
    url: '/Riesgos',
    templateUrl: carpetaGtc+'Riesgos.html?version=3',
    controller: 'GtcRiesgosCtrl'
  })
});

controllers

.controller('GtcRiesgosCtrl',function($state,$scope,GtcRiesgosService,PeligrosService,AjaxService,$timeout){
  $scope.setLoaded($scope.mostrarloaded); 
  $scope.nuevaActividad = {};
  $scope.files = [];
  // console.log($scope.peligrosEtapas);
  if($scope.getClickedEmpresa().Id != undefined){
    GtcRiesgosService.getGtcRiesgosEtapas($scope.getClickedProyecto().Id,AjaxService.miAjax).then(function(peligros){
    // GtcRiesgosService.getGtcRiesgosEtapas(1,AjaxService.miAjax).then(function(peligros){
      $scope.setLoaded(1);  
      $scope.setPeligrosEtapas(peligros);
      // console.log($scope.peligrosEtapas);
      //console.log(peligros);
    }, function(a){
    console.log(a);
    })
  }
  else
    $state.go('app.gtc.listaProyectos');

  function continuarModal(){
    $('#crear').prop('disabled', false);
    if($scope.getPeligros().length == 0){
      PeligrosService.getPeligros(AjaxService.miAjax).then(function(peligros){
        $scope.setPeligros(peligros);
        cargarAdd();
      }, function(a){
        //console.log(a);
      });
    }    
    else{
      cargarAdd();
    }

    function cargarAdd(){
      
      $('#modalinfo').openModal();

      var reglas = {
        nuevaActividadActividad: {
          required: true,
          minlength: 10,
        },
        nuevaActividadRutinario:{
          required: true,
        },
        selectListaPeligros: {
          required: true,
        },
        nuevaActividadFuente:{
          required: true,
        },
        nuevaActividadMedio:{
          required: true,
        },
        nuevaActividadIndividuo:{
          required: true,
        },
        nuevaActividadDeficiencia:{
          required: true,
        },
        nuevaActividadExposicion:{
          required: true,
        },
        nuevaActividadNoExpuestos:{
          required: true,
          number: true,
        } 
      }

      activarFormulario(reglas);

      $timeout(function(){    
        $('select').not('.disabled').material_select();   
        $('.file-field').each(function() {
          var path_input = $(this).find('input.file-path');
          $(this).find('input[type="file"]').change(function () {
            path_input.val($(this)[0].files[0].name);
            path_input.trigger('change');
          });
        }); 
        $("#miArchivo").val("");    
        $scope.files = [];
      },200);
    }
  }

  $scope.agregarPeligro = function(idEtapa){
    $scope.nuevaActividad = {
      idEtapa:idEtapa,
      // Actividad: "Nuevo Proceso",
      // Rutinario: "si",
      // Peligro: "2",
    };
    $scope.setTemplateModal(modales+'modalNuevoRiesgoGtc.html?version=5','Nuevo');
    $timeout(function() {
      continuarModal();
    }, 100);
  }

  $scope.editarPeligro = function(index,m){

    var indexes = $.map($scope.peligrosEtapas, function(obj, index) {
        if(obj.IdEtapa== m) {
            return index;
        }
    })
    $scope.nuevaActividad = clone($scope.peligrosEtapas[indexes[0]].Peligros[index]);
    $scope.nuevaActividad.idEtapa = m;
    $scope.nuevaActividad.idPeligroAnterior = $scope.peligrosEtapas[indexes[0]].Peligros[index].IdPeligro;
    $scope.nuevaActividad.indexPeligro = index;
    console.log($scope.nuevaActividad);
    $scope.setTemplateModal(modales+'modalNuevoRiesgoGtc.html?version=5','Editar');
    $timeout(function() {
      continuarModal();
    }, 100);
  }

  $scope.finModal = function(tipo){
    console.log($scope.nuevaActividad);
    $('#crear').prop('disabled', true);
    if(!$("#formValidate").valid()){
      console.log('invalid');
      $('#crear').prop('disabled', false);
    }
    else{
      $scope.Nuevoproceso(tipo,'fin');      
    }
  }

  $scope.otroProcesoModal = function(){    
    if(!$("#formValidate").valid()){
      console.log('invalid');
    }
    else{
      $scope.Nuevoproceso('Nuevo','otro');
      
    }
  }

  $scope.cancelarModal = function(){
    setTimeout(function() {
      $('#modalinfo').closeModal();
      $scope.setTemplateModal(modales+'modalAlert.html');
      $scope.nuevaActividad = {};
    }, 500);
  }

  $scope.Nuevoproceso = function(tipo,continuacion){
    var m = $scope.nuevaActividad.idEtapa;
    var nuevoRiesgoEtapaModal = {
      Actividad: $scope.nuevaActividad.Actividad,
      IdPeligro: $scope.nuevaActividad.IdPeligro,
      Rutinario: $scope.nuevaActividad.Rutinario,
      Deficiencia: $scope.nuevaActividad.Deficiencia,
      Exposicion: $scope.nuevaActividad.Exposicion,
      Fuente: $scope.nuevaActividad.Fuente,
      Medio: $scope.nuevaActividad.Medio,
      Individuo: $scope.nuevaActividad.Individuo,
      Peligro:$scope.getNombrePeligro($scope.nuevaActividad.IdPeligro),
      NombreFuente: $scope.nuevaActividad.Fuente == "si"?$scope.nuevaActividad.NombreFuente:null,
      NombreMedio: $scope.nuevaActividad.Medio == "si"?$scope.nuevaActividad.NombreMedio:null,
      NombreIndividuo: $scope.nuevaActividad.Individuo == "si"?$scope.nuevaActividad.NombreIndividuo:null,
      NoExpuestos: $scope.nuevaActividad.NoExpuestos,
    };

    var fd = new FormData();
    nuevoRiesgoEtapaModal.Foto = null;
    for (var i in $scope.files) {
      fd.append('image', $scope.files[i][0]);
      nuevoRiesgoEtapaModal.Foto = $scope.files[i][0].name;
    }

    var indexes = $.map($scope.peligrosEtapas, function(obj, index) {
        if(obj.IdEtapa== m) {
            return index;
        }
    })    

    if(tipo == 'Nuevo'){
      if($scope.files.length > 0)
        GtcRiesgosService.insertImages(fd,AjaxService.miAjaxImage).then(function(categorias){
          insertarGtcRiesgo();
        }, function(a){
          alert('Actividad no creada, Intentelo de nuevo')
          $('#crear').prop('disabled', false);
        });
      else{
        insertarGtcRiesgo();
      }

      function insertarGtcRiesgo(){
        GtcRiesgosService.insertGtcRiesgosEtapas(nuevoRiesgoEtapaModal,m,AjaxService.miAjax).then(function(a){
          $scope.peligrosEtapas[indexes[0]].Peligros.splice($scope.peligrosEtapas[indexes[0]].Peligros.length-1, 0, nuevoRiesgoEtapaModal);  
          if(continuacion == 'fin')  
            $scope.cancelarModal();
          else if(continuacion == 'otro')
            $scope.nuevaActividad = {
              idEtapa:$scope.nuevaActividad.idEtapa,
              Actividad: null,
              Rutinario: null,
              IdPeligro: "",
              Deficiencia: null,
              Exposicion: null,
              Fuente: null,
              Medio: null,
              Individuo: null,
              NombreFuente: null,
              NombreMedio: null,
              NombreIndividuo: null,
              Foto: null
            };
          alert('Actividad creada')
        }, function(a){
          alert('Actividad no creada, Intentelo de nuevo')
          $('#crear').prop('disabled', false);
        });
      }
    }
    else if(tipo == 'Editar'){
      if($scope.files.length > 0)
        GtcRiesgosService.insertImages(fd,AjaxService.miAjaxImage).then(function(categorias){
          editarGtcRiesgo();
        }, function(a){
          alert('Actividad no editada, Intentelo de nuevo')
          $('#crear').prop('disabled', false);
        });
      else{
        nuevoRiesgoEtapaModal.Foto = $scope.nuevaActividad.Foto;
        editarGtcRiesgo();
      }

      function editarGtcRiesgo(){
        GtcRiesgosService.editGtcRiesgosEtapas(nuevoRiesgoEtapaModal,m,$scope.nuevaActividad.idPeligroAnterior,AjaxService.miAjax).then(function(a){
          $scope.peligrosEtapas[indexes[0]].Peligros.splice($scope.nuevaActividad.indexPeligro, 1); 
          $scope.peligrosEtapas[indexes[0]].Peligros.splice($scope.nuevaActividad.indexPeligro, 0, nuevoRiesgoEtapaModal); 
          $scope.cancelarModal();
          alert('Actividad editada')
        }, function(a){
          alert('Actividad no editada, Intentelo de nuevo')
          $('#crear').prop('disabled', false);
        });
      }
    }
  }

  $scope.crearNuevoPeligro = function(){
    $scope.setPaginaAnterior('app.gtc.riesgos');
    $scope.cancelarModal();
    $scope.setPeligros([]);
    $state.go('app.gtc.peligros.nuevoPeligro'); 
  }

  $scope.getNombrePeligro = function(idPeligro){
    return $.grep($scope.peligros, function(e){ return e.Id == idPeligro; })[0].Descripcion;
  }

  $scope.borrarPeligro = function(index,idEtapa){
    if (confirm("Esta Seguro de borrar esta actividad?"))
    {      
      var indexes = $.map($scope.peligrosEtapas, function(obj, index) {
          if(obj.IdEtapa== idEtapa) {
            return index;
          }
        })
      var idPeligro = $scope.peligrosEtapas[indexes[0]].Peligros[index].IdPeligro;
      GtcRiesgosService.deleteGtcRiesgosEtapas(idEtapa,idPeligro,AjaxService.miAjax).then(function(a){
        $scope.peligrosEtapas[indexes[0]].Peligros.splice(index, 1);  
        alert('Actividad Borrada');
      }, function(a){
        alert('Actividad No Borrada, Intentelo de nuevo');
      });
    }
  }

  $scope.setFiles = function(element,p) {
    $scope.$apply(function($scope) {
      console.log('files:', element.files);
      // Turn the FileList object into an Array
        $scope.files[p] = element.files;
      });
    console.log($scope.files);
  };

  $scope.siguiente = function(){
    $state.go('app.gtc.intervencion');  
  }

  $scope.anterior = function(){
    $state.go('app.gtc.zonas');  
  }
})