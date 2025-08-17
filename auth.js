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

 