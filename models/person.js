const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

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
    username:{
        type:String,
        required:true
    },
     password:{
        type:String,
        required:true
    }
    
})

// presonSchema.pre('save',async function (next) {
//     const person = this;
//     // Hash the password onyl if it has been modified (or is new)
//     if(!person.isModified('password')) return next()
//     try {
//         // hash password generate 
//         const salt = await bcrypt.genSalt(10);
//         //hash password
//         const hashedPassword = await bcrypt.hash(person.password,salt);
        
//         //override the plain password with hashed one

//         person.password = hashedPassword;


//        next() 
//     } catch (error) {
//         next(error)
//     }
// });

// presonSchema.methods.comparePassword = async  (candidatePassword)=>{
// try {
//     // use bcrypt to compare the provided password with the hashed password 

//       if (!candidatePassword || !this.password) {
//     throw new Error("Password and hash are required");
//   }
//     const isMatch= await bcrypt.compare(candidatePassword, this.password)

//     return isMatch ;
// } catch (error) {
//     throw(error)
// }
// }

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




