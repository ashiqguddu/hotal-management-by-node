const mongoose = require('mongoose')

// Define the mongodb connection url 

const mongoURL = 'mongodb://localhost:27017/mydb' // replace 'mydatabase' with your database name

// set up mongoDB connection

// mongoose.connect(mongoURL,{ // by video 
//     useNewParser:true,
//     useUnifiedTopology:true
// });

mongoose.connect(mongoURL)
// .then(() => {
//     console.log('MongoDB connected');
// })
// .catch((err) => {
//     console.error('MongoDB connection error:', err);
// });

// get the default connection
// mongoose maintains a default connection object representing the mongoDB connection
const db = mongoose.connection


// Define event listenrs for database connection 


db.on('connected' ,()=>{
    console.log('connected to mongodb server')
})

db.on('error', (err)=>{
    console.error('mongoDB connection rooor:',err)
})

db.on('disconnected',()=>{
    console.log('mongoDB disconnected')
})

// export a database connection

module.exports = db