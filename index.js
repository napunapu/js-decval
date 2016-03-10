/**
*
* For usage example see test/decval.js
*
*/

var validate = function (value, integrals, fractionals) {
    integrals = typeof integrals !== 'undefined' ? integrals : 3;
    fractionals = typeof fractionals !== 'undefined' ? fractionals : 2;
    if (integrals < 1 || fractionals < 1) {
        throw new Error('Integrals and fractionals must be at least 1');
    }
    var ok = true;
    if (typeof value !== 'string') {
        ok = false;
    } else {
        var intPart = value.split('.')[0];
        var fracPart = value.split('.')[1];
        if (!intPart || !fracPart) {
            ok = false;
        } else {
            if (intPart.length > integrals || intPart.length < 1 || fracPart.length !== fractionals) {
                ok = false;
            } else {
                // integral part
                var intPartNr = parseInt(intPart);
                if (intPartNr < 0 || '' + intPartNr !== intPart) {   // latter check for non numeric
                    ok = false;
                }
                // fractional part
                for (var i = 0; i < fracPart.length; i++) {
                    var fracPartNr = parseInt(fracPart.substring(i, i + 1));
                    if ('' + fracPartNr !== fracPart.substring(i, i + 1)) {
                        ok = false;
                        break;
                    }
                }
            }
        }
    }
    return ok;
};

if (typeof module !== 'undefined' && module.exports != null) {
    exports.validate = validate;
}