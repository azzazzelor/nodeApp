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
             
           res.end("error");
        }else{
               
           res.end("send");
            }
   });
}

exports.getScript = function (req, res) {
 
    if((req.protocol+"://"+req.get('host'))==("http://"+host)){
        
        if(req.query.id==rand){
            

            User.update({email:emeil},{"active": "true"},(err, result)=>{
                if(err){console.log(err)}else{
                    console.log(result)
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
