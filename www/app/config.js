"use strict";

/*
Seguintes pacotes não estão configurado no nuget por não existir no mesmo:
angular loading bar, grid, tablesaw, angular local storage, heartcode, isMobile
É necessário inserir os arquivos nas pastas content e scripts, conforme seu tipo.
*/

var Config = new function ()
{
    // Geral
    //this.hostAPI = window.location.hostname;
    //this.hostApiPort = ':80';

    //this.hostWebApp = window.location.hostname;
    //this.hostWebAppPort = ':80';

    //this.urlHostAPI = 'http://' + this.hostAPI + this.hostApiPort + '/aarest',
    //this.urlHostWebApp = 'http://' + this.hostWebApp + this.hostWebAppPort + '/aaweb',

    // Config App Android 
    this.hostAPI = 'fmod.cmflex.com.br';
    this.hostApiPort = ':80';

    this.hostWebApp = "";
    this.hostWebAppPort = '';

    this.urlHostAPI = 'http://' + this.hostAPI + this.hostApiPort + '/aarest';
    this.urlHostWebApp = "file:///android_asset/www";


    this.actionAuth = this.urlHostAPI + '/Api/usuario?fmt=json';
    this.actionMenu = this.urlHostAPI + '/Api/Menu?fmt=json';
    this.actionReport = this.urlHostAPI + '/Api/ReportService';
    this.loginUrl = this.urlHostWebApp + '/login.html#/login';
    this.signupUrl = this.urlHostWebApp + '/login.html#/signup';
    this.frontPageUrl = this.urlHostWebApp + '/index.html';

    this.timeLogoutBroserOut = 5000;

    this.selectorMainContent = '.mc-content';

    //Mensagens
    this.popupUserErrorPreText = 'Erro na Autenticação:';
    this.popupMenuErrorPreText = 'Erro no Menu:';
    this.popupReportErrorPreText = 'Erro no Relatório:';
    this.popupFormErrorPreText = 'Erro no Formulário:';
    this.popupDashboardErrorPreText = 'Erro no Dashboard:';
    this.popupValidationErrorPreText = 'Erro na Validação:';
    this.popupUserSuccessPreText = 'Logado com sucesso!';
    this.titleMenuHome = 'Home';

    this.msgValidationDate = "Formato errado! Digite uma data válida.";
    this.msgValidationNumber = "Formato errado! Digite um número válido.";
    this.msgAuthLoading = "Autenticando...";
    this.msgRegisterCreating = "Registrando...";

    // AngularJs
    this.clientId = 'ngAuthApp';
    this.appView = 'app/views';
    this.UrlApiTokensManagerFactoryGet = this.urlHostAPI + '/api/refreshtokens';
    this.UrlApiTokensManagerFactoryDelete = this.urlHostAPI + '/api/refreshtokens/?tokenid=';
    this.UrlApiAuthFactoryToken = this.urlHostAPI + '/token';
    this.UrlApiReportFactory = this.urlHostAPI + '/api/reports/';
    this.UrlApiFormFactory = this.urlHostAPI + '/api/formulario/';

    //this.UrlApiDashboardFactory = this.urlHostAPI + '/api/Dashboard'; // produção
    this.UrlApiDashboardFactory = "http://www.infbras.com.br/api/dashboard.json"; // Config App Android 
    //this.UrlApiDashboardFactory = 'http://localhost:8080/teste.php';// Config Local

    //this.UrlApiMenuFactory = this.urlHostAPI + '/api/Menu'; // produção
    this.UrlApiMenuFactory = "http://www.infbras.com.br/api/menu.json"; // Config App Android 
    //this.UrlApiMenuFactory = "http://localhost:8080/menu.json"; // Config Local
};