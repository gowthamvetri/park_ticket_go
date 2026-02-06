import mongoose from "mongoose";
import Vehicle from "./Vehicle.js";

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },phone:{
        type:String,
        required:true
    }
})

export default mongoose.model("User",userSchema)