function numberWithCommas(x) {
    if (x !== undefined) {
        // let parts = (x.toFixed(2)).toString().split('.');
        let parts = x.toString().split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return parts.join('.')
    }
}

/**
 * @return {string}
 */
function NumberToKES (x) {
	if (x !== undefined) {
		let parts = (x.toFixed(2)).toString().split('.');
		//let parts = x.toString().split('.');
		parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		return `KES ${parts.join('.')}`
	}
}

function zeroNoIsNull (num) {
	if(num === null) return 0
}

function sanitizeMobileNo(mobileNumber){
	try {
		if(mobileNumber.startsWith("+")){
			// Java Equivalent => mobileNumber = mobileNumber.replaceFirst("^\\+", "");
			mobileNumber = `${mobileNumber.substring(1)}`;
		}

		if(mobileNumber.match("^2547\\d{8}$")) return mobileNumber;

		if(mobileNumber.match("^07\\d{8}$"))
		// Java Equivalent => return mobileNumber.replaceFirst("^0", "254");
			return `254${mobileNumber.substring(1)}`

		if(mobileNumber.match("^7\\d{8}$")) return "254"+mobileNumber;

		return "INVALID PHONE NUMBER!";
	}catch (e){
		return e.toString();
	}
}



export default {
    numberWithCommas,
		NumberToKES,
		zeroNoIsNull,
		sanitizeMobileNo
}
