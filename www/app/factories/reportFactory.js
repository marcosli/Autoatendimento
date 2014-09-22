'use strict';

app.factory('reportFactory', ['$http', function ($http) {

    var reportFactoryReturn = {};

    var _getReport= function (menuId) {

        return $http.get(Config.UrlApiReportFactory + menuId)
            .then(function (results) {
                return results.data;
            });
    };

    reportFactoryReturn.getReport = _getReport;

    return reportFactoryReturn;

}]);