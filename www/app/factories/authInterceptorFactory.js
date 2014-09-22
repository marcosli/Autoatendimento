'use strict';
app.factory('authInterceptorFactory', ['$q', '$injector', '$location', '$window', 'localStorageService', function ($q, $injector, $location, $window, localStorageService) {

    var authInterceptorFactoryReturn = {};

    var _request = function (config) {

        config.headers = config.headers || {};
       
        var authData = localStorageService.get('authorizationData');
        if (authData) {
            config.headers.Authorization = 'Bearer ' + authData.token;
        }

        return config;
    }

    var _responseError = function (rejection) {
        if (rejection.status === 401) {
            var authFactory = $injector.get('authFactory');
            var authData = localStorageService.get('authorizationData');

            if (authData) {
                if (authData.useRefreshTokens) {
                    $location.path('/refresh');
                    return $q.reject(rejection);
                }
            }
            authFactory.logOut();
            $window.location.href = Config.loginUrl;
        }
        return $q.reject(rejection);
    }

    authInterceptorFactoryReturn.request = _request;
    authInterceptorFactoryReturn.responseError = _responseError;

    return authInterceptorFactoryReturn;
}]);
