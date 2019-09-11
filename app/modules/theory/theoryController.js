const TheoryModel = require('./theoryModel');

exports.addCourse = function (req,res) {
    const {name, posts, topics} = req.body;
    const {title, text, rating, data} = topics; 
   
    const newTheoryModel = new TheoryModel({
        name: name,
        posts: posts,
        topics:{
            title: title,
            text: text,
            rating: rating,
            data: data,
        }
    })
    newTheoryModel.save((err,model) =>{
        if (err){
            res.send(err)
        }else{
            res.send({error: 0})
        }
    })
};

exports.getAllCourses = function (req, res) {
     TheoryModel.find({},(err,result) =>{
        if(err){
            res.send(err)
        }else{
            res.send(result)
        }
     })
};

exports.addNewTopic = function (req, res) {
    const {courseId, topic} = req.body;
    
    TheoryModel.findOneAndUpdate({'_id' : courseId}, {$push: {topics: topic}},(err,result)=>{
        if(err){
            res.send(err)
        }else{
            res.send({error: 0})
        }
    })    
};

exports.changeTopicRating = function (req, res) {
    const {topicId, rating} = req.body;
    
    TheoryModel.update(
        {'topics._id': topicId},
        {'$set':{
        'topics.$.rating': rating
    }},(err,result)=>{
        if(err){
            res.send(err)
        }else{
            res.send(result)
        }
    })    
};

