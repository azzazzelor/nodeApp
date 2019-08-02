const mongoose = require('mongoose'),
    Instructor = mongoose.model('Instructor'),
    User = mongoose.model('User');

const  get_by_id = function (req,res){
    var userInstructor = [];
    User.findOne({_id: req.params.id}, function(err, user){
       
        if (err)
            res.send(err);
            userInstructor.push(user);
            Instructor.findOne({userID: req.params.id},function(err, newuserSchool){
                if (err)
            res.send(err);
            userInstructor.push(newuserSchool);
            res.send(userInstructor)
            })
           
           
    })
    
}



exports.get_by_id = get_by_id;