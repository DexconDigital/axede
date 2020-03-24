myApp

.config(function($stateProvider) {

  var carpetaEstrategia = 'templates/Estrategia/';

  $stateProvider

  .state('app.estrategia.kpi', {
    url: '/KPI',
    templateUrl: carpetaEstrategia+'Kpi.html?version=3',
    controller: 'EstrategiaKpiCtrl'
  })
});

controllers

.controller('EstrategiaKpiCtrl',function($state,$scope,$timeout,EstrategiaCreacionValorService,AjaxService){
  $scope.setLoaded($scope.mostrarloaded);
  if($scope.clickedProyecto.Id != undefined)
    EstrategiaCreacionValorService.getKpi($scope.clickedProyecto.Id,AjaxService.miAjax).then(function(KPI){
    // EstrategiaCreacionValorService.getKpi(1,AjaxService.miAjax).then(function(KPI){
      $scope.kpis = KPI; 
      $timeout(function(){      
        $('select').not('.disabled').material_select();
        // activarFormulario({});

        $scope.setLoaded(1);

      },200);
    }, function(a){
      console.log(a);
    })
  else
    $state.go('app.estrategia.listaProyectos');  

  $scope.modalNuevoKpi = function(idActividad,kpi){
    $scope.kpi = kpi;
    $scope.kpi.idActividad = idActividad
    $scope.setTemplateModalKpi('modalNuevoKpi.html?version=7');
    $timeout(function(){
        $('#modalinfo').openModal();
        activarFormulario({},undefined,2);
        // $timeout(function(){      
          $('select').not('.disabled').material_select();
        // },200);
      },500);    
  }

  $scope.finModal = function(){
    $('#crear').prop('disabled', true);
    if(!$("#formValidate2").valid()){
      console.log('invalid');
      $('#crear').prop('disabled', false);
    }
    else{
      $scope.EditKpi();      
    }
  }

  $scope.EditKpi = function(){
    EstrategiaCreacionValorService.editKpi($scope.kpi,AjaxService.miAjax).then(function(a){
      alert('Kpi Actualizado Correctamente');
      $scope.cancelarModal();
    }, function(a){
      alert('Algo salio mal, intentelo de nuevo');
      $scope.cancelarModal();
    });  
  }

  $scope.cancelarModal = function(){
    setTimeout(function() {
      $('#modalinfo').closeModal();
      $scope.setTemplateModalKpi('modalAlert.html?version=6');
      $scope.kpi = {};
    }, 500);
  }

  $scope.setTemplateModalKpi = function(a){
    $scope.templateModal = modales+a;
  }

  $scope.getTemplateModalKpi = function(){
    return $scope.templateModal;
  }

  $scope.siguiente = function(){
    $scope.setPaginaAnterior('app.estrategia.kpi');
    $state.go('app.estrategia.pasos'); 
  }

  $scope.anterior = function(){    
    $scope.irPaginaAnterior('app.estrategia.pasos');
  }
})
