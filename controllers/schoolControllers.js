const mongoose = require('mongoose'),
    School = mongoose.model('School'),
    User = mongoose.model('User');

const  get_by_id = function (req,res){
    var userSchool = [];
    User.findOne({_id: req.params.id}, function(err, user){
       
        if (err)
            res.send(err);
            userSchool.push(user);
            School.findOne({userID: req.params.id},function(err, newuserSchool){
                if (err)
            res.send(err);
            userSchool.push(newuserSchool);
            res.send(userSchool)
            })
           
           
    })
    
}



exports.get_by_id = get_by_id;