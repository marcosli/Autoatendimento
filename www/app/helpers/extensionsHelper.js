"use strict"

var ExtensionsHelper = new function () {

    var self = this;
    var mainContent = Config.selectorMainContent;

    var loginCanvasLoader = function (msg)
    {
        $('canvas').length === 0 ? self.initCanvasLoader() : null;

        $('.canvasloader-wrapper').fadeIn();
        $('#canvasloader-container')
            .prepend('<span class="text-canvasloader"></span>')
            .fadeIn();

        var tc = $('.text-canvasloader');
        tc.text(msg);
        tc.css('left', '-' + parseInt(tc.width() / 3) + 'px');
    }

    this.resize = function () {

        var resizeTimer;

        var resizeCall = function () {
            menuHelper.resize();
        }

        $(window).resize(function(){

            clearInterval(resizeTimer);
            resizeTimer = setTimeout(resizeCall, 100);

        });
    };

    this.initCanvasLoader = function(msg)
    {
        var cl = new CanvasLoader('canvasloader-container');
        cl.setColor('#494e7b'); // default is '#000000'
        cl.setDiameter(32); // default is 40
        cl.setDensity(89); // default is 40
        cl.setRange(1.2); // default is 1.3
        cl.setFPS(39); // default is 24
        cl.show(); // Hidden by default
        window.cl = cl;
    };

    this.authCanvasLoader = function()
    {
        loginCanvasLoader(Config.msgAuthLoading);
    };

    this.registerCanvasLoader = function () {
        loginCanvasLoader(Config.msgRegisterCreating);
    };

    this.menuCanvasLoader = function()
    {
        $('canvas').length === 0 ? self.initCanvasLoader() : null;

        var cc = $('#canvasloader-container');
        cc.css('left','9.5em');
        cc.prepend('<span class="text-canvasloader"></span>').fadeIn();

        var tc = $('.text-canvasloader');
        tc.text('Carregando menu...');
        tc.css('left', '-'+(tc.width()/2/18)+'em');
        tc.css('width', '10em');

        $('#canvasloader-container').appendTo('.sidebar-menu');

    };

    this.clearCanvasLoader = function()
    {
        $('canvas').length === 0 ? self.initCanvasLoader() : null;

        $('#sidebar-menu ul').empty();
        $('.canvasloader-wrapper').fadeOut();
        $('#canvasloader-container')
            .empty()
            .fadeOut();
        window.cl.kill();
    };

    this.clearMainContent = function()
    {
        $(mainContent).empty();
    };

    this.clearAllStyles = function (_seletor)
    {
        $(_seletor).find('*').removeAttr('id style');
        $(_seletor).removeAttr('id style');
    };

    this.setMainContent = function(_html)
    {
        $(mainContent).append(_html);
    };

    this.isLink = function(_link) {
        return typeof(_link) === "string" && _link.search(/http\:\/\//ig) >= 0;
    };

    this.isLinkInternal = function (_link) {
        var domainWebApp = Config.hostWebApp.replace('www.', '');
        var domainLink = _link.replace('www.', '');
        return _link.search('javascript') >= 0 || _link === "#" || (domainLink.search(domainWebApp) >= 0 && self.isLink(_link));
    }

    this.beforeCloseBrowser = new function () {

        var getInstanceTabs = function () {
            return localStorage.instanceTabs ? JSON.parse(localStorage.instanceTabs) : false;
        };

        var setInstanceTab = function () {
            setTimeout(function () { // Impedi criar InstanceTabs que não correspondam ao número de guias abertas.
                setInstanceKey();
                var timeNow = (new Date()).getTime();
                !localStorage.instanceTabs ? localStorage.instanceTabs = '[]' : null;
                !sessionStorage.instanceTab ? sessionStorage.instanceTab = timeNow : null;
                var instanceTabs = JSON.parse(localStorage.instanceTabs);

                !isInstanceTab() ? instanceTabs.push(timeNow) : null;
                localStorage.instanceTabs = JSON.stringify(instanceTabs);
            }, 100);
        };

        var isInstanceTab = function (_instanceTab) {
            return $.inArray(parseInt(sessionStorage.instanceTab), getInstanceTabs()) > 0 ? true : false;
        };

        var unsetInstanceTab = function () {
            if (isInstanceKey() && localStorage.instanceTabs) {
                var instanceTabs = JSON.parse(localStorage.instanceTabs);
                for (var i = 0; i <= instanceTabs.length - 1; i++) {
                    if (parseInt(instanceTabs[i]) === parseInt(sessionStorage.instanceTab)) {
                        instanceTabs.splice(i, 1);
                        sessionStorage.removeItem('instanceTab');
                    }
                }
                localStorage.instanceTabs = JSON.stringify(instanceTabs);
                instanceTabs.length === 0 ? localStorage.browserOut = (new Date()).getTime() : null;
            }
        };

        var setInstanceKey = function () {
            var timeNow = (new Date()).getTime();
            !localStorage.instanceKey ? localStorage.instanceKey = timeNow : null;
            !sessionStorage.instanceKey ? sessionStorage.instanceKey = localStorage.instanceKey : null;
        };

        var isInstanceKey = function (_instanceKey) {
            return localStorage.instanceKey === sessionStorage.instanceKey ? true : false;
        };

        this.init = function () {

            $(document).ready(function () {

                if (getInstanceTabs().length === 0) {
                    var timeNow = (new Date()).getTime();
                    if (timeNow - parseInt(localStorage.browserOut) > Config.timeLogoutBroserOut)
                        angular.element('[data-ng-controller=indexController]').scope().logOut();
                }

                setInstanceTab();

            });

            window.onbeforeunload = function () {

                unsetInstanceTab();

            }

        }

    }

};

String.prototype.fmt = function () {
    var args = arguments;
    return this.replace(/\{(\d+)\}/g, function ($0, $1) {
        return args[$1] !== void 0 && args[$1] !== null ? args[$1] : '';
    });
};