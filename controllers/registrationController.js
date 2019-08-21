const validFuct = require('../validation/validation');
const User = require('../models/user');
const Student = require('../models/student');
const Instructor = require('../models/instructor');
const School = require('../models/school');

exports.registration = function (req,res){
    const reqBody = req.body;  
    checkTypeOfSchema(reqBody, req, res);

}

const checkTypeOfSchema = function(reqBody,req,res){
    const roleType = reqBody.roleType;

    switch(roleType) {
        case 'student':
            return validStudentSchemasCreateUser(reqBody, req, res);

        case 'instructor':
            return  validInstructorSchemasCreateUser(reqBody, req, res);

        case 'school':
            return  validSchoolSchemasCreateUser(reqBody, req, res);

        default:
            res.status(400).json({ error: 'roleType not found' });
            break;
        }
};
                            
const validStudentSchemasCreateUser = function(reqBody, req, res){
    const {email,
        password,
        phone_number,
        first_name,
        second_name,
        age,
        driver_license,
        photo,
        id_photo
    } = reqBody
        
    validFuct.validateEmail(email, res);
    validFuct.validatePassword(password, res);
    validFuct.validatePhoneNumber(phone_number, res);

    validFuct.validateName(first_name, res);
    validFuct.validateLastName(second_name, res);
    validFuct.validateAge(age, res);
    validFuct.validateStudentDriverLicense(driver_license, res);;;
    validFuct.validatePersonalPhotoUri(photo, res);;
    validFuct.validateIdPhotoUri(id_photo, res);
        

    createNewStudent(reqBody,res);
};

const createNewStudent = function(reqBody,res){
    const {roleType,
        email,
        password,
        phone_number,
        first_name,
        second_name,
        age,
        driver_license,
        photo,
        id_photo
    } = reqBody
    
    const newUser = new User({
        roleType: roleType,
        email:email,
        password:password,
        phone_number:phone_number
    });

    User.createUser(newUser, function(err, user){
        if (err) {
            res.status(500).json({ error: 'cant create user with this email or phone number' })
        } else {   
            const newStudent = new Student({
                user_id: user.id,
                first_name: first_name,
                second_name: second_name,
                age: age,
                driver_license: driver_license,
                photo: photo,
                id_photo: id_photo
            });
        
            newStudent.save(function(err, student) {
                if (err) {
                    res.status(400).json({ error: err });
                } else {
                    res.status(200).json({ student : student });
                }
            });
        }
    })
}

const validSchoolSchemasCreateUser = function (reqBody, req, res){
    const {email,
        password,
        phone_number,
        adress,
        zip_code,
        vat_number,
        last_day_inspection,
        price_per_training,
        cover_photo,
        school_license_photo,
        name,
        price_per_training_currency
    } = reqBody;
    
    validFuct.validateEmail(email, res);
    validFuct.validatePassword(password, res);
    validFuct.validatePhoneNumber(phone_number, res);

    validFuct.validateAdress(adress, res);
    validFuct.validateZip(zip_code, res);
    validFuct.validateVatNumber(vat_number, res);
    validFuct.validateLastDayInspection(last_day_inspection, res);
    validFuct.validatePrice(price_per_training, res);
    validFuct.validatePersonalPhotoUri(cover_photo, res);
    validFuct.validatePersonalPhotoUri(school_license_photo, res);
    validFuct.validateName(name, res);
    validFuct.validateCurrency(price_per_training_currency, res)
    
    createNewSchool(reqBody, req, res);

}

const createNewSchool = function(reqBody, req, res){
    const {
        email,
        password,
        phone_number,
        adress,
        zip_code,
        vat_number,
        last_day_inspection,
        price_per_training,
        cover_photo,
        school_license_photo,
        name,
        roleType,
        price_per_training_currency
    } = reqBody;
    
    const newUser = new User({
        roleType: roleType,
        email:email,
        password:password,
        phone_number:phone_number
    });

    User.createUser(newUser, function(err, user){
        if (err) {
            res.status(400).json({ error: 'cant create user with this email or phone number' })
        } else {
            const newSchool = new School({
                user_id : user.id,
                zip_code : zip_code,
                vat_number : vat_number,
                last_day_inspection : last_day_inspection,
                price_per_training : price_per_training,
                cover_photo : cover_photo,
                adress : adress,
                school_license_photo : school_license_photo,
                price_per_training_currency : price_per_training_currency,
                name : name
            });

            newSchool.save(function(err, school) {
                if(err) {
                    res.status(400).json({ error: err });
                } else {                    
                    res.status(200).json({ school : school });
                }
            });
        }
    });
    
}

const validInstructorSchemasCreateUser = function(reqBody, req,  res){
    const {
        email,
        password,
        phone_number,
        first_name,
        second_name,
        photo,
        driver_license_number,
        driver_experience_year,
        plate_number,
        driver_license_photo,
        driving_school,
        cover_photo,
        price_per_km_currency,
        price_per_hour_currency
    } = reqBody

        
    const newReqbodyCar = Object.assign({}, ...reqBody.car)
        
    const {brand,
        transmission,
        registration_number,
        price_per_km,
        price_per_hour
    } = newReqbodyCar
        

    validFuct.validateEmail(email,res);
    validFuct.validatePassword(password,res);
    validFuct.validatePhoneNumber(phone_number,res);
        
    validFuct.validateName(first_name,res);
    validFuct.validateLastName(second_name,res);
    validFuct.validateIdPhotoUri(photo,res);
    validFuct.validateDriverLicenseNumber(driver_license_number,res);
    validFuct.validateDriverExperienceYear(driver_experience_year,res);
    validFuct.validatePlateNumber(plate_number,res);
    validFuct.validateIdPhotoUri(driver_license_photo,res);
    validFuct.validateCurrency(price_per_km_currency,res);
    validFuct.validatePrice(price_per_hour,res);
    validFuct.validatePrice(price_per_km,res);
    validFuct.validateCurrency(price_per_hour_currency,res);
    validFuct.validateRegistrationNumber(registration_number,res);
    validFuct.validateТransmission(transmission,res);
    validFuct.validateBrand(brand,res);
    //driving_school_validate

    createNewInstructor(reqBody,req,res);
    
}

const createNewInstructor = function(reqBody, req, res){
    const {
        email,
        roleType,
        password,
        phone_number,
        first_name,
        second_name,
        photo,
        driver_license_number,
        driver_experience_year,
        plate_number,
        driver_license_photo,
        driving_schoolID,
        price_per_hour_currency,
        price_per_km_currency,
        cover_photo
    } = reqBody;


    const newReqbodyCar = Object.assign({},...reqBody.car);

    const {brand,
        transmission,
        registration_number,
        price_per_km,
        price_per_hour
    } = newReqbodyCar;
        
    const newUser = new User({
        roleType: roleType,
        email: email,
        password: password,
        phone_number: phone_number
    });

    User.createUser(newUser,function(err,user){
        if (err) {
            res.status(400).json({ error: 'cant create user with this email or phone number' });
        } else {
            const newInstructor = new Instructor({
                user_id: user.id,
                driver_license_number : driver_license_number,
                driver_experience_year : driver_experience_year,
                car:[{
                    brand : brand,
                    transmission : transmission,
                    registration_number : registration_number,
                    price_per_km : price_per_km,
                    price_per_hour : price_per_hour
                }],
                first_name : first_name,
                second_name : second_name,
                plate_number : plate_number,
                photo : photo,
                driving_schoolID : driving_schoolID,
                price_per_hour_currency : price_per_hour_currency,
                driver_license_photo : driver_license_photo,
                price_per_km_currency : price_per_km_currency,
                cover_photo :cover_photo
            });

            newInstructor.save(function(err, instructor) {
                if(err) {
                    res.status(400).json({ error: err });
                } else {                    
                    res.status(200).json({ instructor : instructor })
                }
            });
        }
    });
}




