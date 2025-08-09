import mongoose from 'mongoose';

export async function connectDB(){
    try{
        mongoose.connect(process.env.MONGO_URL);
        const connection = mongoose.connection;
        connection.on('connected' , ()=>{
            console.log("Mongo DB connected")
        })
        connection.on('error' , (err)=>{
            console.log("Mongo DB connection error, please make sure DB in up  and runnning" + err);
            process.exit()
        })
    }catch(error){
        console.log("something went wrong in connecting to  DB")
        console.log(error)
    }
}