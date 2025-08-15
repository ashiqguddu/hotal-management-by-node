const passport = require("passport");
const localStrategy = require("passport-local").Strategy;

const person = require ('./models/person')


// authentication 
passport.use(new localStrategy(async (username , password , done)=>{
  // authentication logic
  try {
    //  console.log('received credentials : ',username,PASSWORD )
     const user = await person.findOne({username : username});
     if (!user ){
      return done(null,false , {message : 'incorrect User name'} )
     }
     const isPasswordMatch = user.password === password  ? true :false // password match then true otherwise false 
    // const isPasswordMatch =   user.comparePassword(password)
     if (isPasswordMatch) {
        return done(null, user);
      }else{
        done(null,false,{message:'incorrect Password.'})
      }
    // console.log(isPasswordMatch)
 

  } catch (error) {
    console.log(error , {message:'maybe user or password wrong'})
    // return done(error ) 
  }
  
}))

module.exports = passport  //export passport