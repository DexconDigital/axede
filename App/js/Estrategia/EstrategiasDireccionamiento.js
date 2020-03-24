myApp

.config(function($stateProvider) {

  var carpetaEstrategia = 'templates/Estrategia/';

  $stateProvider

  .state('app.estrategia.estrategiasDireccionamiento', {
    url: '/Estrategias Direccionamiento',
    templateUrl: carpetaEstrategia+'EstrategiasDireccionamiento.html',
    controller: 'EstrategiasDireccionamientoCtrl'
  })  
});

controllers

.controller('EstrategiasDireccionamientoCtrl',function($state,$scope,$timeout,EstrategiaComoEstamosService,AjaxService){
  $scope.setLoaded($scope.mostrarloaded);
  if($scope.clickedProyecto.Id != undefined)
    EstrategiaComoEstamosService.getAnalisisVulnerabilidad($scope.clickedProyecto.Id,AjaxService.miAjax).then(function(direccionamiento){
    // EstrategiaComoEstamosService.getAnalisisVulnerabilidad(3,AjaxService.miAjax).then(function(direccionamiento){
      $scope.direccionamiento = [
        {
          Tipo:'INTEGRACION',
          Items:[
            {
              Nombre:"HACIA DELANTE",
              Explicacion: "Aumentar el control sobre distribuidores y detallistas",
              Descripcion: "",
            },
            {
              Nombre:"HACIA ATRÁS",
              Explicacion: "Aumentar el control sobre proveedores o adquirir su dominio",
              Descripcion: "",
            },
            {
              Nombre:"HORIZONTAL",
              Explicacion: "Adquirir el dominio o acciones de los competidores",
              Descripcion: "",
            },
          ]
        },
        {
          Tipo:'INTENSIVAS',
          Items:[
            {
              Nombre:"PENETRACION",
              Explicacion: "Aumentar la participación en el mercado actual con los productos actuales",
              Descripcion: "",
            },
            {
              Nombre:"DESARROLLO DE MERCADO",
              Explicacion: "Introducir productos y servicios actuales en otras zonas geográficas",
              Descripcion: "",
            },
            {
              Nombre:"DESARROLLO DE PRODUCTO",
              Explicacion: "Incrementar las ventas mediante mejoras de productos y servicios ",
              Descripcion: "",
            },
          ]
        },
        {
          Tipo:'DIVERSIFICACION',
          Items:[
            {
              Nombre:"CONCENTRICA",
              Explicacion: "Adición de productos y servicios nuevos pero relacionados con los actuales",
              Descripcion: "",
            },
            {
              Nombre:"HORIZONTAL",
              Explicacion: "Adición de productos y servicios no relacionados para clientes actuales",
              Descripcion: "",
            },
            {
              Nombre:"CONGLOMERADA",
              Explicacion: "Adición de productos y servicios nuevos no relacionados comprando otras empresas",
              Descripcion: "",
            },
          ]
        },
        {
          Tipo:'DEFENSIVAS',
          Items:[
            {
              Nombre:"RIESGO COMPARTIDO",
              Explicacion: "Dos omás compañías se unen para aprovechar oportunidades",
              Descripcion: "",
            },
            {
              Nombre:"ENCOGIMIENTO",
              Explicacion: "Reducción de la empresa a efectos de revertir caida de utilidades",
              Descripcion: "",
            },
            {
              Nombre:"DESINVERSION",
              Explicacion: "Vender una división o parte de la organización",
              Descripcion: "",
            },
            {
              Nombre:"LIQUIDACION",
              Explicacion: "Vender activos de una compañía a su valor tangible",
              Descripcion: "",
            },
          ]
        },
        {
          Tipo:'ESTRATEGIAS MP',
          Items:[
            {
              Nombre:"ECONOMIAS DE ESCALA",
              Explicacion: "Disminucion de costos a medida que aumenta el volumen de produccion",
              Descripcion: "",
            },
            {
              Nombre:"DIFERENCIACION DE PRODUCTO",
              Explicacion: "Colocar en los productos caracteristicas especiales que los diferencian de otros",
              Descripcion: "",
            },
            {
              Nombre:"INVERSION DE CAPITAL",
              Explicacion: "Inversiones que aumentan el capital de la empresa",
              Descripcion: "",
            },
            {
              Nombre:"COSTOS INDEPENDIENTES DE ESCALA",
              Explicacion: "Cuando los costos unitarios no se afectan al aumentar el columen de produccion",
              Descripcion: "",
            },
            {
              Nombre:"ACCESO A CANALES DE DISTRIBUCION",
              Explicacion: "Cuando se tiene influencia o control sobre la cadena de distribucion, es como integracion hacia adelante",
              Descripcion: "",
            },
            {
              Nombre:"POLITICAS GUBERNAMENTALES",
              Explicacion: "Cuando hay politicas del gobierno que pueden afectar positiva o negativamente el negocio",
              Descripcion: "",
            },
          ]
        },
        {
          Tipo:'OTRAS ESTRATEGIAS',
          Items:[]
        },
        

      ];
      // if(direccionamiento != 0)
        // $scope.direccionamiento = direccionamiento;
      $timeout(function(){      
          
        activarFormulario({},'errorVulnerabilidad');

        $scope.setLoaded(1);

      },200);
    }, function(a){
      console.log(a);
    })
  // else
    // $state.go('app.estrategia.listaProyectos');  

  $scope.borrarItem = function(index,parent){
    $scope.direccionamiento[5].Items.splice(index,1);
  }

  $scope.agregarItem = function(parent){
    var puntal = {
      Nombre:"",
      Explicacion: "",
      Descripcion: "",
    }
    $scope.direccionamiento[5].Items.push(puntal);
  }

  $scope.siguiente = function(){
    console.log($scope.diagnostico);
    if(!$("#formValidate").valid()){
      console.log('invalid');
      }
    else
    {
      // EstrategiaComoEstamosService.editAnalisisVulnerabilidad($scope.analisis,$scope.clickedProyecto.Id,AjaxService.miAjax).then(function(a){
        alert('Estrategias de Direccionamiento Actualizadas Correctamente');
        $scope.direccionamiento = {};
        $state.go('app.estrategia.pasos'); 
      // }, function(a){
        // alert('Algo salio mal, intentelo de nuevo');
      // });  
    }
  }

  $scope.anterior = function(){    
    $state.go('app.estrategia.pasos'); 
  }
})