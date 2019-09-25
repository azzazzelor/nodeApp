const School = require('./schoolModel');
const User = require('../user/userModel');
const validationService = require('../../services/validation.service');
const bcrypt = require('bcryptjs');

exports.getByUserId = (req, res) => {
    School.findOne({userId: req.params.id}, (err, school) => {
        if (err) res.status(404).json(err);

        res.status(200).json(school);
    });
};


exports.updateById = (req, res) => {
    const reqBody = req.body  
    const id = req.params.id

    return changeFields(reqBody,id).then((school)=>{
        res.send(school)
    }).catch((error) => {
        res.status(400).json(error);
    })
}   

const changeFields = (data,id) => {
    const {
        email,
        password,
        phoneNumber,
        adress,
        lastDayInspection,
        name,
        coverImage,
        personalImage
    } = data;

    return new Promise((resolve, reject) => {
        //check email
        const emailValidation = validationService.validateEmail(email);
        if (emailValidation.error) return reject(emailValidation);
        //check password
        const passwordValidation = validationService.validatePassword(password);
        if (passwordValidation.error) return reject(passwordValidation);
        //check phone number
        const phoneNumberValidation = validationService.validatePhoneNumber(phoneNumber);
        if (phoneNumberValidation.error) return reject(phoneNumberValidation);
        //check  name
        const firstNameValidation = validationService.validateFirstName(name);
        if (firstNameValidation.error) return reject(firstNameValidation);
        //check cover image
		const coverImageValidation = validationService.validateCoverPhotoUrl(coverImage);
        if (coverImageValidation.error) return reject(coverImageValidation);
        //check adress
		const validateAdress = validationService.validateAdress(adress);
        if (validateAdress.error) return reject(validateAdress);
        //check last Day Inspection
		const validateLastDayInspection = validationService.validateLastDayInspection(lastDayInspection);
        if (validateLastDayInspection.error) return reject(validateLastDayInspection);
        //check personal image
		const personalImageValidation = validationService.validatePersonalPhotoUrl(personalImage);
        if (personalImageValidation.error) return reject(personalImageValidation);
        
        return new Promise(function (res, rej){
            bcrypt.genSalt(10, function(err, salt) {
                if (err){rej(err)}else{
                    bcrypt.hash(password, salt, function(err, hash) {
                       let newpassword = hash;
                         res(newpassword)
                    });
                }
                
            });
        }).then(passw=>{ 
            User.findByIdAndUpdate(id , 
                {   email,
                    password: passw,
                    phoneNumber,
                },
                (err, user ) =>{
                    if (err) {
                        return reject(err);
                    }else{
                        School.findOneAndUpdate(
                            { userId : id }, // критерий выборки
                            { $set: { adress, lastDayInspection, name, coverImage, personalImage }}, // параметр обновления
                            (err, school) => {
                                if(err){
                                    return reject(err);
                                }
                                return resolve(school);
                            }
                        )
                    }
                }
            );
        })
       
    });
}




