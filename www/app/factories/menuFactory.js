'use strict';

app.factory('menuFactory', ['$http', function ($http) {

    var menuFactoryReturn = {};

    var _getMenu = function () {

        return $http.get(Config.UrlApiMenuFactory).success(function (results) {
            return results;
        });
    };

    menuFactoryReturn.getMenu = _getMenu;

    return menuFactoryReturn;

}]);