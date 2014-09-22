'use strict';
app.controller('loginController', ['$scope', '$window', 'authFactory', function ($scope, $window, authFactory) {

    $scope.loginData = {
        userName: "",
        password: "",
        useRefreshTokens: false
    };

    $scope.message = "";

    $scope.goSignup = function () {

        $window.location.href = Config.signupUrl;

    }

    $scope.teste = function () { console.log('teste') }

    $scope.goLogin = function () {

        $window.location.href = Config.loginUrl;

    }

    $scope.login = function () {

        ExtensionsHelper.authCanvasLoader();

        authFactory.login($scope.loginData).then(function (response) {

            ExtensionsHelper.clearCanvasLoader();
            $window.location.href = Config.frontPageUrl;

        },
        function (err) {

            ExtensionsHelper.clearCanvasLoader();
            MensagemHelper.erro(Config.popupUserErrorPreText + ' ' +  err.error, err);

    });
    };

}]);