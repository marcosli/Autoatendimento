"use strict";

app.controller('tokensManagerController', ['$scope', 'tokensManagerFactory', function ($scope, tokensManagerFactory) {

    $scope.refreshTokens = [];

    tokensManagerFactory.getRefreshTokens().then(function (results) {

        $scope.refreshTokens = results.data;

    }, function (error) {
        alert(error.data.message);
    });

    $scope.deleteRefreshTokens = function (index, tokenid) {

        tokenid = window.encodeURIComponent(tokenid);

        tokensManagerFactory.deleteRefreshTokens(tokenid).then(function (results) {

            $scope.refreshTokens.splice(index, 1);

        }, function (error) {
            alert(error.data.message);
        });
    }

}]);