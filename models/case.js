const mongoose = require('mongoose');
const User = require('./user');

const caseSchema = new mongoose.Schema({
    cnr:{
        type: String,
        required: true,
        unique:true
    },
    title:{
        type: String,
        required: true
    },
    idRep:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    nameRep:{
        type: String,
        required: true
    },
    nameAccused:{
        type: String,
        required: true
    },
    gender:{
        type: String,
        required: true
    },
    age:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now()
    },
    details:{
        type: String,
        required: true
    },
    clause:{
        type: String,
        required: true
    },
    phone:{
        type: Number,
        required: true
    },
    location:{
        type:String,
        required:false,
    },
    latitude:
    {
        type:String,
        required:false,
    },
    longitude:
    {
        type:String,
        required:false,
    },
    images:[{
        type: Buffer,
        required:false,
    }],
    lastHearingDate:{
        type: Date,
        required: false
    },
    dangerousCriminal:{
        type: Number,
        enum:[1,2,3,4,5],
        required: true
    },
    status:{
        type:String,
        default:"open",
    },
    verdict:{
        type:String,
        required:false
    },
    accusedLawyerName:{
        type:String,
        required:false
    },
    judgeAssigned:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    hearingDate:{
        type:Date,
        required:false
    }
});

const Case = mongoose.model('Case', caseSchema);
module.exports = Case;