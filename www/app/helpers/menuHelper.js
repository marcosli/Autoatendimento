"use strict"

var menuHelper = new function () {

    var self = this;

    // Adiciona o atributo target com o _blank em links que não são do autoatendimento WebApp 
    var newWindow = function () {
        var links = $('.sidebar-menu a');
        links.each(function () {
            !ExtensionsHelper.isLinkInternal(this.href) ? $(this).attr('target', '_blank') : null;
        });
    }

    var toogleMenu = function () {
        $('.sidebar .navbar-toggle').click(function () {
            $('.sidebar .sidebar-menu').css('display') === 'block' ?
                $('.sidebar-menu').fadeOut():
                $('.sidebar-menu').fadeIn();
                });
    }

    this.clickNull = function () {}

    this.init = function()
    {
        //Ajax.getMenu(localStorage.chave);
        //toogleMenu();
        //Extensions.resize();
        //newWindow();
    };

    // Este método é executado a partir do Extensions.resize.
    this.resize = function () {
        window.innerWidth >= 768 && $('.sidebar-menu').is(':hidden') ?
            $('.sidebar-menu').fadeIn().css('display', '') :
            null;
    };

    // Posiciona o campo de visualização do broser referente a altura.
    this.scrollTo = function (pos)
    {
        setTimeout(function() {
            jQuery('html,body').animate({
                scrollTop: pos
            }, 800);
        }, 350);
    };

    // Mostra/oculta os submenus do menu pai com animação.
    this.collapseOne = function(all,one)
    {
        one.parents('ul').addClass('action');
        one.children('ul').addClass('action');

        // Oculta outros itens que não faz parte a hierarquia do item(ul)
        all.each(function(){

            var arrow = $(this).parent('li').children('a').children('.arrow');

            if (!$(this).hasClass('action')) {
                $(this).slideUp(300);
                $(this).removeClass('open');
                $(this).parent('li').removeClass('open');
                arrow.removeClass('glyphicon-chevron-down');
                arrow.addClass('glyphicon-chevron-left');
            }
        });

        // Exibe e oculta o item clicado
        if (one.children('ul').hasClass('open')) {
            one.children('ul').slideUp(300);
            one.children('ul').removeClass('open');
            one.children('ul').parent('li').removeClass('open');
            one.children('a').children('.arrow').removeClass('glyphicon-chevron-down');
            one.children('a').children('.arrow').addClass('glyphicon-chevron-left');
        } else {
            one.children('ul').slideDown(300);
            one.children('ul').addClass('open');
            one.children('ul').parent('li').addClass('open');
            one.children('a').children('.arrow').removeClass('glyphicon-chevron-left');
            one.children('a').children('.arrow').addClass('glyphicon-chevron-down');
        }

        // Remove o identificador do item clicado
        one.parents('ul').removeClass('action');
        one.children('ul').removeClass('action');
    };

    // Cria o evento click para o collapseOne e chama o scrollTo com a posição a partir do ponto do click
    this.clickItem = function()
    {
        // Direciona o item de menu clicado pra perto do topo, melhorando a visualização.
        var action = isMobile.phone || isMobile.tablet ? 'tap' : 'click';
        jQuery('.sidebar').on(action, '.sidebar-menu > ul > li a', function (e)
        {
            var PointClick = this.offsetTop;
            var heightMenuOpen = $('.submenu.open:first').length === 1 ? $('.submenu.open:first').height() : 0;
            var spacingTopConfig = -42;
            var pos = PointClick - heightMenuOpen - spacingTopConfig;

            // Executa o scrollTo e collapseOne, se o item de menu existir sub-itens.
            var one = $(this).parent('li');

            if (this.getAttribute('tipo') === 'Relatorio') {
                //Ajax.getReport(one.attr('itemMenu'));
                angular.element('[data-ng-controller=indexController]').scope().setReport(one.attr('itemMenu'))
                self.scrollTo(document.querySelector('.main-content').offsetTop);
            } else 
            if (this.getAttribute('tipo') === 'Formulario') {
                angular.element('[data-ng-controller=indexController]').scope().setForm(one.attr('itemMenu'))
                self.scrollTo(document.querySelector('.main-content').offsetTop);
            }
            else
                if (one.children('ul').hasClass('submenu')) {
                    self.scrollTo(pos);
                    self.collapseOne($('.sidebar-menu > ul > li ul'),one);
                    //self.collapseOne(one.children('ul'), one); // Funciona em todos submenus // Precisa finalizar o slideUp dos itens abertos fora do item clicado
                }

        });

    };

    // Renderiza o HTML do menu a partir dos itens recebidos pelo Ajax.getMenu.
    this.helperMenu = function (_dados, _error, _status, _message) {

        ExtensionsHelper.clearCanvasLoader();

        if (_dados === 'error') {

            $('.sidebar-menu').append(
                '<div class="alert alert-danger" role="alert"><span>' + Config.popupMenuErrorPreText + ' <br />' + _status + ' ' + _error + ': ' + _message + '</span><div/>'
            );
            MensagemHelper.erro(Config.popupMenuErrorPreText + ' ', _status + ' ' + _error + ': ' + _message);

        } else {
            $('.sidebar-menu ul').append(
                '<li>' +
                    '<a href="' + Config.frontPageUrl + '" >' +
                        '<div class="pre-icon">' +
                            '<i class="home icon glyphicon glyphicon-home"></i>' +
                        '</div>' +
                        '<span>' + Config.titleMenuHome + '</span>' +
                    '</a>' +
                '</li>'
            );

            var recursiveMenu = function (_dados, _item) {
                !_dados[_item].link ? _dados[_item].link = "javascript:menuHelper.clickNull()" : null;
                var link = (_dados[_item].tipo === 'Report') ? 'javascript:menuHelper.clickNull()' : _dados[_item].link;
                var itemPai = $('.sidebar-menu #item-' + _dados[_item].codigoHierarquicoPai);
                itemPai.find('ul').length === 0 ? itemPai.append('<ul class="submenu"></ul>') : null;

                itemPai.children('ul').append(
                    '<li id="item-' + _dados[_item].codigoHierarquico + '" itemmenu="' + _dados[_item].id + '">' +
                        '<a href="' + link + '" tipo="' + _dados[_item].tipo + '">' +
                            '<span>' + _dados[_item].descricao + '</span>' +
                            subItensArrow(_dados, _item) +
                        '</a>' +
                    '</li>'
                );

                if (subItensArrow(_dados, _item) !== '') {
                    for (var item in _dados) {
                        if (_dados[item].codigoHierarquicoPai === _dados[_item].codigoHierarquico) {
                            recursiveMenu(_dados, item);
                        }
                    }
                }
            };

            var pontoParaVirgula = function (_texto) {
                return Object.prototype.toString.call(_texto) === '[object String]' ? _texto.replace(/\./g, '_') : '';
            };

            var subItensArrow = function (_dados, _item) {
                for (var item in _dados) {
                    if (_dados[_item].hasOwnProperty('codigoHierarquicoPai') &&
                        _dados[_item].codigoHierarquico === pontoParaVirgula(_dados[item].codigoHierarquicoPai))
                            return '<i class="arrow glyphicon glyphicon-chevron-left"></i>';
                }
                return '';
            };

                
            for (var item in _dados) {
                    
                _dados[item].codigoHierarquico = pontoParaVirgula(_dados[item].codigoHierarquico);
                _dados[item].codigoHierarquicoPai = pontoParaVirgula(_dados[item].codigoHierarquicoPai);

                if (_dados[item].codigoHierarquicoPai == '') {
                    var link = (_dados[item].tipo === 'Report') ? 'javascript:menuHelper.clickNull()' : _dados[item].link;
                    $('.sidebar-menu ul:first').append(
                        '<li id="item-' + _dados[item].codigoHierarquico + '" itemmenu="' + _dados[item].id + '">' +
                            '<a href="javascript:menuHelper.clickNull()">' +
                                '<div class="pre-icon">' +
                                    '<i class="home icon glyphicon glyphicon-home"></i>' +
                                '</div>' +
                                '<span>' + _dados[item].descricao + '</span>' +
                                subItensArrow(_dados, item) +
                            '</a>' +
                        '</li>'
                    );
                } else {
                    recursiveMenu(_dados, item);
                }
            }

            self.clickItem();
            toogleMenu();
            ExtensionsHelper.resize();
            newWindow();
            document.querySelector("button.navbar-toggle").addEventListener("click", function () {
                this.classList.toggle("active");
            });

        }
    }

};