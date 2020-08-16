
const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
	user_id: mongoose.Schema.Types.ObjectId,
    answers: {type: Array, default:[]}
});

const Exam = mongoose.model('Exam', examSchema);
module.exports =  Exam;