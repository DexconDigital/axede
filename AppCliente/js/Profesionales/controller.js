controllers

.controller('ProfesionalesCtrl',function($state,$scope,$timeout,AjaxService,EmpresasService){
  $scope.profesionales = [];
  // $scope.clickedMacroproceso = 0;
  $scope.nuevoProfesional = {
    // Nombre: 'daniel',
    // Direccion: 'asdasd',
    // Cedula: 1018463827,
    // Rut: 1018463827,    
    // Telefono: 5281473,
    // Movil: 3192340818,
    // Correo: 'danyiel93@gmail.com',
    // Profesion: 'Ing Electrionico',
  };

  $scope.setClickedProfesional = function(a){
    $scope.nuevoProfesional = a;
  }
  $scope.getClickedProfesional = function(){
    return $scope.nuevoProfesional;
  }
})

.controller('ListaProfesionalesCtrl',function($state,$scope,$timeout,AjaxService,ProfesionalesService){
  $scope.setLoaded($scope.mostrarloaded);
  ProfesionalesService.getProfesionales(AjaxService.miAjax).then(function(profesionales){
    $scope.setLoaded(1);
    $scope.profesionales = profesionales;
  }, function(a){
    //console.log(a);
  });

  $scope.nuevaProfesional = function(){    
    $scope.setClickedProfesional({});
    $state.go('app.profesionales.nuevoProfesional'); 
  }

  $scope.editarProfesional = function(profesional){
    $scope.setClickedProfesional(profesional);
    console.log($scope.nuevoProfesional);
    $state.go('app.profesionales.nuevoProfesional'); 
  }

  $scope.detallesProfesional = function(profesional){
    profesional.Especialidades = profesional.Especialidades.replace(/\n/g, "<br>");
    $scope.setClickedProfesional(profesional);
    $state.go('app.profesionales.detalleProfesional'); 
  }
})

.controller('NuevoProfesionalCtrl',function($state,$scope,$timeout,AjaxService,ProfesionalesService){
  $scope.setLoaded($scope.mostrarloaded);
  $timeout(function(){      

    var reglas = {
      nuevoProfesionalNombre: {
        required: true,
        minlength: 6
      },
      nuevoProfesionalDireccion: {
        required: true,
      },
      nuevoProfesionalCedula: {
        required: true,
        rangelength: [7,10],
      },
      nuevoProfesionalMovil: {
        rangeExact: 10,
        number: true
      },
      nuevoProfesionalCorreo: {
        required: true,
        email: true
      },
      nuevoProfesionalProfesion: {
        required: true,
      },
      nuevoProfesionalRut:{
        required: true,
      },
      nuevoProfesionalEspecialidades:{
        required: true,
      },
    }

    activarFormulario(reglas);

    $scope.setLoaded(1);
    
  },200);

  $scope.siguiente = function(){

    console.log($scope.nuevoProfesional);
    if(!$("#formValidate").valid()){
      console.log('invalid');
      }
    else
    {
      if($scope.nuevoProfesional.Id != null){
        ProfesionalesService.editProfesional($scope.nuevoProfesional,AjaxService.miAjax).then(function(a){
          alert('Profesional Editado Correctamente');
          $scope.nuevoProfesional = {};
          $state.go('app.profesionales.listaProfesionales'); 
        }, function(a){
          alert('Algo salio mal, intentelo de nuevo');
        });  
      }
      else{
        ProfesionalesService.insertProfesional($scope.nuevoProfesional,AjaxService.miAjax).then(function(a){
          alert('Profesional Agregado');
          $scope.nuevoProfesional = {};
          $state.go('app.profesionales.listaProfesionales'); 
        }, function(a){
          alert('Algo salio mal, intentelo de nuevo');
        });  
      }
    }
  }

  $scope.anterior = function(){    
    $state.go('app.profesionales.listaProfesionales'); 
  }
})

.controller('DetalleProfesionalCtrl',function($state,$scope,$timeout,AjaxService,ProfesionalesService,$sce){
  $scope.setLoaded($scope.mostrarloaded);
  if($scope.getClickedProfesional().Id == undefined)
    $state.go('app.profesionales.listaProfesionales');
    $scope.anterior = function() {
      $state.go('app.profesionales.listaProfesionales'); 
    };

  $scope.editar = function(profesional){
    $scope.setClickedProfesional(profesional);
    // console.log($scope.nuevoProfesional);
    $state.go('app.profesionales.nuevoProfesional'); 
  }

  $scope.toHtml = function(texto) {
    return $sce.trustAsHtml(texto);
  };

  $timeout(function() {
    $scope.setLoaded(1);
  }, 100);
})