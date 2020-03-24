myApp
 
.service('DashService', function($q, $http, USER_ROLES) {
  var LOCAL_TOKEN_KEY = '2016';
  var username = '';
  var isAuthenticated = false;
  var role = '';
  var descripcionRol = '';
  var authToken;
  var id;

  function storeUserCredentials(token) {
    useCredentials(token);
  }
 
  function useCredentials(token) {
    username = token.split('.')[0];
    isAuthenticated = true;
    authToken = token.split('.')[1];
    var rol = token.split('.')[2];
    id = token.split('.')[3];
 
    // roles del usuario
    switch(parseInt(rol)) {
        case 1:
            role = USER_ROLES.admin;
            descripcionRol = 'Administrador';
            break;
        case 2:
            role = USER_ROLES.user;
            descripcionRol = 'Usuario';
            break;
        default:
            role = USER_ROLES.nada;
    }
 
    // Set the token as header for your requests!
    $http.defaults.headers.common['X-Auth-Token'] = token.split('.')[1];
  }
 
  function destroyUserCredentials() {
    authToken = undefined;
    username = '';
    isAuthenticated = false;
    $http.defaults.headers.common['X-Auth-Token'] = undefined;
  }
 
  var getUser = function(id,functionAjax) {
    return $q(function(resolve, reject) {
      var getsuccess = function(data){
        //console.log(data);
        if(data.contenido[0] == undefined)
        {
          window.location.href = "www.google.com";
          return;
        }
        else
        storeUserCredentials(data.contenido[0].Nombre + '.'+ data.contenido[0].Token + '.' + data.contenido[0].Rol + '.' + data.contenido[0].Id);
        resolve([data.contenido[0].Nombre,descripcionRol]);
      }

      var geterror = function(response){
        //console.log(response);
        reject('no funciona');
      }

      var data = {
        id:id,
        get: 'login'
      };

      functionAjax(getsuccess,geterror,data,'get');
    });
  };

  var getNormas = function(functionAjax) {
    return $q(function(resolve, reject) {
      var getsuccess = function(data){
        //console.log(data);
        resolve(data.contenido);
      }

      var geterror = function(response){
        //console.log(response);
        reject('no funciona');
      }

      var data = {
        get: 'normas'
      };
      
      functionAjax(getsuccess,geterror,data,'get');
    });
  };

  var logout = function() {
    destroyUserCredentials();
  };
 
  return {
    getUser: getUser,
    logout: logout,
    getNormas:getNormas,
    // isAuthenticated: function() {return isAuthenticated;},
    // username: function() {return username;},
    // role: function() {return role;},
    id: function() {return id;},
  };
})

.service('AjaxService', function($q, $http){

  function miAjax(successCall,errorCall,info,tipo){
    // //console.log(info,tipo);
    var data = $.param(info);
    $http({
      method: 'POST',
      url: '../php/vistas/'+tipo+'Dexcon.php',
      dataType: "json",
      data,
      headers : {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
      }
      }).then(function successCallback(response) {
        // console.log(response.data)
        successCall(response.data);
        // successCall(response);
      }, function errorCallback(response) {
        errorCall(response);
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });
  }

  function enviarCorreo(successCall,errorCall,info,tipo){
    // //console.log(info,tipo);
    var data = $.param(info);
    $http({
      method: 'POST',
      url: 'email/sendEmail.php',
      dataType: "json",
      data,
      headers : {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
      }
      }).then(function successCallback(response) {
        // console.log(response.data)
        successCall(response.data);
        // successCall(response);
      }, function errorCallback(response) {
        errorCall(response);
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });
  }

  function miAjaxImage(successCall,errorCall,data){
    console.log(data);
    // var data = $.param(info);
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '../php/images/cargarImages.php', true);
    xhr.upload.onprogress = function(e) {
      if (e.lengthComputable) {
        var percentComplete = (e.loaded / e.total) * 100;
        $('#barraProgreso').width(percentComplete+'%');
        console.log(percentComplete + '% uploaded');
      }
    };
    xhr.onload = function() {
      if (this.status == 200) {
        var resp = JSON.parse(this.response);
        console.log(resp);
        successCall(resp);
      }
      else
        errorCall(resp);
    };
    xhr.send(data);
  }

  return {
    miAjax:miAjax,
    enviarCorreo:enviarCorreo,
    miAjaxImage:miAjaxImage,
  };
})

.service('ListaProyectosService', function($q, $http){

  var getListaProyectos = function(idNorma,functionAjax){
    return $q(function(resolve, reject) {
      var getsuccess = function(data){
        //console.log(data);
        resolve(data.contenido);
      }

      var geterror = function(response){
        //console.log(response);
        reject('no funciona');
      }

      var data = {
        idNorma: idNorma,
        get: 'listaProyectos'
      };
      functionAjax(getsuccess,geterror,data,'get');
    });
  };

  return {
    getListaProyectos:getListaProyectos,    
  };
})

.service('ProyectoNuevoService', function($q, $http){

  var insertProyecto = function(proyecto,idNorma,user,functionAjax){
    return $q(function(resolve, reject) {
      var getsuccess = function(data){
        //console.log(data);
        resolve(data.contenido);
      }

      var geterror = function(response){
        //console.log(response);
        reject('no funciona');
      }

      var data = {
        idNorma: idNorma,
        idEmpresa:proyecto.Empresa,
        noContrato:proyecto.NoContrato,
        detalleContrato:proyecto.DetalleContrato,
        nombreResponsable:proyecto.Responsable,
        cargoResponsable:proyecto.Cargo,
        cedulaResponsable:proyecto.Cedula,
        fechaInicio:proyecto.FechaIni,
        fechaFinal:proyecto.FechaFin,
        idProfesionalEncargado:[],
        idProfesionalCreador:user,
        get: 'proyecto'
      };
      if(proyecto.idContrato != undefined)
        data.idContrato = proyecto.idContrato;
      for(name in proyecto.profesional)
      {
        if(proyecto.profesional[name] == true)
         data.idProfesionalEncargado.push(name) ;
      }
      console.log(data);
      functionAjax(getsuccess,geterror,data,'insert');
    });
  };

  return {
    insertProyecto:insertProyecto
  };
})

.service('GtcZonasService', function($q, $http){

  var getGtcEtapasProyecto = function(idProyecto,functionAjax){
    return $q(function(resolve, reject) {
      var getsuccess = function(data){
        //console.log(data);
        resolve(data.contenido);
      }

      var geterror = function(response){
        //console.log(response);
        reject('no funciona');
      }

      var data = {
        idProyecto: idProyecto,
        get: 'gtcEtapasProyecto'
      };
      functionAjax(getsuccess,geterror,data,'get');
    });
  };

  var insertGtcEtapa = function(etapa,idProyecto,functionAjax){
    return $q(function(resolve, reject) {
      var getsuccess = function(data){
        //console.log(data);
        resolve(data.contenido);
      }

      var geterror = function(response){
        //console.log(response);
        reject('no funciona');
      }

      var data = {
        idProcesos:[],
        idZonas:[],
        idProyecto: idProyecto,
        get: 'gtcEtapa'
      };

      for(name in etapa.Procesos)
      {
        if(etapa.Procesos[name] == true)
         data.idProcesos.push(name) ;
      }
      for(name in etapa.Zonas)
      {
        if(etapa.Zonas[name] == true)
         data.idZonas.push(name) ;
      }

      console.log(data);
      functionAjax(getsuccess,geterror,data,'insert');
    });
  };

  var editGtcEtapa = function(etapa,idProyecto,functionAjax){
    return $q(function(resolve, reject) {
      var getsuccess = function(data){
        //console.log(data);
        resolve(data.contenido);
      }

      var geterror = function(response){
        //console.log(response);
        reject('no funciona');
      }

      var data = {
        idProcesos:[],
        idZonas:[],
        idProyecto: idProyecto,
        idEtapa: etapa.IdEtapa,
        get: 'gtcEtapa',
      };

      for(name in etapa.Procesos)
      {
        if(etapa.Procesos[name] == true)
         data.idProcesos.push(name) ;
      }
      for(name in etapa.Zonas)
      {
        if(etapa.Zonas[name] == true)
         data.idZonas.push(name) ;
      }
      functionAjax(getsuccess,geterror,data,'edit');
    });
  };

  var deleteGtcEtapa = function(idEtapa,functionAjax){
    return $q(function(resolve, reject) {
      var getsuccess = function(data){
        //console.log(data);
        resolve(data.contenido);
      }

      var geterror = function(response){
        //console.log(response);
        reject('no funciona');
      }

      var data = {
        idEtapa: idEtapa,
        get: 'gtcEtapa',
      };

      functionAjax(getsuccess,geterror,data,'delete');
    });
  };  

  return {
    getGtcEtapasProyecto:getGtcEtapasProyecto,
    insertGtcEtapa:insertGtcEtapa,
    editGtcEtapa:editGtcEtapa,
    deleteGtcEtapa:deleteGtcEtapa,
  };
})

.service('GtcRiesgosService', function($q, $http){
  
  var getGtcRiesgosEtapas = function(idProyecto,functionAjax){
    return $q(function(resolve, reject) {
      var getsuccess = function(data){
        //console.log(data);
        resolve(data.contenido);
      }

      var geterror = function(response){
        //console.log(response);
        reject('no funciona');
      }

      var data = {
        idProyecto: idProyecto,
        get: 'gtcRiesgosEtapas'
      };
      functionAjax(getsuccess,geterror,data,'get');
    });
  };

  var insertGtcRiesgosEtapas = function(nuevoRiesgoEtapa,etapa,functionAjax){
    return $q(function(resolve, reject) {
      var getsuccess = function(data){
        //console.log(data);
        resolve(data.contenido);
      }

      var geterror = function(response){
        //console.log(response);
        reject('no funciona');
      }

      var data = {
        idEtapa: etapa,
        idPeligro: nuevoRiesgoEtapa.IdPeligro,
        actividad: nuevoRiesgoEtapa.Actividad,
        deficiencia: nuevoRiesgoEtapa.Deficiencia,
        exposicion: nuevoRiesgoEtapa.Exposicion,
        fuente: nuevoRiesgoEtapa.Fuente,
        individuo: nuevoRiesgoEtapa.Individuo,
        medio: nuevoRiesgoEtapa.Medio,
        nombreFuente: nuevoRiesgoEtapa.Fuente=="si"?nuevoRiesgoEtapa.NombreFuente:'',
        nombreIndividuo: nuevoRiesgoEtapa.Individuo=="si"?nuevoRiesgoEtapa.NombreIndividuo:'',
        nombreMedio: nuevoRiesgoEtapa.Medio=="si"?nuevoRiesgoEtapa.NombreMedio:'',
        rutinario: nuevoRiesgoEtapa.Rutinario,
        noExpuestos: nuevoRiesgoEtapa.NoExpuestos,
        urlImagen:nuevoRiesgoEtapa.Foto,
        get: 'gtcRiesgosEtapas'
      };
      functionAjax(getsuccess,geterror,data,'insert');
    });
  };

  var insertImages = function(fd,functionAjax){
    return $q(function(resolve, reject) {
      var getsuccess = function(data){
        //console.log(data);
        resolve(data.contenido);
      }

      var geterror = function(response){
        //console.log(response);
        reject('no funciona');
      }

      functionAjax(getsuccess,geterror,fd);
    });
  };

  var deleteGtcRiesgosEtapas = function(idEtapa,idPeligro,functionAjax){
    return $q(function(resolve, reject) {
      var getsuccess = function(data){
        //console.log(data);
        resolve(data.contenido);
      }

      var geterror = function(response){
        //console.log(response);
        reject('no funciona');
      }

      var data = {
        idEtapa: idEtapa,
        idPeligro: idPeligro,
        get: 'gtcRiesgosEtapas'
      };
      functionAjax(getsuccess,geterror,data,'delete');
    });
  };

  var editGtcRiesgosEtapas = function(nuevoRiesgoEtapa,etapa,idAnterior,functionAjax){
    return $q(function(resolve, reject) {
      var getsuccess = function(data){
        //console.log(data);
        resolve(data.contenido);
      }

      var geterror = function(response){
        //console.log(response);
        reject('no funciona');
      }

      var data = {
        idEtapa: etapa,
        idPeligro: nuevoRiesgoEtapa.IdPeligro,
        idAnterior: idAnterior,
        actividad: nuevoRiesgoEtapa.Actividad,
        deficiencia: nuevoRiesgoEtapa.Deficiencia,
        exposicion: nuevoRiesgoEtapa.Exposicion,
        fuente: nuevoRiesgoEtapa.Fuente,
        individuo: nuevoRiesgoEtapa.Individuo,
        medio: nuevoRiesgoEtapa.Medio,
        nombreFuente: nuevoRiesgoEtapa.Fuente=="si"?nuevoRiesgoEtapa.NombreFuente:'',
        nombreIndividuo: nuevoRiesgoEtapa.Individuo=="si"?nuevoRiesgoEtapa.NombreIndividuo:'',
        nombreMedio: nuevoRiesgoEtapa.Medio=="si"?nuevoRiesgoEtapa.NombreMedio:'',
        rutinario: nuevoRiesgoEtapa.Rutinario,
        noExpuestos: nuevoRiesgoEtapa.NoExpuestos,
        foto: nuevoRiesgoEtapa.Foto,
        get: 'gtcRiesgosEtapas'
      };
      functionAjax(getsuccess,geterror,data,'edit');
    });
  };

  return {
    getGtcRiesgosEtapas:getGtcRiesgosEtapas,
    insertGtcRiesgosEtapas:insertGtcRiesgosEtapas,
    insertImages:insertImages,
    deleteGtcRiesgosEtapas:deleteGtcRiesgosEtapas,
    editGtcRiesgosEtapas:editGtcRiesgosEtapas
  };
})

.service('GtcIntervencionService', function($q, $http){

  var editGtcIntervencion = function(intervencion,functionAjax){
    return $q(function(resolve, reject) {
      var getsuccess = function(data){
        //console.log(data);
        resolve(data.contenido);
      }

      var geterror = function(response){
        //console.log(response);
        reject('no funciona');
      }

      var data = {
        id:intervencion.IdIntervencion,
        eliminacion:intervencion.Eliminacion,
        sustitucion:intervencion.Sustitucion,
        ingenieria:intervencion.Ingenieria,
        administrativo:intervencion.Administrativo,
        epp:intervencion.Epp,
        nombreEpp:intervencion.NombreEpp,
        get: 'gtcIntervencion',
      };

      functionAjax(getsuccess,geterror,data,'edit');
    });
  };

  return {
    editGtcIntervencion:editGtcIntervencion,
  };
})

.service('GtcResumenService', function($q, $http){

  var getListaGtc = function(functionAjax){
    return $q(function(resolve, reject) {
      var getsuccess = function(data){
        //console.log(data);
        resolve(data.contenido);
      }

      var geterror = function(response){
        //console.log(response);
        reject('no funciona');
      }

      var data = {
        get: 'gtcResumen',
      };

      functionAjax(getsuccess,geterror,data,'get');
    });
  };

  var getGtcResumen = function(idProyecto, functionAjax){
    return $q(function(resolve, reject) {
      var getsuccess = function(data){
        //console.log(data);
        resolve(data.contenido);
      }

      var geterror = function(response){
        //console.log(response);
        reject('no funciona');
      }

      var data = {
        idProyecto: idProyecto,
        get: 'gtcResumenProyecto',
      };

      functionAjax(getsuccess,geterror,data,'get');
    });
  };

  var getGtcDetalle = function(idPeligro, functionAjax){
    return $q(function(resolve, reject) {
      var getsuccess = function(data){
        //console.log(data);
        resolve(data.contenido[0]);
      }

      var geterror = function(response){
        //console.log(response);
        reject('no funciona');
      }

      var data = {
        idPeligro: idPeligro,
        get: 'gtcResumenDetalle',
      };

      functionAjax(getsuccess,geterror,data,'get');
    });
  };

  return {
    getListaGtc:getListaGtc,
    getGtcResumen:getGtcResumen,
    getGtcDetalle:getGtcDetalle,
  };
})

.service('EstrategiaQuienesSomosService', function($q, $http){

  var getEstrategiaEmpresa = function(idProyecto,functionAjax){
    return $q(function(resolve, reject) {
      var getsuccess = function(data){
        //console.log(data);
        resolve(data.contenido);
      }

      var geterror = function(response){
        //console.log(response);
        reject('no funciona');
      }

      var data = {
        idProyecto:idProyecto,
        get: 'estrategiaEmpresa'
      };
      functionAjax(getsuccess,geterror,data,'get');
    });
  };

  var getMatrizaxiologica = function(idProyecto,functionAjax){
    return $q(function(resolve, reject) {
      var getsuccess = function(data){
        //console.log(data);
        resolve(data.contenido);
      }

      var geterror = function(response){
        //console.log(response);
        reject('no funciona');
      }

      var data = {
        idProyecto:idProyecto,
        get: 'estrategiaMatrizAxiologica'
      };
      functionAjax(getsuccess,geterror,data,'get');
    });
  };

  var getEstrategiaMisionVision = function(idProyecto,functionAjax){
    return $q(function(resolve, reject) {
      var getsuccess = function(data){
        //console.log(data);
        resolve(data.contenido);
      }

      var geterror = function(response){
        //console.log(response);
        reject('no funciona');
      }

      var data = {
        idProyecto:idProyecto,
        get: 'estrategiaMisionVision'
      };
      functionAjax(getsuccess,geterror,data,'get');
    });
  };  

  var replaceEstrategiaEmpresa = function(empresa,functionAjax){
    return $q(function(resolve, reject) {
      var getsuccess = function(data){
        //console.log(data);
        resolve(data.contenido);
      }

      var geterror = function(response){
        //console.log(response);
        reject('no funciona');
      }

      var data = {
        idProyecto: empresa.IdProyecto,
        anoInicial: empresa.AnoInicial,
        anoFinal: empresa.AnoFinal,
        estrategas: empresa.Estrategas,
        get: 'estrategiaEmpresa'
      };
      functionAjax(getsuccess,geterror,data,'replace');
    });
  }; 

  var editMatrizaxiologica = function(principios,idProyecto,functionAjax){
    return $q(function(resolve, reject) {
      var getsuccess = function(data){
        //console.log(data);
        resolve(data.contenido);
      }

      var geterror = function(response){
        //console.log(response);
        reject('no funciona');
      }

      var data = {
        idProyecto: idProyecto,
        gruposReferencia: principios.GruposdeReferencia,
        principiosCorporativos: principios.PrincipiosCorporativos,
        matriz: principios.Matriz,
        get: 'estrategiaMatrizAxiologica'
      };
      functionAjax(getsuccess,geterror,data,'edit');
    });
  };

  var replaceEstrategiaMisionVision = function(misionvision,functionAjax){
    return $q(function(resolve, reject) {
      var getsuccess = function(data){
        //console.log(data);
        resolve(data.contenido);
      }

      var geterror = function(response){
        //console.log(response);
        reject('no funciona');
      }

      var data = {
        idProyecto: misionvision.IdProyecto,
        mision: misionvision.Mision,
        vision: misionvision.Vision,
        get: 'estrategiaMisionVision'
      };
      functionAjax(getsuccess,geterror,data,'replace');
    });
  };

  return {
    getEstrategiaEmpresa:getEstrategiaEmpresa,
    getMatrizaxiologica:getMatrizaxiologica,
    getEstrategiaMisionVision:getEstrategiaMisionVision,
    replaceEstrategiaEmpresa:replaceEstrategiaEmpresa,  
    editMatrizaxiologica:editMatrizaxiologica,  
    replaceEstrategiaMisionVision:replaceEstrategiaMisionVision,  
  };
})

.service('EstrategiaComoEstamosService', function($q, $http){

  var getEstrategiaDiagnostico = function(idProyecto,tipoDiagnostico,functionAjax){
    return $q(function(resolve, reject) {
      var getsuccess = function(data){
        //console.log(data);
        resolve(data.contenido[0]);
      }

      var geterror = function(response){
        //console.log(response);
        reject('no funciona');
      }

      var data = {
        idProyecto:idProyecto,
        tipoDiagnostico:tipoDiagnostico,
        get: 'estrategiaDiagnostico'
      };
      functionAjax(getsuccess,geterror,data,'get');
    });
  };

  var getAnalisisVulnerabilidad = function(idProyecto,functionAjax){
    return $q(function(resolve, reject) {
      var getsuccess = function(data){
        //console.log(data);
        resolve(data.contenido);
      }

      var geterror = function(response){
        //console.log(response);
        reject('no funciona');
      }

      var data = {
        idProyecto:idProyecto,
        get: 'estrategiaAnalisisVulnerabilidad'
      };
      functionAjax(getsuccess,geterror,data,'get');
    });
  };

  var getEstrategiaDofaResumido = function(idProyecto,functionAjax){
    return $q(function(resolve, reject) {
      var getsuccess = function(data){
        //console.log(data);
        for (var i = 0; i < data.contenido.length; i++) {
          var fortalezaTotal = 0;
          var debilidadTotal = 0;
          for (var j = 0; j < data.contenido[i].Items.length; j++) {
            var a = data.contenido[i].Items[j];
            var fortaleza = 0;
            var debilidad = 0;
            var cantidadFortaleza = 0;
            var cantidadDebilidad = 0;
            for (var k = 0; k < a.Descripciones.length; k++) {
              if(a.Descripciones[k].DebilidadImpacto * a.Descripciones[k].DebilidadNivel != 0){
                cantidadDebilidad++;
                debilidad += (a.Descripciones[k].DebilidadImpacto * a.Descripciones[k].DebilidadNivel);
              }
              else if(a.Descripciones[k].FortalezaImpacto * a.Descripciones[k].FortalezaNivel != 0){
                cantidadFortaleza++;
                fortaleza += (a.Descripciones[k].FortalezaImpacto * a.Descripciones[k].FortalezaNivel);
              }
            }
            a.Fortaleza = cantidadFortaleza==0?0:Math.round(fortaleza/9/cantidadFortaleza*10000)/100;
            a.Debilidad = cantidadDebilidad==0?0:Math.round(debilidad/9/cantidadDebilidad*10000)/100;
            fortalezaTotal += a.Fortaleza;
            debilidadTotal += a.Debilidad;
          }
          data.contenido[i].FortalezaTotal = Math.round(fortalezaTotal/data.contenido[i].Items.length);
          data.contenido[i].DebilidadTotal = Math.round(debilidadTotal/data.contenido[i].Items.length);
          data.contenido[i].Total = data.contenido[i].FortalezaTotal - data.contenido[i].DebilidadTotal;
          if(i == 0)
            data.contenido[i].texto = "Nivel de Fortaleza de la Organizacion";
          else if(i == 1)
            data.contenido[i].texto = "Nivel de Oportunidades de la Organizacion";
        }
        resolve(data.contenido);
      }

      var geterror = function(response){
        //console.log(response);
        reject('no funciona');
      }

      var data = {
        idProyecto:idProyecto,
        get: 'estrategiaDofaResumen'
      };
      functionAjax(getsuccess,geterror,data,'get');
    });
  };

  var getEstrategiaFuerzasPorter = function(idProyecto,functionAjax){
    return $q(function(resolve, reject) {
      var getsuccess = function(data){
        //console.log(data);
        resolve(data.contenido);
      }

      var geterror = function(response){
        //console.log(response);
        reject('no funciona');
      }

      var data = {
        idProyecto:idProyecto,
        get: 'estrategiaFuerzasPorter'
      };
      functionAjax(getsuccess,geterror,data,'get');
    });
  };  

  var getEstrategiaAnalisisDofa = function(idProyecto,functionAjax){
    return $q(function(resolve, reject) {
      var getsuccess = function(data){
        //console.log(data);
        resolve(data.contenido);
      }

      var geterror = function(response){
        //console.log(response);
        reject('no funciona');
      }

      var data = {
        idProyecto:idProyecto,
        get: 'estrategiaAnalisisDofa'
      };
      functionAjax(getsuccess,geterror,data,'get');
    });
  }; 

  var getEstrategiaMatrizBCG = function(idProyecto,functionAjax){
    return $q(function(resolve, reject) {
      var getsuccess = function(data){
        //console.log(data);
        resolve(data.contenido);
      }

      var geterror = function(response){
        //console.log(response);
        reject('no funciona');
      }

      var data = {
        idProyecto:idProyecto,
        get: 'estrategiaMatrizBCG'
      };
      functionAjax(getsuccess,geterror,data,'get');
    });
  }; 

  var editDiagnostico = function(diagnostico,idProyecto,functionAjax){
    return $q(function(resolve, reject) {
      var getsuccess = function(data){
        //console.log(data);
        resolve(data.contenido[0]);
      }

      var geterror = function(response){
        //console.log(response);
        reject('no funciona');
      }

      var data = {
        idProyecto:idProyecto,
        items:diagnostico.Items,
        get: 'estrategiaDiagnostico'
      };
      functionAjax(getsuccess,geterror,data,'edit');
    });
  };

  var editAnalisisVulnerabilidad = function(analisis,idProyecto,functionAjax){
    return $q(function(resolve, reject) {
      var getsuccess = function(data){
        //console.log(data);
        resolve(data.contenido[0]);
      }

      var geterror = function(response){
        //console.log(response);
        reject('no funciona');
      }

      var data = {
        idProyecto:idProyecto,
        analisis:analisis,
        get: 'estrategiaAnalisisVulnerabilidad'
      };
      functionAjax(getsuccess,geterror,data,'edit');
    });
  };

  var replaceEstrategiaDofaResumido = function(dofaResumen,idProyecto,functionAjax){
    return $q(function(resolve, reject) {
      var getsuccess = function(data){
        //console.log(data);
        resolve(data.contenido);
      }

      var geterror = function(response){
        //console.log(response);
        reject('no funciona');
      }

      var data = {
        resumen: dofaResumen.Resumen,
        idProyecto: idProyecto,
        get: 'estrategiaDofaResumen'
      };
      functionAjax(getsuccess,geterror,data,'replace');
    });
  };

  var replaceEstrategiaFuearzasPorter = function(FuerzasPorter,idProyecto,functionAjax){
    return $q(function(resolve, reject) {
      var getsuccess = function(data){
        //console.log(data);
        resolve(data.contenido);
      }

      var geterror = function(response){
        //console.log(response);
        reject('no funciona');
      }

      var data = {
        F1: FuerzasPorter.F1,
        F2: FuerzasPorter.F2,
        F3: FuerzasPorter.F3,
        F4: FuerzasPorter.F4,
        F5: FuerzasPorter.F5,
        idProyecto: idProyecto,
        get: 'estrategiaFuerzasPorter'
      };
      functionAjax(getsuccess,geterror,data,'replace');
    });
  };
  
  var replaceEstrategiaMatrizBCG = function(matrizbcg,idProyecto,functionAjax){
    return $q(function(resolve, reject) {
      var getsuccess = function(data){
        //console.log(data);
        resolve(data.contenido);
      }

      var geterror = function(response){
        //console.log(response);
        reject('no funciona');
      }

      var data = {
        Estrellas: matrizbcg.Estrellas,
        Interrogantes: matrizbcg.Interrogantes,
        Vaca: matrizbcg.Vaca,
        Perro: matrizbcg.Perro,
        idProyecto: idProyecto,
        get: 'estrategiaMatrizBCG'
      };
      functionAjax(getsuccess,geterror,data,'replace');
    });
  };

  return {
    getEstrategiaDiagnostico:getEstrategiaDiagnostico,
    getAnalisisVulnerabilidad:getAnalisisVulnerabilidad,
    getEstrategiaDofaResumido:getEstrategiaDofaResumido,
    getEstrategiaFuerzasPorter:getEstrategiaFuerzasPorter,
    getEstrategiaAnalisisDofa:getEstrategiaAnalisisDofa,
    getEstrategiaMatrizBCG:getEstrategiaMatrizBCG,
    editDiagnostico:editDiagnostico,
    editAnalisisVulnerabilidad:editAnalisisVulnerabilidad,
    replaceEstrategiaDofaResumido:replaceEstrategiaDofaResumido,
    replaceEstrategiaFuearzasPorter:replaceEstrategiaFuearzasPorter,
    replaceEstrategiaMatrizBCG:replaceEstrategiaMatrizBCG,
  };
})

.service('EstrategiaCreacionValorService', function($q, $http){

  var getConductoresValor = function(idProyecto,functionAjax){
    return $q(function(resolve, reject) {
      var getsuccess = function(data){
        //console.log(data);
        resolve(data.contenido);
      }

      var geterror = function(response){
        //console.log(response);
        reject('no funciona');
      }

      var data = {
        idProyecto:idProyecto,
        get: 'estrategiaConductoresValor'
      };
      functionAjax(getsuccess,geterror,data,'get');
    });
  };

  var getPalancas = function(idProyecto,functionAjax){
    return $q(function(resolve, reject) {
      var getsuccess = function(data){
        //console.log(data);
        resolve(data.contenido);
      }

      var geterror = function(response){
        //console.log(response);
        reject('no funciona');
      }

      var data = {
        idProyecto:idProyecto,
        get: 'estrategiaPalancas'
      };
      functionAjax(getsuccess,geterror,data,'get');
    });
  };

  var getEstrategias = function(idProyecto,functionAjax){
    return $q(function(resolve, reject) {
      var getsuccess = function(data){
        //console.log(data);
        resolve(data.contenido);
      }

      var geterror = function(response){
        //console.log(response);
        reject('no funciona');
      }

      var data = {
        idProyecto:idProyecto,
        get: 'estrategiaEstrategias'
      };
      functionAjax(getsuccess,geterror,data,'get');
    });
  };

  var getIniciativas = function(idProyecto,functionAjax){
    return $q(function(resolve, reject) {
      var getsuccess = function(data){
        //console.log(data);
        resolve(data.contenido);
      }

      var geterror = function(response){
        //console.log(response);
        reject('no funciona');
      }

      var data = {
        idProyecto:idProyecto,
        get: 'estrategiaIniciativas'
      };
      functionAjax(getsuccess,geterror,data,'get');
    });
  };

  var getKpi = function(idProyecto,functionAjax){
    return $q(function(resolve, reject) {
      var getsuccess = function(data){
        //console.log(data);
        resolve(data.contenido);
      }

      var geterror = function(response){
        //console.log(response);
        reject('no funciona');
      }

      var data = {
        idProyecto:idProyecto,
        get: 'estrategiaKpi'
      };
      functionAjax(getsuccess,geterror,data,'get');
    });
  };

  var editConductoresValor = function(nuevo,editar,borrar,idProyecto,functionAjax){
    return $q(function(resolve, reject) {
      var getsuccess = function(data){
        //console.log(data);
        resolve(data.contenido[0]);
      }

      var geterror = function(response){
        //console.log(response);
        reject('no funciona');
      }

      console.log(nuevo,editar,borrar);

      var data = {
        idProyecto:idProyecto,
        nuevo:nuevo,
        editar:editar,
        borrar:borrar,
        get: 'estrategiaConductoresValor'
      };
      functionAjax(getsuccess,geterror,data,'edit');
    });
  };

  var editPalancas = function(nuevo,editar,borrar,functionAjax){
    return $q(function(resolve, reject) {
      var getsuccess = function(data){
        //console.log(data);
        resolve(data.contenido[0]);
      }

      var geterror = function(response){
        //console.log(response);
        reject('no funciona');
      }

      var data = {
        nuevo:nuevo,
        editar:editar,
        borrar:borrar,
        get: 'estrategiaPalancas'
      };
      functionAjax(getsuccess,geterror,data,'edit');
    });
  };

  var editEstrategias = function(nuevo,editar,borrar,functionAjax){
    return $q(function(resolve, reject) {
      var getsuccess = function(data){
        //console.log(data);
        resolve(data.contenido[0]);
      }

      var geterror = function(response){
        //console.log(response);
        reject('no funciona');
      }

      var data = {
        nuevo:nuevo,
        editar:editar,
        borrar:borrar,
        get: 'estrategiaEstrategias'
      };
      functionAjax(getsuccess,geterror,data,'edit');
    });
  };

  var editIniciativas = function(nuevaIniciativa,editarIniciativa,borrarIniciativa,nuevaActividad,editarActividad,borrarActividad,functionAjax){
    return $q(function(resolve, reject) {
      var getsuccess = function(data){
        //console.log(data);
        resolve(data.contenido[0]);
      }

      var geterror = function(response){
        //console.log(response);
        reject('no funciona');
      }

      var data = {
        nuevaIniciativa:nuevaIniciativa,
        editarIniciativa:editarIniciativa,
        borrarIniciativa:borrarIniciativa,
        nuevaActividad:nuevaActividad,
        editarActividad:editarActividad,
        borrarActividad:borrarActividad,
        get: 'estrategiaIniciativas'
      };
      functionAjax(getsuccess,geterror,data,'edit');
    });
  };

  var editKpi = function(kpi,functionAjax){
    return $q(function(resolve, reject) {
      var getsuccess = function(data){
        //console.log(data);
        resolve(data.contenido[0]);
      }

      var geterror = function(response){
        //console.log(response);
        reject('no funciona');
      }

      var data = {
        idActividad:kpi.idActividad,
        nombre:kpi.Nombre,
        frecuencia:kpi.Frecuencia,
        valor1:kpi.Valor1,
        valor2:kpi.Valor2,
        formula:kpi.Formula,
        get: 'estrategiaKpis'
      };
      functionAjax(getsuccess,geterror,data,'replace');
    });
  };

  return {
    getConductoresValor:getConductoresValor,
    getPalancas:getPalancas,
    getEstrategias:getEstrategias,
    getIniciativas:getIniciativas,
    getKpi:getKpi,
    editConductoresValor:editConductoresValor,
    editPalancas:editPalancas,
    editEstrategias:editEstrategias,
    editIniciativas:editIniciativas,
    editKpi:editKpi,
  };
})

.service('EmpresasService', function($q, $http){

  var getEmpresas = function(functionAjax){
    return $q(function(resolve, reject) {
      var getsuccess = function(data){
        //console.log(data);
        resolve(data.contenido);
      }

      var geterror = function(response){
        //console.log(response);
        reject('no funciona');
      }

      var data = {
        get: 'empresas'
      };
      functionAjax(getsuccess,geterror,data,'get');
    });
  };

  var getEmpresaDetalle = function(idEmpresa,functionAjax){
    return $q(function(resolve, reject) {
      var getsuccess = function(data){
        // console.log(data.contenido[0].Procesos);
        var a = data.contenido[0];
        for (var i = 0; i < a.Procesos.length; i++) {
          if(a.Procesos[i].tipo == 'MEs' || a.Procesos[i].tipo == 'PEs' || a.Procesos[i].tipo == 'SEs'){
            if(a.Es == undefined)
              a.Es = [];
            a.Es.push(a.Procesos[i]);
          }
          else if(a.Procesos[i].tipo == 'MM' || a.Procesos[i].tipo == 'PM' || a.Procesos[i].tipo == 'SM'){
            if(a.M == undefined)
              a.M = [];
            a.M.push(a.Procesos[i]);
          }
          else if(a.Procesos[i].tipo == 'MA' || a.Procesos[i].tipo == 'PA' || a.Procesos[i].tipo == 'SA'){
            if(a.A == undefined)
              a.A = [];
            a.A.push(a.Procesos[i]);
          }
          else if(a.Procesos[i].tipo == 'MEv' || a.Procesos[i].tipo == 'PEv' || a.Procesos[i].tipo == 'SEv'){
            if(a.Ev == undefined)
              a.Ev = [];
            a.Ev.push(a.Procesos[i]);
          }
        }
        // if(data.contenido[0].MacroprocesoEvaluacion == true)
        //   data.contenido[0].ProcesoMacro.splice(4)
        // else
        //   data.contenido[0].ProcesoMacro.splice(3)
        // console.log(data.contenido[0]);
        resolve(data.contenido[0]);
      }

      var geterror = function(response){
        //console.log(response);
        reject('no funciona');
      }

      var data = {
        idEmpresa: idEmpresa,
        get: 'empresaDetalle'
      };
      functionAjax(getsuccess,geterror,data,'get');
    });
  };

  var getEmpresaDatos = function(idEmpresa,functionAjax){
    return $q(function(resolve, reject) {
      var getsuccess = function(data){
        //console.log(data);
        resolve(data.contenido[0]);
      }

      var geterror = function(response){
        //console.log(response);
        reject('no funciona');
      }

      var data = {
        idEmpresa: idEmpresa,
        get: 'empresaDatos'
      };
      functionAjax(getsuccess,geterror,data,'get');
    });
  };

  var getEmpresaContratos = function(idEmpresa,idNorma,functionAjax){
    return $q(function(resolve, reject) {
      var getsuccess = function(data){
        //console.log(data);
        resolve(data.contenido);
      }

      var geterror = function(response){
        //console.log(response);
        reject('no funciona');
      }

      var data = {
        idEmpresa: idEmpresa,
        idNorma: idNorma,
        get: 'empresaContratos'
      };
      functionAjax(getsuccess,geterror,data,'get');
    });
  };

  var getEmpresaProcesos = function(idEmpresa,functionAjax){
    return $q(function(resolve, reject) {
      var getsuccess = function(data){
        resolve(data.contenido);
      }

      var geterror = function(response){
        //console.log(response);
        reject('no funciona');
      }

      var data = {
        idEmpresa: idEmpresa,
        get: 'empresaProcesos'
      };
      functionAjax(getsuccess,geterror,data,'get');
    });
  };

  var getEmpresaZonas = function(idEmpresa,functionAjax){
    return $q(function(resolve, reject) {
      var getsuccess = function(data){
        resolve(data.contenido);
      }

      var geterror = function(response){
        //console.log(response);
        reject('no funciona');
      }

      var data = {
        idEmpresa: idEmpresa,
        get: 'empresaZonas'
      };
      functionAjax(getsuccess,geterror,data,'get');
    });
  };

  var getEmpresaProcesosZonas = function(idEmpresa,functionAjax){
    return $q(function(resolve, reject) {
      var getsuccess = function(data){
        //console.log(data);
        resolve(data.contenido);
      }

      var geterror = function(response){
        //console.log(response);
        reject('no funciona');
      }

      var data = {
        idEmpresa: idEmpresa,
        get: 'empresaProcesosZonas'
      };
      functionAjax(getsuccess,geterror,data,'get');
    });
  };

  var editEmpresaDatos = function(nuevaEmpresa,functionAjax){
    return $q(function(resolve, reject) {
      var getsuccess = function(data){
        //console.log(data);
        resolve(data);
      }

      var geterror = function(response){
        //console.log(response);
        reject('no funciona');
      }

      var data = {
        idEmpresa: nuevaEmpresa.Id,
        nombre: nuevaEmpresa.Nombre,
        direccion: nuevaEmpresa.Direccion,
        nit: nuevaEmpresa.Nit,
        dv: nuevaEmpresa.NitDv,
        telefono: nuevaEmpresa.Telefono,
        contacto: nuevaEmpresa.Contacto,
        idDexcon: nuevaEmpresa.IdDexcon,
        empleadosDirectos: nuevaEmpresa.EmpleadosDirectos,
        empleadosIndirectos: nuevaEmpresa.EmpleadosIndirectos,
        tipo: nuevaEmpresa.Tipo,
        macroprocesoEvaluacion: nuevaEmpresa.MacroprocesoEvaluacion,
        get: 'empresaDatos'
      };
      functionAjax(getsuccess,geterror,data,'edit');
    });
  };

  var editEmpresaProcesos = function(idEmpresa,procesos,procesosOriginal,procesosEliminar,functionAjax){
    return $q(function(resolve, reject) {
      var getsuccess = function(data){
        //console.log(data);
        resolve(data);
      }

      var geterror = function(response){
        //console.log(response);
        reject('no funciona');
      }

      var data = {};
      data.eliminar = [];
      data.actualizar = [];
      data.actualizarCantidad = [];
      data.nuevo = [];
      for (var i = 0; i < procesosEliminar.length; i++) {
        data.eliminar.push(procesosEliminar[i].Id);
      }

      for (var j = 0; j < procesos.length; j++) {
        var a = procesosOriginal[j].Procesos;
        for (var i = 0; i < procesos[j].Procesos.length; i++) {
          var b = procesos[j].Procesos[i];
          var c = $.grep(a, function(e){ return e.Id == b.Id;})
          if(c.length > 0){
            if(c[0].Nombre != b.Nombre || c[0].IdPadre != b.IdPadre){
              data.actualizar.push(b);
            }
          }
          else if(c.length == 0 && !isNaN(b.IdPadre)){
            if(j%3 == 0){
              var hijos1 = $.grep(procesos[j+1].Procesos, function(e){ return e.IdPadre == b.Id;})
              var hijos2 = $.grep(procesos[j+2].Procesos, function(e){ return e.IdPadre == b.Id;})
              var nuevo = {
                Nombre:b.Nombre,
                IdTipo:procesos[j].IdTipo,
                IdPadre:0,
                Subprocesos:[],
                IdSubprocesos:procesos[j+2].IdTipo,
                Procesos:[],
                IdProcesos:procesos[j+1].IdTipo,
                Tipo:"Macro"
              }
              for (var k = 0; k < hijos2.length; k++) {
                nuevo.Subprocesos.push(hijos2[k].Nombre);
              }
              for (var k = 0; k < hijos1.length; k++) {
                var nietos = $.grep(procesos[j+2].Procesos, function(e){ return e.IdPadre == hijos1[k].Id;})
                var n = {
                  Nombre:hijos1[k].Nombre,
                  Subprocesos:[]
                }
                for (var l = 0; l < nietos.length; l++) {
                  n.Subprocesos.push(nietos[l].Nombre);
                }
                nuevo.Procesos.push(n);
              }
              data.nuevo.push(nuevo);
            }
            else if(j%3 == 1){
              var hijos = $.grep(procesos[j+1].Procesos, function(e){ return e.IdPadre == b.Id;})
              var nuevo = {
                Nombre:b.Nombre,
                IdTipo:procesos[j].IdTipo,
                IdPadre:b.IdPadre,
                Subprocesos:[],
                IdSubprocesos:procesos[j+1].IdTipo,
                Tipo:"Pro"
              }
              for (var k = 0; k < hijos.length; k++) {
                nuevo.Subprocesos.push(hijos[k].Nombre);
              }
              data.nuevo.push(nuevo);
            }
            else if(j%3 == 2){
              data.nuevo.push({
                Nombre:b.Nombre,
                IdTipo:procesos[j].IdTipo,
                IdPadre:b.IdPadre,
                Tipo:"Sub"
              });
            }
          }          
        }
        if(procesos[j].Cantidad != procesosOriginal[j].Cantidad){
          data.actualizarCantidad.push({
            idTipo: procesos[j].IdTipo,
            cantidad: procesos[j].Cantidad
          })
        }
      }
      data.get = 'empresaProcesos';
      data.idEmpresa = idEmpresa;
      functionAjax(getsuccess,geterror,data,'edit');
    });
  };

  var editEmpresaZonas = function(idEmpresa,zonas,zonasOriginal,zonasEliminar,functionAjax){
    return $q(function(resolve, reject) {
      var getsuccess = function(data){
        //console.log(data);
        resolve(data);
      }

      var geterror = function(response){
        //console.log(response);
        reject('no funciona');
      }

      var data = {};
      data.eliminar = [];
      data.actualizar = [];
      data.nuevo = [];
      for (var i = 0; i < zonasEliminar.length; i++) {
        data.eliminar.push(zonasEliminar[i].Id);
      }

      var a = zonasOriginal;
      for (var i = 0; i < zonas.zonas.length; i++) {
        var b = zonas.zonas[i];
        var c = $.grep(a, function(e){ return e.Id == b.Id;})
        if(c.length > 0){
          if(c[0].Nombre != b.Nombre){
            data.actualizar.push(b);
          }
        }
        else if(c.length == 0){
          data.nuevo.push({
            Nombre:b.Nombre,
          });
        }
      }
      data.get = 'empresaZonas';
      data.idEmpresa = idEmpresa;
      functionAjax(getsuccess,geterror,data,'edit');
    });
  };
  
  var insertEmpresa = function(nuevaEmpresa,functionAjax){
    return $q(function(resolve, reject) {
      var getsuccess = function(data){
        //console.log(data);
        resolve(data.contenido);
      }

      var geterror = function(response){
        //console.log(response);
        reject('no funciona');
      }

      var data = {
        nombre: nuevaEmpresa.Nombre,
        direccion: nuevaEmpresa.Direccion,
        nit: nuevaEmpresa.Nit,
        dv: nuevaEmpresa.NitDv,
        telefono: nuevaEmpresa.Telefono,
        contacto: nuevaEmpresa.Contacto,
        idDexcon: nuevaEmpresa.IdDexcon,
        empleadosDirectos: nuevaEmpresa.EmpleadosDirectos,
        empleadosIndirectos: nuevaEmpresa.EmpleadosIndirectos,
        tipo: nuevaEmpresa.Tipo,
        macroprocesoEvaluacion: nuevaEmpresa.MacroprocesoEvaluacion,
        get: 'empresa'
      };
      functionAjax(getsuccess,geterror,data,'insert');
    });
  };

  return {
    getEmpresas:getEmpresas,
    getEmpresaDetalle:getEmpresaDetalle,
    getEmpresaDatos:getEmpresaDatos,
    getEmpresaContratos:getEmpresaContratos,
    getEmpresaProcesos:getEmpresaProcesos,
    getEmpresaZonas:getEmpresaZonas,
    getEmpresaProcesosZonas:getEmpresaProcesosZonas,
    editEmpresaDatos:editEmpresaDatos,
    editEmpresaProcesos:editEmpresaProcesos,
    editEmpresaZonas:editEmpresaZonas,
    insertEmpresa:insertEmpresa,
  };
})

.service('ProfesionalesService', function($q, $http){

  var getProfesionales = function(functionAjax){
    return $q(function(resolve, reject) {
      var getsuccess = function(data){                
        resolve(data.contenido);
      }

      var geterror = function(response){
        //console.log(response);
        reject('no funciona');
      }

      var data = {
        get: 'profesionales'
      };
      functionAjax(getsuccess,geterror,data,'get');
    });
  };

  var insertProfesional = function(nuevoProfesional,functionAjax){
    return $q(function(resolve, reject) {
      var getsuccess = function(data){
        //console.log(data);
        resolve(data.contenido);
      }

      var geterror = function(response){
        //console.log(response);
        reject('no funciona');
      }

      var data = {
        nombres: nuevoProfesional.Nombre,
        direccion: nuevoProfesional.Direccion,
        cedula: nuevoProfesional.Cedula,
        telefono: nuevoProfesional.Telefono,
        movil: nuevoProfesional.Movil,
        correo: nuevoProfesional.Correo,
        profesion: nuevoProfesional.Profesion,
        rut: nuevoProfesional.Rut,
        especialidades: nuevoProfesional.Especialidades,
        get: 'profesional'
      };
      functionAjax(getsuccess,geterror,data,'insert');
    });
  };

  var editProfesional = function(nuevoProfesional,functionAjax){
    return $q(function(resolve, reject) {
      var getsuccess = function(data){
        //console.log(data);
        resolve(data.contenido);
      }

      var geterror = function(response){
        //console.log(response);
        reject('no funciona');
      }

      var data = {
        id: nuevoProfesional.Id,
        nombres: nuevoProfesional.Nombre,
        direccion: nuevoProfesional.Direccion,
        cedula: nuevoProfesional.Cedula,
        telefono: nuevoProfesional.Telefono,
        movil: nuevoProfesional.Movil,
        correo: nuevoProfesional.Correo,
        profesion: nuevoProfesional.Profesion,
        rut: nuevoProfesional.Rut,
        especialidades: nuevoProfesional.Especialidades,
        get: 'profesional'
      };
      functionAjax(getsuccess,geterror,data,'edit');
    });
  };

  return {
    getProfesionales:getProfesionales,
    insertProfesional:insertProfesional,
    editProfesional:editProfesional,
  };
})

.service('PeligrosService', function($q, $http){

  var getPeligros = function(functionAjax){
    return $q(function(resolve, reject) {
      var getsuccess = function(data){
        //console.log(data);
        resolve(data.contenido);
      }

      var geterror = function(response){
        //console.log(response);
        reject('no funciona');
      }

      var data = {
        get: 'peligros'
      };
      functionAjax(getsuccess,geterror,data,'get');
    });
  };

  var insertPeligro = function(nuevoPeligro,functionAjax){
    return $q(function(resolve, reject) {
      var getsuccess = function(data){
        //console.log(data);
        resolve(data.contenido);
      }

      var geterror = function(response){
        //console.log(response);
        reject('no funciona');
      }

      var data = {
        clasificacion: nuevoPeligro.Clasificacion,
        consecuencia: nuevoPeligro.Consecuencia,
        descripcion: nuevoPeligro.Descripcion,
        efectos: nuevoPeligro.Efectos,
        peorConsecuencia: nuevoPeligro.PeorConsecuencia,
        requisitoLegal: nuevoPeligro.Requisito,
        get: 'peligro'
      };
      functionAjax(getsuccess,geterror,data,'insert');
    });
  };

  var editPeligro = function(nuevoPeligro,functionAjax){
    return $q(function(resolve, reject) {
      var getsuccess = function(data){
        //console.log(data);
        resolve(data.contenido);
      }

      var geterror = function(response){
        //console.log(response);
        reject('no funciona');
      }

      var data = {
        id: nuevoPeligro.Id,
        clasificacion: nuevoPeligro.Clasificacion,
        consecuencia: nuevoPeligro.Consecuencia,
        descripcion: nuevoPeligro.Descripcion,
        efectos: nuevoPeligro.Efectos,
        peorConsecuencia: nuevoPeligro.PeorConsecuencia,
        requisitoLegal: nuevoPeligro.Requisito,
        get: 'peligro'
      };
      functionAjax(getsuccess,geterror,data,'edit');
    });
  };

  return {
    getPeligros:getPeligros,
    insertPeligro:insertPeligro,
    editPeligro:editPeligro,
  };
})

.service('anchorSmoothScroll', function(){
    
    function currentYPosition() {
      // Firefox, Chrome, Opera, Safari
      if (self.pageYOffset) return self.pageYOffset;
      // Internet Explorer 6 - standards mode
      if (document.documentElement && document.documentElement.scrollTop)
        return document.documentElement.scrollTop;
      // Internet Explorer 6, 7 and 8
      if (document.body.scrollTop) return document.body.scrollTop;
      return 0;
    }

    this.scrollToHome = function() {

        var startY = currentYPosition();
        var stopY = 0;
        var distance = startY - stopY;
        if (distance < 100) {
            scrollTo(0, stopY); return;
        }
        var speed = 20;
        var step = Math.round(distance / 15);
        var leapY = startY - step;
        var timer = 0;
        for ( var i=startY; i>stopY; i-=step ) {
            setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
            leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
        }
    };

    this.scrollTo = function(eID) {

        // This scrolling function 
        // is from http://www.itnewb.com/tutorial/Creating-the-Smooth-Scroll-Effect-with-JavaScript
        
        var startY = currentYPosition();
        var stopY = elmYPosition(eID);
        var distance = stopY > startY ? stopY - startY : startY - stopY;
        if (distance < 100) {
            scrollTo(0, stopY); return;
        }
        var speed = Math.round(distance / 100);
        if (speed >= 20) speed = 20;
        var step = Math.round(distance / 25);
        var leapY = stopY > startY ? startY + step : startY - step;
        var timer = 0;
        if (stopY > startY) {
            for ( var i=startY; i<stopY; i+=step ) {
                setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
                leapY += step; if (leapY > stopY) leapY = stopY; timer++;
            } return;
        }
        for ( var i=startY; i>stopY; i-=step ) {
            setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
            leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
        }
        
        
        
        function elmYPosition(eID) {
            var elm = document.getElementById(eID);
            var y = elm.offsetTop;
            var node = elm;
            while (node.offsetParent && node.offsetParent != document.body) {
                node = node.offsetParent;
                y += node.offsetTop;
            } return y;
        }

    };
});