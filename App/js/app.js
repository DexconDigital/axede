var modales = "templates/Modales/";
var proyectos = "templates/Proyectos/";
var myApp = angular.module('dexcon', ['ui.router', 'dexcon.controllers' ,'datatables'])

myApp

.config(function($stateProvider,$urlRouterProvider) {
  
  $stateProvider

  .state('app', {
    url: '/app',
    templateUrl: 'templates/menu.html?version=3',
    controller: 'AppCtrl'
  })

  .state('app.principal', {
    url: '/principal',
    // views: {
      // 'menuContent': {
        templateUrl: 'templates/principal.html',
        controller: 'PrincipalCtrl'
      // }
    // }
  })

  .state('app.probar', {
    url: '/probar',
    // views: {
      // 'menuContent': {
        templateUrl: modales+'pruebamodal.html',
        controller: 'ProbarCtrl'
      // }
    // }
  })

  $urlRouterProvider.otherwise(function ($injector, $location) {
    var $state = $injector.get("$state");
    $state.go("app.principal");
  });
})

function clone(obj) {
    var copy;

    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;

    // Handle Date
    if (obj instanceof Date) {
        copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
        copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = clone(obj[i]);
        }
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
        }
        return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
}

function activarFormulario(reglas,agregarClase,newform){

  var form = "#formValidate";
  if(newform != undefined)
    form += newform;
  for (var i = 0; i < $(form).find('input').length; i++) {
    if($(form).find('input')[i].value != ""){
      var name = $(form).find('input')[i].name;
      if(name != ""){
        $($(form).find('label[for='+name+']')).addClass("active");
        // $($(form).find('i')[i]).addClass("active");
        $($(form).find('input')[i]).addClass("valid");  
      }
    }
  }
  for (var j = 0; j < $(form).find('textarea').length; j++) {
    if($(form).find('textarea')[j].value != ""){
      var name = $(form).find('textarea')[j].name;
      if(name != ""){
        $($(form).find('label[for='+name+']')).addClass("active");
        // $($(form).find('i')[i+j]).addClass("active");
        $($(form).find('textarea')[j]).addClass("valid");
      }
    }
  }

  $(form).validate({
      rules: reglas,
      errorElement : 'div',
      errorPlacement: function(error, element) {
        var placement = $(element).data('error');
        if(agregarClase != undefined)
          error.addClass(agregarClase);
        if (placement) {
          $(placement).append(error)
        } else {
          error.insertAfter(element);
        }
      }
  });

  $("#formValidate").submit(function(e){
    e.preventDefault();
  })  
}