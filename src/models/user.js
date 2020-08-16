
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
	email: {type: String, default: ""},
    firstName: {type: String, default: ""},
    lastName: {type: String, default: ""},
    exam_score: {type: Number, default: 0},
    exam_status: {type: String, default: "1"}, /** "1"-> started, "2"->ended */
    
});

const User = mongoose.model('User', userSchema);
module.exports =  User;