//"use strict";

var formHelper = new function()
{
    var self = this;
    this.beforeRenderFormHtml = null;
    this.afterRenderFormHtml = null;

    this.fieldsControlGAA = function () { // Cria os inputs hiddens de sistema necessários no padrão dos campos processados
        var html = "";
        var aatf = aa.temp.form;
        var fs = formHelper.setStaticVarControl;
        var fcgaaKey = ["idEtapaDeFluxo","idFluxoDeFormularios","idAutor","dataHora","ordem"];        
        var fcgaaValue = [];        

        for (var i in fcgaaKey) {            

            var nome = fcgaaKey[i];
            var conteudo = aatf[nome];
            
            fs(nome, 'validation', null);

            fcgaaValue.push(
                {
                    "idCampoDeEtapa": 0,
                    "titulo": "",
                    "ordemDeProcessamento": 0,
                    "tipoDeCampo": tipoDeCampoEnum.oculto,
                    "visivel": false,
                    "editavel": false,
                    "requerido": false,
                    "coluna": 0,
                    "linha": 0,
                    "largura": 0,
                    "grupo": "",
                    "nome": nome,
                    "texto": null,
                    "mascara": null,
                    "tamanhoMaximo": 0,
                    "conteudo": conteudo,
                    "customHtml": null,
                    "cssClass": "",
                    "customScript": "",
                    "customStyle": "",
                    "posicaoDoLabel": 1,
                    "labelCssClass": "",
                    "labelCustomStyle": "",
                    "controlCssClass": "",
                    "controlCustomStyle": "",
                    "opcoesDeLista": {},
                    "acoesDeCampo": [],
                    "validacoesDeCampo": []
                }
            )

        }

        for (var j in fcgaaValue) {
            html += formHelper.getField(fcgaaValue[j])
        }
        return html;
    };

    this.renderFormHtml = function (_dados)
    {
        typeof(self.beforeRenderFormHtml) === "function" ? new self.beforeRenderFormHtml() : null;

        var classResponsive = _dados.responsivo ? 'table-responsive' : '';
        var camposProcessadosOrdenados = self.getOrderFields(_dados.camposProcessados);

        var html = ''; 
        html += '<div class="col-md-12 hidden-print"><h3>' + _dados.titulo + '</h3></div>';
        html += self.getSourceJavascript(_dados.customScript);
        html += self.getSourceCSS(_dados.customStyle);

        html += self.getFields(camposProcessadosOrdenados);

        //html += formHelper.fieldsControlGAA();

        html += self.getButton('Editar', 'submit', _dados.podeSalvar);

        ExtensionsHelper.clearMainContent();

        var style = '<style>' +
                        '@media print {' +
                            '@page { margin-top: 2mm; margin-bottom: 2mm;}' +
                            '.main-content, .mc-content { position: inherit; background-color:white; margin: 0px; padding:0px; border:none; outline: none; } ' +
                            '.mc-content { position: absolute; top:0; left:0; z-index: 9999 }' +
                            '.sidebar, .mc-top, .mc-breadcrumb { display:none; opacity:0; height: 0; width: 0 } ' +
                            '[placeholder]::-webkit-input-placeholder { color:transparent; }' +
                            '.cmFormulario > div.col-md-12 > h3 { display: none }' +
                            '[placeholder]:-moz-placeholder { color:transparent; } /* FF 4-18 */ ' +
                            '[placeholder]::-moz-placeholder { color:transparent; } /* FF 19+ */' +
                        '}' +
                    '</style>';

        ExtensionsHelper.setMainContent(
            style +
            '<div class="{0} row cmFormulario"><form action="javascript:formHelper.submit()">{1}</form></div>'.fmt(classResponsive, html)
        );

        typeof(self.afterRenderFormHtml) === "function" ? new self.afterRenderFormHtml() : null;
    }

    this.getSourceJavascript = function (_data) {
        return typeof (_data) === 'string' && ExtensionsHelper.isLink(_data) ?
                '<script src="{0}"></script>'.fmt(_data) :
                '<script>{0}</script>'.fmt(_data);
    }

    this.getSourceCSS = function (_data) {
        return typeof (_data) === 'string' && ExtensionsHelper.isLink(_data) ?
                '<link href="{0}" rel="stylesheet" />'.fmt(_data) :
                '<style>{0}</style>'.fmt(_data);
    }

    this.getButton = function (text, type, visible) {
        return visible ? '<div class="col-md-12 submit"><button class="btn btn-default" type="{0}">{1}</button></div>'.fmt(type, text) : '';
    }

    this.getOrderFields = function (_fields) {
        var orderBidirecional = function (a, b) {
            if (a.Linha > b.Linha) return 1;
            if (a.Linha < b.Linha) return -1;
            if (a.Coluna > b.Coluna) return 1;
            if (a.Coluna < b.Coluna) return -1;
        }

        var orderRercusive = function (_orderFields) {
            _orderFields.sort(orderBidirecional);
            //for (var i in _orderFields)
            //    if (_orderFields[i].filhos)
            //        _orderFields[i].filhos = orderRercusive(_orderFields[i].filhos);
            return _orderFields;
        }

        var createFieldsHierarchical = function (_fields) {
            var aux = [];
            for (var i in _fields) {
                if (!_fields[i].grupo) {
                    aux.push(_fields[i]);
                } else
                    for (var j in aux) {
                        if (aux[j].nome === _fields[i].grupo) {
                            aux[j].filhos ? null : aux[j].filhos = [];
                            aux[j].filhos.push(_fields[i]);
                        }
                    }
            }
            return aux;
        }

        var orderFields = createFieldsHierarchical(_fields);

        orderFields = orderRercusive(orderFields);

        return orderFields;
    }

    this.getFields = function (_fields) {
        var html = '';
        for (var i in _fields) {
            html += self.getField(_fields[i]);
            //if (_fields[i].filhos)
            //    for (var j in _fields[i].filhos)
            //        html += self.getField(_fields[i].filhos[j]);
        }
        return html;
    }

    this.getField = function (_field) {

        var field;

        var getIdAleatorio = function () {
            return new String(Math.random()).split('.')[1];
        }

        /* Inicio Campos */
        var IdCampoDeEtapa = _field.idCampoDeEtapa;
        var Titulo = _field.titulo;
        var OrdemDeProcessamento = _field.ordemDeProcessamento;
        var TipoDeCampo = _field.tipoDeCampo ? _field.tipoDeCampo : null;
        var Visivel = _field.visivel ? ' display: inline-block ' : ' display:none ';
        var Editavel = _field.editavel;
        var Requerido = _field.requerido ? 'required' : '';
        var Coluna = _field.coluna;
        var Linha = _field.linha;
        var Largura = _field.largura;
        var Grupo = _field.grupo;
        var Nome = _field.nome ? _field.nome : getIdAleatorio();
        var Texto = _field.texto;
        var Mascara = _field.mascara;
        var TamanhoMaximo = _field.tamanhoMaximo ? _field.tamanhoMaximo : '';
        var Conteudo = _field.conteudo;
        var CustomHtml = _field.customHtml; // Filtrar para que somente html seja colocado
        var CssClass = _field.cssClass;
        var CustomScript = _field.customScript; //Verificar questões de segurança
        var CustomStyle = _field.customStyle;
        var PosicaoDoLabel = _field.posicaoDoLabel;
        var LabelCssClass = _field.labelCssClass;
        var LabelCustomStyle = _field.labelCustomStyle;
        var ControlCssClass = _field.controlCssClass;
        var ControlCustomStyle = _field.controlCustomStyle;
        var OpcoesDeLista = _field.opcoesDeLista;
        var AcoesDeCampo = _field.acoesDeCampo.length > 0 ? _field.acoesDeCampo : null;
        var ValidacoesDeCampo = _field.validacoesDeCampo.length > 0 ? _field.validacoesDeCampo : null;
        /* Fim Campos */

        var legend = function () {

            var legendPosicao;

            switch (PosicaoDoLabel) {
                case posicaoDoLabelEnum.aEsquerda:
                    legendPosicao = 'left';
                    break;

                case posicaoDoLabelEnum.aDireita:
                    legendPosicao = 'right';
                    break;

                case posicaoDoLabelEnum.acima:
                    legendPosicao = 'top';
                    break;

                case posicaoDoLabelEnum.abaixo:
                    legendPosicao = 'bottom';
                    break;
            }

            var html = '<legend align="{0}">{1}</legend>'
                .fmt(legendPosicao, Titulo);

            return html;
        }

        var label = function (){

            if (tipoDeCampoEnum.textoFixo === TipoDeCampo ||
                tipoDeCampoEnum.imagem === TipoDeCampo ||
                (tipoDeCampoEnum.grupo === TipoDeCampo && Titulo !== "")) // Para fieldSet. Não tem label.
                return "";

            var cssPosicaoLabel = "";

            if (PosicaoDoLabel === posicaoDoLabelEnum.aEsquerda || PosicaoDoLabel === posicaoDoLabelEnum.aDireita)
                cssPosicaoLabel = ' display: inline-block; position: relative; top: -2px; ';
            else if (PosicaoDoLabel === posicaoDoLabelEnum.acima || PosicaoDoLabel === posicaoDoLabelEnum.abaixo)
                cssPosicaoLabel = ' display: block; ';

            var asterisco = Requerido ? '*' : '';

            var html = '<label id="label_{3}" class="{0}" style="{1}; {5}">{2} {4}</label>'
                            .fmt(LabelCssClass, LabelCustomStyle, Titulo, Nome, asterisco, cssPosicaoLabel);

            return html;
        }

        // Não pode ser usado somente com a mascara. Deve haver um regex respectivo
        //var pattern = function () { 
        //    return Mascara !== "" && Mascara !== null ? 'pattern="{0}"'.fmt(Mascara) : "";
        //}

        var optionsCdC = function() {

            var html = '';

            //html += '<option></option>';

            for (var i in OpcoesDeLista) {
                var option = OpcoesDeLista[i];

                var selected = Conteudo === OpcoesDeLista[i] ? 'selected' : '';

                html += '<option value="{1}" {2}>{0}</option>'.fmt(i, option, selected);
            }

            return html;
        }

        var fieldFieldset = function () {

            var html = '';

            var filhos = _field.filhos ? self.getFields(_field.filhos) : '';

            var initHtml = '<div id="etapa_{0}" class="col-xs-{1} col-sm-{1} col-md-{1} {2}" style="{3}; {6}">' +
                                '<fieldset>' +
                                    legend() +
                                    filhos +
                                '</fieldset>' +
                            '</div>';

            html = initHtml.fmt(Nome, Largura, CssClass, CustomStyle, CustomScript, Mascara, Visivel);

            return html;
        }

        var fieldDiv = function (_control) {

            var html = '';

            var labelAcima = PosicaoDoLabel === posicaoDoLabelEnum.acima || PosicaoDoLabel === posicaoDoLabelEnum.aEsquerda ? label() : '';
            var labelAbaixo = PosicaoDoLabel === posicaoDoLabelEnum.abaixo || PosicaoDoLabel === posicaoDoLabelEnum.aDireita ? label() : '';

            var filhos = _field.filhos ? self.getFields(_field.filhos) : '';
            var mascara = Mascara ? '$("#control_{0}").mask("{5}");' : '';

            var initHtml = '<div id="etapa_{0}" class="col-xs-{1} col-sm-{1} col-md-{1} {2}" style="{3}; {6}">' +
                                labelAcima +
                                _control +
                                labelAbaixo +
                                '<script>' +
                                    //'var label_{0} = document.querySelector("#label_{0}"); ' +
                                    //'var control_{0} = document.querySelector("#control_{0}"); ' +
                                    mascara +
                                    //'new function() {4}; ' +
                                '</script>' +
                                filhos +
                           '</div>';

            html += initHtml.fmt(Nome, Largura, CssClass, CustomStyle, CustomScript, Mascara, Visivel);

            return html;
        }

        var listaDeTopicosLi = function() {
            var html = '';

            for (var i in OpcoesDeLista) {
                var li = OpcoesDeLista[i];
                html += '<li>{1}</li>'.fmt(li);
            }

            return html;
        }

        var onChange = function () { //Usado somente para ações
            actionHelper.setStaticVar(Nome, AcoesDeCampo, ValidacoesDeCampo, TipoDeCampo);
            var onReturn = "onchange='actionHelper.execAction(this)'";
            return AcoesDeCampo ? onReturn : '';
        }

        var onBlur = function () { //Usado somente para validações
            validationHelper.setStaticVar(Nome, ValidacoesDeCampo);
            return ValidacoesDeCampo ? "onblur='validationHelper.execValidation(this)'" : "";
        }

        var onKeyUp = function () { //Usado somente para validações
            validationHelper.setStaticVar(Nome, ValidacoesDeCampo);
            return ValidacoesDeCampo ? "onkeyup='validationHelper.execValidation(this)'" : "";
        }

        switch (TipoDeCampo) {
            case tipoDeCampoEnum.textoFixo:
                var conteudo = CustomHtml ? CustomHtml : Conteudo;
                field = '<span id="control_{4}" style="{0}; {1}" class="{2}" data-type="{5}">{3}</span>';
                field = fieldDiv(field.fmt(Visivel, ControlCustomStyle, ControlCssClass, conteudo, Nome, TipoDeCampo));
                break;

            case tipoDeCampoEnum.campoEditavel:
                var disabled = Editavel ? '' : 'readonly';
                field = '<input id="control_{4}" name="{4}" type="text" value="{0}" class="form-control {7}" style="{8}; {2}" placeholder="{5}" title="{9}" maxlength="{6}" data-type="{12}" {1} {3} {10} {11} />';
                field = fieldDiv(field.fmt(Conteudo, disabled, Visivel, Requerido, Nome, Mascara, TamanhoMaximo, ControlCssClass, ControlCustomStyle, Titulo, onBlur(), onKeyUp(), TipoDeCampo));
                break;

            case tipoDeCampoEnum.caixaDeCombinacao:
                var disabled = Editavel ? '' : 'disabled';
                field = '<select id="control_{4}" name="{4}" class="form-control {5}" style="{6}; {2}" title="{7}" data-type="{10}" {1} {3} {8} {9}>' +
                            optionsCdC() +
                        '</select>';
                field = fieldDiv(field.fmt(Conteudo, disabled, Visivel, Requerido, Nome, ControlCssClass, ControlCustomStyle, Titulo, onChange(), onBlur(), TipoDeCampo));
                break;

            case tipoDeCampoEnum.caxiaDeSelecao:
                var disabled = Editavel ? '' : 'readonly';
                field = '<input id="control_{4}" name="{4}" type="checkbox" class="{5}" style="{6}; {2}" title="{7}" data-type="{10}" {1} {3} {8} {9} />';
                field = fieldDiv(field.fmt(Conteudo, disabled, Visivel, Requerido, Nome, ControlCssClass, ControlCustomStyle, Titulo, onChange(), onBlur(), TipoDeCampo));
                break;

            case tipoDeCampoEnum.campoEditavelDeMultiplasLinhas:
                field = '<textarea id="control_{4}" name="{4}" class="form-control {6}" style="{7}; {2}" title="{8}" maxlength="{5}" data-type="{10}" {1} {3} {9} {10} >{0}</textarea>';
                field = fieldDiv(field.fmt(Conteudo, disabled, Visivel, Requerido, Nome, TamanhoMaximo, ControlCssClass, ControlCustomStyle, Titulo, onBlur(), onKeyUp(), TipoDeCampo));
                break;

            case tipoDeCampoEnum.listaDeTopicos:
                field = '<ul id="control_{2}" class="{3}" style="{4}; {1}" title="{0}" data-type="{5}" >' +
                            listaDeTopicosLi() +
                        '</ul>';
                field = fieldDiv(field.fmt(Conteudo, Visivel, Nome, ControlCssClass, ControlCustomStyle, TipoDeCampo));
                break;

            case tipoDeCampoEnum.controleCustomizado:
                field = fieldDiv('{0}'.fmt(CustomHtml));
                break;

            case tipoDeCampoEnum.imagem:
                field = '<img id="control_{2}" src="{0}" class="{3}" style="{4}; {1}" title="{5}" data-type="{6}" />';
                field = fieldDiv(field.fmt(Conteudo, Visivel, Nome, ControlCssClass, ControlCustomStyle, Titulo, TipoDeCampo));
                break;

            case tipoDeCampoEnum.hiperlink:
                field = '<a id="control_{2}" href="{0}" class="{3}" style="{4}; {1}" title="{5}" data-type="{5}" >{5}</a>';
                field = fieldDiv(field.fmt(Conteudo, Visivel, Nome, ControlCssClass, ControlCustomStyle, Texto, TipoDeCampo));
                break;

            case tipoDeCampoEnum.grupo:
                field = Titulo ? fieldFieldset() : fieldDiv("");
                break;

            case tipoDeCampoEnum.data:
                field = '<input id="control_{4}" name="{4}" type="text" value="{0}" class="form-control {7}" style="{8}; {2}" placeholder="{5}" title="{9} Ex: {5}" maxlength="{6}" data-type="{12}" {1} {3} {10} {11} />' +
                        '<script>' +
                            '$("#control_{4}").datepicker({format: \'dd/mm/yyyy\'})' +
                                '.on(\'changeDate\', function(){' +
                                    'validationHelper.execValidation(control_{4}, {13});' +
                                '});'+
                        '</script>';
                field = fieldDiv(field.fmt(Conteudo, disabled, Visivel, Requerido, Nome, Mascara, TamanhoMaximo, ControlCssClass, ControlCustomStyle, Titulo, onBlur(), onKeyUp(), TipoDeCampo, JSON.stringify(ValidacoesDeCampo)));
                break;

            case tipoDeCampoEnum.numero:
                field = '<input id="control_{4}" name="{4}" type="text" value="{0}" class="form-control {7}" style="{8}; {2}" placeholder="{5}" title="{9} Ex: {5}" maxlength="{6}" data-type="{12}" {1} {3} {10} {11} />';
                field = fieldDiv(field.fmt(Conteudo, disabled, Visivel, Requerido, Nome, Mascara, TamanhoMaximo, ControlCssClass, ControlCustomStyle, Titulo, onBlur(), onKeyUp(), TipoDeCampo));
                break;

            case tipoDeCampoEnum.oculto:
                field = '<input id="control_{1}" name="{1}" type="hidden" value="{0}" data-type="{2}"  />';
                field = fieldDiv(field.fmt(Conteudo, Nome, TipoDeCampo));
                break;

            default:
                field = '';
                break;
        }

        return field;

    }

    this.submit = function submit() {

        var sReturn = false;
        var auxValid = 0;
        var fe = document.querySelectorAll('form input, form textarea, form select');
        var sr = {};
        for (var i in fe) {
            if (fe[i].attributes && fe[i].attributes['name'] && !fe[i].attributes['disabled']) {
                var index = fe[i].attributes['name'].value;
                var valor = fe[i].type === "checkbox" ? fe[i].checked : fe[i].value;

                sr[index] = valor;

                var gs = formHelper.getStaticVarControl;
                var control = eval("control_" + index);

                if (gs(index, 'validation')) {
                    !validationHelper.execValidation(control) ? auxValid++ : null;
                };
            }
        }

        var aatm = aa.temp.mensagens;
        var toastrMsg = "";
        if (aatm.length > 0) {
            for (var i in aatm) {
                toastrMsg += "<div><b>Campo {0}</b><span>: {1}</span></div>".fmt(aatm[i].nome, aatm[i].mensagem);
            }
            $('.cmFormulario *').tooltip('destroy')
            MensagemHelper.erro(Config.popupValidationErrorPreText, toastrMsg);
        }
        aatm = aa.temp.mensagens = null;

        if (auxValid === 0) {
            self.setFormData(sr);
            angular.element('[data-ng-controller=indexController]').scope().submitForm();
        }
    }

    this.setFormData = function (_inputs) {

        var setCampoProcessado = function (_nome, _valor) {
            var cp = window.aa.formData.camposProcessados;
            for (var i in cp) {
                if (cp[i].nome === _nome) {
                    cp[i].conteudo = _valor;
                    return true;
                }
            }
            return false;
        }

        for (var i in _inputs)
            setCampoProcessado(i, _inputs[i]);

    }

    this.setStaticVarControl = function (_nome, _key, _value) {
        !window.aa.static ? window.aa.static = {} : null;
        !window.aa.static[_nome] ? window.aa.static[_nome] = {} : null;
        var staticNome = window.aa.static[_nome];
        staticNome[_key] = _value;
    }

    this.getStaticVarControl = function (_nome, _key) {
        var staticNome = window.aa.static[_nome];
        return staticNome[_key] ? staticNome[_key] : false;
    }

};