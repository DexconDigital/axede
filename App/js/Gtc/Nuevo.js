myApp

.config(function($stateProvider) {

  $stateProvider

  .state('app.gtc.nuevo', {
    url: '/Nuevo',
    templateUrl: proyectos+'Nuevo.html',
    controller: 'ProyectoNuevoCtrl'
  })
});

controllers

.controller('GtcNuevoCtrl',function($scope,$state,GtcNuevoService,EmpresasService,ProfesionalesService,DashService,AjaxService,$timeout,$sce){
  $scope.setLoaded($scope.mostrarloaded);
  $scope.nuevoProyecto={};

  $('.datepicker1').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15, // Creates a dropdown of 15 years to control year
    disable: [
      new Date(2016,0,1),new Date(2017,0,1),new Date(2018,0,1),
      new Date(2016,0,11),new Date(2017,0,9),new Date(2018,0,8),
      new Date(2016,2,20),new Date(2017,2,20),new Date(2018,2,19),
      new Date(2016,2,21),new Date(2017,3,9),new Date(2018,2,25),
      new Date(2016,2,24),new Date(2017,3,13),new Date(2018,2,29),
      new Date(2016,2,25),new Date(2017,3,14),new Date(2018,2,30),
      new Date(2016,2,27),new Date(2017,3,16),new Date(2018,3,1),
      new Date(2016,4,1),new Date(2017,4,1),new Date(2018,4,1),
      new Date(2016,4,9),new Date(2017,4,29),new Date(2018,4,14),
      new Date(2016,4,30),new Date(2017,5,19),new Date(2018,5,4),
      new Date(2016,5,6),new Date(2017,5,26),new Date(2018,5,11),
      new Date(2016,6,4),new Date(2017,6,3),new Date(2018,6,2),
      new Date(2016,6,20),new Date(2017,6,20),new Date(2018,6,20),
      new Date(2016,7,7),new Date(2017,7,7),new Date(2018,7,7),
      new Date(2016,7,15),new Date(2017,7,21),new Date(2018,7,20),
      new Date(2016,9,17),new Date(2017,9,16),new Date(2018,9,15),
      new Date(2016,10,7),new Date(2017,10,6),new Date(2018,10,5),
      new Date(2016,10,14),new Date(2017,10,13),new Date(2018,10,12),
      new Date(2016,11,8),new Date(2017,11,8),new Date(2018,11,8),
      new Date(2016,11,25),new Date(2017,11,25),new Date(2018,11,25),
    ]
  });

  $('.datepicker2').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15, // Creates a dropdown of 15 years to control year
    disable: [
      new Date(2016,0,1),new Date(2017,0,1),new Date(2018,0,1),
      new Date(2016,0,11),new Date(2017,0,9),new Date(2018,0,8),
      new Date(2016,2,20),new Date(2017,2,20),new Date(2018,2,19),
      new Date(2016,2,21),new Date(2017,3,9),new Date(2018,2,25),
      new Date(2016,2,24),new Date(2017,3,13),new Date(2018,2,29),
      new Date(2016,2,25),new Date(2017,3,14),new Date(2018,2,30),
      new Date(2016,2,27),new Date(2017,3,16),new Date(2018,3,1),
      new Date(2016,4,1),new Date(2017,4,1),new Date(2018,4,1),
      new Date(2016,4,9),new Date(2017,4,29),new Date(2018,4,14),
      new Date(2016,4,30),new Date(2017,5,19),new Date(2018,5,4),
      new Date(2016,5,6),new Date(2017,5,26),new Date(2018,5,11),
      new Date(2016,6,4),new Date(2017,6,3),new Date(2018,6,2),
      new Date(2016,6,20),new Date(2017,6,20),new Date(2018,6,20),
      new Date(2016,7,7),new Date(2017,7,7),new Date(2018,7,7),
      new Date(2016,7,15),new Date(2017,7,21),new Date(2018,7,20),
      new Date(2016,9,17),new Date(2017,9,16),new Date(2018,9,15),
      new Date(2016,10,7),new Date(2017,10,6),new Date(2018,10,5),
      new Date(2016,10,14),new Date(2017,10,13),new Date(2018,10,12),
      new Date(2016,11,8),new Date(2017,11,8),new Date(2018,11,8),
      new Date(2016,11,25),new Date(2017,11,25),new Date(2018,11,25),
    ]
  });

  var $input1 = $('.datepicker1').pickadate();
  var $input2 = $('.datepicker2').pickadate();

  // Use the picker object directly.
  var picker1 = $input1.pickadate('picker');
  var picker2 = $input2.pickadate('picker');

  picker1.set('select', new Date()); 
  picker2.set('select', Date.now() + (365*24*60*60*1000)); 
  
  picker1.on({
    close: function() {
      $scope.nuevoProyecto.FechaIni = picker1.get('select', 'yyyy-mm-dd');
    },
  })

  picker2.on({
    close: function() {
      $scope.nuevoProyecto.FechaFin = picker2.get('select', 'yyyy-mm-dd');
    },
  })

  if($scope.clickedNorma.Id != undefined)
    EmpresasService.getEmpresas(AjaxService.miAjax).then(function(empresas){
      ProfesionalesService.getProfesionales(AjaxService.miAjax).then(function(profesionales){
        for (var i = 0; i < profesionales.length; i++) {
          profesionales[i].Especialidades = profesionales[i].Especialidades.replace(/\n/g, "<br>");
        }
        $timeout(function(){          
          $scope.nuevoProyecto.LastId = 0;
          $scope.nuevoProyecto.FechaIni = picker1.get('select', 'yyyy-mm-dd');
          $scope.nuevoProyecto.FechaFin = picker2.get('select', 'yyyy-mm-dd');

          var reglas = {
            selectListaEmpresas: {
              required: true,
            },
            nuevoProyectoNoContrato: {
              required: true,
            },
            nuevoProyectoDetalleContrato: {
              required: true,
            },
            nuevoProyectoNombre: {
              required: true,
            },
            nuevoProyectoCedula: {
              required: true,
              number: true,
            },
            nuevoProyectoCargo: {
              required: true,
            },
            fecha1: {
              required: true,
            },
            fecha2: {
              required: true,
            },
          }

          activarFormulario(reglas);

          $timeout(function(){    
            $('select').not('.disabled').material_select();
            $(".tooltipped").tooltip({
              delay: 50,
            })
            $scope.setLoaded(1);
          },200);
        },200);
        $scope.profesionales = profesionales;        
      }, function(a){
        //console.log(a);
      });

      $scope.empresas = empresas;
      $("#selectListaEmpresas").on('change', function() {
        if($scope.nuevoProyecto.LastId != this.value){
          $scope.nuevoProyecto.LastId = this.value;
          EmpresasService.getEmpresaContratos(this.value,AjaxService.miAjax).then(function(contratos){
            $scope.contratos = contratos;
            $timeout(function() {
              $('select').material_select();
            }, 100);
          }, function(a){
            
          });
        }
      });

      $("#selectListaContratos").on('change', function() {
        if(this.value == 0){
          bloquearInputs(false);
          $scope.nuevoProyecto.idContrato = undefined;
        }
        else{
          bloquearInputs(true);
          var idContrato = this.value;
          var contrato = ($.grep($scope.contratos, function(e){ return e.Id == idContrato; }))[0];
          $scope.nuevoProyecto.NoContrato = contrato.NoContrato;
          $scope.nuevoProyecto.DetalleContrato = contrato.Detalle;
          $scope.nuevoProyecto.Responsable = contrato.NombreResponsable;
          $scope.nuevoProyecto.Cargo = contrato.CargoResponsable;
          $scope.nuevoProyecto.Cedula = contrato.CedulaResponsable;
          $scope.nuevoProyecto.idContrato = contrato.Id;
          picker1.set('select', contrato.FechaFinal, { format: 'yyyy-mm-dd' })
          picker2.set('select', contrato.FechaInicio, { format: 'yyyy-mm-dd' })
          $scope.$apply();
          $timeout(function() {
            for (var i = 0; i < $('#formValidate').find('input').length; i++) {
              if($('#formValidate').find('input')[i].value != ""){
                $($('#formValidate').find('label')[i]).addClass("active");
                $($('#formValidate').find('i')[i]).addClass("active");
                $($('#formValidate').find('input')[i]).addClass("valid");
              }
            }
          }, 100);
        }
      });

      function bloquearInputs(bloquear){
        $("#nuevoProyectoNoContrato").prop('disabled', bloquear);
        $("#nuevoProyectoDetalleContrato").prop('disabled', bloquear);
        $("#nuevoProyectoDetalleContrato").prop('disabled', bloquear);
        $("#nuevoProyectoNombre").prop('disabled', bloquear);
        $("#nuevoProyectoCargo").prop('disabled', bloquear);
        $("#nuevoProyectoCedula").prop('disabled', bloquear);
        $("#fecha1").prop('disabled', bloquear);
        $("#fecha2").prop('disabled', bloquear);
      }

    }, function(a){
      //console.log(a);
    });
  else
    $state.go('app.principal');

  $scope.crearGtc = function(){
    // console.log($scope.nuevoProyecto);
    if(!$("#formValidate").valid()){
      console.log('invalid');
      console.log($scope.nuevoProyecto);
      }
    else
    {
      GtcNuevoService.insertGtc($scope.nuevoProyecto,$scope.clickedNorma.Id,DashService.id(),AjaxService.miAjax).then(function(){
        alert('Proyecto Creado');
        $state.go('app.gtc.listaProyectos'); 
      }, function(a){
        alert('Proyecto no creado, Intentelo de nuevo');
      });
    }
  }

  $scope.toHtml = function(texto) {
    return $sce.trustAsHtml(texto);
  };

  $scope.anterior = function(){
   $state.go('app.gtc.listaProyectos');  
  }
})