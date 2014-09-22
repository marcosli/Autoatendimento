"use strict";

var appHelper = new function () {

    var domAP = {};

    this.getDomAP = function () {
        return domAP;
    }

    this.getDomAPByTerm = function (word) {

        var rObj = {};

        for (var i in domAP)
            if (i.search(word) >= 0)
                rObj[i] = domAP[i];

        return rObj;
    }

    this.setDomAP = function (key, value) {
        domAP[key] = value;
    }

}