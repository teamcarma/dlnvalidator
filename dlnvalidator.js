var dlnValidator = (function () {
 	
	var config = {
		enableUsTerritories : false,
		enableUsPacificAssociatedStates : false
	};

 	/*
 	* Private vars & methods
 	*/
	var usLicensePatterns = {
		'AL': /^[0-9]{7}$/,
	    'AK': /^[0-9]{1,7}$/,
	    'AZ': /^[a-z][0-9]{1,8}$|^[a-z]{2}[0-9]{2,6}$|^[0-9]{9}$/i,
	    'AR': /^[0-9]{8,9}$/,
	    'CA': /^[a-z][0-9]{7}$/i,
	    'CO': /^[0-9]{9}$|^[a-z][0-9]{3,6}$|^[a-z]{2}[0-9]{2,5}$/i,
	    'CT': /^[0-9]{9}$/i,
	    'DE': /^[0-9]{1,7}$/i,
	    'DC': /^[0-9]{7}$|^[0-9]{9}$/i,
	    'FL': /^[a-z][0-9]{12}$/i,
	    'GA': /^[0-9]{7,9}$/i,
	    'HI': /^[0-9]{9}$|^H[0-9]{8}$/i,
	    'ID': /^[0-9]{9}$|^[a-z]{2}[0-9]{6}[a-z]$/i,
	    'IL': /^[a-z][0-9]{11}$/i,
	    'IN': /^[a-z][0-9]{9}$|^[0-9]{10}$|^[0-9]{9}$/i,
	    'IA': /^[0-9]{9}$|^[0-9]{3}[a-z]{2}[0-9]{4}$/i,
	    'KS': /^k[0-9]{8}$|^[0-9]{9}$/i,
	    'KY': /^[a-z][0-9]{8}$|^[0-9]{9}$/i,
	    'LA': /^[0-9]{1,9}$/,
	    'ME': /^[0-9]{7}$/i,
	    'MD': /^[a-z][0-9]{12}$/i,
	    'MA': /^s[0-9]{8}$|^[0-9]{9}$/i,
	    'MI': /^[a-z][0-9]{12}$/i,
	    'MN': /^[a-z][0-9]{12}$/i,
	    'MS': /^[0-9]{9}$/i,
	    'MO': /^[a-z][0-9]{5,9}$|^[0-9]{9}$/i,
	    'MT': /^[0-9]{13}$|^[a-z0-9]{9}$/i,
	    'NE': /^[a-z][0-9]{3,8}$/i,
	    'NV': /^[0-9]{10}$|^[0-9]{12}$|^x[0-9]{8}$/i,
	    'NH': /^[0-9]{2}[a-z]{3}[0-9]{5}$/i,
	    'NJ': /^[a-z][0-9]{14}$/i,
	    'NM': /^[0-9]{9}$/i,
	    'NY': /^[0-9]{9}$/i,
	    'NC': /^[0-9]{1,12}$/i,
	    'ND': /^[a-z]{3}[0-9]{6}$|^[0-9]{9}$/i,
	    'OH': /^[a-z]{2}[0-9]{6}$|^[0-9]{9}$/i,
	    'OK': /^[a-z][0-9]{9}$|^[0-9]{9}$/i,
	    'OR': /^[0-9]{1,9}$|^[a-z0-9]{7,9}$/i,
	    'PA': /^[0-9]{8}$/i,
	    'RI': /^[0-9]{7}$|^v[0-9]{6}$/i,
	    'SC': /^[0-9]{1,10}$/i,
	    'SD': /^[0-9]{6,9}$/i,
	    'TN': /^[0-9]{7,9}$/i,
	    'TX': /^[0-9]{8}$/i,
	    'UT': /^[0-9]{4,10}$/i,
	    'VT': /^[0-9]{8}$|^[0-9]{7}a$/i,
	    'VA': /^[a-z][0-9]{8}$|^[0-9]{9}$/i,
	    'WA': /^[a-z*]{7}[0-9]{3}[0-9a-z]{2}$/i,
	    'WV': /^[a-z0-9]{2}[0-9]{5}$/i,
	    'WI': /^[a-z][0-9]{13}$/i,
	    'WY': /^[0-9]{9}$/i	    
	};

	// additional us territories
	var usTerritoriesPatterns = {
		'AS': /^[a-zA-Z0-9]+/,
		'GU': /^[a-zA-Z0-9]+/,
		'MP': /^[a-zA-Z0-9]+/,
		'PR': /^[a-zA-Z0-9]+/,
		'VI': /^[a-zA-Z0-9]+/,
		'UM': /^[a-zA-Z0-9]+/
	};

	// freely associated pacific island states
	var usPacificAssociatedStates = {
		'MH': /^[a-zA-Z0-9]+/,
		'FM': /^[a-zA-Z0-9]+/,
		'PW': /^[a-zA-Z0-9]+/
	};

	function validateUslicense(licenseState, licenseNumber) {
	    var regEx = usLicensePatterns[licenseState];
	    if(!regEx && config.enableUsTerritories){
	    	regEx = usTerritoriesPatterns[licenseState];
	    }
	    if(!regEx && config.enableUsPacificAssociatedStates){
	    	regEx = usPacificAssociatedStates[licenseState];
	    }
	    if(regEx){
	    	return regEx.test(licenseNumber);
	    } else {
	    	// raise exception as state is invalid
	    	throw new Error("The provided state: " + licenseState + " is not a valid U.S. state");
	    }
	}

	/*
	* Public methods exported via revealing module pattern:
	*/

	/*
	* Initialises this module using the given configuration options.
	* Supported options are as follows:
	* enableUsTerritories : whether to allow U.S. territories such as GU be entered as the 
	* state, default is false
	* enableUsPacificAssociatedStates : whether to allow U.S freely associated states
	* such as MH (Marshal Islands) be entered as a US state, default is false
	*/
	function init(options){
		// copy properties of `options` to `config`. 
		// Will overwrite existing ones.
    	for(var prop in options) {
        	if(options.hasOwnProperty(prop)){
            	config[prop] = options[prop];
        	}
    	}
	}
	
	/*
	* Description: Checks that a driving license number matches accepted
	* formats.
	* Parameters:
	* 	licenseCountry: ISO 2 or ISO 3 digit country code e.g. US or USA
	* 	licenseRegion: Country specific region code. For example for
	* 		the U.S. this will be the state, so CA for California.
	* 	licenseNumber: The driving license number
	* throws: Error if the country is not supported or the region is invalid for the country
	*/
	function publicValidate(licenseCountry, licenseRegion, licenseNumber){
		licenseCountry = licenseCountry.toUpperCase();
		licenseRegion = licenseRegion.toUpperCase();
		licenseNumber = licenseNumber.toUpperCase();

		if(licenseCountry === 'US' || licenseCountry === 'USA'){
			return validateUslicense(licenseRegion, licenseNumber);
		}
		throw new Error("The country: " + licenseCountry + " is currently not supported.");
	}

	return {
		isValid: publicValidate
	};

})();
