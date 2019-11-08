const OrderModel = require('./bookingModel');
const UserModel = require('../user/userModel');
const InstructorModel = require ('../instructor/instructorModel')

exports.filterBookings = function(req, res){
//  1 найти всех ближайших инстр и школ по локации
    const {
        latitude,
        longitude,
        maxDistance,
        priceFrom,
        priceTo,
        priceType,
        transmission,
        dateFrom,
        dateTo
    } = req.body;

    try {
        const latitudeNum = +latitude;
        const longitudeNum = +longitude;
        const arrWithInstructors = [];
        const arrWithSchools = [];
        let resArr = [];
        let resArrWithFilerSchoolsInstroctors = [];
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
            resArrWithFilerSchoolsInstroctors.push(...data);
            const orders = OrderModel.find({'orderStatus':'inProgress',orderCreateDate : {$gt : dateFrom, $lt: dateTo}}).select('orderStartTime orderEndTime orderType orderOfilietId ')
            return orders;
        })
        .then(data=>{
              compare(data)
            res.send(resArr)
        })
        .catch(err=>{
            res.send('error: 1')
        })
      

        // let resArr = [];


        const compare = function (arrOfObj){
        
            return arrOfObj.filter((val)=>{
                let string = val.orderOfilietId.toString()
                    resArrWithFilerSchoolsInstroctors.forEach(i=>{              
                        if(i === string){
                            resArr.push(val)
                        }
                }) 
            })
        }
    } catch (error) {
        if(error){
            res.send('{error : 1}')
        }
    }
}  



let findDuplicates = arr => arr.filter((item, index) => arr.indexOf(item) != index)



exports.addBooking = function (req, res){
   
    const {
           ownerUserId,
           orderOfilietId,
           orderType,
           orderDescription,
           orderPeriod,
           unicID
        } = req.body;
        
            //     let resultArr = [];
            //     let inprogress = 'inProgress'
    
            //         const orders = OrderModel.find({orderOfilietId:orderOfilietId,orderStatus:inprogress,orderType:'per_hour'})
            //         orders.then(data=>{
            //                 // console.log(data)
            //             data.forEach((val)=>{
            //             let start1 = +val.orderStartTime;
            //             let end1 = +val.orderEndTime;
            //             //    console.log(start1,end1)
            //             //    console.log('start end 1  ' + start1,end1)
            //             orderPeriod.forEach(element => {
            //                 let start2 = +element.orderStartTime;
            //                 let end2 = +element.orderEndTime;
            //                 compareIntervals(start1,end1,start2,end2)
            //             });
            //         })
            //         return resultArr;
            //         }).then(data=>{
            //             // console.log(data)
            //             if(data.length === 0){
                            
                            orderPeriod.forEach(element => {
                                let start = element.orderStartTime;
                                let end = element.orderEndTime;
                                
                                const BookingModel = new OrderModel({
                                    orderUserId: ownerUserId,
                                    orderOfilietId: orderOfilietId,
                                    orderStartTime : start,
                                    orderType: orderType,
                                    orderEndTime : end,
                                    orderDescription : orderDescription,
                                    unicId: unicID
                                })
                                BookingModel.save((err,result)=>{
                                    if(err){
                                        
                                        return res.status(200).json('error: 1')                     
                                    }
                                })
                            });

                            return res.status(200).json('error: 0').end();
            //             }else{
            
            //                 return res.status(200).json('error: 1');
            //             }
            //         }).catch(err=>{
            //             return res.status(200).json('error: 1');
            //         })
            
            //         const  compareIntervals = function (start1 , end1 ,start2, end2){
            //             if(start1===start2 ){
            //                 resultArr.push(start1 , end1 )
            //             }
            //             if(end1===end2 ){
            //                 resultArr.push(start1 , end1 )
            //             }
            //             if( (start1 > start2 && start1 < end2) || (start2 > start1 && start2 < end1) ){
            //                 resultArr.push(start1 , end1 ,start2, end2)
            //             }
            //         }
            // // } catch (error) {
        //     if(error){
        //         return res.status(200).json('error: 1');
        //     }
        // }
}



exports.getOrders = function (req,res) {
    const type = req.params.type;
    const {orderOfilietId, pageNumber} = req.body;
    const limit = 10;

        try {
            OrderModel
            .find({
                orderOfilietId: orderOfilietId,
                orderStatus: type
            })
            // .skip((+pageNumber - 1) * limit).limit(limit)
            .exec(function(err, result) {
                if(err){
                    res.send(err)
                }else{
                    if(result.length === 0){
                        return  res.status(200).json(result)
                    }else{  
                        let grouped = getGroupedArray(result, 'unicId');
                        return res.status(200).json(grouped)
                    }
                }
            });
        } catch (error) {
                res.send('error: 1')
        }
}

const getGroupedArray = (array, key) => {
    const object = array.reduce((sum, current) => {
      (sum[current[key]] = sum[current[key]] || []).push(current);
      return sum;
    }, {});
  
    return Object.values(object);
  };


// exports.changeOrderStatus = function (req, res){
//     const {orderId, orderStatus } = req.body;
//     try {
//         OrderModel
//     .updateOne({
//         '_id': orderId
//     },
//     {
//         $set : {
//             orderStatus: orderStatus
//         }
//     })
//     .exec(function(err, result) {
//         if(err){
//             res.send(err)
//         }else{
//             res.send("error: 0")
//         }
//     });
//     } catch (error) {
//         if(error){
//             res.send('error: 1')
//         }
//     }
    
//}

exports.accept = function (req, res) {
    const {unicID} = req.body;
    let inprogress = 'inProgress';
    OrderModel
    .updateMany(
        {unicId:unicID},
        { $set : {  orderStatus: inprogress }},(err,result)=>{
            if(err){
                res.send('error: 1')
            }else{
                res.send('error: 0')
            }
        })
    
}

exports.decline = function (req, res) {
    const {unicID} = req.body;
    OrderModel
    .deleteMany({unicId:unicID},(err,result)=>{
        if(err){
            res.send('error: 1')
        }else{
            res.send('error: 0')
        }
    })
}

exports.getInProgresStudents = function (req,res) {
    const {orderOfilietId, pageNumber} = req.body;
    let inprogress = 'inProgress';
    let finished = 'Finished';
    let limit = 10;
    
        try {
            const Models = OrderModel.find({orderOfilietId: orderOfilietId,orderStatus: inprogress, orderStatus: finished})
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

exports.getByUnicId = function (req, res){
    const { unicID } = req.body;

    if(!unicID) {
        return  res.status(422).send({ error: 'Please send unicID.' });
	}
    
    OrderModel
    .find({unicId: unicID })
    .then(data=>{
        res.send(data)
    })
    .catch(error=>{
        res.send('error: 1')
    })
}

exports.finishOrder = function (req, res) {
    const { orderId } = req.body;

    if(!orderId) {
        return  res.status(422).send({ error: 'Please send orderId.' });
    }
    
    let finished = 'Finished';

    OrderModel
    .findOneAndUpdate(
        {_id:orderId},
        { $set : {  orderStatus: finished }}
    )
    .then(result=>{
        res.send('error: 0')
    })
    .catch(error=>{
        res.send('error: 1')
    })
}  

exports.getStudentsOrders = function (req, res) {
    const { studentId } = req.body;
    let inprogress = 'inProgress';

    OrderModel
    .find({orderUserId: studentId,orderStatus:inprogress})
    .then(data=>{
            let grouped = getGroupedArray(data, 'unicId');
            return res.status(200).json(grouped)
    })
    .catch(error=>{
        res.send('error: 1')
    })
}

exports.getOneOrder = function (req, res) {
    let {orderId} = req.body;

    if(!orderId) {
        return  res.status(422).send({ error: 'Please send orderId.' });
    }

    OrderModel
    .findById(orderId)
    .then(data=>{
        res.status(200).json(data)
    })
    .catch(error=>{
        res.send('error: 1')
    })    
}