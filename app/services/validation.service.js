const {VALIDATION_ERRORS} = require('../../config/constants');

const validatePhotoUri = (url) => {
	let temple = /^[a-z]{4,5}:\/\/[a-zA-Z1-9-_.]{5,700}/;
	const result = temple.test(url);
	//check if foto exist on server
	return result
};


/**
 * User field validation:
 * covered by tests
 */
exports.validateEmail = (email) => {
	if (typeof(email) === "undefined") return {
    	error: 1,
		name: "AppError",
		code: VALIDATION_ERRORS.INVALID_EMAIL,
		errmsg: 'Email is required'
    };

    let temple = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const result = temple.test(email);

    if (result) return {
    	error: 0
    };

    return {
    	error: 1,
		name: "AppError",
    	code: VALIDATION_ERRORS.INVALID_EMAIL,
		errmsg: 'Invalid email address'
    };
};

exports.validatePassword = (password) => {
	if (typeof(password) === "undefined") return {
    	error: 1,
		name: "AppError",
    	code: VALIDATION_ERRORS.INVALID_PASSWORD,
		errmsg: 'Password is required'
    };
		
    if(password.length < 8){
			return {
				error: 1,
			name: "AppError",
				code: VALIDATION_ERRORS.INVALID_PASSWORD,
			errmsg: 'Invalid password'
			};
		}
		
    return {
    	error: 0
    };
};

exports.validatePhoneNumber = (phoneNumber) => {
	if (typeof(phoneNumber) === "undefined") return {
    	error: 1,
		name: "AppError",
    	code: VALIDATION_ERRORS.INVALID_PHONE_NUMBER,
		errmsg: 'Phone number is required'
    };

    let temple = /^(\d{10,})$/g;
    const result = temple.test(phoneNumber);

    if (result) return {
    	error: 0
    };

    return {
    	error: 1,
		name: "AppError",
    	code: VALIDATION_ERRORS.INVALID_PHONE_NUMBER,
		errmsg: 'Invalid phone number'
    };
};

exports.validateRoleType = (roleType) => {
	if (typeof(roleType) === "undefined") return {
    	error: 1,
		name: "AppError",
    	code: VALIDATION_ERRORS.INVALID_ROLE_TYPE,
		errmsg: 'Type of role is required'
    };

	let temple = /([a-z]{6,10})/;
    const result = temple.test(roleType);

    if (result) return {
    	error: 0
    };

    return {
    	error: 1,
		name: "AppError",
    	code: VALIDATION_ERRORS.INVALID_ROLE_TYPE,
		errmsg: 'Invalid type of role'
    };
};
/**
 * User fields validation end
 */

/**
 * Student fields validation:
 */
exports.validateFirstName = (name) => {
	if (typeof(name) === "undefined") return {
    	error: 1,
		name: "AppError",
    	code: VALIDATION_ERRORS.INVALID_FIRST_NAME,
		errmsg: 'First name is required'
    };

     return {
    	error: 0
    };

};

exports.validateLastName = (name) => {
	if (typeof(name) === "undefined") return {
    	error: 1,
		name: "AppError",
    	code: VALIDATION_ERRORS.INVALID_LAST_NAME,
		errmsg: 'Last name is required'
    };

    let temple = /([A-Za-z]{2,50})/;
    const result = temple.test(name);

    if(result) return {
    	error: 0
    };

    return {
    	error: 1,
		name: "AppError",
    	code: VALIDATION_ERRORS.INVALID_LAST_NAME,
		errmsg: 'Invalid last name'
    };
};

exports.validateAge = (age) => {
	if (typeof(age) === "undefined") return {
    	error: 1,
		name: "AppError",
    	code: VALIDATION_ERRORS.INVALID_AGE,
		errmsg: 'Age is required'
    };

    let temple = /([0-9])/;
    const result = temple.test(age);

    if (result && +age >= 16 &&  +age <= 150) return {
    	error: 0
    };

    return {
    	error: 1,
		name: "AppError",
    	code: VALIDATION_ERRORS.INVALID_AGE,
		errmsg: 'Invalid age'
    };
};

exports.validatePersonalPhotoUrl = (url) => {
	if (typeof(url) === "undefined" || !url) return {
			error: 1,
			name: "AppError",
    	code: VALIDATION_ERRORS.INVALID_PERSONAL_IMAGE_URL,
		errmsg: 'Invalid personal image url'
    };

    if (validatePhotoUri(url)) return {
    	error: 0
    };

    return {
    	error: 1,
		name: "AppError",
    	code: VALIDATION_ERRORS.INVALID_PERSONAL_IMAGE_URL,
		errmsg: 'Invalid personal image url'
    };
};

exports.validateDriverLicensePhoto = (url) => {
	if (typeof(url) === "undefined" || !url) return {
			error: 1,
			name: "AppError",
    	code: VALIDATION_ERRORS.INVALID_DRIVER_LICENSE_PHOTO,
		errmsg: 'Invalid student license photo'
    };
    
    if (validatePhotoUri(url)) return {
    	error: 0
    };

    return {
    	error: 1,
		name: "AppError",
    	code: VALIDATION_ERRORS.INVALID_DRIVER_LICENSE_PHOTO,
		errmsg: 'Invalid student license photo'
    };
};

exports.validateCoverPhotoUrl = (url) => {
	
	
	if (validatePhotoUri(url)) return {
		error: 0
	};

	if (typeof(url) === "undefined" || !url) return {
		error: 1,
		name: "AppError",
		code: VALIDATION_ERRORS.INVALID_SCHOOL_COVER_PHOTO,
	errmsg: 'Invalid cover photo'
	};
	return {
		error: 1,
	name: "AppError",
		code: VALIDATION_ERRORS.INVALID_SCHOOL_COVER_PHOTO,
	errmsg: 'Invalid cover photo'
	};
}

exports.validateStudentDriverLicense = (status) => {
	
		// if (validatePhotoUri(status)) return {
		// 	error: 0
		// }
    if (status === "true" || status === "false") return {
    	error: 0
    };
		if (typeof(status) === "undefined") return {
    	error: 1,
		name: "AppError",
    	code: VALIDATION_ERRORS.INVALID_STUDENT_DRIVER_LICENSE_STATUS,
		errmsg: 'Driver license is required'
    };
	return {
    	error: 1,
		name: "AppError",
    	code: VALIDATION_ERRORS.INVALID_STUDENT_DRIVER_LICENSE_STATUS,
		errmsg: 'Invalid driver license status'
    };
};
/**
 * Student fields validation end
 */

/**
 * School fields validation:
 */

exports.validateName = (name) => {
	if (typeof(name) === "undefined") return {
    	error: 1,
		name: "AppError",
    	code: VALIDATION_ERRORS.INVALID_NAME,
		errmsg: 'Name is required'
    };

   

    return {
    	error: 0
    };

    // return {
    // 	error: 1,
		// name: "AppError",
    // 	code: VALIDATION_ERRORS.INVALID_NAME,
		// errmsg: 'Invalid name'
    // };
};

exports.validateAdress = (adress) =>{
	if (adress === "") return {
		error: 1,
	name: "AppError",
		code: VALIDATION_ERRORS.INVALID_ADRESS,
	errmsg: 'Adress is required'
	};

	return {
		error: 0
	};

};

exports.validateZipCode = (code) => {
	if (typeof(code) === "undefined") return {
    	error: 1,
		name: "AppError",
    	code: VALIDATION_ERRORS.INVALID_ZIP_CODE,
		errmsg: 'Zip code is required'
    };

    let temple = /([0-9])/;
    const result = temple.test(code);

     if (result) return {
    	error: 0
    };

    return {
    	error: 1,
		name: "AppError",
    	code: VALIDATION_ERRORS.INVALID_ZIP_CODE,
		errmsg: 'Zip code is invalid '
    };
};

exports.validateVatNumber = (num) => {
	if (typeof(num) === "undefined") return {
    	error: 1,
		name: "AppError",
    	code: VALIDATION_ERRORS.INVALID_VAT_NUMBER,
		errmsg: 'Vat number is required'
    };

    let temple = /([0-9])/;
    const result = temple.test(num);

     if (result) return {
    	error: 0
    };

    return {
    	error: 1,
		name: "AppError",
    	code: VALIDATION_ERRORS.INVALID_VAT_NUMBER,
		errmsg: 'Vat number is invalid '
    };
};

exports.validateLastDayInspection = (num) => {
	if (typeof(num) === "undefined") return {
    	error: 1,
		name: "AppError",
    	code: VALIDATION_ERRORS.INVALID_LAST_DAY_INSPECTION,
		errmsg: 'Day of inspection is required'
    };

    let temple = /([0-9])/;
    const result = temple.test(num);

     if (result) return {
    	error: 0
    };

    return {
    	error: 1,
		name: "AppError",
    	code: VALIDATION_ERRORS.INVALID_LAST_DAY_INSPECTION,
		errmsg: 'Day of inspection is invalid '
    };
};

exports.validatePricePerTraining = (price) => {
	if (typeof(price) === "undefined") return {
    	error: 1,
		name: "AppError",
    	code: VALIDATION_ERRORS.INVALID_PRICE_PER_TRAINING,
		errmsg: 'Price per training is required'
    };

    let temple = /([0-9])/;
    const result = temple.test(price);

     if (result) return {
    	error: 0
    };

    return {
    	error: 1,
		name: "AppError",
    	code: VALIDATION_ERRORS.INVALID_PRICE_PER_TRAINING,
		errmsg: 'Price per training is is invalid '
    };
};

exports.validatePricePerTrainingCurrency = (curren) =>{
	if (curren === "") return {
		error: 1,
	name: "AppError",
		code: VALIDATION_ERRORS.INVALID_PRICE_PER_TRAINING_CURRENCY,
	errmsg: 'Price per training currency is required'
	};

	return {
		error: 0
	};

};

exports.validateSchoolLicencePhoto = (url) => {    
    if (validatePhotoUri(url)) return {
    	error: 0
    };

    return {
    	error: 1,
		name: "AppError",
    	code: VALIDATION_ERRORS.INVALID_SCHOOL_LICENSE_PHOTO,
		errmsg: 'Invalid school license photo'
    };
};
/**
 * School fields validation end
 */
/**
 * Instructor fields validation 
 */
exports.validateDriverLicenceNumber = (num) => {
	if (typeof(num) === "undefined") return {
    	error: 1,
		name: "AppError",
    	code: VALIDATION_ERRORS.INVALID_DRIVER_LICENCE_NUMBER,
		errmsg: 'Driver license number is required'
    };

    let temple = /[1-90_-a-zA-z]{4,100}/;
    const result = temple.test(num);

     if (result) return {
    	error: 0
    };

    return {
    	error: 1,
		name: "AppError",
    	code: VALIDATION_ERRORS.INVALID_DRIVER_LICENCE_NUMBER,
		errmsg: 'Driver license number is is invalid '
    };
};

exports.validateExperienceYear = (year) => {
	if (typeof(year) === "undefined") return {
    	error: 1,
		name: "AppError",
    	code: VALIDATION_ERRORS.INVALID_DRIVER_EXPERIENCE_YEAR,
		errmsg: 'Driver Experience Year is required'
    };
		if (+year <= 0 || !year) return {
			error: 1,
			name: "AppError",
				code: VALIDATION_ERRORS.INVALID_DRIVER_EXPERIENCE_YEAR,
			errmsg: 'Driver Experience Year is required'
		}

    return {
    	error: 0,
    };
};

exports.validateCarBrand = (brand) => {
	if (typeof(brand) === "undefined") return {
    	error: 1,
		name: "AppError",
    	code: VALIDATION_ERRORS.INVALID_CAR_BRAND,
		errmsg: 'Car brand is required'
    };

    let temple = /([A-Za-z0-9_]{3,50})/;
    const result = temple.test(brand);

     if (result) return {
    	error: 0
    };

    return {
    	error: 1,
		name: "AppError",
    	code: VALIDATION_ERRORS.INVALID_CAR_BRAND,
		errmsg: 'Car brand is invalid '
    };
};

exports.validateТransmission = (string) => {
	if(string === 'manual'){
		return {
    	error: 0
    };
	}
	if(string === 'auto'){
		return {
    	error: 0
    };
	}
	if(string === null){
		return {
    	error: 0
    };
	}

    return {
    	error: 1,
		name: "AppError",
    	code: VALIDATION_ERRORS.INVALID_CAR_TRANSMISSION,
		errmsg: 'Тransmission is invalid '
    };
};

exports.validateCarRegistrationNumber = (num) => {
	if (typeof(num) === "undefined") return {
    	error: 1,
		name: "AppError",
    	code: VALIDATION_ERRORS.INVALID_CAR_REGISTRATION_NUMBER,
		errmsg: 'Car registration number is required'
    };

     if (num) return {
    	error: 0
    };
};

exports.validatePricePerKM = (price) => {
	if (typeof(price) === "undefined") return {
    	error: 1,
		name: "AppError",
    	code: VALIDATION_ERRORS.INVALID_CAR_PRICE_PER_KM,
		errmsg: 'Price per km is required'
    };

    let temple = /([0-9])/;
    const result = temple.test(price);

     if (result) return {
    	error: 0
    };

    return {
    	error: 1,
		name: "AppError",
    	code: VALIDATION_ERRORS.INVALID_PRICE_PER_TRAINING,
		errmsg: 'Price per km is invalid '
    };
};

exports.validatePricePerKmCurrency = (curren) =>{
	if (typeof(curren) === "undefined") return {
		error: 1,
	name: "AppError",
		code: VALIDATION_ERRORS.INVALID_PRICE_PER_KM_CURRENCY,
	errmsg: 'Price per km currency is required'
	};

	return {
		error: 0
	};

};

exports.validatePricePerHour = (price) => {
	if (typeof(price) === "undefined") return {
    	error: 1,
		name: "AppError",
    	code: VALIDATION_ERRORS.INVALID_CAR_PRICE_PER_HOUR,
		errmsg: 'Price per hour is required'
    };

    let temple = /([0-9])/;
    const result = temple.test(price);

     if (result) return {
    	error: 0
    };

    return {
    	error: 1,
		name: "AppError",
    	code: VALIDATION_ERRORS.INVALID_CAR_PRICE_PER_HOUR,
		errmsg: 'Price per hour is invalid '
    };
};

exports.validatePricePerHourCurrency = (curren) =>{
	if (typeof(curren) === "undefined") return {
		error: 1,
	name: "AppError",
		code: VALIDATION_ERRORS.INVALID_PRICE_PER_HOUR_CURRENCY,
	errmsg: 'Price per hour currency is required'
	};

	return {
		error: 0
	};

};

exports.validatePlateNumber = (num) => {
	if (typeof(num) === "undefined") return {
    	error: 1,
		name: "AppError",
    	code: VALIDATION_ERRORS.INVALID_PLATE_NUMBER,
		errmsg: 'Plate number is required'
    };

    let temple = /([0-9])/;
    const result = temple.test(num);

     if (result) return {
    	error: 0
    };

    return {
    	error: 1,
		name: "AppError",
    	code: VALIDATION_ERRORS.INVALID_PLATE_NUMBER,
		errmsg: 'Plate number is invalid '
    };
};

exports.validateDriverLicencePhoto = (url) => {    
	if (validatePhotoUri(url)) return {
		error: 0
	};

	return {
		error: 1,
	name: "AppError",
		code: VALIDATION_ERRORS.INVALID_DRIVER_LICENSE_PHOTO,
	errmsg: 'Invalid  license photo url'
	};
};
























