var controllers = angular.module('dexcon.controllers',[]);

controllers
.controller('AppCtrl', function($scope,$state,DashService,AjaxService,$timeout) {
  $scope.mostrarloaded = !true;
  $scope.loaded = false;
  $scope.normas = [];
  $scope.clickedNorma = {};    
  $scope.templateModal = 'templates/Modales/modalAlert.html';
  $scope.contentModal = '';
  $scope.role = '';
  $scope.empresas = [];
  $scope.paginaAnterior = [];

  $scope.setLoaded = function(a){
    if(a)
      $('.sidebar-collapse').sideNav('hide');
    $scope.loaded = a;
  }
  $scope.getLoaded = function(){
    return $scope.loaded;
  }

  $scope.setTemplateModal = function(a,b){
    $scope.templateModal = a;
    if(b != undefined)
      $scope.contentModal = b;
  }
  $scope.getTemplateModal = function(){
    return $scope.templateModal;
  } 

  $scope.setPaginaAnterior = function(a){
    $scope.paginaAnterior.push(a);
  }
  
  $scope.getPaginaAnterior = function(){
    if($scope.paginaAnterior.length == 0)
      return "";
    else{
      var a = $scope.paginaAnterior.splice($scope.paginaAnterior.length-1, 1) ;
      return a[0];
    }
  }

  $scope.irPaginaAnterior = function(lugar){
    var a = $scope.getPaginaAnterior();
    if(a == '')
      $state.go(lugar); 
    else
      $state.go(a); 
  }

  DashService.getUser(parseInt(sessionStorage.getItem('dexcon16')),AjaxService.miAjax).then(function(res){
    $scope.username = res[0];
    $scope.role = res[1];
    $scope.cargarInicio();
  }, function(a){
    //console.log(a);
  });

  $scope.cargarInicio = function(){
    //call jquery
    $timeout(function(){
      $('.collapsible').collapsible({
        accordion: false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
      });        
    },10);

    $timeout(function(){
      //dropdown del menu de la izquierda
      $('.dropdown-button').dropdown({
        inDuration: 300,
        outDuration: 125,
        constrain_width: true, // Does not change width of dropdown to that of the activator
        hover: false, // Activate on click
        alignment: 'left', // Aligns dropdown to left or right edge (works with constrain_width)
        gutter: 0, // Spacing from edge
        belowOrigin: true // Displays dropdown below the button
      });    

      //scroll bar de la navegacion de la derecha y de la izquierda
      var leftnav = $(".page-topbar").height();  
      var leftnavHeight = window.innerHeight - leftnav;
      $('.leftside-navigation').height(leftnavHeight).perfectScrollbar({
        suppressScrollX: true
      });

      //Main Left Sidebar Menu
      // $('.sidebar-collapse').sideNav('hide');
      $('.sidebar-collapse').sideNav({
        edge: 'left', // Choose the horizontal origin      
      });

    },0)
  }

  $scope.clickSalir = function(){
    sessionStorage.clear();
    $state.go('inicio.principal'); 
  }

  $scope.clickEmpresas = function(){
    $state.go('app.empresas.listaEmpresas'); 
  }

  $scope.clickTrabajadores = function(){
    $state.go('app.profesionales.listaProfesionales'); 
  }

  $scope.clickPeligros = function(){
    $state.go('app.peligros.listaPeligros'); 
  }

  $scope.clickInicio = function(){
    $state.go('app.principal'); 
  }

  $scope.clickMapaValor = function(){
    $state.go('app.cliente.kpi'); 
  }

  $scope.ClienteRiesgosProcesos = function(){
    $state.go('app.cliente.resumen'); 
  }

  $scope.clickPlaneacionCliente = function(){
    $state.go('app.estrategia.pasos'); 
  }

  $scope.clickNorma = function(norma){
    $scope.clickedNorma = norma;
    if(norma.Alias == 'gtc'){
      $state.go('app.gtc.nuevo'); 
    }
    else if(norma.Alias == 'estrategia'){
      $state.go('app.estrategia.nuevo'); 
    }
  }

  $scope.clickListaProyectos = function(norma){
    $scope.clickedNorma = norma;
    if(norma.Alias == 'gtc'){
      $state.go('app.gtc.listaProyectos'); 
    }
    else if(norma.Alias == 'estrategia'){
      $state.go('app.estrategia.listaProyectos'); 
    }
    else if(norma.Alias == 'gtcresumen'){
      $state.go('app.gtcresumen.listaProyectos'); 
    }
  }

  $scope.cargarClickedNorma = function(id){
    if($scope.normas.length == 0)
      $timeout(function(){$scope.cargarClickedNorma(id)}, 200 );
    else
      if(Object.keys($scope.clickedNorma).length == 0){
        $scope.clickedNorma = $.grep($scope.normas, function(e){ return e.Id == id; })[0];
      }
  }
})

.controller('PrincipalCtrl',function($scope,$timeout,ResumenClienteService,DashService,AjaxService){
  $scope.setLoaded($scope.mostrarloaded); 

  var today = new Date();
  $scope.today = today.getDate() + "/" + (today.getMonth()+1) + "/" + today.getFullYear();

  setTimeout(function() {
    if(DashService.role() == "user_role"){
      cargarTortaGtc();
      cargarPendientes();  
    }  
    $scope.setLoaded(1);
  }, 500);
  

  function cargarPendientes(){
    ResumenClienteService.getPendientesKpi(DashService.idProyecto(),AjaxService.miAjax).then(function(mispendientes){
      /*
      1 Anual
      2 Semestral
      3 Cuatrimestral
      4 Trimestral
      5 Bimensual
      6 Mensual
      7 Diario
      */

      $scope.pendientes = [];

      var frecuencia = ["","Anual","Semestral","Cuatrimestral","Trimestral","Bimensual","Mensual","Diario"]

      for (var i = 0; i < mispendientes.length; i++) {
        var a = mispendientes[i]
        var FI = new Date((new Date(a.Inicio)).getTime()+1000*3600*5);
        var FF = new Date((new Date(a.Final)).getTime()+1000*3600*5);
        var F = frecuencia[parseInt(a.Frecuencia)];

        if(F == "Diario"){
          pendientes.push({
            Actividad:a.Actividad,
            Iniciativa:a.Iniciativa,
          })
        }
        else{
          var i = 0
          while(FF > FI && i < 50){
            if(FI.getDate() == today.getDate() && FI.getMonth() == today.getMonth() && FI.getFullYear() == today.getFullYear()){
              $scope.pendientes.push({
                Actividad:a.Actividad,
                Iniciativa:a.Iniciativa,
              })
            }
            if(F == "Mensual"){
              sumarMeses(FI,1);
            }
            else if(F == "Bimensual"){
              sumarMeses(FI,2);
            }
            else if(F == "Trimestral"){
              sumarMeses(FI,3);
            }
            else if(F == "Cuatrimestral"){
              sumarMeses(FI,4);
            }
            else if(F == "Semestral"){
              sumarMeses(FI,6);
            }
            else if(F == "Anual"){
              sumarMeses(FI,12);
            }
            i++;
          }
        }
      }

      function sumarMeses(a,t){
        var m = a.getMonth()+t;

        if(m>11){
          a.setMonth(m-12);
          a.setFullYear(a.getFullYear()+1);
        }
        else{
          a.setMonth(m);
        }
      }

    }, function(a){
      console.log(a);
    })
  }

  function cargarTortaGtc(){
    ResumenClienteService.getGtcResumen(DashService.idProyecto(),AjaxService.miAjax).then(function(resumenes){
      var mayorPuntaje = 0;
      var mayorRiesgo = [];
      $scope.mayorRiesgo = [];
      $scope.resumenes = resumenes;      

      var NoAceptable = {
        value: 0,
        label: "No Aceptable",
      }

      var Control = {
        value: 0,
        label: "Aceptable con Control",
      }

      var Mejorable = {
        value: 0,
        label: "Mejorable",
      }

      var Aceptable = {
        value: 0,
        label: "Aceptable",
      }

      for (var i = 0; i < resumenes.length; i++) {
        for (var k = 0; k < resumenes[i].Peligros.length; k++) {
          var NR = $scope.getNivelRiesgo(resumenes[i].Peligros[k]);
          if(NR>mayorPuntaje){
            mayorPuntaje = NR;
            mayorRiesgo = resumenes[i].Peligros[k];
          }

          if(NR <= 4000 && NR >= 600){
            NoAceptable.value++;
          }
          else if(NR <= 500 && NR >= 150){
            Control.value++;
          }
          else if(NR <= 120 && NR >= 40){
            Mejorable.value++;
          }
          else if(NR <= 20 && NR >= 0){
            Aceptable.value++;
          }
        }
      }

      $scope.mayorRiesgo = mayorRiesgo;

      $scope.myStyle={'background':'url("http://dexcon.aplicando.com.co/php/images/'+mayorRiesgo.Foto+'") no-repeat center center'}

      var sum = function(a, b) { return a + b };

      Morris.Donut({
        element: 'riesgos',
        data: [
          NoAceptable,
          Control,
          Mejorable,
          Aceptable
        ],
        // formatter: function (x) { return x + "%"}
      }).on('click', function(i, row){
        console.log(i, row);
      });

      $timeout(function() {
        $scope.setLoaded(1);  
        $("svg").width($("svg").parent().width())
      }, 10);
    }, function(a){
    console.log(a);
    })
  } 

  $scope.colorNivelRiesgo = function(peligro){
    var NR = $scope.getNivelRiesgo(peligro);

    if(NR <= 4000 && NR >= 600){
      return 'red';
    }
    else if(NR <= 500 && NR >= 150){
      return 'yellow';
    }
    else if(NR <= 120 && NR >= 40){
      return 'green';
    }
    else if(NR <= 20 && NR >= 0){
      return 'green';
    }
  }

  $scope.getNivelRiesgo = function(peligro){
    var ND, NE, NC;
    switch(peligro.Deficiencia){
      case 'Muy Alto':
        ND = 10;
        break;
      case 'Alto':
        ND = 6;
        break;
      case 'Medio':
        ND = 2;
        break;
      case 'Bajo':
        ND = 0;
        break;
    }

    switch(peligro.Exposicion){
      case 'Continua':
        NE = 4;
        break;
      case 'Frecuente':
        NE = 3;
        break;
      case 'Ocasional':
        NE = 2;
        break;
      case 'Esporadica':
        NE = 1;
        break;
    }

    switch(peligro.Consecuencia){
      case '0':
        NC = 100;
        break;
      case '1':
        NC = 60;
        break;
      case '2':
        NC = 25;
        break;
      case '3':
        NC = 10;
        break;
    }

    var NP = ND * NE;
    var NR = NP * NC;
    return NR;
  }
})

.controller('ListaProyectosCtrl',function($state,$scope,ListaProyectosService,EmpresasService,AjaxService,$timeout){
  $scope.setLoaded($scope.mostrarloaded); 
  // if(Object.keys($scope.clickedNorma).length == 0)
  if($scope.clickedNorma.Id != undefined)    
    ListaProyectosService.getListaProyectos($scope.clickedNorma.Id,AjaxService.miAjax).then(function(proyectos){
      $scope.setLoaded(1);  
      $scope.proyectos = proyectos;
    }, function(a){
    // console.log(a);
    })  
  else
    $state.go('app.principal'); 

  $scope.editProyecto = function(proyecto){
    $scope.setClickedProyecto(proyecto);
    if($scope.clickedNorma.Alias == 'gtc')
      EmpresasService.getEmpresaProcesosZonas(proyecto.IdEmpresa,AjaxService.miAjax).then(function(procesosZonas){
        var a = {
          Id:proyecto.IdEmpresa,
          Nombre:proyecto.NombreEmpresa, 
          procesos:procesosZonas[0],
          zonas:procesosZonas[1],
        }
        $scope.setClickedEmpresa(a);
        $state.go('app.gtc.pasos'); 
      }, function(a){
      // console.log(a);
      })
    else if($scope.clickedNorma.Alias == 'estrategia'){
      var a = {
          Id:proyecto.IdEmpresa,
          Nombre:proyecto.NombreEmpresa, 
          Nit:proyecto.NitEmpresa, 
        }
      $scope.setClickedEmpresa(a);
      $state.go('app.estrategia.pasos'); 
    }
  }
})

.controller('ProyectoNuevoCtrl',function($scope,$state,ProyectoNuevoService,EmpresasService,ProfesionalesService,DashService,AjaxService,$timeout,$sce){
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
          for (var i = 0; i < $('#formValidate').find('input').length; i++) {
            if($('#formValidate').find('input')[i].value != ""){
              $($('#formValidate').find('label')[i]).addClass("active");
              $($('#formValidate').find('i')[i]).addClass("active");
              $($('#formValidate').find('input')[i]).addClass("valid");
            }
          }

          $("#formValidate").validate({
            rules: {
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
            },
            //For custom messages
            messages: {
                selectListaEmpresas:{
                  required: "Campo requerido",
                },
                nuevoProyectoNoContrato:{
                  required: "Campo requerido",
                },
                nuevoProyectoDetalleContrato: {
                  required: "Campo requerido",
                },
                nuevoProyectoNombre:{
                  required: "Campo requerido",
                },
                nuevoProyectoCedula:{
                  required: "Campo requerido",
                  number: "Numero Invalido"
                },
                nuevoProyectoCargo:{
                  required: "Campo requerido",
                },
                 fecha1: {
                  required: "Campo requerido",
                },
                fecha2:{
                  required: "Campo requerido",
                },
            },
            errorElement : 'div',
            errorPlacement: function(error, element) {
              var placement = $(element).data('error');
              if (placement) {
                $(placement).append(error)
              } else {
                error.insertAfter(element);
              }
            }
          });

          $("#formValidate").submit(function(e){
          e.preventDefault();
          });

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
          EmpresasService.getEmpresaContratos(this.value,$scope.clickedNorma.Id,AjaxService.miAjax).then(function(contratos){
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

  $scope.crear = function(){
    // console.log($scope.nuevoProyecto);
    if(!$("#formValidate").valid()){
      console.log('invalid');
      console.log($scope.nuevoProyecto);
      }
    else
    {
      ProyectoNuevoService.insertProyecto($scope.nuevoProyecto,$scope.clickedNorma.Id,DashService.id(),AjaxService.miAjax).then(function(){
        alert('Proyecto Creado');
        if($scope.clickedNorma.Alias == 'gtc'){
          $state.go('app.gtc.listaProyectos'); 
        }
        else if($scope.clickedNorma.Alias == 'estrategia'){
          $state.go('app.estrategia.listaProyectos'); 
        }
      }, function(a){
        alert('Proyecto no creado, Intentelo de nuevo');
      });
    }
  }

  $scope.toHtml = function(texto) {
    return $sce.trustAsHtml(texto);
  };

  $scope.anterior = function(){
    if($scope.clickedNorma.Alias == 'gtc'){
      $state.go('app.gtc.listaProyectos'); 
    }
    else if($scope.clickedNorma.Alias == 'estrategia'){
      $state.go('app.estrategia.listaProyectos'); 
    }
  }
})