const Student = require('./studentModel');
const validationService = require('../../services/validation.service');
const User = require('../user/userModel');
const bcrypt = require('bcryptjs');



exports.getByUserId = (req, res) => {
    Student.findOne({userId: req.params.id}, (err, student) => {
        if (err) res.status(404).json(err);

        res.status(200).json(student);
    });
};

exports.updateById = (req, res) => {
    const reqBody = req.body  
    const id = req.params.id

    return changeFields(reqBody,id).then((student)=>{
        res.status(200).json(student);
    }).catch((error) => {
        res.status(200).json(error);
    })
}   

exports.add_like_user = (req,res) =>{
    const id = req.body.userId;  
    const likedUserId = req.params.id;
    console.log(id, likedUserId);
    
    Student.findOneAndUpdate(
        {userId : id},
        { $push: { likedUsers : likedUserId } },
        function(err,like){
            if(err){
                res.send('{error: 1}')
            }else{
                res.send('{error: 0}')
            }
        }
    )
}

const changeFields = (data,id) => {
    const {
        email,
        password,
        phoneNumber,
        firstName,
        lastName,
        age,
        personalImage,
    } = data;
    
    return new Promise((resolve, reject)=>{
        //check email
        const emailValidation = validationService.validateEmail(email);
        if (emailValidation.error) return reject(emailValidation);
        //check password
        const passwordValidation = validationService.validatePassword(password);
        if (passwordValidation.error) return reject(passwordValidation);
        //check phone number
        const phoneNumberValidation = validationService.validatePhoneNumber(phoneNumber);
        if (phoneNumberValidation.error) return reject(phoneNumberValidation);
        //check first name
        const firstNameValidation = validationService.validateFirstName(firstName);
        if (firstNameValidation.error) return reject(firstNameValidation);
        //check last name
        const lastNameValidation = validationService.validateLastName(lastName);
        if (lastNameValidation.error) return reject(lastNameValidation);
        //check age
        const ageValidation = validationService.validateAge(age);
        if (ageValidation.error) return reject(ageValidation);
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
            {   email:email,
                password: passw,
                phoneNumber:phoneNumber,
            },
            function(err, user ) {
                if (err) {
                    return reject(err);
                }else{
                    Student.findOneAndUpdate(
                        { userId : id }, // критерий выборки
                        { $set: { firstName, lastName, age, personalImage}}, // параметр обновления
                        function(err, student){
                            if(err){
                                return reject(err);
                            }
                            return resolve(student);
                        }
                    )
                }
            })})
        })
}



