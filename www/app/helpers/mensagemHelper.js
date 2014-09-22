"use strict"

var MensagemHelper = new function() {

    toastr.options = {
        closeButton: true,
        positionClass: 'toast-top-right',
        timeOut: 2500,
        onclick: null
    };

    var fnBase = function (titulo, mensagem, execToastr) {
        var mensagemFinal;
        if (typeof (mensagem) !== 'string') {
            if (mensagem.data !== undefined) {
                var exceptionType = mensagem.data.exceptionType ? mensagem.data.exceptionType : '';
                var exceptionMessage = mensagem.data.exceptionMessage ? mensagem.data.exceptionMessage : '';

                mensagemFinal = mensagem.statusText + ' ' +
                    mensagem.status + ": <br>" +
                    exceptionType + " <br>   " +
                    exceptionMessage;
            } else
                mensagemFinal = mensagem.error_description;
        } else
            mensagemFinal = mensagem;

        execToastr(mensagemFinal, titulo);
    }

    this.sucesso = function(titulo, mensagem)
    {
        fnBase(mensagem, titulo, toastr.success);
    };

    this.info = function (titulo, mensagem)
    {
        fnBase(mensagem, titulo, toastr.info);
    };

    this.atencao = function (titulo, mensagem)
    {
        fnBase(mensagem, titulo, toastr.warning);
    };

    this.erro = function (titulo, mensagem) {
        fnBase(titulo, mensagem, toastr.error);
    }

};