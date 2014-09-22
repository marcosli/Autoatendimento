"use strict";

var actionHelper = new function ()
{
    var actions = function (_tipoDeAcao, _campo) {

        var etapa = document.querySelector('#etapa_' + _campo);
        var control = document.querySelector('#control_' + _campo);
        var label = document.querySelector('#label_' + _campo);

        switch (_tipoDeAcao) {
            case acoesDeCampoEnum.Mostrar:
                etapa ? etapa.style.display = 'inline-block' : null;
                control ? control.style.display = 'inline-block' : null;
                label ? label.style.display = 'inline-block' : null;
                break;

            case acoesDeCampoEnum.Esconder:
                etapa ? etapa.style.display = 'none' : null;
                control ? control.style.display = 'none' : null;
                label ? label.style.display = 'none' : null;
                break;

            case acoesDeCampoEnum.Habilitar:
                etapa ? etapa.disabled = false : null;
                control ? control.disabled = false : null;
                break;

            case acoesDeCampoEnum.Desabilitar:
                etapa ? etapa.disabled = true : null;
                control ? control.disabled = true : null;
                break;
        }
    }

    this.actionFilter = function (_tipoDeAcao, _campo) {
        return actions(_tipoDeAcao, _campo);
    }

    this.setStaticVar = function (Nome, _acoesDeCampo, _validacoesDeCampo, _tipoDeCampo) {
        var ss = formHelper.setStaticVarControl;
        ss(Nome, 'acoesDeCampo', _acoesDeCampo);
        ss(Nome, 'validacoesDeCampo', _validacoesDeCampo);
        ss(Nome, 'tipoDeCampo', _tipoDeCampo);
    }

    this.execAction = function (_control) {
        var gs = formHelper.getStaticVarControl;
        var nome = _control.attributes['name'].value;

        var acoesDeCampo = gs(nome, 'acoesDeCampo');
        var validacoesDeCampo = gs(nome, 'validacoesDeCampo');
        var tipoDeCampo = gs(nome, 'tipoDeCampo');

        if (acoesDeCampo.length > 0) {
            for (var i in acoesDeCampo) {
                if (acoesDeCampo[i].camposAcionados.length > 0 && validationHelper.validationFilter(acoesDeCampo[i], _control).ok)
                    for (var j in acoesDeCampo[i].camposAcionados)
                        actionHelper.actionFilter(acoesDeCampo[i].camposAcionados[j].tipoDeAcao, acoesDeCampo[i].camposAcionados[j].campo);
            }
        }

    }
}
