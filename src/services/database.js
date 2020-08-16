// import mongoose
const mongoose = require('mongoose');


 exports.Database_connect_default =  function () {

    // connect to mongo database
    const uri = process.env.DB_CONNECT+`/`+ process.env.DB_NAME;
     console.log(uri);
     mongoose.connect( uri, { useNewUrlParser: true, useUnifiedTopology: true }, (error) =>{
    
        if(error){

            console.log(error);

        }

        else {

            console.log('successfully connected to mongoDB database:', process.env.DB_NAME);

        }
    
    });

 } 