 const validFuct = require('../validation/validation')
 const User = require('../models/user');
 const Student = require('../models/student')
 const Instructor = require('../models/instructor')
 const School = require('../models/school')
exports.registration = function (req,res){
    reqBody = req.body;  
    checkTypeOfSchema(reqBody);

}


            const checkTypeOfSchema = function(reqBody,req,res){
                const {roleType} = reqBody;
                if(roleType === "student") return validStudentSchemas(reqBody,req,res); 
                if(roleType === "instructor") return  validInstructorSchemas(reqBody,req,res);
                if(roleType === "school") return  validSchoolSchemas(reqBody,req,res)
            } 

            const validStudentSchemas = function(reqBody,req,res){
                const {email,password,phone_number,first_name: first_name,second_name,age,driver_license,photo,id_photo} = reqBody;
                validateUserSchemas(email,password,phone_number);
                validateStudentsFields(first_name,second_name,age,driver_license,photo,id_photo);
                createNewStudent(reqBody)
            }

            const validateUserSchemas = function (email,password,phone_number){
                validFuct.validateEmail(email);
                validFuct.validatePassword(password);
                validFuct.validatePhoneNumber(phone_number);
            }

            const validateStudentsFields = function(first_name,second_name,age,driver_license,photo,id_photo){
                validFuct.validateName(first_name);
                validFuct.validateLastName(second_name);
                validFuct.validateAge(age);
                validFuct.validateStudentDriverLicense(driver_license);
                validFuct.validatePhotoUri(photo)
                validFuct.validatePhotoUri(id_photo)

            }

            const validSchoolSchemas = function (reqBody){
                const {email,password,phone_number,adress,zip_code,vat_number,last_day_inspection,price_per_training,cover_photo,school_license_photo,name,price_per_training_currency} = reqBody;
                validateUserSchemas(email,password,phone_number);
                validateSchoolFields(adress,zip_code,vat_number,last_day_inspection,price_per_training,cover_photo,school_license_photo,name,price_per_training_currency)
                createNewSchool(reqBody);

            }

            const validInstructorSchemas = function(reqBody){
                const {email,password,phone_number,first_name,second_name,photo,driver_license_number,driver_experience_year,plate_number,driver_license_photo,driving_school,price_per_km_currency} = reqBody;
                const {brand,transmission,registration_number,price_per_km,price_per_hour} = reqBody.car;
                    validateUserSchemas(email,password,phone_number);
                    
                     validInstructorFields(first_name,second_name,photo,driver_license_number,driver_experience_year,plate_number,driver_license_photo,driving_school,price_per_km_currency,brand,transmission,registration_number,price_per_km,price_per_hour)

                    createNewInstructor(reqBody);
                
                }

                const createNewStudent = function(reqBody,res){
                    const {roleType,email,password,phone_number,first_name,second_name,age,driver_license,photo,id_photo} = reqBody;
                    
                    const newUser = new User({
                        roleType: roleType,
                        email:email,
                        password:password,
                        phone_number:phone_number
                    })

                    User.createUser(newUser,function(err,user){
                        if(err) throw new Error('cant create user');
                        
                            const newStudent = new Student({
                                userID:user.id,
                                first_name:first_name,
                                second_name,second_name,
                                age:age,
                                driver_license:driver_license,
                                photo:photo,
                                id_photo:id_photo
                            })
                            newStudent.save(function(err,student){
                                if(err) throw new Error('error');
                                return (student)
                            })
                    })
                }

            const createNewInstructor = function(reqBody){
                const {roleType,email,password,phone_number,first_name,second_name,photo,driver_license_number,driver_experience_year,plate_number,driver_license_photo,driving_school} = reqBody;
                const {brand,transmission,registration_number,price_per_km,price_per_hour} = reqBody.car;
                const newUser = new User({
                    roleType: roleType,
                    email:email,
                    password:password,
                    phone_number:phone_number
                })

                User.createUser(newUser,function(err,user){
                    if(err) throw new Error('cant create user');
                        const newInstructor = new Instructor({
                            userID:user.id,
                            driver_license_number:driver_license_number,
                            driver_experience_year:driver_experience_year,
                            car:[{
                                brand:brand,
                                transmission:transmission,
                                registration_number:registration_number,
                                price_per_km:price_per_km,
                                price_per_hour:price_per_hour
                            }],
                            first_name:first_name,
                            second_name:second_name,
                            plate_number:plate_number,
                            photo:photo,
                            driving_school:driving_school,
                            driver_license_photo:driver_license_photo
                        })
                        newInstructor.save(function(err,instructor){
                            if(err) throw new Error('error');
                            return (instructor)
                        })
                })
            }

            const createNewSchool = function(reqBody){
                const {roleType,email,password,phone_number,adress,zip_code,vat_number,last_day_inspection,price_per_training,cover_photo,school_license_photo,name,price_per_training_currency} = reqBody;
                
                const newUser = new User({
                    roleType: roleType,
                    email:email,
                    password:password,
                    phone_number:phone_number
                })

                User.createUser(newUser,function(err,user){
                    if(err) throw new Error('cant create user');
                        const newSchool = new School({
                            userID:user.id,
                            zip_code:zip_code,
                            vat_number:vat_number,
                            last_day_inspection,last_day_inspection,
                            price_per_training:price_per_training,
                            cover_photo:cover_photo,
                            adress:adress,
                            school_license_photo:school_license_photo,
                            price_per_training_currency:price_per_training_currency,
                            name:name
                        })
                        newSchool.save(function(err,school){
                            if(err) throw new Error('error');
                            return school;
                        })
                    })

            }

            const validateSchoolFields = function(adress,zip_code,vat_number,last_day_inspection,price_per_training,cover_photo,school_license_photo,name,price_per_training_currency){
                validFuct.validateAdress(adress);
                validFuct.validateZip(zip_code);
                validFuct.validateVatNumber(vat_number);
                validFuct.validateLastDayInspection(last_day_inspection)
                validFuct.validatePrice(price_per_training);
                validFuct.validatePhotoUri(cover_photo)
                validFuct.validatePhotoUri(school_license_photo)
                validFuct.validateName(name)
                validFuct.validateCurrency(price_per_training_currency)
            }
            
            const validInstructorFields = function(first_name,second_name,photo,driver_license_number,driver_experience_year,plate_number,driver_license_photo,driving_school,price_per_km_currency,brand,transmission,registration_number,price_per_km,price_per_hour,price_per_hour_currency){
                validFuct.validateName(first_name);
                validFuct.validateLastName(second_name);
                validFuct.validatePhotoUri(photo);
                validFuct.validateDriverLicenseNumber(driver_license_number);
                validFuct.validateDriverExperienceYear(driver_experience_year)
                validFuct.validatePlateNumber(plate_number);
                validFuct.validatePhotoUri(driver_license_photo);
                validFuct.validateCurrency(price_per_km_currency);
                validFuct.validatePrice(price_per_hour);
                validFuct.validatePrice(price_per_km);
                validFuct.validateCurrency(price_per_hour_currency);
                validFuct.validateRegistrationNumber(registration_number);
                validFuct.validateТransmission(transmission);
                validFuct.validateBrand(brand);
            }
