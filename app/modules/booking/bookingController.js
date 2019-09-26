const OrderModel = require('./bookingModel');
const UserModel = require('../user/userModel');
const InstructorModel = require ('../instructor/instructorModel')

exports.filterBookings = function(req, res){
//  1 найти всех ближайших инстр и школ по локации
    const {
        latitude,
        longitude,
        maxDistance,
        pageNumber,
        priceFrom,
        priceTo,
        priceType,
        transmission
    } = req.body;

    const latitudeNum = +latitude;
    const longitudeNum = +longitude;
    const arrWithInstructors = [];
    const arrWithSchools = [];
    let resArr = []
       const LocatesWithInstructors = UserModel.find(
            {
                "roleType": "instructor",
                // "roleType": "school",
                "location": {
                    $near:{
                        $geometry: {
                            type: "Point",
                            coordinates: [longitudeNum, latitudeNum]
                        },
                        $maxDistance: +maxDistance
                    }
                },
            }
        ).select('_id')
        LocatesWithInstructors.then((data=>{
            arrWithInstructors.push(...data);
           const LocatesWithSchools =  UserModel.find(
            {
                // "roleType": "instructor",
                "roleType": "school",
                "location": {
                    $near:{
                        $geometry: {
                            type: "Point",
                            coordinates: [longitudeNum, latitudeNum]
                        },
                        $maxDistance: +maxDistance
                    }
                },
            }
        ).select('_id')
            return LocatesWithSchools
        }))
        .then((LocatesWithSchools)=>{
            arrWithSchools.push(...LocatesWithSchools);

            let instructors = InstructorModel.find({
                "car.transmission": transmission,
                pricePerHourCurrency: priceType,
                "car.pricePerHour": {$gt : priceFrom , $lt: priceTo}
        }).select('userId -_id')
        return instructors;
        })
        .then(data=>{
            arrWithInstructors.push(...data);
            let newarrWithSchools = arrWithSchools.map(a =>  a._id ).map(a => a.toString())
            let newarrWithInstructors = arrWithInstructors.map(a =>  a._id || a.userId ).map(a => a.toString())
            let finallInstructors = findDuplicates(newarrWithInstructors)
            let finallArr = [...newarrWithSchools,...finallInstructors];
            return finallArr
        })
        .then(data=>{
            // let arr =[]
            return new Promise(function(resolve, reject) {
                
              return  new Promise(((res, rej)=>{
                  data.map(id => {
                  return new Promise((res, rej)=>{
                      return OrderModel.find({orderOfilietId:id},(er,res)=>{
                          if(er){reject(err)}else{
                              resolve(res)
                          }
                      })
               })
       
                }
            )}))
            
        })
        //.then(data=>{console.log(data)})
    // }).then(data=>{console.log(data)})
        //     console.log(data)
        // })

//  2 отфильтровать по фильтру 
//  3 проверить по букингу 

// data=>{ console.log('instructors id'+ data)
//         console.log("arr with locates ids" +arr)}

// let instructors = InstructorModel.find({transmission: transmission,
//     pricePerHourCurrency: priceType,
//     pricePerHour: {$gt : priceFrom , $lt: priceTo}
})}  


let findDuplicates = arr => arr.filter((item, index) => arr.indexOf(item) != index)


exports.addBooking = function(req, res){
    const {
           ownerUserId,
           orderOfilietId,
           orderStartTime,
           orderType,
           orderEndTime,
           orderDescription,
           orderPeriods
        } = req.body;

    // if(compareIntervals()){

    // }

    const BookingModel = new OrderModel({
        orderUserId: ownerUserId,
        orderOfilietId: orderOfilietId,
        orderStartTime : orderStartTime,
        orderType: orderType,
        orderEndTime : orderEndTime,
        orderDescription : orderDescription
    })

    BookingModel.save((err,res)=>{
        if(err){
            console.log(err)
        }else{
            console.log(res)
        }
    })

}


// const  compareIntervals = function (start1 , end1 ,start2, end2){
// 	if( (start1 > start2 && start1 < end2) || (start2 > start1 && start2 < end1) ){
// 		console.log('пересекаются')
// 	}else{
// 		console.log(' не пересекаются')
// 	}
// }

exports.getOrders = function (req,res) {
    const type = req.params.type;
    const {orderOfilietId, pageNumber} = req.body;
    const limit = 10;

    OrderModel
    .find({
        orderOfilietId: orderOfilietId,
        orderStatus: type
    })
    .skip((+pageNumber - 1) * limit).limit(limit)
    .exec(function(err, result) {
        if(err){
            res.send(err)
        }else{
            res.send(result)
        }
    });
}

exports.changeOrderStatus = function (req, res){
    const {orderId, orderStatus } = req.body;

    OrderModel
    .updateOne({
        '_id': orderId
    },
    {
        $set : {
            orderStatus: orderStatus
        }
    })
    .exec(function(err, result) {
        if(err){
            res.send(err)
        }else{
            res.send("error: 0")
        }
    });
}

exports.getInProgresStudents = function (req,res) {
    const {orderOfilietId, pageNumber} = req.body;
    let inprogress = 'inProgress';
    let limit = 10;
    
        try {
            const Models = OrderModel.find({orderOfilietId: orderOfilietId,orderStatus:inprogress})
            .select('orderUserId -_id');

        Models
        .skip((+pageNumber - 1) * limit).limit(limit)
        .then(data=>{  
            if(data.length !==0 ){
            let uniq = {}
            let arrFiltered = data.filter(obj => !uniq[obj.orderUserId] && (uniq[obj.orderUserId] = true));
            res.status(200).send(arrFiltered);
            }else{
            res.status(200).send([]).end()
            }
         })
        .catch(err=>{
            res.status(400).send({error : "No orderOfiliet id or bed request"})
        })
        } catch (error) {
            res.status(400).send({error : "No orderOfiliet id or bed request"})
        }
        
}





// then(orders =>{
//     const newArr = orders.map(obj=>{
//         let rObj = {};
//         let count = 0
//         rObj[0] = obj.orderUserId
//         console.log(rObj)
//     })