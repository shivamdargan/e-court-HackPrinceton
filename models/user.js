const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const validator = require('validator')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        enum : ['police','registrar','lawyer','judge'],
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim:true,
        unique:true,
        lowercase:true,
        validate(value) {
            if(!validator.isEmail(value)){
                throw new Error('Email is Invalid')
            }
        }
    },
    uid:{
        type:String,
        required:true
    },
    password: {
        type: String,
        required: false,
        trim: true
    },
    location:{
        type:String,
        required:false,
    },
    courtName:{
        type:String,
        required: false
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
    noOfCases:{
        type:Number,
        default:0,
        required:false
    },
    assignedCaseIds:[{
        type:String,
        required:false
    }]
})
userSchema.pre('save', async function (next) {

    const user = this

    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8)
    }
    next()

})


const User = mongoose.model('User', userSchema)

module.exports = User