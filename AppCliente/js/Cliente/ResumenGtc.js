myApp

.config(function($stateProvider) {

  var carpetaCliente = 'templates/Cliente/';
  
  $stateProvider

  .state('app.cliente.resumen', {
    url: '/Resumen',
    templateUrl: carpetaCliente+'ResumenGtc.html',
    controller: 'GtcResumenClienteCtrl'
  })  
});

controllers

.controller('GtcResumenClienteCtrl',function($state,$scope,ResumenClienteService,AjaxService,$timeout){
  $scope.setLoaded($scope.mostrarloaded); 
  if($scope.getClickedProyecto().Id != undefined){
    GtcResumenService.getGtcResumen($scope.getClickedProyecto().Id,AjaxService.miAjax).then(function(resumenes){
    // ResumenClienteService.getGtcResumen(8,AjaxService.miAjax).then(function(resumenes){
      $scope.resumenes = resumenes;      

      var data = {
        series: [0, 0, 0]
      };

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

          if(NR <= 4000 && NR >= 600){
            data.series[0]++;
            NoAceptable.value++;
          }
          else if(NR <= 500 && NR >= 150){
            data.series[1]++;
            Control.value++;
          }
          else if(NR <= 120 && NR >= 40){
            data.series[2]++;
            Mejorable.value++;
          }
          else if(NR <= 20 && NR >= 0){
            data.series[2]++;
            Aceptable.value++;
          }
        }
      }

      var sum = function(a, b) { return a + b };

      Morris.Donut({
        element: 'graph',
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

      // new Chartist.Pie('#chartResumenGtc', data, {
      //   labelInterpolationFnc: function(value) {
      //     return Math.round(value / data.series.reduce(sum) * 100) + '%';
      //   }
      // });
    }, function(a){
    console.log(a);
    })
  }
  else
    $state.go('app.principal');

  $scope.colorNivelRiesgo = function(peligro){
    var NR = $scope.getNivelRiesgo(peligro);

    if(NR <= 4000 && NR >= 600){
      return 'mired';
    }
    else if(NR <= 500 && NR >= 150){
      return 'miyellow';
    }
    else if(NR <= 120 && NR >= 40){
      return 'fondoDexcon';
    }
    else if(NR <= 20 && NR >= 0){
      return 'fondoDexcon';
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
    $state.go('app.cliente.detallePeligro');
    $scope.setClickedPeligro(peligro);
  }

  $scope.anterior = function(){
    $state.go('app.principal');  
  }
})