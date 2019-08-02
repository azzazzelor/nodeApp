
const mongoose = require('mongoose'),
    Student = mongoose.model('Student'),
    User = mongoose.model('User');

const  get_by_id = function (req,res){
    var userStudent = [];
    User.findOne({_id: req.params.id}, function(err, user){
       
        if (err)
            res.send(err);
            userStudent.push(user);
            Student.findOne({userID: req.params.id},function(err, newuserStudent){
                if (err)
            res.send(err);
            userStudent.push(newuserStudent);
            res.send(userStudent)
            })
           
           
    })
    
}



exports.get_by_id = get_by_id;