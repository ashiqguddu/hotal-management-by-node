const mongoose = require('mongoose')

// define person schema

const presonSchema = new mongoose.Schema({
    name:{
        type:String,
        required : true
    },
    age:{
        type:Number
    },
    work:{
        type:String,
enum: ['chef', 'waiter', 'manager'],
        required:true
    },
    mobile:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    address:{
        type:String
    },
    salary:{
        type:Number,
        required:true
    },
    
})

// create person model

const person = mongoose.model('person',presonSchema)
module.exports = person;



// {
//     "name": "Amit",
//     "age": 40,
//     "work": "chef",
//     "mobile": "9751-25-948",
//     "email": "abc@gmail.com",
//     "address": "indore",
//     "salary": "45000"
// }




