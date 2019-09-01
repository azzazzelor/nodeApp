const cloudinary = require('cloudinary').v2;

exports.uploadPhoto = (req,res) =>{
let photo = req.files;
let photoPath = photo.img.tempFilePath;

cloudinary.uploader.upload(photoPath,
        (err,result)=>{
            if(err){
                res.send(err)
            }else{
                res.send(result)
            }
        }
    )
}