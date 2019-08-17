const validFuct = require('../validation/validation')
const mongoose = require('mongoose'),
    Instructor = mongoose.model('Instructor'),
    User = mongoose.model('User'),
    bcrypt = require('bcryptjs')

const  get_by_id = function (req,res){
    let userInstructor = []

    User.findOne({_id: req.params.id}, function(err, user){
        if (err){
            res.send(err)
        }else{ 
            userInstructor.push(user)
            Instructor.findOne({user_id: req.params.id},function(err, newuserSchool){
                if (err){
                    res.send(err)
                }else{ 
                    userInstructor.push(newuserSchool)
                    res.send(userInstructor)}
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
        first_name,
        second_name,
        driver_experience_year,
        photo
    } = reqBody
    
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

    const updateInstructorsFields = function  (id,
        res,
        first_name,
        second_name,
        driver_experience_year,
        photo,
        brand,
        transmission,
        registration_number,
        price_per_km,
        price_per_hour){
        Instructor.findOneAndUpdate(
            {user_id:id},
            { $set:     {first_name,
                second_name,
                driver_experience_year,
                photo,
                car:[{transmission,brand,registration_number,price_per_hour,price_per_km}]
            }}, 
            function(err, user){
                if(err){
                    throw err
                }
                res.json('Sucessful instructor update')
            }
        )
    }
    const newReqbodyCar = Object.assign({}, ...reqBody.car)
        
    const { brand,
        transmission,
        registration_number,
        price_per_km,
        price_per_hour
    } = newReqbodyCar
 

    validFuct.validateEmail(email, res)
    validFuct.validatePassword(password, res)
    validFuct.validatePhoneNumber(phone_number, res)

    validFuct.validateName(first_name,res)
    validFuct.validateLastName(second_name,res)
    validFuct.validateIdPhotoUri(photo,res)
    validFuct.validateDriverExperienceYear(driver_experience_year,res)
    validFuct.validatePrice(price_per_hour,res)
    validFuct.validatePrice(price_per_km,res)
    validFuct.validateТransmission(transmission,res)
    validFuct.validateBrand(brand,res)
    validFuct.validateRegistrationNumber(registration_number,res)

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
                updateInstructorsFields(user.id,
                    res,
                    first_name,
                    second_name,
                    driver_experience_year,
                    photo,
                    brand,
                    transmission,
                    registration_number,
                    price_per_km,
                    price_per_hour)
            }
        })

}


exports.get_by_id = get_by_id
exports.update_by_id = update_by_id