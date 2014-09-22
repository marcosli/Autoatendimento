'use strict';
app.controller('refreshController', ['$scope', '$location', 'authFactory', function ($scope, $location, authFactory) {

    $scope.authentication = authFactory.authentication;
    $scope.tokenRefreshed = false;
    $scope.tokenResponse = null;

    $scope.refreshToken = function () {

        authFactory.refreshToken().then(function (response) {
            $scope.tokenRefreshed = true;
            $scope.tokenResponse = response;
        },
         function (err) {
             $location.path('/login');
         });
    };

}]);