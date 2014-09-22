"use strict"

var reportHelper = new function()
{
    var self = this;
    this.afterRenderReportHtml;

    this.renderReportHtml = function (_dados, _error, _status, _message)
    {
        ExtensionsHelper.clearMainContent();

        _dados = JSON.parse(_dados);

        var styleDados = _dados.split(/(<style[^>]*>|<\/style>)/ig)[2] ? _dados.split(/(<style[^>]*>|<\/style>)/ig)[2] : "";
        var body = _dados.split(/(<body[^>]*>|<\/body>)/ig)[2];

        var style = '<style>' +
                        styleDados +
                        '@media print {' +
                            '@page { margin-top: 2mm; margin-bottom: 2mm }' +
                            '.main-content, .mc-content { position: inherit; background-color:white; margin: 0px; padding:0px; border:none; outline: none; } ' +
                            '.main-content svg { border: none !important }' +
                            '.mc-content { position: absolute; top:0; left:0; z-index: 9999 }' +
                            '.sidebar, .mc-top, .mc-breadcrumb { display:none; opacity:0; height: 0; width: 0 } ' +
                        '}' +
                    '</style>';

        ExtensionsHelper.setMainContent(
            style +
            '<div class="table-responsive">' +
                body +
            '</div>'
        )

        typeof (self.afterRenderReportHtml) === "function" ? new self.afterRenderReportHtml() : null;
    }
};
