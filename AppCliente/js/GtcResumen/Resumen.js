myApp

.config(function($stateProvider) {

  var carpetaGtcResumen = 'templates/GtcResumen/';
  
  $stateProvider

  .state('app.gtcresumen.resumen', {
    url: '/Resumen',
    templateUrl: carpetaGtcResumen+'Resumen.html?version=9',
    controller: 'GtcResumenCtrl'
  })  
});

controllers

.controller('GtcResumenCtrl',function($state,$scope,GtcResumenService,AjaxService,$timeout){
  $scope.setLoaded($scope.mostrarloaded); 
  if($scope.getClickedProyecto().Id != undefined){
    GtcResumenService.getGtcResumen($scope.getClickedProyecto().Id,AjaxService.miAjax).then(function(resumenes){
    // GtcResumenService.getGtcResumen(7,AjaxService.miAjax).then(function(resumenes){
      $scope.resumenes = resumenes;
      $scope.setLoaded(1);  

      var data = {
        series: [0, 0, 0]
      };

      for (var i = 0; i < resumenes.length; i++) {
        for (var k = 0; k < resumenes[i].Peligros.length; k++) {
          var NR = $scope.getNivelRiesgo(resumenes[i].Peligros[k]);

          if(NR <= 4000 && NR >= 600){
            data.series[0]++;
          }
          else if(NR <= 500 && NR >= 150){
            data.series[1]++;
          }
          else if(NR <= 120 && NR >= 40){
            data.series[2]++;
          }
          else if(NR <= 20 && NR >= 0){
            data.series[2]++;
          }
        }
      }

      var sum = function(a, b) { return a + b };

      new Chartist.Pie('#chartResumenGtc', data, {
        labelInterpolationFnc: function(value) {
          return Math.round(value / data.series.reduce(sum) * 100) + '%';
        }
      });
    }, function(a){
    console.log(a);
    })
  }
  else
    $state.go('app.gtcresumen.listaProyectos');

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

  $scope.verPeligro = function(peligro){
    $state.go('app.gtcresumen.detallePeligro');
    $scope.setClickedPeligro(peligro);
  }

  $scope.anterior = function(){
    $state.go('app.gtcresumen.listaProyectos');  
  }
})