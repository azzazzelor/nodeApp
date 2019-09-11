const LocationSchema = require('./locationModel');

exports.updateLocation = function(req, res ){

    return createLocationModel(req.body)
        .then(()=>{
            console.log('resolve')
            res.status(200).json({error: 0});
        })
        .catch((err) =>{
            console.log('rejected')
            res.satus(200).json(err);
        });
}

const createLocationModel = function(data){
    const {id, latitude, longitude} = data;

    if(id === '') return res.send('Field id is required');
    if(latitude === '') return res.send('Field latitude is required');
    if(longitude === '') return res.send('Field latitude is required');

    return new Promise((resolve, reject) => {
       let newLocation = new LocationModel({
           userId : id,
           latitude,
           longitude
       })
       newLocation.save((err, location) => {
           if(err){ reject(err) 
        }else{
            return resolve(location);
           }
       })
    })
};

