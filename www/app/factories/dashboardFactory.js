'use strict';

app.factory('dashboardFactory', ['$http', function ($http) {

    var dashboardFactoryReturn = {};

    var _getDashboard = function () {

        return $http.get(Config.UrlApiDashboardFactory).success(function (results) {
            return results;
        });
    };

    dashboardFactoryReturn.getDashboard = _getDashboard;

    return dashboardFactoryReturn;

}]);