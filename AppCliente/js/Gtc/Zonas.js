myApp

.config(function($stateProvider) {

  var carpetaGtc = 'templates/Gtc/';

  $stateProvider

  .state('app.gtc.zonas', {
    url: '/Zonas',
    templateUrl: carpetaGtc+'Zonas.html',
    controller: 'GtcZonasCtrl'
  })
});

controllers

.controller('GtcZonasCtrl',function($state,$scope,GtcZonasService,AjaxService,$timeout){
  $scope.listaProcesos = [];
  $scope.listaZonas = [];
  $scope.nuevaEtapa = {
    Procesos:[],
    Zonas:[],
    IdEtapa: 0,
  }

  $scope.resetNuevaEtapa = function(id){
    $scope.nuevaEtapa = {
      Procesos:[],
      Zonas:[],
      IdEtapa: id,
    }
  }

  $scope.setLoaded($scope.mostrarloaded); 
  if($scope.getClickedEmpresa().Id != undefined){
    if($scope.getZonaEtapas() != 0 && jQuery.isEmptyObject($scope.getZonaEtapas()))
    {
      GtcZonasService.getGtcEtapasProyecto($scope.getClickedProyecto().Id,AjaxService.miAjax).then(function(etapas){
        $scope.setLoaded(1);
        $scope.setZonaEtapas(etapas);
      }, function(a){
      console.log(a);
      })
    }
    else{
      $timeout(function() {
        $scope.setLoaded(1);
      }, 500);
    }
  }
  else
    $state.go('app.gtc.listaProyectos');
  
  $scope.modalMostrarEtapa = function(id){
    $scope.detalleEtapa = ($.grep($scope.getZonaEtapas(), function(e){ return e.IdEtapa == id; }))[0];
    $scope.setTemplateModal(modales+'modalDetalleEtapaGtc.html');
    setTimeout(function() {$('#modalinfo').openModal();}, 500);
  }

  function continuarModal(){
    $('#crear').prop('disabled', false);
    if($scope.listaProcesos.length == 0 || $scope.listaZonas.length == 0){
      $scope.listaProcesos = $scope.getClickedEmpresa().procesos;
      $scope.listaZonas = $scope.getClickedEmpresa().zonas;
    }
    console.log($scope.listaProcesos,$scope.listaZonas);
    setTimeout(function() {$('#modalinfo').openModal();}, 500);
  }

  $scope.modalEditarEtapa = function(idProcesos,idZonas,idEtapa){
    $scope.resetNuevaEtapa(idEtapa);
    for (var i = 0; i < idProcesos.length; i++) {
      $scope.nuevaEtapa.Procesos[idProcesos[i]] = true;
    }
    for (var i = 0; i < idZonas.length; i++) {
      $scope.nuevaEtapa.Zonas[idZonas[i]] = true;
    }
    $scope.setTemplateModal(modales+'modalNuevaEtapaGtc.html','Editar');
    continuarModal();
  }

  $scope.borrarEtapa = function(idEtapa,index){
    GtcZonasService.deleteGtcEtapa(idEtapa,AjaxService.miAjax).then(function(a){
      $scope.getZonaEtapas().splice(index,1);
      alert('Etapa borrada')
    }, function(a){
      $('#crear').prop('disabled', false);
      alert('Etapa no borrada, Intentelo de nuevo')
    });
  }

  $scope.modalNuevaEtapa = function(){
    $scope.resetNuevaEtapa(0);
    $scope.setTemplateModal(modales+'modalNuevaEtapaGtc.html','Nueva');
    continuarModal();
  }

  $scope.agregarEtapa = function(tipo){
    $('#crear').prop('disabled', true);
    if(tipo == 'Nueva'){
      var validProcesos = false;
      var validZonas = false;
      for(name in $scope.nuevaEtapa.Procesos)
      {
        if($scope.nuevaEtapa.Procesos[name] == true){
         validProcesos = true;
         break;
        }
      }
      for(name in $scope.nuevaEtapa.Zonas)
      {
        if($scope.nuevaEtapa.Zonas[name] == true){
         validZonas = true;
         break;
        }
      }
      if(validZonas && validProcesos){
        // GtcZonasService.insertGtcEtapa($scope.nuevaEtapa,1,AjaxService.miAjax).then(function(a){
        GtcZonasService.insertGtcEtapa($scope.nuevaEtapa,$scope.getClickedProyecto().Id,AjaxService.miAjax).then(function(a){
          // GtcZonasService.getGtcEtapasProyecto(1,AjaxService.miAjax).then(function(etapas){
          GtcZonasService.getGtcEtapasProyecto($scope.getClickedProyecto().Id,AjaxService.miAjax).then(function(etapas){
            setTimeout(function() {$('#modalinfo').closeModal();alert('Etapa creada');}, 500);
            $scope.setZonaEtapas(etapas);
          }, function(a){
          console.log(a);
          })
        }, function(a){
          $('#crear').prop('disabled', false);
          alert('Etapa no creada, Intentelo de nuevo')
        });
      }
      else{
        $('#crear').prop('disabled', false);
        if (!validProcesos && !validZonas){
          alert('Etapa no creada, Faltan los Procesos y las Zonas ')
        }
        else if (!validProcesos){
          alert('Etapa no creada, Faltan los Procesos')
        }
        else if (!validZonas){
          alert('Etapa no creada, Faltan las Zonas')
        }
      }
    }
    else if(tipo == 'Editar'){
      // GtcZonasService.editGtcEtapa($scope.nuevaEtapa,1,AjaxService.miAjax).then(function(a){
      GtcZonasService.editGtcEtapa($scope.nuevaEtapa,$scope.getClickedProyecto().Id,AjaxService.miAjax).then(function(a){
        // GtcZonasService.getGtcEtapasProyecto(1,AjaxService.miAjax).then(function(etapas){
        GtcZonasService.getGtcEtapasProyecto($scope.getClickedProyecto().Id,AjaxService.miAjax).then(function(etapas){
          setTimeout(function() {$('#modalinfo').closeModal();alert('Etapa editada');}, 500);
          $scope.setZonaEtapas(etapas);
        }, function(a){
        console.log(a);
        })
      }, function(a){
        $('#crear').prop('disabled', false);
        alert('Etapa no editada, Intentelo de nuevo')
      });
    }
  }

  $scope.checkMacroproceso = function(IdMacroproceso){
    var propi = $('#nuevaEtapaProceso'+IdMacroproceso).prop("checked");
    var Macro = $.grep($scope.listaProcesos, function(e){ return e.Id == IdMacroproceso; })[0];
    for (var i = 0; i < Macro.Procesos.length; i++) {
      for (var j = 0; j < Macro.Procesos[i].SubProcesos.length; j++) {
        $('#nuevaEtapaProceso'+Macro.Procesos[i].SubProcesos[j].Id).prop("checked",propi);
        $scope.nuevaEtapa.Procesos[Macro.Procesos[i].SubProcesos[j].Id] = propi;
      }
      $('#nuevaEtapaProceso'+Macro.Procesos[i].Id).prop("checked",propi);
      $scope.nuevaEtapa.Procesos[Macro.Procesos[i].Id] = propi;
    }
  }

  $scope.checkProceso = function(IdMacroproceso,IdProceso){
    var propi = $('#nuevaEtapaProceso'+IdProceso).prop("checked");
    var Macro = $.grep($scope.listaProcesos, function(e){ return e.Id == IdMacroproceso; })[0];
    var Proce = $.grep(Macro.Procesos, function(e){ return e.Id == IdProceso; })[0];
    var revisarCheck = true;
    for (var j = 0; j < Proce.SubProcesos.length; j++) {
      $('#nuevaEtapaProceso'+Proce.SubProcesos[j].Id).prop("checked",propi);
      $scope.nuevaEtapa.Procesos[Proce.SubProcesos[j].Id] = propi;
    }

    if(propi == false){
      $('#nuevaEtapaProceso'+IdMacroproceso).prop("checked",false);
      $scope.nuevaEtapa.Procesos[IdMacroproceso] = false;
    }
    else
    {
      for (var j = 0; j < Macro.Procesos.length; j++) {
        if($('#nuevaEtapaProceso'+Macro.Procesos[j].Id).prop("checked") == false)
        {
          revisarCheck = false;
        }
      }
      $('#nuevaEtapaProceso'+IdMacroproceso).prop("checked",revisarCheck);
      $scope.nuevaEtapa.Procesos[IdMacroproceso] = revisarCheck;
    }
    console.log($scope.nuevaEtapa);
  }

  $scope.checkSubProceso = function(IdMacroproceso,IdProceso,IdSubproceso){
    var propi = $('#nuevaEtapaProceso'+IdSubproceso).prop("checked");
    var Macro = $.grep($scope.listaProcesos, function(e){ return e.Id == IdMacroproceso; })[0];
    var Proce = $.grep(Macro.Procesos, function(e){ return e.Id == IdProceso; })[0];
    var Subpr = $.grep(Proce.SubProcesos, function(e){ return e.Id == IdSubproceso; })[0];
    var revisarCheck = true;

    if(propi == false){
      $('#nuevaEtapaProceso'+IdMacroproceso).prop("checked",false);
      $('#nuevaEtapaProceso'+IdProceso).prop("checked",false);
      $scope.nuevaEtapa.Procesos[IdMacroproceso] = false;
      $scope.nuevaEtapa.Procesos[IdProceso] = false;
    }
    else
    {
      for (var j = 0; j < Proce.SubProcesos.length; j++) {
        if($('#nuevaEtapaProceso'+Proce.SubProcesos[j].Id).prop("checked") == false)
        {
          revisarCheck = false;
        }
      }

      $('#nuevaEtapaProceso'+IdProceso).prop("checked",revisarCheck);
      $scope.nuevaEtapa.Procesos[IdProceso] = revisarCheck;
      var revisarCheck = true;

      for (var j = 0; j < Macro.Procesos.length; j++) {
        if($('#nuevaEtapaProceso'+Macro.Procesos[j].Id).prop("checked") == false)
        {
          revisarCheck = false;
        }
      }
      $('#nuevaEtapaProceso'+IdMacroproceso).prop("checked",revisarCheck);
      $scope.nuevaEtapa.Procesos[IdMacroproceso] = revisarCheck;
    }
    console.log($scope.nuevaEtapa);
  }

  $scope.siguiente = function(){
    $state.go('app.gtc.riesgos'); 
  }

  $scope.anterior = function(){
    $state.go('app.gtc.pasos'); 
  }
})