const mongoose = require("mongoose");

const sessionSchema = mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref:"User"},
    role: {type: String, required:true},
    experience: {type:String, required:true},
    topicsToFocus: {type:String, required:true},
    description: String,
    questions: [{type:mongoose.Schema.Types.ObjectId, ref:"Question"}]
}, {timeStamps:true})

module.exports = mongoose.model("Session",sessionSchema)