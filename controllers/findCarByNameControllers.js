const mongoose = require('mongoose'),
    Instructor = mongoose.model('Instructor');
    // School = mongoose.model('School');

const get_car_by_name = function (req,res){
    const brand = req.query.car_brand;
    const page_num = +req.query.page_number;
    const limit = 10;

    if(brand === ''){
        res.status(400).json({ error: 'No brand' })
    }
    if(isNaN(page_num)){
        res.status(400).json({ error: 'No page number' })
    }

    Instructor
    .find({'car': {$elemMatch: {brand: brand }}})
    .skip((page_num - 1) * limit).limit(limit)
    .exec(function(err, result) {
        if(err){
            res.send(err)
        }else{
            res.send(result)
        }
    });
}

exports.get_car_by_name = get_car_by_name;