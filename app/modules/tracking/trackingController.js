const TrackingModel = require('./trackingModel');
const BookingModel = require('../booking/bookingModel');

exports.startTracking = function (req, res) {
    const {instructorId, studentId, coordinates, pricePerKm, orderId} = req.body;
    
    let newTrack = new TrackingModel({
        instructorId : instructorId,
        studentId : studentId,
        coordinates: coordinates,
        pricePerKm: pricePerKm,
        orderId: orderId
    })
    
    newTrack.save((err,track)=>{
        if(err){
            res.send(err)
        }else{
            BookingModel.updateOne({_id: orderId},{trackId: track._id},(err)=>{if(err){res.send({error:1})}});
            res.send(track)
        }
    })
}

exports.addPoints = function (req, res) {
    const {coordinates, trackingId, distance,} = req.body;
    console.log(coordinates)
    console.log(typeof coordinates)
    TrackingModel
    .findByIdAndUpdate(trackingId,
        {$push : {
            coordinates
         }
       })
    .exec((err,result)=>{
        if(err){
            res.send(err)
        }else{
            let resulst = calculateDistance(result.pricePerKm,distance );
            res.send({distance:distance,price:resulst})
        }
    })
}


exports.getTrack = function (req, res) {
    const {trackingId} = req.body;

    if(!trackingId) {
        res.status(422).send({ error: 'Please enter tracking Id.' });
    }

    TrackingModel
    .findById(trackingId)
    .exec((err, result)=>{
        if(err){
            res.send(err)
        }else{
            res.send(result)
        }
    })

}
 




const calculateDistance = function (price_per_km, distance){  
    return (price_per_km * distance) / 1000;
} 

exports.getSystemPref = function (req, res) {
    // console.log(process.env.HOST,process.env.PORT )
    res.send({server, port: process.env.PORT})
}