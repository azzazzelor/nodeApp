const Student = require('./studentModel');
const validationService = require('../../services/validation.service');
const passwordService = require('../../services/password.service')
const User = require('../user/userModel');

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
        res.send(student)
    }).catch((error) => {
        res.status(200).json(error);
    })
}   

exports.add_like_user = (req,res) =>{
    const id = req.body.userId;  
    const likedUserId = req.params.id;
    
    Student.findOneAndUpdate(
        {user_id : id},
        { $push: { likedUsers : likedUserId } },
        function(err,like){
            if(err){
                res.send(err)
            }else{
                res.send(like)
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
        personalImage
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

        let newpassw = passwordService.bcrptPassw(password)

        User.findByIdAndUpdate(id , 
            {   email,
                password:newpassw,
                phoneNumber,
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
            })
        })
}



