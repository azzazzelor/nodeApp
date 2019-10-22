const Instructor = require('./instructorModel');
const validationService = require('../../services/validation.service');
const User = require('../user/userModel');
const Student = require('../student/studentModel');
const bcrypt = require('bcryptjs');


/**
 * Create User helper
 * @param data
 * @returns {Promise<any>}
 */
const createUser = (data) => {
	const {
		email,
        password,
        phoneNumber,
        roleType
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

		//create new user
		let newUser = new User({
			email,
			password,
			phoneNumber,
			roleType
		});

		bcrypt.genSalt(10, (err, salt) => {
			if(err) return reject(err);

		    bcrypt.hash(newUser.password, salt, (err, hash) => {
		    	if(err) return reject(err);

		    	newUser.password = hash;
      			newUser.save((err, user) => {
      				if(err) return reject(err);

      				return resolve(user);
  				});
	    	});
		});

	});
};

exports.getByUserId = (req, res) => {
    Instructor
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

    return changeFields(reqBody,id).then((instructor)=>{
        res.send(instructor)
    }).catch((error) => {
        res.status(200).json(error);
    })
}   

const changeFields = (data,id) => {

    const {
        dateOfBirth,
        email,
        password,
        phoneNumber,
        firstName,
        lastName,
        driverExperienceYear,
        personalImage,
        coverImage
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
            })
        })
    })
        }else{
            const newReqbodyCar = Object.assign({}, ...data.car)
      
            const { 
                brand,
                transmission,
                registrationNumber,
                pricePerKm,
                pricePerHour
            } = newReqbodyCar;

            return new Promise((resolve, reject)=>{
             //check email
        const emailValidation = validationService.validateEmail(email);
        if (emailValidation.error) return reject(emailValidation);
         //check phone number
         const phoneNumberValidation = validationService.validatePhoneNumber(phoneNumber);
         if (phoneNumberValidation.error) return reject(phoneNumberValidation);
         // check driver experience year
         const validateExperienceYear = validationService.validateExperienceYear(driverExperienceYear);
         if (validateExperienceYear.error) return reject(validateExperienceYear);
         //check first name
         const firstNameValidation = validationService.validateFirstName(firstName);
         if (firstNameValidation.error) return reject(firstNameValidation);
         //check last name
         const lastNameValidation = validationService.validateLastName(lastName);
         if (lastNameValidation.error) return reject(lastNameValidation);
         //check personal image
         const personalImageValidation = validationService.validatePersonalPhotoUrl(personalImage);
         if (personalImageValidation.error) return reject(personalImageValidation);
         //check cover image
         const coverImageValidation = validationService.validateCoverPhotoUrl(coverImage);
         if (coverImageValidation.error) return reject(coverImageValidation);
         //check brand
         const validateCarBrand = validationService.validateCarBrand(brand);
         if (validateCarBrand.error) return reject(validateCarBrand);
         //check transmission
         const validateТransmission = validationService.validateТransmission(transmission);
         if (validateТransmission.error) return reject(validateТransmission);
         //check registration Number
         const validateCarRegistrationNumber = validationService.validateCarRegistrationNumber(registrationNumber);
         if (validateCarRegistrationNumber.error) return reject(validateCarRegistrationNumber);
         //check price Per Km
         const validatePricePerKM = validationService.validatePricePerKM(pricePerKm);
         if (validatePricePerKM.error) return reject(validatePricePerKM);
         //check price Per Hour
         const validatePricePerHour = validationService.validatePricePerHour(pricePerHour);
         if (validatePricePerHour.error) return reject(validatePricePerHour);
         const validateBirth = validationService.validateBirth(dateOfBirth);
         if (validateBirth.error) return reject(validateBirth);
         
         Instructor.findOneAndUpdate(
            { userId : id }, // критерий выборки
            { $set: {
                firstName,
                dateOfBirth,
                lastName,
                driverExperienceYear,
                personalImage,
                coverImage,
                car:[{transmission,brand,registrationNumber,pricePerKm,pricePerHour}]
                }}, // параметры обновления
            function(err, instructor){
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

exports.becomeInstructor = (req, res) => {
    const reqBody = req.body  
    const id = req.params.id

    return studentBecomeInstructor(reqBody,id).then((instructor)=>{
        res.send(instructor)
    }).catch((error) => {
        res.status(200).json(error);
    })
} 

const studentBecomeInstructor = (data,id) =>{
    const {
		firstName,
        lastName,
        personalImage,
        driverLicenseNumber,
        driverExperienceYear,
        plateNumber,
        driverLicensePhoto,
        drivingSchoolId, 
        coverImage,
        pricePerKmCurrency,
        pricePerHourCurrency,
        dateOfBirth
	} = data;

	const newInstructBodyCar = Object.assign({}, ...data.car);
        
    const {
		brand,
        transmission,
        registrationNumber,
        pricePerKm,
		pricePerHour
    } = newInstructBodyCar;

    return new Promise((resolve, reject)=>{
        const validateBirth = validationService.validateBirth(dateOfBirth);
		if (validateBirth.error) return reject(validateBirth);
        //check first name
		const firstNameValidation = validationService.validateFirstName(firstName);
		if (firstNameValidation.error) return reject(firstNameValidation);
		//check last name
		const lastNameValidation = validationService.validateLastName(lastName);
		if (lastNameValidation.error) return reject(lastNameValidation);
		//check personal image
		const personalImageValidation = validationService.validatePersonalPhotoUrl(personalImage);
		if (personalImageValidation.error) return reject(personalImageValidation);
		//check cover image
		const coverImageValidation = validationService.validateCoverPhotoUrl(coverImage);
		if (coverImageValidation.error) return reject(coverImageValidation);
		//check driver License Number
		const validateDriverLicenceNumber = validationService.validateDriverLicenceNumber(driverLicenseNumber);
		if (validateDriverLicenceNumber.error) return reject(validateDriverLicenceNumber);
		//check driver experience year
		const validateExperienceYear = validationService.validateExperienceYear(driverExperienceYear);
		if (validateExperienceYear.error) return reject(validateExperienceYear);
		//check plate Number
		const validatePlateNumber = validationService.validatePlateNumber(plateNumber);
		if (validatePlateNumber.error) return reject(validatePlateNumber);
		//check driver License Photo
		const validateDriverLicencePhoto = validationService.validateDriverLicencePhoto(driverLicensePhoto);
		if (validateDriverLicencePhoto.error) return reject(validateDriverLicencePhoto);
		//check price Per Km Currency
		const validatePricePerKmCurrency = validationService.validatePricePerKmCurrency(pricePerKmCurrency);
		if (validatePricePerKmCurrency.error) return reject(validatePricePerKmCurrency);
		//check price Per Hour Currency
		const validatePricePerHourCurrency = validationService.validatePricePerHourCurrency(pricePerHourCurrency);
		if (validatePricePerHourCurrency.error) return reject(validatePricePerHourCurrency);
		//check brand
		const validateCarBrand = validationService.validateCarBrand(brand);
		if (validateCarBrand.error) return reject(validateCarBrand);
		//check transmission
		const validateТransmission = validationService.validateТransmission(transmission);
		if (validateТransmission.error) return reject(validateТransmission);
		//check registration Number
		const validateCarRegistrationNumber = validationService.validateCarRegistrationNumber(registrationNumber);
		if (validateCarRegistrationNumber.error) return reject(validateCarRegistrationNumber);
		//check price Per Km
		const validatePricePerKM = validationService.validatePricePerKM(pricePerKm);
		if (validatePricePerKM.error) return reject(validatePricePerKM);
		//check price Per Hour
		const validatePricePerHour = validationService.validatePricePerHour(pricePerHour);
		if (validatePricePerHour.error) return reject(validatePricePerHour);

            User.deleteOne({_id:id}, function(err){
                if(err){reject(err)}
                
            })
            Student.deleteOne({userId:id}, function(err){
                if(err){reject(err) }
            })
            
           createUser(data).then((user) => {
			const newInstructor = new Instructor({
                userId: user.id,
                driverLicenseNumber,
                driverExperienceYear, 
                car:[{
                    brand,
                    transmission ,
                    registrationNumber,
                    pricePerKm,
                    pricePerHour,
                }],
                firstName,
                lastName,
                plateNumber,
                personalImage,
                drivingSchoolId,
				pricePerHourCurrency,
                driverLicensePhoto,
                pricePerKmCurrency,
                coverImage,
                dateOfBirth              
            })
			newInstructor.save((err, instructor) => {
            	if (err) {
                    removeUser(user._id).then(() => {
                    	return reject(err);
                    });
                } else {
                    return resolve(instructor);
                }
            });
        })
      }
    )
} 

exports.getUsersCar = (req,res) => {
    const brand = req.body.carBrand;
    const pageNum = +req.body.pageNumber;
    const limit = 10;

    
    if(brand === ''){
        res.status(400).send({ error: 'No brand' }).end();
    }
    if(isNaN(pageNum)){
        res.status(400).send({ error: 'No page number' }).end();
    }

    Instructor
    .find({'car': {$elemMatch: {brand: brand }}})
    .populate({path:'userId' ,select:'location'})
    .select('-plateNumber')
    .skip((pageNum - 1) * limit).limit(limit)
    .exec(function(err, result) {
        if(err){
             res.status(400).send({ error: 1 }).end();
        }else{
            res.status(200).send(result);
        }
    });
}

