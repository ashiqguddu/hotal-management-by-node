const passport = require("passport");
const localStrategy = require("passport-local").Strategy;

const person = require ('./models/person')


// authentication 
passport.use(new localStrategy(async function (USERNAME , PASS , done){
  // authentication logic
  try {
     console.log('received credentials : ',USERNAME,PASS )

     const user = await person.findOne({username : USERNAME});

    //  console.log(user,'auth 15')
     
     if (!user ){

      return done(null,false , {message : 'incorrect User name'} )
     }
     
     //  for hashing
     const isPasswordMatch =  await user.comparePassword(PASS)
    //  console.log(isPasswordMatch , 'aut/h 21')
     if (isPasswordMatch) {
        return done(null, user);
      }else{
        done(null,false,{message:'incorrect Password.'})
      }
//      if(user.password === password){
    //  return done(null, user);
//      }else{
//         done(null,false,{message:'incorrect Password.'})
//       }

     // const isPasswordMatch = user.password === password ? true :false // password match then true otherwise false  // match password for not be hashed

 

  } catch (error) {
    console.log(error , {message:'maybe user or password wrong'})
    // return done(error ) 
  }
  
}))

module.exports = passport  //export passport

// const passport = require("passport");
// const LocalStrategy = require("passport-local").Strategy;
// const Person = require("./models/person");

// // Authentication
// passport.use(
//   new LocalStrategy(async function (username, password, done) {
//     try {
//       console.log("Received credentials:", username, password);

//       // Make sure we also get the password field from MongoDB
//       const user = await Person.findOne({ username }).select("+password");
//       console.log(user, "auth 15");

//       if (!user) {
//         return done(null, false, { message: "Incorrect username" });
//       }

//       // Compare entered password with hashed one
//       const isPasswordMatch = await user.comparePassword(password);
//       console.log(isPasswordMatch, "auth 21");

//       if (isPasswordMatch) {
//         return done(null, user);
//       } else {
//         return done(null, false, { message: "Incorrect password" });
//       }
//     } catch (error) {
//       console.log(error, { message: "Maybe user or password wrong" });
//       return done(error);
//     }
//   })
// );

// module.exports = passport;
