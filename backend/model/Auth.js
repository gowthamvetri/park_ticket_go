import mongoose from "mongoose";

const authSchema = mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },password:{
        type:String,
        required:true,
    },role:{
        type:String,
        enum:["User","Admin"],
        default:"User"
    }
})

export default mongoose.model("Auth",authSchema)