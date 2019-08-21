const validateEmail = function (email, res) {
    let temple = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const result = temple.test(email);

    if (result) return result;

    res.status(400).json({ error: 'Invalid email address' });
};

const validatePassword = function(password, res) { 
    let temple = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,64}$/;
    const result = temple.test(password);
    
    if (result) return result;

    res.status(400).json({ error: 'Invalid password' });
};

const validatePhoneNumber = function (phone_number, res) {
    let temple = /^[+]?(1\-|1\s|1|\d{3}\-|\d{3}\s|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/g;
    const result = temple.test(phone_number);

    if (result) return result;

    res.status(400).json({ error: 'Invalid phone number' });
};

const validateBrand = function (brand, res) {
    let temple = /([A-Za-z0-9_]{3,50})/; 
    const result = temple.test(brand);

    if (result) return result;

    res.status(400).json({ error: 'Invalid car brand' });
};

const validateName = function (name, res) {
    let temple = /([A-Za-z0-9_]{3,50})/;
    const result = temple.test(name);

    if (result) return result;

    res.status(400).json({ error: 'Invalid name' });
};

const validateLastName = function (name, res) {
    let temple = /([A-Za-z0-9_]{3,50})/;
    const result = temple.test(name);

    if(result) return result;

    res.status(400).json({ error: 'Invalid last name' });
};

const validateStudentDriverLicense = function (name, res) {
    if (name) return true;

    res.status(400).json({ error: 'Driver license is required' });
};


const validateAge = function (age, res) {
    let temple = /([0-9])/;
    const result = temple.test(age);

    if (result && result >= 16 &&  result <= 150) return true;

    res.status(400).json({ error: 'Invalid age' });
};

const validatePersonalPhotoUri = function(photo, res) {
    if (validatePhotoUri(photo, res)) return true;

    res.status(400).json({ error: 'Invalid photo uri' });
};
  
const validateIdPhotoUri = function(photo, res) {
    if(validatePhotoUri(photo, res)) return true;

    res.status(400).json({ error: 'Invalid id photo uri' });
};
  
const validatePhotoUri = function (photo, res) {
      let temple = /^[a-z]{4,5}:\/\/[a-zA-Z1-9-_.]{5,700}/;
      const result = temple.test(photo);
      //check if foto exist on server
      return result
};

const validateDriverExperienceYear = function (year, res) {
    if (+year <= 0 || !year) {
        res.status(400).json({ error: 'Invalid driver exerience year' });
    } else {
        return true;
    }
};

const validateDriverLicenseNumber = function (num, res) {
    let temple = /[1-90_-a-zA-z]{4,100}/;
    const result = temple.test(num);

    if (result) return result;

    res.status(400).json({ error: 'Invalid driver license number' });
};

const validatePlateNumber = function (num, res) {
    let temple = /[0-9]/;
    const result = temple.test(num);

    if(!result || +num === 0 || num === '') {
        res.status(400).json({ error: 'Invalid plate number' });
    } else {
        return result;
    }
};

const validateТransmission = function (string, res) {
    let temple = /[a-zA-Z]{1,100}/;
    const result = temple.test(string);

    if (result) return result;

    res.status(400).json({ error: 'Invalid transmission' });
};

const validatePrice = function (num, res) {
    let temple = /[0-9]/;
    const result = temple.test(num);

    if (result) return result;

    res.status(400).json({ error: 'Invalid price' });
};

const validateCurrency = function (num, res) {
    if(num) return true;

    res.status(400).json({ error: 'Invalid currency' });
};

const validateNum = function(num) {
    let temple = /[0-9]/;
    const result = temple.test(num);

    if(+num === +0 ) return false;
    if(num === '' ) return false;

    return result;
};

const validateZip = function (num, res) {
    if(validateNum(num)) return true;

    res.status(400).json({ error: 'Invalid zip' })
};

const validateVatNumber = function (num, res) {
    if(validateNum(num)) return true;

    res.status(400).json({ error: 'Invalid vat number' })
};

const validateRegistrationNumber = function(num, res) {
    let temple = /[0-9]/;
    const result = temple.test(num);

    if(num && result) return result;

    res.status(400).json({ error: 'Invalid registration number' });
};

const validateLastDayInspection = function (day, res) {
    if(validateNum(day)) return true;

    res.status(400).json({ error: 'Invalid last day of inspection' });
};

const validateAdress = function (adress, res) {
    if(adress) return true;

    res.status(400).json({ error: 'Invalid adress' });
};

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