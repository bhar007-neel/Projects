const mongoose = require("mongoose");
const connectDB= async()=>{
    try{
        mongoose.set('strictQuery',false);
        const conn= await mongoose.connect(process.env.MONOGODB_URI);
        console.log(`database connected: ${conn.connection.host}`);

    }catch(error){
        console.log(error)

    }
    
}
module.exports=connectDB;

