import mongoose from "mongoose";

const tokenSchema = mongoose.Schema({
    vno:{
        type:String,
        required:true
    },
    vehicle:{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:"Vehicle"
    },
    user:{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:"User"
    },
    parkedAt:{
        type:String,
        default:Date()
    },isValid:{
        type:Boolean,
        default:true
    }
})

export default mongoose.model("Token",tokenSchema)