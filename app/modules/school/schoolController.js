const School = require('./schoolModel');
const User = require('../user/userModel');
const validationService = require('../../services/validation.service');
const bcrypt = require('bcryptjs');
const Instructor = require('../instructor/instructorModel')

exports.getByUserId = (req, res) => {
    School
    .findOne({userId: req.params.id})
    .populate('userId', 'email phoneNumber activeChats location')
    .exec((err,result)=>{
        if(err){
            res.send('{error: 1}')
        }else{
            res.send(result)
        }
    })
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
    
if(password){
    return new Promise((resolve, reject) => {
        
        //check password
        const passwordValidation = validationService.validatePassword(password);
        if (passwordValidation.error) return reject(passwordValidation);
       
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
                {   
                    password: passw,
                    
                },
                (err, user ) =>{
                    if (err) {
                        return reject(err);
                    }else{
                        return resolve("error: 0")
                    }
                }
            );
        })
       
    });
            }else {
                return new Promise((resolve, reject)=>{
                //check email
        const emailValidation = validationService.validateEmail(email);
        if (emailValidation.error) return reject(emailValidation);
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
         
         School.findOneAndUpdate(
            { userId : id }, // критерий выборки
            { $set: { adress, lastDayInspection, name, coverImage, personalImage }}, // параметр обновления
            (err, school) => {
                if(err){
                    return reject(err);
                }
                User.findByIdAndUpdate(id , 
                    {   
                       email: email,
                       phoneNumber: phoneNumber
                    },
                    (err, user ) =>{
                        if (err) {
                            return reject(err);
                        }else{
                           return resolve("error: 0")
                        }
                    }
                );
            }
        )

            })
}
}



exports.getInstructors = function (req, res) {
    const {schoolId} = req.body;
    School
    .find({userId: schoolId})
    .select('instructors -_id')
    .exec((err,result)=>{
        if(err){
            res.send('{error: 1}')
        }else{
            res.send(result)
        }
    })
}

exports.changeRating = function (req, res) {
    const {userId, rates, roleType } =req.body;
    if(roleType === 'school'){
        School.findOne({userId: userId})
        .then(data=>{
        const { emount, rate  } = data.rating;
        let neEm = +emount + 1;
        let newRate = (Number(rate) + Number(rates))/neEm;
        return School.findOneAndUpdate({userId: userId},{
            $set:{"rating.rate": newRate,"rating.emount": neEm}})
        })
        .then(data=>{res.send('error: 0')})
        .catch(er=>{res.send('error: 1')})   
    }else{
        Instructor.findOne({userId: userId})
        .then(data=>{
        const { emount, rate  } = data.rating;
        let neEm = +emount + 1;
        let newRate = (Number(rate) + Number(rates))/neEm;
        return Instructor.findOneAndUpdate({userId: userId},{
            $set:{"rating.rate": newRate,"rating.emount": neEm}})
        })
        .then(data=>{res.send('error: 0')})
        .catch(er=>{res.send('error: 1')})  
    }   
}
