const Filter = require('./filterModel');

exports.add_filters = function(req,res){
    const reqBody = req.body;  
    const id = req.params.id;
    const {city,priceCurrency,priceFrom,priceTo,rate,transmission,time,availibleDateFrom,availibleDateTo} = reqBody;

    Filter.findOneAndUpdate(
        {userId : id},
        {
            $set: {city,priceCurrency,priceFrom,priceTo,rate,transmission,time,availibleDateFrom,availibleDateTo}
        },
        {upsert:true},
        function(err,filter){
            if(err){
                res.send(err)
            }else{ 
                res.send(filter)
            }           
        }
    )
    
}

exports.get_filters = function(req,res){ 
    const id = req.params.id;
    Filter.findOne(
        {userId : id},
        function(err, filt ){
           if(err){
               res.send(err)
               .end()
            }
           res.send(filt).end()
        }
    )

}
