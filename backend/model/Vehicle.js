import mongoose from "mongoose"

const vehicleSchema = mongoose.Schema({
    vno:{
        type:String,
        required:true
    },vmodel:{
        type:String,
        default:""
    },user:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true
    },isParked:{
        type:Boolean,
        default:true
    },parkedAt:{
        type:String,
        default:Date()
    }
})

export default mongoose.model("Vehicle",vehicleSchema)