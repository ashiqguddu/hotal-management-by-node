const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// define person schema

const presonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  work: {
    type: String,
    enum: ["chef", "waiter", "manager"],
    required: true,
  },
  mobile: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
  },
  salary: {
    type: Number,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// bcrypt creat here

presonSchema.pre("save", async function (next) {
  const person = this;
  // Hash the password onyl if it has been modified (or is new)
  if (!person.isModified("password")) return next(); // when we update salary of person then the if condition return false opposit of false is true then return next() is called  already user store in data base so if conditon return true opposite of true is false then the next part of the code will be execute
  try {
    // hash password generate
    const salt = await bcrypt.genSalt(10);
    //hash password
    const hashedPassword = await bcrypt.hash(person.password, salt);

    //override the plain password with hashed one

    person.password = hashedPassword;

    next();
  } catch (error) {
    next(error);
  }
});

presonSchema.methods.comparePassword = async function (candidatePassword)  {

  try {
    // console.log(candidatePassword,'person 70')
    // use bcrypt to compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;

  } catch (error) {
    throw error;
  }
};

// presonSchema.methods.comparePassword = async function (candidatePassword){
//     try {
//         const isMatch = await bcrypt.compare(candidatePassword,this.password);
//         return isMatch
//     } catch (error) {
//         throw(error)
//     }
// }
// create person model

const person = mongoose.model("person", presonSchema);
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
