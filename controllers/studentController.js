const validFuct = require('../validation/validation'),
    mongoose = require('mongoose'),
    Student = mongoose.model('Student'),
    User = mongoose.model('User'),
    bcrypt = require('bcryptjs')

const  get_by_id = function (req,res){
    let userStudent = []

    User.findOne({_id: req.params.id}, function(err, user){
        if (err){
            res.send(err)
        }else{
            userStudent.push(user)
            Student.findOne({user_id: req.params.id},function(err, newuserStudent){
                if (err){
                    res.send(err)
                }else{  
                    userStudent.push(newuserStudent)
                    res.send(userStudent)
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
        first_name,
        second_name,
        age,
        id_photo
    } = reqBody

    //secondary functions
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
    const updateStudentsFields = function (id,res,first_name,second_name,age,id_photo){
   
        Student.findOneAndUpdate(
            {user_id:id}, // критерий выборки
            { $set: {first_name,second_name,age,id_photo}}, // параметр обновления
            function(err, user,){
                if(err){
                    throw err
                }
                res.json('Sucessful student update')
            }
        )
    }
    //

    validFuct.validateEmail(email, res)
    validFuct.validatePassword(password, res)
    validFuct.validatePhoneNumber(phone_number, res)

    validFuct.validateName(first_name, res)
    validFuct.validateLastName(second_name, res)
    validFuct.validateAge(age, res)
    validFuct.validateIdPhotoUri(id_photo, res)

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
                updateStudentsFields(user.id,res,first_name,second_name,age,id_photo)
            }
        })
}

const add_likes_users = function(req,res){
    const id = req.body.user_id;  
    const liked_user_id = req.params.id;
    
    Student.findOneAndUpdate(
        {user_id : id},
        { $push: { liked_users : liked_user_id } },
        function(err,like){
            if(err){res.send(err.end())}
            res.send(like)
        }
    )
}

exports.add_likes_users = add_likes_users
exports.get_by_id = get_by_id
exports.update_by_id = update_by_id