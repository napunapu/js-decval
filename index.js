/**
*
* For usage example see test/decval.js
*
*/

var validate = function (value, integrals, fractionals){
	integrals = typeof integrals !== 'undefined' ? integrals : 3;
	fractionals = typeof fractionals !== 'undefined' ? fractionals : 2;
	if(integrals < 1 || fractionals < 1){
		throw new Error('Integrals and fractionals must be at least 1');
	}
	var ok = true;
	if(typeof value !== 'string'){
		ok = false;
	} else {
		var onlyIntegrals = false;   // if no decimal separator is found, only check the number of integrals
		var intPart; 
		if(value.indexOf('.') === -1){
			onlyIntegrals = true;
			intPart = value;
		} else {
			var intPart = value.split('.')[0];
		}
		var fracPart = value.split('.')[1];
		if(!intPart || (!onlyIntegrals && !fracPart)){
			ok = false;
		} else {
			if(intPart.length > integrals || intPart.length < 1 || (!onlyIntegrals && (fracPart.length > fractionals))){
				ok = false;
			} else {
				// integral part
				var intPartNr = parseInt(intPart, 10);
				if(intPartNr < 0 || '' + intPartNr !== intPart){   // latter check for non numeric
					ok = false;
				}
				if(!onlyIntegrals) {
				  // fractional part
				  for(var i = 0; i < fracPart.length; i++){
					  // check for non numeric
					  var fracPartNr = parseInt(fracPart.substring(i, i + 1));
					  if('' + fracPartNr !== fracPart.substring(i, i + 1)){
						  ok = false;
						  break;
					  }
				  }
			  }
			}
		}
	}
	return ok;
};

if(typeof module !== 'undefined' && module.exports != null){
	exports.validate = validate;
}