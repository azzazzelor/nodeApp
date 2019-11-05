const nodemailer = require("nodemailer");
const User = require('../user/userModel')
const passwordResetToken = require('./tokenModel');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');


const smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.GOOGLE_ACC,
        pass: process.env.GOOGLE_PASSW
    }
});

let rand;
let mailOptions;
let host;
let link;
let emeil;

exports.sendScript = function(req,res){
    rand =Math.floor((Math.random() * 100) + 54);
    host =req.get('host');
    link= "https://"+req.get('host')+"/verify?id="+rand;
    emeil = req.query.to.toLowerCase();
    mailOptions={
        to : req.query.to,
        subject : "Please confirm your Email account",
        html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>"
    }
    // console.log(mailOptions);

    smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
           res.end("{error: 1}");
        }else{    
           res.end("{error: 0}");
        }
   });
}

exports.getScript = function (req, res) {
 
    if((req.protocol+"://"+req.get('host'))==("http://"+host)){
        
        if(req.query.id==rand){
            

            User.update({email:emeil},{"active": "true"},(err, result)=>{
                if(err){res.send('error: 1')}else{
                    res.send('error: 0 ')
                }
            })
            res.end("<h1>Email "+mailOptions.to+" is been Successfully verified");
        }else{
            res.end("<h1>Bad Request</h1>");
        }
        }else{
            res.end("<h1>Request is from unknown source");
        }
}

exports.reset_passw = function (req, res) {
    let {email} = req.body;
    //body: email 
    
    if (!email) {
        return res
        .status(422)
        .json({ message: 'Email is required' });
    }
    let newEmail = email.toLowerCase()
    User.
    findOne({
    email: newEmail
    }).then(user=>{
        if (!user) {
            return res
            .status(409)
            .json({ message: 'Email does not exist' });
        }else{
            let resettoken = new passwordResetToken({ userId: user._id, resettoken: crypto.randomBytes(16).toString('hex') });
            resettoken.save((err,result)=> {
                if (err) {
                     return res.status(500).send({ msg: err.message }); 
                }
        
            //passwordResetToken.find({ _userId: user._id, resettoken: { $ne: resettoken.resettoken } }).remove().exec();
            // res.status(200).json({ message: 'Reset Password successfully.' });
            let link= "http://"+req.get('host')+"/reset_passw_beck";
            let mailOptions = {
            to: user.email,
            from: 'easy-license',
            subject: ' Reset password',
            text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
            'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
             ${link}/${resettoken.resettoken}'\n\n' +
            'If you did not request this, please ignore this email and your password will remain unchanged.\n`
            }
            
            smtpTransport.sendMail(mailOptions, function(error, response){
                if(error){
                   res.end("{error: 1}");
                }else{    
                   res.end("{error: 0}");
                }
           });

            }) 
        }
    })
    
    
}

exports.reset_passw_beck = function (req, res) {
   let key = req.params.key;
   let userID = '';
   let password = '';
   let receiverEmail = '';

  
   if(!key){
       res.send({error: 1})
   }else{
    passwordResetToken
    .findOne({resettoken: key})
    .then(data=>{
        // console.log(data)
        let{userId} = data;
        userID = userId;
        // console.log(userID)
        password = Math.random().toString(36).slice(2);

        return new Promise(function (res, rej){
            bcrypt.genSalt(10, function(err, salt) {
                if (err){rej(err)}else{
                    bcrypt.hash(password, salt, function(err, hash) {
                       let newpassword = hash;
                         res(newpassword)
                    });
                }
                
            });
        })
    })
    .then(passw => { 
        // console.log(userId, passw)
        User.findByIdAndUpdate(userID , 
        {   
            password: passw,
            
        },
        function(err, user ) {
            if (err) {
                return res.send(err);
            }else{
                // let email = user.email;
                receiverEmail = user.email;
                console.log(receiverEmail)
                console.log(password)
                
                let mailOptions = {
                    to: receiverEmail,
                    from: 'easy-license',
                    subject: 'Password reset',
                    text: `Your new password is ${password}`}
                    
                smtpTransport.sendMail(mailOptions, function(error, response){
                    if(error){
                       res.end("{error: 1}");
                    }else{    
                       res.end("{error: 0}");
                    }
               });
                
            }
        })})  
    .catch(err=>{
        res.send('error: 1')
    })
   }

}
