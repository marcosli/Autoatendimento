//"use strict";

var validationHelper = new function () {

    var validations = function (typeValidation, arg1, arg2) {

        arg2 === "true" ? arg2 = true : null;
        var vReturn = null;

        switch (typeValidation) {

            case validacoesDeCampoEnum.isNull:
                vReturn = arg1 === null;
                break;

            case validacoesDeCampoEnum.isNotNull:
                vReturn = arg1 !== null;
                break;

            case validacoesDeCampoEnum.isZero:
                vReturn = parseInt(arg1) === 0;
                break;

            case validacoesDeCampoEnum.isNotZero:
                vReturn = parseInt(arg1) !== 0;
                break;

            case validacoesDeCampoEnum.isEmpty:
                vReturn = arg1 === '';
                break;

            case validacoesDeCampoEnum.isNotEmpty:
                vReturn = arg1 !== '';
                break;

            case validacoesDeCampoEnum.equal:
                var rEqual = new RegExp(arg2, 'ig');
                vReturn = rEqual.test(arg1);
                break;

            case validacoesDeCampoEnum.diferent:
                vReturn = arg1 !== arg2;
                break;

            case validacoesDeCampoEnum.contains:
                vReturn = typeof (arg1) === 'string' &&
                          typeof (arg2) === 'string' &&
                          arg2.search(arg1) >= 0; //Somente para strings
                break;

            case validacoesDeCampoEnum.notContains:
                vReturn = typeof (arg1) === 'string' &&
                          typeof (arg2) === 'string' &&
                          arg2.search(arg1) < 0; //Somente para strings
                break;

            case validacoesDeCampoEnum.greaterThan:
                vReturn = arg1 > arg2;
                break;

            case validacoesDeCampoEnum.lessThan:
                vReturn = arg1 < arg2;
                break;

            case validacoesDeCampoEnum.greaterOrEqual:
                vReturn = arg1 >= arg2;
                break;

            case validacoesDeCampoEnum.lessOrEqual:
                vReturn = arg1 <= arg2;
                break;

            default:
                vReturn = null;
                break;
        }

        return vReturn;
    }

    this.validationFilter = function (_validation, _control) {
 
        var vfReturn = {
            ok: null,
            validationError: null
        };

        var validationValor = _validation.valor;

        var isDateFormat = function (str) {
            if (/^\d{2}[./-]\d{2}[./-]\d{4}$/.test(str)) {
                var tmp = str.split('/');
                return parseInt(tmp[0]) <= 31 && parseInt(tmp[0]) > 0 && parseInt(tmp[1]) <= 12 && parseInt(tmp[1]) > 0 ? true : false;
            } else
                return false;
        }

        var dataType = parseInt(_control.attributes['data-type'].value);
        var controlField = dataType === tipoDeCampoEnum.caxiaDeSelecao ? _control.checked : _control.value;

        if (dataType === tipoDeCampoEnum.data)
        {
            if (!isDateFormat(controlField)) {
                vfReturn.ok = false;
                vfReturn.validationError = Config.msgValidationDate;
                return vfReturn;
            }

            var tmp = validationValor.split('/');
            validationValor = parseFloat(tmp[2] + tmp[1] + tmp[0]);

            var tmp = controlField.split('/');
            controlField = parseFloat(tmp[2] + tmp[1] + tmp[0]);
        }
        else if (dataType === tipoDeCampoEnum.numero)
        {
            if (controlField.replace(/\d+(\,\d{1,2})?/, '') !== "") {
                vfReturn.ok = false;
                vfReturn.validationError = Config.msgValidationNumber;
                return vfReturn;
            }

            validationValor = parseFloat(validationValor);
            controlField = parseFloat(controlField.replace(',', '.')); //Coloca no o numero no padrão inglês e transforma em float
        }

        validationValor === "true" ? validationValor = true : null;
        validationValor === "false" ? validationValor = false : null;

        vfReturn.ok = validations(_validation.comparatorType, controlField, validationValor);
        !vfReturn.ok ? vfReturn.validationError = _validation.mensagem : null;
        return vfReturn;
    }

    this.setStaticVar = function (_nome, _validation) {
        var ss = formHelper.setStaticVarControl;
        ss(_nome, 'validation', _validation);
    }

    this.execValidation = function (_control) {

        var evReturn = false;
        var fnCallName = validationHelper.execValidation.caller.name;
        var gs = formHelper.getStaticVarControl;
        var nome = _control.attributes['name'].value;
        var validation = gs(nome, 'validation');

        !window.aa.temp.mensagens ? window.aa.temp.mensagens = [] : null;

        if (validation.length > 0)
            for (var i in validation)
            {
                var validate = validationHelper.validationFilter(validation[i], _control);

                if (validate.ok)
                {
                    _control.style.border = "none";

                    if (fnCallName !== "submit") {
                        _control.attributes['backup-title'] ? _control.setAttribute('title', _control.attributes['backup-title'].value) : null;
                        $(_control).tooltip('destroy');
                    }

                    evReturn = true;
                }
                else
                {
                    _control.style.border = "1px solid #bd362f";

                    var aux = 0;

                    for (var i in aa.temp.mensagens)
                        aa.temp.mensagens[i].nome === nome ? aux++ : null;

                    aux === 0 ? aa.temp.mensagens.push({ nome: nome, mensagem: validate.validationError }) : null;

                    if (fnCallName !== "submit")
                    {
                        _control.attributes['title'].value !== "" ? _control.setAttribute('backup-title', _control.attributes['title'].value) : null;
                        $(_control)
                            .tooltip('destroy')
                            .tooltip({ placement: 'top' })
                            .attr('data-original-title', validate.validationError)
                            .tooltip('fixTitle')
                            .tooltip('show');
                        aa.temp.mensagens = [];
                    }
                }
            }

        return evReturn;
    }

}