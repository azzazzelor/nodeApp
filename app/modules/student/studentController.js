const Student = require('./studentModel');
const InstructorModel = require('../instructor/instructorModel');
const SchoolModel = require('../school/schoolModel');
const validationService = require('../../services/validation.service');
const User = require('../user/userModel');
const bcrypt = require('bcryptjs');



exports.getByUserId = (req, res) => {
    Student    
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

    return changeFields(reqBody,id).then((student)=>{
        res.status(200).json(student);
    }).catch((error) => {
        res.status(200).json(error);
    })
}   

exports.add_like_user = (req,res) =>{
    // const id = req.body.userId;  
    const {studentId, roleType}  = req.body;
    const likedUserId = req.params.id;
    
    
    Student.findOneAndUpdate(
        {userId : studentId},
        { $push: { likedUsers : {likedUserId,roleType} } },
        function(err,like){
            if(err){
                res.send('{error: 1}')
            }else{
                if(roleType === 'instructor'){
                    InstructorModel
                    .findOneAndUpdate({userId: likedUserId},
                                      { $push: { studentsWhoLike : studentId } })
                    .exec((err,result)=>{
                        if(err){
                                res.send('error: 1')
                            }else{
                                res.send('error: 0')}})
                }else{
                    SchoolModel
                    .findOneAndUpdate(
                        {userId: likedUserId},
                        { $push: { studentsWhoLike : studentId } })
                    .exec((err,result)=>{
                        if(err){
                            res.send('error: 1')
                            }else{
                            res.send('error: 0')}})
                }
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
        dateOfBirth,
        personalImage,
        city,
		address,
		zipCode
    } = data;

    if(password){
        return new Promise((resolve, reject)=>{
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
            function(err, user ) {
                if (err) {
                    return reject(err);
                }else{
                    return resolve("error: 0")
                }
            })})
        });
        }else{
            return new Promise((resolve, reject)=>{
             //check email
        const emailValidation = validationService.validateEmail(email);
        if (emailValidation.error) return reject(emailValidation);
         //check phone number
         const phoneNumberValidation = validationService.validatePhoneNumber(phoneNumber);
         if (phoneNumberValidation.error) return reject(phoneNumberValidation);
         //check first name
         const firstNameValidation = validationService.validateFirstName(firstName);
         if (firstNameValidation.error) return reject(firstNameValidation);
         //check last name
         const lastNameValidation = validationService.validateLastName(lastName);
         if (lastNameValidation.error) return reject(lastNameValidation);
         const validateBirth = validationService.validateBirth(dateOfBirth);
		 if (validateBirth.error) return reject(validateBirth);
         //check personal image
         const personalImageValidation = validationService.validatePersonalPhotoUrl(personalImage);
         if (personalImageValidation.error) return reject(personalImageValidation);
         //check zip code
		 const validateZipCode = validationService.validateZipCode(zipCode);
		 if (validateZipCode.error) return reject(validateZipCode);
		 //adress
		 const validateAddress = validationService.validateAddress(address);
		 if (validateAddress.error) return reject(validateAddress);
		 //city
		 const validateCity = validationService.validateCity(city);
         if (validateCity.error) return reject(validateCity);
         
         Student.findOneAndUpdate(
            { userId : id }, // критерий выборки
            { $set: { city,
                      address,
                      zipCode,
                      firstName, 
                      lastName, 
                      dateOfBirth, 
                      personalImage
                    }}, // параметр обновления
            function(err, student){
                if(err){
                    return reject(err);
                }else{
                    
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
                )}
            }
        )
        })
        }
}


exports.get_status = function(req, res){
    const {userId, } = req.body;
    User
    .findById(userId)
    .select('active')
    .exec((err, result)=>{
        if(err){
            res.send(err)
        }else{
            res.send(result)
        }
    })
}

exports.takeLike = function (req, res){
    const {studentId, roleType}  = req.body;
    const likedUserId = req.params.id;

    Student.findOneAndUpdate(
        {userId : studentId},
        { $pull: { likedUsers : {likedUserId,roleType}}},
        function(err,like){
            if(err){
                res.send('{error: 1}')
            }else{
                if(roleType === 'instructor'){
                    InstructorModel
                    .findOneAndUpdate({userId: likedUserId},
                                      { $pull: { studentsWhoLike : studentId } })
                    .exec((err,result)=>{
                        if(err){
                                res.send('error: 1')
                            }else{
                                res.send('error: 0')}})
                }else{
                    SchoolModel
                    .findOneAndUpdate(
                        {userId: likedUserId},
                        { $pull: { studentsWhoLike : studentId } })
                    .exec((err,result)=>{
                        if(err){
                            res.send('error: 1')
                            }else{
                            res.send('error: 0')}})
                }
            }
        }
    )
}

