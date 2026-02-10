import mongoose from "mongoose";

const billSchema = mongoose.Schema({
    vehicle:{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:"Vehicle"
    },
    user:{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:"User"
    },token:{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:"Token"
    },
    totalCost:{
        type:Number,
        required:true
    },
    ispaid:{
        type:Boolean,
        default:false
    },
    paymentSessionId:{
        type:String,
        default:null
    },
    departuredDate:{
        type:Date,
        default:new Date()
    }
})

export default mongoose.model("Bill",billSchema)