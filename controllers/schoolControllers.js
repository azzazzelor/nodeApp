const validFuct = require('../validation/validation'),
 mongoose = require('mongoose'),
    School = mongoose.model('School'),
    User = mongoose.model('User'),
    bcrypt = require('bcryptjs');

const  get_by_id = function (req,res){
    let userSchool = []

    User.findOne({_id: req.params.id}, function(err, user){
        if (err){
            res.send(err)
        }else{ 
            userSchool.push(user)
            School.findOne({user_id: req.params.id},function(err, newuserSchool){
                if (err){
                    res.send(err)
                }else{
                    userSchool.push(newuserSchool)
                    res.send(userSchool)
                }
            })
        } 
    })
}

const update_by_id = function(req,res){
    const reqBody = req.body  
    const id = req.params.id
    
    const {email,
        password,
        phone_number,
        adress,
        last_day_inspection,
        name,
        cover_photo,
    } = reqBody

    //  secondary functions
    const updateSchoolFields = function (id,res,adress,last_day_inspection,name,cover_photo){
   
        School.findOneAndUpdate(
            {user_id:id}, // критерий выборки
            { $set: {adress,last_day_inspection,name,cover_photo}}, // параметр обновления
            function(err, user,){
                if(err){
                    throw err
                }
                res.json('Sucessful school update')
            }
        )
    }
    const bcrptPassw = function(password){
        bcrypt.genSalt(10, function(err, salt) {
            if(err) {
                return err
            }
            bcrypt.hash(password, salt, function(err, hash) {
                if(err) {
                    return err
                }
                return password = hash
            })
        })
    } 
    //
    
    validFuct.validateEmail(email, res)
    validFuct.validatePassword(password, res)
    validFuct.validatePhoneNumber(phone_number, res)

    validFuct.validateAdress(adress, res)
    validFuct.validateLastDayInspection(last_day_inspection, res)
    validFuct.validateName(name, res)
    validFuct.validatePersonalPhotoUri(cover_photo, res)

    const newpassw = bcrptPassw(password)

    User.findByIdAndUpdate(id , 
        { email,
            newpassw,
            phone_number,
        },

        function(err, user ) {
            if (err) {
                throw err
            }else{
                updateSchoolFields(user.id,res,adress,last_day_inspection,name,cover_photo)
            }
        })
}

exports.get_by_id = get_by_id
exports.update_by_id = update_by_id