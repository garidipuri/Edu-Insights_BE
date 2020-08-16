//Import the Models
const User = require('../models/user');
const Exam = require('../models/exam');
const Answers = require('../models/answers');

const mongoose = require('mongoose');

// variable to respond with data.
var result = {};


// start test.
exports.start_test = function(req, res) {
    

    User.findOne({email: req.body.email},(error, user)=>{
        if(error){
            result = {
                success: false,
                message: JSON.stringify(error),
                data: null
            }
            res.send(result);
        } else {
            if(user !== null){
              var examStatus = user.get('exam_status');
              if(examStatus === "2"){
                result = {
                    success: false,
                    message: 'You have already completed the Test.',
                    data: null
                }
                res.send(result);
              } else {
                result = {
                    success: true,
                    message: 'user can start the exam',
                    data: user
                }
                res.send(result);
              }
            } else {
                const user = new User({
                    _id: new mongoose.Types.ObjectId(),
                    email: req.body.email,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    exam_status: "1",
                });

                user.save((error, user) => {
                    if(error){
                        result = {
                            success: false,
                            message: JSON.stringify(error),
                            data: null
                        }
                        res.send(result);
                    } else {
                        result = {
                            success: true,
                            message: 'user can start the exam',
                            data: user
                        }
                        res.send(result);
                    }
                });
            }
        }
    });
    
}


exports.end_test = function(req, res) {
     Answers.findOne({test_number: req.body.test_number},(error, answers)=>{
         if(error){
            result = {
                success: false,
                message: JSON.stringify(error),
                data: null
            }
            res.send(result);
         } else {
             if(answers !== null){

                
                var answers_list = answers.get('answers');
                
                var exam = new Exam({
                    _id: new mongoose.Types.ObjectId(),
                    user_id: req.body._id,
                    answers: req.body.answers
                })

                exam.save((error, answers) => {
                    if(error){
                        result = {
                            success: false,
                            message: JSON.stringify(error),
                            data: null
                        }
                        res.send(result);
                    } else {

                    var score = 0;
                    
                    var answers_requested = answers.get('answers');
                    console.log(answers_list, answers_requested)
                    
                    for(var element of answers_list){

                        if(element === answers_requested[answers_list.indexOf(element)]){
                             score  = score +1;
                        } 

                    }

                console.log(score);
                User.updateOne({_id: req.body._id},{$set:{exam_score: score, exam_status: "2"}},(error)=>{
                    if(error){
                        result = {
                            success: false,
                            message: JSON.stringify(error),
                            data: null
                        }
                        res.send(result);
                    } else {
                        User.findOne({_id: req.body._id},(error, user)=>{
                            if(error){
                                result = {
                                    success: false,
                                    message: JSON.stringify(error),
                                    data: null
                                }
                                res.send(result);
                            } else {
                                result = {
                                    success: true,
                                    message: 'You have completed the test successfully',
                                    data: user
                                }
                                res.send(result);
                            }
                        });
                    }
                })
                        
                    }
                });
             

             } else {
                result = {
                    success: false,
                    message: 'Something went wrong.',
                    data: null
                }
                res.send(result);
             }
         }
     })
}

// save the answers in the databse.
exports.save_answers = function(req, res) {
    
    const answers  = new Answers({
        _id: new mongoose.Types.ObjectId(),
        test_number: req.body.test_number,
        answers: req.body.answers
    })

    answers.save((error, answers) => {
        if(error){
            result = {
                success: false,
                message: JSON.stringify(error),
                data: null
            }
            res.send(result);
        } else {
            result = {
                success: true,
                message: 'answers saved',
                data: answers
            }
            res.send(result);
        }
    });
}