!localStorage.getItem('ls.authorizationData') ? window.location.href = Config.loginUrl : null;
window.aa = {};
window.aa.temp = {};

var app = angular.module('AutoAtendimento', ['ngRoute', 'LocalStorageModule', 'angular-loading-bar']);

app.config(function ($routeProvider) {

    $routeProvider.when("/login", {
        controller: "loginController",
        templateUrl: Config.appView + "/login.html"
    });

    $routeProvider.when("/signup", {
        controller: "signupController",
        templateUrl: Config.appView + "/signup.html"
    });

    $routeProvider.when("/index", {
        controller: "indexController",
        //templateUrl: Config.appView + "/dashboard.html"
    });

    $routeProvider.when("/refresh", {
        controller: "refreshController",
        templateUrl: Config.appView + "/refresh.html"
    });

    $routeProvider.when("/tokens", {
        controller: "tokensManagerController",
        templateUrl: Config.appView + "/tokens.html"
    });

    $routeProvider.otherwise({ redirectTo: '/index' });

});

app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptorFactory');
});

app.run(['authFactory', function (authFactory) {
    authFactory.fillAuthData();
}]);
