const mongoose = require('mongoose');
const Filter = require('../models/filter');

const add_filters_for_user = function(req,res){
    const reqBody = req.body;  
    const id = req.params.id;
    const {city,price_currency,price_from,price_to,rate,transmission,time,availible_date_from,availible_date_to} = reqBody;

    Filter.findOneAndUpdate(
        {user_id:id},
        {
            $set: {city,price_currency,price_from,price_to,rate,transmission,time,availible_date_from,availible_date_to}
        },
        {upsert:true},
        function(err,filter){
            if(err){res.send()}
            res.send(filter)
            
        }
    )
    
}

const get_user_filters = function(req,res){ 
    const id = req.params.id;
    Filter.findOne(
        {user_id : id},
        function(err,filt){
           if(err){res.send(err).end()}
           res.send(filt).end()
        }
    )

}


exports.add_filters_for_user = add_filters_for_user;
exports.get_user_filters = get_user_filters;