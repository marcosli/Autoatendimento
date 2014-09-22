'use strict';
app.factory('dashboardService', ['$http', 'ngAuthSettings', function ($http, ngAuthSettings) {

    var serviceBase = ngAuthSettings.apiServiceBaseUri;

    var dashboardServiceFactory = {};

    var _getDashboard = function () {

        return $http.get(serviceBase + 'api/orders').then(function (results) {
            return results;
        });
    };

    dashboardServiceFactory.getDashboard = _getDashboard;

    return dashboardServiceFactory;

}]);