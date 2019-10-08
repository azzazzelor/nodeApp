const TrackingModel = require('./trackingModel');

exports.startTracking = function (req, res) {
    const {instructorId, studentId, coordinates, pricePerKm} = req.body;
    
    let newTrack = new TrackingModel({
        instructorId : instructorId,
        studentId : studentId,
        coordinates: coordinates,
        pricePerKm: pricePerKm
    })
    
    newTrack.save((err,result)=>{
        if(err){
            res.send(err)
        }else{
            res.send(result)
        }
    })
}

exports.addPoints = function (req, res) {
    const {coordinates, trackingId, distance,} = req.body;

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
            res.send(`price per ${distance}m is ${resulst} currency`)
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