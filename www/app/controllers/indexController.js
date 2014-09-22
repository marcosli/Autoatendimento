'use strict';

app.controller(
    'indexController', ['$scope', '$window', '$location', 'authFactory', 'localStorageService', 'menuFactory', 'reportFactory', 'formFactory', 'dashboardFactory',
    function ($scope, $window, $location, authFactory, lss, menuFactory, reportFactory, formFactory, dashboardFactory) {

        $scope.setReport = function (menuId) {
            reportFactory.getReport(menuId)
                .then(function (data) {
                    reportHelper.renderReportHtml(data);
                }, function (error) {
                    MensagemHelper.erro(Config.popupReportErrorPreText + ' ', error);
                });
        }

        $scope.setForm = function (menuId) {
            formFactory.getForm(menuId)
                .then(function (results) {
                    window.aa.formData = results.data;
                    formHelper.renderFormHtml(results.data);
                }, function (error) {
                    MensagemHelper.erro( Config.popupFormErrorPreText + ' ', error);
                });
        }

        $scope.submitForm = function () {
            console.log(window.aa.formData)
        }

        $scope.getMenu = function ()
        {
            ExtensionsHelper.menuCanvasLoader();

            //if (localStorage.getItem('menuCache'))
            //    menuHelper.helperMenu(JSON.parse(localStorage.getItem('menuCache')));
            //else
                menuFactory.getMenu().then(function (results) {
                    //localStorage.setItem('menuCache', JSON.stringify(results.data));
                    menuHelper.helperMenu(results.data);
                }, function (error) {
                    menuHelper.helperMenu('error', error.statusText, error.status, error.data.message);
                });
        }

        $scope.getDashboard = function () {

            dashboardFactory.getDashboard().then(function (results) {
                dashboardHelper.renderDashboard(results.data);
            }, function (error) {
                dashboardHelper.renderDashboard("error", error);
            });
        }

        $scope.logOut = function () {
            authFactory.logOut();
            $window.location.href = Config.loginUrl;
        }

        $scope.authentication = authFactory.authentication;

}]);