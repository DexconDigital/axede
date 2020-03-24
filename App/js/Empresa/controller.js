controllers

.controller('EmpresasCtrl',function($state,$scope,$timeout,AjaxService,EmpresasService){
  $scope.clickedEmpresa = {};
  $scope.empresas = [];
  $scope.cantidadProcesos = [];
  $scope.procesosOriginal = [];
  $scope.eliminarProcesos = [];
  $scope.zonas = [];
  $scope.zonasOriginal = [];
  $scope.eliminarZonas = [];  
  $scope.nuevaEmpresa = {
    // Nombre: 'daniel',
    // Direccion: 'asdasd',
    // Nit: 123456789,
    // NitDv: 1,
    // Telefono: 1234567,
    // Contacto: {
    //   Nombre: 'daniel',
    //   Cargo: 'Gerente',
    //   Telefono: 1234567,
    //   Movil: 3006513170,
    //   Correo: 'asd@asd.asd',
    // },
    // IdDexcon: 12312,
    // EmpleadosDirectos: 123,
    // EmpleadosIndirectos: 1232,
    // Tipo: 'privada',
    // MacroprocesoEvaluacion: '1',
    // Subprocesos: true,
  };

  $scope.resetEmpresa = function(){
    $scope.nuevaEmpresa = {};
  }

  $scope.setCantidadProcesos = function(cp){
    $scope.cantidadProcesos = cp;
  }

  $scope.setZonas = function(z){
    $scope.zonas.zonas = z;
  }

  $scope.setZonasOriginal = function(zo){
    $scope.zonasOriginal = clone(zo);
  }

  $scope.resetCantidadProcesos = function(){
    $scope.cantidadProcesos = [];
  }

  $scope.setProcesosOriginal = function(po){
    $scope.procesosOriginal = clone(po);
  }

  $scope.setClickedEmpresa = function(a){
    $scope.clickedEmpresa = a;
  }
  
  $scope.getClickedEmpresa = function(){
    return $scope.clickedEmpresa;
  }
})

.controller('ListaEmpresasCtrl',function($state,$scope,$timeout,AjaxService,EmpresasService){
  $scope.setLoaded($scope.mostrarloaded);
  EmpresasService.getEmpresas(AjaxService.miAjax).then(function(empresas){
    $scope.setLoaded(1);
    $scope.empresas = empresas;
  }, function(a){
    //console.log(a);
  });

  $scope.nuevaEmpresa = function(){
    $scope.setClickedEmpresa({});
    $scope.resetEmpresa();
    $state.go('app.empresas.nuevaEmpresa.datos'); 
  }

  $scope.detalleEmpresa = function(empresa){
    $scope.setClickedEmpresa(empresa);
    $state.go('app.empresas.detalleEmpresa'); 
  }

  $scope.editarEmpresa = function(empresa){
    $scope.setClickedEmpresa(empresa);
    $state.go('app.empresas.editarEmpresa.pasosEditar'); 
  }
})

.controller('DetalleEmpresaCtrl',function($state,$scope,$timeout,AjaxService,EmpresasService){
  $scope.setLoaded($scope.mostrarloaded);
  if($scope.getClickedEmpresa().Id != undefined)
    EmpresasService.getEmpresaDetalle($scope.getClickedEmpresa().Id,AjaxService.miAjax).then(function(empresa){
    // EmpresasService.getEmpresaDetalle(2,AjaxService.miAjax).then(function(empresa){
      $scope.setLoaded(1);
      // console.log(empresa);
        $scope.empresa = empresa;
      }, function(a){
      //console.log(a);
    });
  else
    $state.go('app.empresas.listaEmpresas');

  $scope.anterior = function() {
    $state.go('app.empresas.listaEmpresas');
  };

  $scope.editar = function(empresa){
    $scope.setClickedEmpresa(empresa);
    $state.go('app.empresas.editarEmpresa.pasosEditar'); 
  }
})

.controller('EditarEmpresaCtrl',function($state,$scope,$timeout,AjaxService,EmpresasService){
})

.controller('EditarEmpresaPasosCtrl',function($state,$scope,$timeout,AjaxService,EmpresasService){
  $scope.setLoaded($scope.mostrarloaded);
  $scope.resetCantidadProcesos();
  $timeout(function(){      
    $scope.setLoaded(1);
  },200);
  if($scope.getClickedEmpresa().Id == undefined)
    $state.go('app.empresas.listaEmpresas');
  $scope.anterior = function() {
    $state.go('app.empresas.listaEmpresas');
  };
  $scope.datosGenerales = function() {
    $state.go('app.empresas.editarEmpresa.editarDatos');
  };
  $scope.procesos = function() {
    $state.go('app.empresas.editarEmpresa.editarCantidadProcesos');
  };
  $scope.zonas = function() {
    $state.go('app.empresas.editarEmpresa.editarCantidadZonas');
  };
})

.controller('EditarEmpresaDatosCtrl',function($state,$scope,$timeout,AjaxService,EmpresasService){
  $scope.setLoaded($scope.mostrarloaded);
  if($scope.getClickedEmpresa().Id != undefined)    
    EmpresasService.getEmpresaDatos($scope.getClickedEmpresa().Id,AjaxService.miAjax).then(function(empresa){
    // EmpresasService.getEmpresaDatos(3,AjaxService.miAjax).then(function(empresa){
      $scope.nuevaEmpresa = empresa;
      // console.log($scope.nuevaEmpresa);
      $timeout(function(){      

        var reglas = {
          nuevaEmpresaNombre: {
            required: true,
            minlength: 6
          },
          nuevaEmpresaDireccion: {
            required: true,
          },
          nuevaEmpresaNit: {
            required: true,
            rangelength: [7,10],
          },
          nuevaEmpresaNitDv:{
            rangeExact: 1,
            number: true
          },
          nuevaEmpresaTelefono: {
            required: true,
          },
          nuevaEmpresaContactoNombre: {
            required: true,
            minlength: 6,
          },
          nuevaEmpresaContactoMovil: {
            rangeExact: 10,
            number: true
          },
          nuevaEmpresaContactoCorreo: {
            required: true,
            email: true
          },
          nuevaEmpresaContactoCargo: {
            required: true,
          },
          nuevaEmpresaIdDexcon: {
            required: true,
            number: true,
            rangeExact: 5,
          },
          nuevaEmpresaEmpleadosDirectos: {
            required: true,
            number: true
          },
          nuevaEmpresaEmpleadosIndirectos: {
            required: true,
            number: true,
          },
          nuevaEmpresaTipo:{
            required: true,
          }
        };

        activarFormulario(reglas);

        $scope.setLoaded(1);
        
      },200);
    }, function(a){
      //console.log(a);
    });
  else
    $state.go('app.empresas.listaEmpresas');

  $scope.editar = function(){
    if(!$("#formValidate").valid()){
      console.log('invalid');
      console.log($scope.nuevaEmpresa);
      }
    else
    {
      console.log($scope.nuevaEmpresa);
      if($scope.nuevaEmpresa.Tipo == 'publica')
        $scope.nuevaEmpresa.MacroprocesoEvaluacion = true;
      EmpresasService.editEmpresaDatos($scope.nuevaEmpresa,AjaxService.miAjax).then(function(){
        alert('Datos Generales de la empresa editados');
        $state.go('app.empresas.editarEmpresa.pasosEditar');  
      }, function(a){
        //console.log(a);
      });
    }
  }
  $scope.anterior = function(){
      $state.go('app.empresas.editarEmpresa.pasosEditar');  
    }
})

.controller('EditarEmpresaCantidadProcesosCtrl',function($state,$scope,$timeout,AjaxService,EmpresasService){
  $scope.setLoaded($scope.mostrarloaded);
  if($scope.getClickedEmpresa().Id != undefined)    
    if($scope.cantidadProcesos.length == 0)    
    EmpresasService.getEmpresaProcesos($scope.getClickedEmpresa().Id,AjaxService.miAjax).then(function(cantidadProcesos){
    // EmpresasService.getEmpresaProcesos(6,AjaxService.miAjax).then(function(cantidadProcesos){
      $scope.setCantidadProcesos(cantidadProcesos);
      $scope.setProcesosOriginal(cantidadProcesos);
      // $scope.cantidadProcesos = cantidadProcesos;
      $scope.cantidadProcesos[-1] = $scope.getClickedEmpresa().Evaluacion == "1"?true:false;
      // $scope.cantidadProcesos[-1] = false;
      continuacion();
    }, function(a){
      //console.log(a);
    });
    else
      continuacion();
  else
    $state.go('app.empresas.listaEmpresas');

  function continuacion() {
    $timeout(function(){      
        var reglas = {};
        for (var i = 0; i < $scope.cantidadProcesos.length; i++) {
          reglas['cantidad'+$scope.cantidadProcesos[i].Alias]={
            required: true,
            number: true,
            min: $scope.cantidadProcesos[i].Cantidad,
          }
        }
      
        activarFormulario(reglas);
        
        $scope.setLoaded(1);

      },200);
  }

  $scope.anterior = function(){
    $state.go('app.empresas.editarEmpresa.pasosEditar');  
  }

  $scope.siguiente = function(){
    // $("#formValidate").valid()
    // console.log($scope.cantidadProcesos);
    if(!$("#formValidate").valid())
      console.log('invalid');
    else{
      for (var i = 0; i < $scope.cantidadProcesos.length; i++) {
          if($scope.cantidadProcesos[i].Procesos.length < $scope.cantidadProcesos[i].Cantidad){
            var a = $scope.cantidadProcesos[i].Cantidad-$scope.cantidadProcesos[i].Procesos.length;
            for (var j = 0; j < a; j++) {
              $scope.cantidadProcesos[i].Procesos.push({
                Id:j+$scope.cantidadProcesos[i].Alias,
                IdPadre:'0',
                // Nombre:'Nuevo'
              });
            }
          }
        }
      $state.go('app.empresas.editarEmpresa.editarMacroprocesos');  
    }
  }
})

.controller('EditarEmpresaMacroprocesosCtrl',function($state,$scope,$timeout,AjaxService,EmpresasService,anchorSmoothScroll){
  $scope.setLoaded($scope.mostrarloaded);
  if($scope.getClickedEmpresa().Id != undefined)    
    if($scope.cantidadProcesos.length == 0)    
      EmpresasService.getEmpresaProcesos($scope.getClickedEmpresa().Id,AjaxService.miAjax).then(function(cantidadProcesos){
      // EmpresasService.getEmpresaProcesos(6,AjaxService.miAjax).then(function(cantidadProcesos){
        $scope.setCantidadProcesos(cantidadProcesos);
        $scope.setProcesosOriginal(cantidadProcesos);
        // $scope.cantidadProcesos = cantidadProcesos;
        $scope.cantidadProcesos[-1] = $scope.getClickedEmpresa().Evaluacion == "1"?true:false;
        // $scope.cantidadProcesos[-1] = true;
        continuacion();
      }, function(a){
        //console.log(a);
      });
    else
      continuacion();
  else
    $state.go('app.empresas.listaEmpresas');

  function continuacion() {
    $timeout(function(){      

      anchorSmoothScroll.scrollToHome();

      activarFormulario({},"myErrorMacroprocesos");

      $scope.setLoaded(1);

    },200);
  }

  $scope.anterior = function(){
    $state.go('app.empresas.editarEmpresa.editarCantidadProcesos');
  }

  $scope.siguiente = function(){
    // $("#formValidate").valid()
    // console.log($scope.cantidadProcesos,$scope.eliminarProcesos);
    if(!$("#formValidate").valid())
      console.log('invalid');
    else{
      var a = [['PEs','MEs'],['PM','MM'],['PA','MA'],['PEv','MEv']]
      for (var i = 0; i < a.length; i++) {
        $.grep($scope.cantidadProcesos, function(e){ return e.Alias == a[i][0]; })[0].Posibles = $.grep($scope.cantidadProcesos, function(e){ return e.Alias == a[i][1]; })[0].Procesos;
      }
      $state.go('app.empresas.editarEmpresa.editarProcesos');  
    }
  }

  $scope.getNombre = function(alias){
    if(alias == 'MEs')
      return "Macroprocesos Estrategicos";
    else if(alias == 'MM')
      return "Macroprocesos Misionales";
    else if(alias == 'MA')
      return "Macroprocesos de Apoyo";
    else if(alias == 'MEv')
      return "Macroprocesos de Evaluacion";
  }

  $scope.borrarProceso = function(index,parent){
    if (confirm("Esta Seguro de borrar este Macroproceso, si lo borra, tambien borrara todos los procesos y subprocesos asociados?"))
    {      
      if(isNaN($scope.cantidadProcesos[parent].Procesos[index].Id) == false){
        $scope.eliminarProcesos.push($scope.cantidadProcesos[parent].Procesos[index]);
      }

      var a = [];
      var b = [];
      var ids = [];
      var id = $scope.cantidadProcesos[parent].Procesos[index].Id;
      for (var i = 0; i < $scope.cantidadProcesos[parent+1].Procesos.length; i++) {
        if($scope.cantidadProcesos[parent+1].Procesos[i].IdPadre == id){
          a.push(i);
          ids.push($scope.cantidadProcesos[parent+1].Procesos[i].Id);
        }
      }
      for (var i = 0; i < $scope.cantidadProcesos[parent+2].Procesos.length; i++) {
        if($scope.cantidadProcesos[parent+2].Procesos[i].IdPadre == id || ($.inArray($scope.cantidadProcesos[parent+2].Procesos[i].IdPadre, ids) > -1))
          b.push(i);
      }
      for (var i = a.length - 1; i >= 0; i--) {
        $scope.cantidadProcesos[parent+1].Cantidad--;
        $scope.cantidadProcesos[parent+1].Procesos.splice(a[i],1);
      }
      for (var i = b.length - 1; i >= 0; i--) {
        $scope.cantidadProcesos[parent+2].Cantidad--;
        $scope.cantidadProcesos[parent+2].Procesos.splice(b[i],1);
      }
      $scope.cantidadProcesos[parent].Cantidad--;
      $scope.cantidadProcesos[parent].Procesos.splice(index,1);
    }
  }

  $scope.agregarProceso = function(index){
    $scope.cantidadProcesos[index].Cantidad++;
    $scope.cantidadProcesos[index].Procesos.push({
      Id:$scope.cantidadProcesos[index].Cantidad+$scope.cantidadProcesos[index].Alias,
      IdPadre:'0',
    });
  }
})

.controller('EditarEmpresaProcesosCtrl',function($state,$scope,$timeout,AjaxService,EmpresasService,anchorSmoothScroll){  
  $scope.setLoaded($scope.mostrarloaded);
  if($scope.getClickedEmpresa().Id != undefined)    
    if($scope.cantidadProcesos.length == 0)    
      EmpresasService.getEmpresaProcesos($scope.getClickedEmpresa().Id,AjaxService.miAjax).then(function(cantidadProcesos){
      // EmpresasService.getEmpresaProcesos(6,AjaxService.miAjax).then(function(cantidadProcesos){
        $scope.setCantidadProcesos(cantidadProcesos);
        $scope.setProcesosOriginal(cantidadProcesos);
        // $scope.cantidadProcesos = cantidadProcesos;
        $scope.cantidadProcesos[-1] = $scope.getClickedEmpresa().Evaluacion == "1"?true:false;
        // $scope.cantidadProcesos[-1] = true;
        continuacion();
      }, function(a){
        //console.log(a);
      });
    else
      continuacion();
  else
    $state.go('app.empresas.listaEmpresas');

  function continuacion() {
    $timeout(function(){   
      $('select').not('.disabled').material_select();   

      anchorSmoothScroll.scrollToHome();

      activarFormulario({},"myErrorMacroprocesos");

      $scope.setLoaded(1);

    },200);
  }

  $scope.anterior = function(){
    $state.go('app.empresas.editarEmpresa.editarMacroprocesos');
  }

  $scope.siguiente = function(){
    // $("#formValidate").valid()
    // console.log($scope.cantidadProcesos,$scope.eliminarProcesos);
    if(!$("#formValidate").valid())
      console.log('invalid');
    else{
      var a = [['SEs','MEs'],['SM','MM'],['SA','MA'],['SEv','MEv']];
      for (var i = 0; i < a.length; i++) {
        $.grep($scope.cantidadProcesos, function(e){ return e.Alias == a[i][0]; })[0].Posibles = clone($.grep($scope.cantidadProcesos, function(e){ return e.Alias == a[i][1]; })[0].Procesos);
      }      
      a = [['SEs','PEs'],['SM','PM'],['SA','PA'],['SEv','PEv']];
      for (var i = 0; i < a.length; i++) {
        var b = $.grep($scope.cantidadProcesos, function(e){ return e.Alias == a[i][0];})[0];
        var c = $.grep($scope.cantidadProcesos, function(e){ return e.Alias == a[i][1];})[0].Procesos;
        for (var j = 0; j < c.length; j++) {
          b.Posibles.push(c[j]);
        }
      }
      // console.log($scope.cantidadProcesos);
      $state.go('app.empresas.editarEmpresa.editarSubprocesos');  
    }
  }

  $scope.getNombre = function(alias){
    if(alias == 'PEs')
      return "Procesos Estrategicos";
    else if(alias == 'PM')
      return "Procesos Misionales";
    else if(alias == 'PA')
      return "Procesos de Apoyo";
    else if(alias == 'PEv')
      return "Procesos de Evaluacion";
  }

  $scope.borrarProceso = function(index,parent){
    if (confirm("Esta Seguro de borrar este proceso, si lo borra, tambien borrara todos los subprocesos asociados?"))
    {      
      if(isNaN($scope.cantidadProcesos[parent].Procesos[index].Id) == false){
        $scope.eliminarProcesos.push($scope.cantidadProcesos[parent].Procesos[index]);
      }
      var a = [];
      for (var i = 0; i < $scope.cantidadProcesos[parent+1].Procesos.length; i++) {
        if($scope.cantidadProcesos[parent+1].Procesos[i].IdPadre == $scope.cantidadProcesos[parent].Procesos[index].Id)
          a.push(i);
      }
      for (var i = a.length - 1; i >= 0; i--) {
        $scope.cantidadProcesos[parent+1].Cantidad--;
        $scope.cantidadProcesos[parent+1].Procesos.splice(a[i],1);
      }
      $scope.cantidadProcesos[parent].Cantidad--;
      $scope.cantidadProcesos[parent].Procesos.splice(index,1);
    }
  }

  $scope.agregarProceso = function(index){
    $scope.cantidadProcesos[index].Cantidad++;
    $scope.cantidadProcesos[index].Procesos.push({
      Id:$scope.cantidadProcesos[index].Cantidad+$scope.cantidadProcesos[index].Alias,
      IdPadre:'0',
    });
    $timeout(function(){$('select').not('.disabled').material_select();},200);
  }
})

.controller('EditarEmpresaSubprocesosCtrl',function($state,$scope,$timeout,AjaxService,EmpresasService,anchorSmoothScroll){  
  $scope.setLoaded($scope.mostrarloaded);
  if($scope.getClickedEmpresa().Id != undefined)    
    if($scope.cantidadProcesos.length == 0)    
      EmpresasService.getEmpresaProcesos($scope.getClickedEmpresa().Id,AjaxService.miAjax).then(function(cantidadProcesos){
      // EmpresasService.getEmpresaProcesos(6,AjaxService.miAjax).then(function(cantidadProcesos){
        $scope.setCantidadProcesos(cantidadProcesos);
        $scope.setProcesosOriginal(cantidadProcesos);
        // $scope.cantidadProcesos = cantidadProcesos;
        $scope.cantidadProcesos[-1] = $scope.getClickedEmpresa().Evaluacion == "1"?true:false;
        // $scope.cantidadProcesos[-1] = true;
        continuacion();
      }, function(a){
        //console.log(a);
      });
    else
      continuacion();
  else
    $state.go('app.empresas.listaEmpresas');

  function continuacion() {
    $timeout(function(){   
      $('select').not('.disabled').material_select();   

      anchorSmoothScroll.scrollToHome();

      activarFormulario({},"myErrorMacroprocesos");

      $scope.setLoaded(1);

    },200);
  }

  $scope.anterior = function(){
    $state.go('app.empresas.editarEmpresa.editarProcesos');
  }

  $scope.siguiente = function(){
    // $("#formValidate").valid()
    // console.log($scope.cantidadProcesos,$scope.eliminarProcesos);
    if(!$("#formValidate").valid())
      console.log('invalid');
    else
    {
      EmpresasService.editEmpresaProcesos($scope.getClickedEmpresa().Id,$scope.cantidadProcesos,$scope.procesosOriginal,$scope.eliminarProcesos,AjaxService.miAjax).then(function(a){
        alert('Procesos Agregados Correctamente');
        $state.go('app.empresas.listaEmpresas'); 
      }, function(a){
        alert('Algo salio mal, intentelo de nuevo')
      }); 
    }
  }

  $scope.getNombre = function(alias){
    if(alias == 'SEs')
      return "Subrocesos Estrategicos";
    else if(alias == 'SM')
      return "Subprocesos Misionales";
    else if(alias == 'SA')
      return "Subprocesos de Apoyo";
    else if(alias == 'SEv')
      return "Subprocesos de Evaluacion";
  }

  $scope.borrarProceso = function(index,parent){
    if (confirm("Esta Seguro de borrar este Subproceso?"))
    {      
      if(isNaN($scope.cantidadProcesos[parent].Procesos[index].Id) == false){
        $scope.eliminarProcesos.push($scope.cantidadProcesos[parent].Procesos[index]);
      }
      
      $scope.cantidadProcesos[parent].Cantidad--;
      $scope.cantidadProcesos[parent].Procesos.splice(index,1);
    }
  }

  $scope.agregarProceso = function(index){
    $scope.cantidadProcesos[index].Cantidad++;
    $scope.cantidadProcesos[index].Procesos.push({
      Id:$scope.cantidadProcesos[index].Cantidad+$scope.cantidadProcesos[index].Alias,
      IdPadre:'0',
    });
    $timeout(function(){$('select').not('.disabled').material_select();},200);
  }
})

.controller('EditarEmpresaCantidadZonasCtrl',function($state,$scope,$timeout,AjaxService,EmpresasService){
  $scope.setLoaded($scope.mostrarloaded);
  if($scope.getClickedEmpresa().Id != undefined)    
    EmpresasService.getEmpresaZonas($scope.getClickedEmpresa().Id,AjaxService.miAjax).then(function(zonas){
    // EmpresasService.getEmpresaZonas(6,AjaxService.miAjax).then(function(zonas){
      if(Array.isArray(zonas)){
        $scope.setZonas(zonas);
        $scope.setZonasOriginal(zonas);
        $scope.zonas.cantidad = zonas.length;
      }
      else{
        $scope.setZonas([]);
        $scope.setZonasOriginal([]);
        $scope.zonas.cantidad = 0; 
      }
      console.log($scope.zonas);
      continuacion();
    }, function(a){
      //console.log(a);
    });
  else
    $state.go('app.empresas.listaEmpresas');

  function continuacion() {
    $timeout(function(){      

      var reglas = {
        zonaCantidad: {
          required: true,
          number: true,
          min: $scope.zonas.cantidad,
        }
      };

      activarFormulario(reglas);

      $scope.setLoaded(1);

      },200);
  }

  $scope.anterior = function(){
    $state.go('app.empresas.editarEmpresa.pasosEditar');  
  }

  $scope.siguiente = function(){
    // $("#formValidate").valid()
    // console.log($scope.zonas);
    if(!$("#formValidate").valid())
      console.log('invalid');
    else{
      if($scope.zonas.zonas.length < $scope.zonas.cantidad){
        var a = $scope.zonas.cantidad-$scope.zonas.zonas.length;
        for (var j = 0; j < a; j++) {
          $scope.zonas.zonas.push({
            Id:j+"z",
            // Nombre:'Nuevo'
          });
        }
      }
      $state.go('app.empresas.editarEmpresa.editarZonas');  
    }
  }
})

.controller('EditarEmpresaZonasCtrl',function($state,$scope,$timeout,AjaxService,EmpresasService){
  $scope.setLoaded($scope.mostrarloaded);
  if($scope.getClickedEmpresa().Id != undefined)    
    // EmpresasService.getEmpresaZonas($scope.getClickedEmpresa().Id,AjaxService.miAjax).then(function(zonas){
    // EmpresasService.getEmpresaZonas(6,AjaxService.miAjax).then(function(zonas){
      // if(Array.isArray(zonas)){
        // $scope.setZonas(zonas);
        // $scope.setZonasOriginal(zonas);
        // $scope.zonas.cantidad = zonas.length;
      // }
      // else{
        // $scope.setZonas([]);
        // $scope.setZonasOriginal([]);
        // $scope.zonas.cantidad = 0; 
      // }
      continuacion();
    // }, function(a){
      //console.log(a);
    // });
  else
    $state.go('app.empresas.listaEmpresas');

  function continuacion() {
    $timeout(function(){   
      $('select').not('.disabled').material_select();   

      activarFormulario({},"myErrorMacroprocesos");

      $scope.setLoaded(1);

    },200);
  }

  $scope.anterior = function(){
    $state.go('app.empresas.editarEmpresa.editarCantidadZonas');
  }

  $scope.siguiente = function(){
    // $("#formValidate").valid()
    // console.log($scope.cantidadProcesos,$scope.eliminarProcesos);
    if(!$("#formValidate").valid())
      console.log('invalid');
    else
    {
      EmpresasService.editEmpresaZonas($scope.getClickedEmpresa().Id,$scope.zonas,$scope.zonasOriginal,$scope.eliminarZonas,AjaxService.miAjax).then(function(a){
        alert('Zonas Agregadas Correctamente');
        $state.go('app.empresas.listaEmpresas'); 
      }, function(a){
        alert('Algo salio mal, intentelo de nuevo')
      }); 
    }
  }

  $scope.borrarZona = function(index){
    if (confirm("Esta Seguro de borrar esta Zona?"))
    {      
      if(isNaN($scope.zonas.zonas[index].Id) == false){
        $scope.eliminarZonas.push($scope.zonas.Zonas[index]);
      }
      
      $scope.zonas.cantidad--;
      $scope.zonas.zonas.splice(index,1);
    }
  }

  $scope.agregarZona = function(){
    $scope.zonas.cantidad++;
    $scope.zonas.zonas.push({
      Id:$scope.zonas.cantidad+"z",
    });
  }
})

.controller('NuevaEmpresaCtrl',function($state,$scope,$timeout,AjaxService,EmpresasService){
})

.controller('NuevaEmpresaDatosCtrl',function($state,$scope,$timeout,AjaxService,EmpresasService){
  $scope.setLoaded($scope.mostrarloaded);
  $timeout(function(){     

    var reglas = {
      nuevaEmpresaNombre: {
        required: true,
        minlength: 6
      },
      nuevaEmpresaDireccion: {
        required: true,
      },
      nuevaEmpresaNit: {
        required: true,
        rangelength: [7,10],
      },
      nuevaEmpresaNitDv:{
        rangeExact: 1,
        number: true
      },
      nuevaEmpresaTelefono: {
        required: true,
      },
      nuevaEmpresaContactoNombre: {
        required: true,
        minlength: 6,
      },
      nuevaEmpresaContactoMovil: {
        rangeExact: 10,
        number: true
      },
      nuevaEmpresaContactoCorreo: {
        required: true,
        email: true
      },
      nuevaEmpresaContactoCargo: {
        required: true,
      },
      nuevaEmpresaIdDexcon: {
        required: true,
        number: true,
        rangeExact: 5,
      },
      nuevaEmpresaEmpleadosDirectos: {
        required: true,
        number: true
      },
      nuevaEmpresaEmpleadosIndirectos: {
        required: true,
        number: true,
      },
      nuevaEmpresaTipo:{
        required: true,
      }
    };

    activarFormulario(reglas);

    $scope.setLoaded(1);

  },200);

  $scope.siguiente = function(){
    console.log($scope.nuevaEmpresa);
    if(!$("#formValidate").valid()){
      console.log('invalid');
      }
    else
    {
      // $scope.resetMacroProcesos();
      if($scope.nuevaEmpresa.Tipo == 'publica')
        $scope.nuevaEmpresa.MacroprocesoEvaluacion = true;
      EmpresasService.insertEmpresa($scope.nuevaEmpresa,AjaxService.miAjax).then(function(a){
        alert('Empresa Agregada');
        $state.go('app.empresas.listaEmpresas'); 
      }, function(a){
        alert('Algo salio mal, intentelo de nuevo')
      }); 
    }
  }

  $scope.anterior = function(){
    $scope.resetEmpresa();
    $state.go('app.empresas.listaEmpresas'); 
  }
})