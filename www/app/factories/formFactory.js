'use strict';

app.factory('formFactory', ['$http', function ($http) {

    var formFactoryReturn = {};

    var _getForm = function (formId) {

        return $http.get(Config.UrlApiFormFactory + formId)
            .success(function (results) {
                return results;
            });
    };

    formFactoryReturn.getForm = _getForm;

    return formFactoryReturn;

}]);