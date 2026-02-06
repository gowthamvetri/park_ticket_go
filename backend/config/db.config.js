import mongoose, { model } from "mongoose";
import dotenv from "dotenv"

dotenv.config()

const db = mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("DB connected sucessfully")
}).catch(error=>{
    console.log("Error in connecting DB : "+error)
})

export default db;