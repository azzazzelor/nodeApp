const Filter = require('./filterModel');

exports.add_filters = function(req,res){
    const reqBody = req.body;  
    const id = req.params.id;
    const {km,priceCurrency,priceFrom,priceTo,rate,transmission,time,availibleDateFrom,availibleDateTo} = reqBody;

    Filter.findOneAndUpdate(
        {userId : id},
        {
            $set: {km,priceCurrency,priceFrom,priceTo,rate,transmission,time,availibleDateFrom,availibleDateTo}
        },
        {upsert:true},
        function(err,filter){
            if(err){
                return res.send(err)
            }else{ 
                return res.send(filter)
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
            return res.send(err)
               .end()
            }
            return res.send(filt).end()
        }
    )

}
