const nodemailer = require("nodemailer");
const User = require('../user/userModel')


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
    link= "http://"+req.get('host')+"/verify?id="+rand;
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
    if (email) {
        return res
        .status(422)
        .json({ message: 'Email is required' });
        }

    User.
    findOne({
    email: email
    }).then(user=>{
        if (!user) {
            return res
            .status(409)
            .json({ message: 'Email does not exist' });
            }
    })
    
    var resettoken = new passwordResetToken({ _userId: user._id, resettoken: crypto.randomBytes(16).toString('hex') });
    resettoken.save(function (err) {
    if (err) { return res.status(500).send({ msg: err.message }); }
    passwordResetToken.find({ _userId: user._id, resettoken: { $ne: resettoken.resettoken } }).remove().exec();
    res.status(200).json({ message: 'Reset Password successfully.' });
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        port: 465,
        auth: {
        user: 'user',
        pass: 'password'
        }
    });
    var mailOptions = {
    to: user.email,
    from: 'your email',
    subject: 'Node.js Password Reset',
    text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
    'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
    'http://localhost:4200/response-reset-password/' + resettoken.resettoken + '\n\n' +
    'If you did not request this, please ignore this email and your password will remain unchanged.\n'
    }
    transporter.sendMail(mailOptions, (err, info) => {
    })
    })
}

exports.reset_passw_beck = function (req, res) {
    
}
