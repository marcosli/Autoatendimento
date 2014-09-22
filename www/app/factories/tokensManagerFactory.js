'use strict';
app.factory('tokensManagerFactory', ['$http', function ($http) {

    var tokenManagerFactoryReturn = {};

    var _getRefreshTokens = function () {

        return $http.get(Config.UrlApiTokensManagerFactoryGet).then(function (results) {
            return results;
        });
    };

    var _deleteRefreshTokens = function (tokenid) {

        return $http.delete(Config.UrlApiTokensManagerFactoryDelete + tokenid).then(function (results) {
            return results;
        });
    };

    tokenManagerFactoryReturn.deleteRefreshTokens = _deleteRefreshTokens;
    tokenManagerFactoryReturn.getRefreshTokens = _getRefreshTokens;

    return tokenManagerFactoryReturn;

}]);