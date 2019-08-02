const validateEmail = function (email) {
    let temple = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const result = temple.test(email);
    if(!result) throw new Error('Invalid email');
    return result;
  }

  const validatePassword = function(password){ 
    let temple = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,64}$/ ;
    const result = temple.test(password);
    if(!result) throw new Error('Invalid password');
    return result;
}

const validatePhoneNumber = function (phone_number) {
    let temple = /^[+]?(1\-|1\s|1|\d{3}\-|\d{3}\s|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/g;
    const result = temple.test(phone_number);
    if(!result) throw new Error('Invalid phone number');
    return result;
  }
  const validateBrand = function (brand){
    let temple = /([A-Za-z0-9_]{3,50})/ 
    const result = temple.test(brand);
    if(!result) throw new Error('Invalid brand');
    return result;
  }

  const validateName = function (name){
    let temple = /([A-Za-z0-9_]{3,50})/ 
    const result = temple.test(name);
    if(!result) throw new Error('Invalid name');
    return result;
  }

  const validateLastName = function (name){
    let temple = /([A-Za-z0-9_]{3,50})/ 
    const result = temple.test(name);
    if(!result) throw new Error('Invalid last name');
    return result;
  }

  const validateStudentDriverLicense = function (name){
   if(name === '') throw new Error('Invalid driver license');
   return true;
  }


  const validateAge = function (age){
    if(age >= 0 &&  age <= 150) return true;
    throw new Error('invalid age')
  }

  const validatePhotoUri = function (photo){
    let temple = /^[a-z]{4,5}:\/\/[a-z A-Z1-9-_@#$%^&*,'.\/]{5,700}/ 
    const result = temple.test(photo);
    if(!result) throw new Error('Invalid photo uri');
    return result
  }

  const validateDriverExperienceYear = function (year){
    const Err = new Error('Invalid photo uri');
    if(+year <= 0 ) throw Err;
    if(year === '' ) throw Err;
    return true;
  }

  const validateDriverLicenseNumber = function (num){
    let temple = /[1-90_-a-zA-z]{4,100}/ 
    const result = temple.test(num);
    if(!result) throw new Error('Invalid license number');
    return result
  }

  const validatePlateNumber = function (num){
    const Err = new Error('Invalid plate number');
    if(+num === +0 ) throw Err;
    if(num === '' ) throw Err;
    let temple = /[1-90]/;
    const result = temple.test(num);
    if(!result) throw new Error('Invalid plate number');
    return result;
  }

  const validateТransmission = function (string){
    let temple = /[a-zA-Z]{1,100}/ 
    const result = temple.test(string);
    if(!result) throw new Error('Invalid Тransmission');
    return result
  }

  const validatePrice = function (num){
    const Err = new Error('Invalid price');
    if(+num === +0 ) return Err;
    if(num === '' ) return Err;
    let temple = /[1-90]/;
    const result = temple.test(num);
    if(!result) throw new Error('Invalid price');
    return result;
  }

  const validateCurrency = function (num){
    const Err = new Error('Invalid Currency');
    if(+num === +0 ) throw Err;
    if(num === '' ) throw Err;
    // valid in base 
    return true;
  }

  const validateZip = function (num){
    const Err = new Error('Invalid zip coder');
    if(+num === +0 ) throw Err;
    if(num === '' ) throw Err;
    let temple = /[1-90]/;
    const result = temple.test(num);
    if(!result) throw new Error('Invalid zip code');
    return result;
  }

  const validateVatNumber = function (num){
    const Err = new Error('Invalid vat number');
    if(+num === +0 ) throw Err;
    if(num === '' ) throw Err;
    let temple = /[1-90]/;
    const result = temple.test(num);
    if(!result) throw new Error('Invalid vat number');
    return result;
  }
  const validateRegistrationNumber = function(num){
    const Err = new Error('Invalid registration number');
    if(+num === +0 ) throw Err;
    let temple = /[1-90]/;
    const result = temple.test(num);
    if(!result) throw new Error('Invalid vat number');
    return result;
  } 

  const validateLastDayInspection = function (day){
    const Err = new Error('Invalid last day of inspection');
    if(+day === +0 ) throw Err;
    if(day === '' ) throw Err;
    let temple = /[1-90]/;
    const result = temple.test(day);
    if(!result) throw new Error('Invalid last day of inspection');
    return result;
  }

  const validateAdress = function (adress){
    if(adress === '') throw new Error('Invalid adress')
    return true;
  }
  exports.validateRegistrationNumber = validateRegistrationNumber;
  exports.validateLastName = validateLastName;
  exports.validateStudentDriverLicense =validateStudentDriverLicense;
  exports.validatePhotoUri = validatePhotoUri;
  exports.validateDriverExperienceYear = validateDriverExperienceYear;
  exports.validateDriverLicenseNumber = validateDriverLicenseNumber;
  exports.validatePlateNumber = validatePlateNumber;
  exports.validateТransmission = validateТransmission;
  exports.validatePrice = validatePrice;
  exports.validateCurrency = validateCurrency;
  exports.validateZip = validateZip;
  exports.validateVatNumber = validateVatNumber;
  exports.validateLastDayInspection = validateLastDayInspection;
  exports.validateAdress = validateAdress;
  exports.validateEmail = validateEmail;
  exports.validatePassword = validatePassword;
  exports.validatePhoneNumber = validatePhoneNumber;
  exports.validateName = validateName;
  exports.validateAge = validateAge;
  exports.validateBrand = validateBrand