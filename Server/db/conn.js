const mongoose = require('mongoose');
require('dotenv').config();
const {MONGO_URL} = process.env;

const dbConnect = ()=>{
    mongoose.connect(MONGO_URL).then(()=>console.log('Database connected')).catch((err)=>{
        console.log('Error in connecting database',err)
    })
}

module.exports=dbConnect