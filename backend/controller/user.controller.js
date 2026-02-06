import Bill from "../model/Bill.js";
import Token from "../model/Token.js";
import User from "../model/User.js";
import Vehicle from "../model/Vehicle.js";

export const getInfo = async(req,res)=>{
    try {
        
        const email = req.email;

        const user = await User.findOne({email:email})

        return res.status(200).json({
            message:"User retrived Successfully",
            error:false,
            success:true,
            data:user
        })

    } catch (error) {
        return res.status(500).json({
                message:"Internal server error :"+error,
                error:true,
                success:false
            })
    }
}

export const updateInfo = async(req,res)=>{
    try{

        const email = req.email
        const data = req.body

        await User.findOneAndUpdate({email:email},{$set:data},{new:true})

        return res.status(200).json({
            message:"User updated successfully",
            error:false,
            success:true
        })

    } catch (error) {
        return res.status(500).json({
                message:"Internal server error :"+error,
                error:true,
                success:false
            })
    }
}

export const getAllTokens = async(req,res)=>{
    try {

        const user = await User.findOne({email:req.email})

        const tokens = await Token.find({user:user._id})

        return res.status(200).json({
            message:"Tokens are retrived successfully",
            error:false,
            success:true,
            data:tokens
        })
        
    } catch (error) {
        return res.status(500).json({
                message:"Internal server error :"+error,
                error:true,
                success:false
            })
    }
}

export const getAllBills = async(req,res)=>{
    try {

        const user = await User.findOne({email:req.email})

        const bills = await Bill.find({user:user._id})

        return res.status(200).json({
            message:"Tokens are retrived successfully",
            error:false,
            success:true,
            data:bills
        })
        
    } catch (error) {
        return res.status(500).json({
            message:"Internal server error :"+error,
            error:true,
            success:false
        })
    }
}

export const getToken = async(req,res)=>{
    try {
        const {id} = req.params

        const token = await Token.findOne({_id:id})

        return res.status(200).json({
            message:"Token is retrived successfully",
            error:false,
            success:true,
            data:token
        })
        
    } catch (error) {
        return res.status(500).json({
            message:"Internal server error :"+error,
            error:true,
            success:false
        })
    }
}

export const getBill = async(req,res)=>{
    try {
        const {id} = req.params

        const bill = await Bill.findOne({_id:id})

        return res.status(200).json({
            message:"Bill is retrived successfully",
            error:false,
            success:true,
            data:bill
        })
        
    } catch (error) {
        return res.status(500).json({
            message:"Internal server error :"+error,
            error:true,
            success:false
        })
    }
}

export const getVehicle = async(req,res)=>{
    try{
        const {id} = req.params

        const vehicle = await Vehicle.findOne({_id:id})

        return res.status(200).json({
            message:"Vehicle is retrived successfully",
            error:false,
            success:true,
            data:vehicle
        })

    }catch(error){
        return res.status(500).json({
            message:"Internal server error :"+error,
            error:true,
            success:false
        })
    }
}