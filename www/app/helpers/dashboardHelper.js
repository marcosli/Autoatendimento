"use strict";

var dashboardHelper = new function ()
{
    var dbh = this;

    this.animacaoBarraDeProgresso = function () {
        $('.barra-de-progresso > span').each(function () {
            $(this).css('width', '0');
            $(this).animate({ width: 100 + '%' }, 2500, false);
        });
    };

    this.renderBlockWall = function (_data) {

        var html = "";

        html += '<div class="col-md-5">' +
                    '<div class="mural">' +
                        '<div class="mural-box">' +
                            '<div class="mural-box-titulo">' +
                                '<span class="icon-b"></span>' +
                                '<h2>{0}</h2>' +
                                '<i class="icon icon-mural glyphicon glyphicon-comment"></i>' +
                            '</div>' +
                            '<div class="mural-box-content">' +
                                '{1}' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                '</div>';

        html = html.fmt(_data.titulo, _data.elementos[0].conteudo)

        return html;
    }

    this.renderBlockForm = function (_data) {

        var renderFiedls = function (_data) {

            var aux = 0;
            var htmlF = '<div class="col-md-12 col-lg-6 dc-dados-col1">';

            for (var i in _data) {

                htmlF += '<div><strong>{0}:</strong><span> {1}</span></div>';
                htmlF = htmlF.fmt(_data[i].label, _data[i].conteudo);

                htmlF += aux === 8 ? '</div><div class="col-md-12 col-lg-6 dc-dados-col2">' : "";

                aux++;
            }

            htmlF += '</div>';

            return htmlF;
        }

        var html = '<div class="col-md-7 padding-right-fix">' +
                    '<div class="dados-cadastrais">' +
                        '<div class="row">' +
                            //'<div class="col-xs-3 col-md-3 dc-foto">' +
                            //    '<i class="icon icon-cadastro glyphicon glyphicon-user"></i>' +
                            //'</div>' +
                            '<div class="col-xs-12 col-md-12 dc-dados">' +
                                '<div class="dc-dados-titulo">' +
                                    '<span class="icon-b"></span>' +
                                    '<h2>{0}</h2>' +
                                    '<i class="icon icon-cadastro glyphicon glyphicon-user"></i>' +
                                '</div>' +
                                '<div class="dc-dados-conteudo">' +
                                    renderFiedls(_data.elementos) +
                                '</div>' +
                            '</div>' +
                            //'<div class="dc-dados-botoes">' +
                            //    '<a href="#">' +
                            //        '<div class="button">' +
                            //            '<i class="glyphicon glyphicon-list-alt"></i>' +
                            //            '<span>Extrato</span>' +
                            //        '</div>' +
                            //    '</a>' +
                            //    '<a href="#">' +
                            //        '<div class="button">' +
                            //            '<i class="glyphicon glyphicon-edit"></i>' +
                            //            '<span>Editar</span>' +
                            //        '</div>' +
                            //    '</a>' +
                            //'</div>' +
                        '</div>' +
                    '</div>'+
                '</div>';

        html = html.fmt(_data.titulo)

        return html;
    }

    this.renderBlockDisplay4 = function (_data) {           

        var elements = function (row) {
            var htmlE = "";
            var col = 1;
            var icons = ["glyphicon-user", "glyphicon-hdd", "glyphicon-stats"];

            for (var i in _data.elementos) {
                if (row === 1) {
                    htmlE += '<div class="info1-saldo">' +
                                 '<div class="info1-saldo-valor">{0}</div>' +
                                 '<span>{1}</span>' +
                             '</div>';
                    htmlE = htmlE.fmt(_data.elementos[i].conteudo, _data.elementos[i].label);
                    break;
                } else {

                    if (parseInt(i) === 0) continue; // Somente itens da linha 2

                    htmlE += '<div class="info1-g-{0}">' +
                                '<div class="info1-g-{0}-valor">' +
                                    '<i class="icon glyphicon {1}"></i>' +
                                    '<span class="info1-g-{0}-valor-text">{2}</span>' +
                                '</div>' +
                                '<div class="barra-de-progresso">' +
                                    '<span></span>' +
                                '</div>' +
                                '<div class="info1-g-{0}-titulo">' +
                                    '{3}' +
                                '</div>' +
                            '</div>';

                    htmlE = htmlE.fmt(col, icons[i - 1], _data.elementos[i].conteudo, _data.elementos[i].label);

                    col >= 3 ? col = 1 : col++;
                }
            }
            return htmlE;
        }

        var html = '<div class="col-md-6 padding-right-fix">' +
                        '<div class="info1">' +
                            '<div class="info1-titulo">' +
                                '<span class="icon-b"></span>' +
                                '<h2>{0}</h2>' +
                            '</div>' +
                            elements(1) +
                            '<div class="info1-geral">' +
                                elements(2) +
                                '<span class="clear"></span>' +
                            '</div>' +
                        '</div>' +
                    '</div>';

        html = html.fmt(_data.titulo);

        return html;
    }

    this.renderBlockDisplay7 = function (_data) {

        var elements = function (_items) {

            var htmlE = ""

            for (var i in _items) {

                var j = _items[i];

                if (_data.elementos[j]) {

                    if (j === 0 || j === 1) {
                        htmlE += '<div class="info2-c1-r1-box{0}">' +
                                     '<div class="row1">' +
                                         '<span>{1}</span>' +
                                     '</div>' +
                                     '<div class="row2">' +
                                         '<span>{2}</span>' +
                                     '</div>' +
                                 '</div>';
                        htmlE = htmlE.fmt(j + 1, _data.elementos[j].label, _data.elementos[j].conteudo)
                    }
                    else if (j === 2) {
                        htmlE += '<span class="first">{0}</span>' +
                                 '<span class="last" >{1}</span>';
                        htmlE = htmlE.fmt(_data.elementos[j].conteudo, _data.elementos[j].label)
                    }
                    else if (j === 3) {
                        htmlE += '<div class="info2-col2-box1">' +
                                     '<span class="first">{0}</span>' +
                                     '<span class="last" >{1}</span>' +
                                 '</div>';
                        htmlE = htmlE.fmt(_data.elementos[j].conteudo, _data.elementos[j].label)
                    }
                    else if (j >= 4 && j <= 7) {
                        htmlE += '<div class="info2-col2-box{0}">' +
                                     '<span class="first">{1}</span>' +
                                     '<div class="barra-de-progresso">' +
                                         '<span></span>' +
                                     '</div>' +
                                     '<span class="last">{2}</span>' +
                                 '</div>';
                        htmlE = htmlE.fmt(j - 2, _data.elementos[j].conteudo, _data.elementos[j].label)
                    }

                }
            }

            return htmlE;
        }

        var html ='<div class="col-md-6">' +
                    '<div class="info2">' +
                        '<div class="info2-titulo">' +
                            '<span class="icon-b"></span>' +
                            '<h2>{0}</h2>' +
                            '<!--<i class="icon icon-estilo1 glyphicon glyphicon-folder-open"></i>-->' +
                        '</div>' +
                        '<div class="info2-col1">' +
                            '<div class="info2-col1-row1">' +
                                elements([0,1]) +
                            '</div>' +
                            '<div class="info2-col1-row2">' +
                                elements([2]) +
                            '</div>' +
                        '</div>' +
                        '<div class="info2-col2">' +
                            elements([3]) +
                            elements([4,5,6]) +
                        '</div>' +
                        '<span class="clear"></span>' +
                    '</div>' +
                '</div>';

        html = html.fmt(_data.titulo);

        return html;
    }

    this.renderBlock = function (_data)
    {
        var html = "";

        html += _data.blockType === blockTypeEnum.Wall ? dbh.renderBlockWall(_data) : "";
        html += _data.blockType === blockTypeEnum.Form ? dbh.renderBlockForm(_data) : "";
        html += _data.blockType === blockTypeEnum.BlockDisplay4 ? dbh.renderBlockDisplay4(_data) : "";
        html += _data.blockType === blockTypeEnum.BlockDisplay7 ? dbh.renderBlockDisplay7(_data) : "";

        return html;
    }

    this.renderDashboard = function (_data, _error)
    {
        var html = "";
        ExtensionsHelper.clearMainContent();

        if (_data === "error") {
            ExtensionsHelper.setMainContent(
                '<div class="alert alert-danger" role="alert"><span>' + Config.popupDashboardErrorPreText + ' <br />' + _error.status + ' ' + _error.statusText + ': ' + _error.data + '</span><div/>'
            );
            MensagemHelper.erro(Config.popupMenuErrorPreText + ' ', _error);
        }
        else {

            for (var i in _data.blocos) {
                html += dashboardHelper.renderBlock(_data.blocos[i])
            }

            ExtensionsHelper.setMainContent(
                        '<div class="row">' +
                            '<div class="content-main">' +
                                html +
                            '</div>' +
                        '</div>');
            dbh.animacaoBarraDeProgresso();
        }

    }

};