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


console.log(sanitizeMobileNo("+254713000249"));
console.log(sanitizeMobileNo("254713000249"));
console.log(sanitizeMobileNo("0713000249"));
console.log(sanitizeMobileNo("+0713000249"));
console.log(sanitizeMobileNo("713000249"));
