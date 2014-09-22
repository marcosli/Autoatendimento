'use strict';
app.controller('signupController', ['$scope', '$location', '$timeout', '$window', 'authFactory', function ($scope, $location, $timeout, $window, authFactory) {

    $location.$$absUrl.search(/login.html/ig) < 0 ? $window.location.href = Config.signupUrl : null;

    $scope.savedSuccessfully = false;
    $scope.message = "";

    $scope.registration = {
        userName: "",
        email: "",
        password: "",
        confirmPassword: ""
    };

    $scope.signUp = function () {

        ExtensionsHelper.registerCanvasLoader();

        authFactory.saveRegistration($scope.registration).then(function (response) {

            ExtensionsHelper.clearCanvasLoader();

            $scope.savedSuccessfully = true;
            $scope.message = "Usuário registrado com sucesso, você será redirecionado para página de login dentre alguns segundos.";
            startTimer();

        },
         function (response) {

             ExtensionsHelper.clearCanvasLoader();

             var errors = [];
             for (var key in response.data.modelState) {
                 for (var i = 0; i < response.data.modelState[key].length; i++) {
                     errors.push(response.data.modelState[key][i]);
                 }
             }
             $scope.message = "Falha no registro de usuário. Devido a: " + errors.join(" ");
         });
    };

    var startTimer = function () {
        var timer = $timeout(function () {
            $timeout.cancel(timer);
            $location.path('/login');
        }, 2000);
    }

}]);