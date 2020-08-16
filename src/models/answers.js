
const mongoose = require('mongoose');

const answersSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    test_number: {type: Number, default:0},
    answers: {type: Array, default:[]}
});

const Answers = mongoose.model('Answers', answersSchema);
module.exports =  Answers;