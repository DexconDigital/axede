myApp

.config(function($stateProvider) {

  var carpetaTemplates = 'templates/Inicio/';

  $stateProvider

  .state('inicio.login', {
    url: '/Login',
    // cached : false,
    // views: {
      // 'menuContent': {
        templateUrl: carpetaTemplates + 'Login.html?version=1',
        controller : 'LoginCtrl'
      // }
    // }
  })

});

controllers

.controller('LoginCtrl', function($scope,$state,AjaxService,LoginService,$timeout) {
  $scope.setLoaded($scope.mostrarloaded);
  $("body").height(window.innerHeight);
  $scope.formLogin = {
    User:"",
    Pass:"",
  }

  $timeout(function() {
    for (var i = 0; i < $('.login-form').find('input').length; i++) {
      if($('.login-form').find('input')[i].value != ""){
        $($('.login-form').find('label')[i]).addClass("active");
        $($('.login-form').find('i')[i]).addClass("active");
        $($('.login-form').find('input')[i]).addClass("valid");
      }
    }

    $(".login-form").validate({
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

    $(".login-form").submit(function(e){
      e.preventDefault();
    })  

    $scope.setLoaded(1);

  }, 1000);

  $scope.login = function() {   
    if(!$(".login-form").valid())
      console.log('invalid');
    else{
      $scope.cargando = true;
      LoginService.loginUser($scope.formLogin,AjaxService.miAjaxLogin).then(function(data1){
            if(typeof data1 == 'number' && data1 == 0){
              $scope.toast('Usuario Incorrecto');
              $scope.cargando = false;
            }
        else{
          LoginService.loginPass($scope.formLogin,AjaxService.miAjaxLogin).then(function(data2){
                if(typeof data2 == 'number' && data2 == 0){
              $scope.toast('Contraseña Incorrecta');
              $scope.cargando = false;
                }
            else if(data2[0].Habilitar == 0){
              Materialize.$scope.toast('Usuario Deshabilitado', 4000);
              $scope.cargando = false;
            }
            else
              LoginService.loginSucess(data2[0],AjaxService.miAjaxLogin).then(function(data3){
                  sessionStorage.setItem('dexcon16', data3.Id); 
                  $state.go('app.principal');  
                }, function(a){
                  $scope.toast(a);
                  $scope.cargando = false;
                });
            }, function(a){
              $scope.toast(a);
              $scope.cargando = false;
            });           
        }
        }, function(a){
          $scope.toast(a);
          $scope.cargando = false;
        }); 
    }
  }

  $('input').on('keydown', function(e) {
      if (e.which == 13) {
          $scope.login();
      }
  });

  $scope.toast = function(string){
    Materialize.toast(string, 4000);  
    $timeout(function() {
      $scope.cargando = false;
    }, 1000);
  }
  
})