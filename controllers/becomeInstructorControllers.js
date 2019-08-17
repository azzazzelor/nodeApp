const validFuct = require('../validation/validation');
const mongoose = require('mongoose'),
      Student = mongoose.model('Student'),
      Instructor = mongoose.model('Instructor'),
      User = mongoose.model('User');

const  become_instructor = function (req,res){
    const reqBody = req.body; 

    const id = req.params.id;

    const {email, 
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
        price_per_km_currency,
        price_per_hour_currency,
        cover_photo
    } = reqBody;

    
    const newReqbodyCar = Object.assign({}, ...reqBody.car)
    
    const { brand, 
            transmission, 
            registration_number, 
            price_per_km,
            price_per_hour
        } = newReqbodyCar;
    
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

    try{
        User.deleteOne({_id:id}, function(err){
            if(err){throw err}
            
        })
        Student.deleteOne({user_id:id}, function(err){
            if(err){throw err}
        })
    }catch{
        res.send(err).end()
    }

    const newUser = new User({
        roleType: 'instructor',
        email:email,
        password:password,
        phone_number:phone_number
    })

    User.createUser(newUser,function(err,user){
        if(err) res.status(500).json({ error: 'cant create user with this email or phone number' });
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
                driving_schoolID : driving_school,
                price_per_hour_currency : price_per_hour_currency,
                driver_license_photo : driver_license_photo,
                price_per_km_currency : price_per_km_currency,
                cover_photo:cover_photo                
            })
            newInstructor.save(function(err,instructor){
                if(err) res.status(500).json({ error: err })
                
                res.status(200).json({ instructor : instructor })
            })
    })

}

exports.become_instructor = become_instructor;