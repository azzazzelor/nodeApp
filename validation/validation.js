const validateEmail = function (email, res) {
    let temple = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const result = temple.test(email);

    if(!result) res.status(500).json({ error: 'Invalid email address' });

    return result;
  }

  const validatePassword = function(password, res){ 
    let temple = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,64}$/ ;
    const result = temple.test(password);
    
    if(!result) res.status(500).json({ error: 'Invalid password' });

    return result;
}

const validatePhoneNumber = function (phone_number, res) {
    let temple = /^[+]?(1\-|1\s|1|\d{3}\-|\d{3}\s|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/g;
    const result = temple.test(phone_number);

    if(!result) res.status(500).json({ error: 'Invalid phone number' });

    return result;
  }
  const validateBrand = function (brand, res){
    let temple = /([A-Za-z0-9_]{3,50})/ 
    const result = temple.test(brand);

    if(!result) res.status(500).json({ error: 'Invalid car brand' });

    return result;
  }

  const validateName = function (name, res){
    let temple = /([A-Za-z0-9_]{3,50})/ 
    const result = temple.test(name);

    if(!result) res.status(500).json({ error: 'Invalid name' });

    return result;
  }

  const validateLastName = function (name, res){
    let temple = /([A-Za-z0-9_]{3,50})/ 
    const result = temple.test(name);

    if(!result) res.status(500).json({ error: 'Invalid last name' });

    return result;
  }

  const validateStudentDriverLicense = function (name, res){
    if (name) return true;

    res.status(500).json({ error: 'Driver license is required' });
  }


  const validateAge = function (age, res){
    if(age >= 16 &&  age <= 150) return true;
    res.status(500).json({ error: 'Invalid age' });
  }

  const validatePersonalPhotoUri = function(photo, res) {
    if(!validatePhotoUri(photo, res)) res.status(500).json({ error: 'Invalid photo uri' });
  }
  
  const validateIdPhotoUri = function(photo, res) {
    if(!validatePhotoUri(photo, res)) res.status(500).json({ error: 'Invalid id photo uri' });
  }
  
  const validatePhotoUri = function (photo, res){
      let temple = /^[a-z]{4,5}:\/\/[a-zA-Z1-9-_.]{5,700}/ 
      const result = temple.test(photo);
      //check if foto exist on server
      return result
  }

  const validateDriverExperienceYear = function (year, res){
    if(+year <= 0 ) res.status(500).json({ error: 'Invalid driver exerience year' });

    if(!year ) res.status(500).json({ error: 'Invalid driver exerience year' });

    return true;
  }

  const validateDriverLicenseNumber = function (num, res){
    let temple = /[1-90_-a-zA-z]{4,100}/ 
    const result = temple.test(num);

    if(!result) res.status(500).json({ error: 'Invalid driver license number' });

    return result
  }

  const validatePlateNumber = function (num, res){
    if(+num === +0 )  res.status(500).json({ error: 'Invalid plate number' });
    if(num === '' )  res.status(500).json({ error: 'Invalid plate number' });

    let temple = /[1-90]/;
    const result = temple.test(num);
    if(!result)  res.status(500).json({ error: 'Invalid plate number' });
    return result;
  }

  const validateТransmission = function (string, res){
    let temple = /[a-zA-Z]{1,100}/ 
    const result = temple.test(string);

    if(!result) res.status(500).json({ error: 'Invalid transmission' });

    return result
  }

  const validatePrice = function (num, res){
    
    if(!num)  res.status(500).json({ error: 'Invalid price' });
   
    let temple = /[1-90]/;
    const result = temple.test(num);

    if(!result) res.status(500).json({ error: 'Invalid price' });

    return result;
  }

  const validateCurrency = function (num, res){
    if(num) return true;

    res.status(500).json({ error: 'Invalid currency' });
      
  }

   const validateNum= function(num, res){
    if(+num === +0 ) return false;
    if(num === '' ) return false;

    let temple = /[1-90]/;
    const result = temple.test(num);

    return result;
   }

  const validateZip = function (num, res){
    if(!validateNum(num, res)) res.status(500).json({ error: 'Invalid zip' });
  }

  const validateVatNumber = function (num, res){
    if(!validateNum(num, res)) res.status(500).json({ error: 'Invalid vat number' });
  }
  const validateRegistrationNumber = function(num, res){
     if(!num ) res.status(500).json({ error: 'Invalid registration number' });

    let temple = /[1-90]/;
    const result = temple.test(num);
    if(!result) res.status(500).json({ error: 'Invalid registration number' });
    return result;
  } 

  const validateLastDayInspection = function (day, res){
    if(!validateNum(day, res)) res.status(500).json({ error: 'Invalid last day of inspection' });
  }

  const validateAdress = function (adress, res){
    if(!adress) res.status(500).json({ error: 'Invalid adress' });
    
    return true;
  }

  exports.validateIdPhotoUri = validateIdPhotoUri;
  exports.validatePersonalPhotoUri = validatePersonalPhotoUri;
  exports.validateRegistrationNumber = validateRegistrationNumber;
  exports.validateLastName = validateLastName;
  exports.validateStudentDriverLicense = validateStudentDriverLicense;
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
  exports.validateBrand = validateBrand;