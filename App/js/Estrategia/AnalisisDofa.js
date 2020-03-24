myApp

.config(function($stateProvider) {

  var carpetaEstrategia = 'templates/Estrategia/';

  $stateProvider

  .state('app.estrategia.analisisDofa', {
    url: '/AnalisisDofa',
    templateUrl: carpetaEstrategia+'AnalisisDofa.html',
    controller: 'EstrategiaAnalisisDofaCtrl'
  })
});

controllers

.controller('EstrategiaAnalisisDofaCtrl',function($state,$scope,$timeout,EstrategiaComoEstamosService,AjaxService){
  $scope.setLoaded($scope.mostrarloaded);
  if($scope.clickedProyecto.Id != undefined)
    EstrategiaComoEstamosService.getEstrategiaAnalisisDofa($scope.clickedProyecto.Id,AjaxService.miAjax).then(function(analisisDofa){
    // EstrategiaComoEstamosService.getEstrategiaAnalisisDofa(3,AjaxService.miAjax).then(function(analisisDofa){
      $scope.analisisDofa = analisisDofa;
      $timeout(function(){      
        activarFormulario({});
        $scope.setLoaded(1);
      },200);
    }, function(a){
      console.log(a);
    })
  else
    $state.go('app.estrategia.listaProyectos');  

  $scope.GetNombre = function(nombre){
    if(nombre == 'F')
      return 'Fortaleza';
    else if(nombre == 'D')
      return 'Debilidad';
    else if(nombre == 'A')
      return 'Amenaza';
    else if(nombre == 'O')
      return 'Oportunidad';
  }

  $scope.AnalizarItemColumna = function(item,matriz,index){
    if(matriz[index] == 'F' && item.Alias[0]=='c'&& item.FortalezaNivel > 0){
        return true;
    }
    else if (matriz[index] == 'D'  && item.Alias[0]=='c'&& item.FortalezaNivel == 0){
        return true;
    }
    else if(matriz[index] == 'O' && item.Alias[0]=='f' && item.FortalezaNivel > 0){
        return true;
    }
    else if (matriz[index] == 'A'  && item.Alias[0]=='f' && item.FortalezaNivel == 0){
        return true;
    }
  }

  $scope.AnalizarItemColumnaB = function(item,matriz){
    if(matriz[1] == 'O' && item.Alias[0]=='f' && item.FortalezaNivel > 0){
        return true;
    }
    else if (matriz[1] == 'A'  && item.Alias[0]=='f' && item.FortalezaNivel == 0){
        return true;
    }
  }

  $scope.siguiente = function(){
    console.log($scope.analisisDofa);
    if(!$("#formValidate").valid()){
      console.log('invalid');
      }
    else
    {
    //   EstrategiaComoEstamosService.replaceEstrategiaFuearzasPorter($scope.fuerzasPorter,$scope.clickedProyecto.Id,$scope.clickedEmpresa.Id,AjaxService.miAjax).then(function(a){
        alert('Dofa Actualizado Correctamente');
        $scope.fuerzasPorter = {};
        $state.go('app.estrategia.analisisVulnerabilidad');    
      // }, function(a){
        // alert('Algo salio mal, intentelo de nuevo');
      // });  
    }
  }

  $scope.anterior = function(){    
    $state.go('app.estrategia.pasos'); 
  }
})