import bcrypt from "bcryptjs";
import Auth from "../model/Auth.js";
import User from "../model/User.js";
import Vehicle from "../model/Vehicle.js";
import Token from "../model/Token.js";
import Bill from "../model/Bill.js";
import { sendMail } from "../config/mailer.js";

export const createUser = async(req,res)=>{
    if(req.role==="Admin"){

    const {name,email,phone} = req.body;

    if(!name || !email || !phone){
        return res.status(400).json({
            message:"Please enter all the field mentioned",
            error:true,
            success:false
        })
    }
    try {
        const chkUser = await Auth.findOne({email:email});

        if(chkUser){
            return res.status(400).json({
            message:"User with same email exist. Try again with different mail id",
            error:true,
            success:false
        })
        }

        const hash = await bcrypt.hash(name.substring(0,4)+phone.substring(0,4),10)
        
        const auth = new Auth({
            email:email,
            password:hash
        })
        
        await auth.save()

        const user = new User({
            name:name,
            email:email,
            phone:phone
        })

        await user.save()


        return res.status(200).json({
            message:"User created Successfully",
            error:true,
            success:false,
        })

    } catch (error) {
        return res.status(500).json({
        message:"Internal server error :"+error,
        error:true,
        success:false
    })
    }
    }

    return res.status(404).json({
        message:"You are not allowed to access this endpoint",
        error:true,
        success:false
    })
}

export const getAllUsers = async(req,res)=>{
    if(req.role==="Admin"){

        try {

            const users = await User.find()

            if(users.length==0){
                return res.status(201).json({
                message:"There are no users available",
                error:false,
                success:true
                })
            }

            return res.status(200).json({
                message:"Users retrived successfully",
                error:false,
                success:true,
                data:users
            })
            
        } catch (error) {
            return res.status(500).json({
            message:"Internal server error :"+error,
            error:true,
            success:false
            })
        }
    }

    return res.status(404).json({
        message:"You are not allowed to access this endpoint",
        error:true,
        success:false
    })
}

export const getUser = async(req,res)=>{
    if(req.role==="Admin"){

        try {

            const {id} = req.params
            // console.log(id)

            if(!id){
                return res.status(404).json({
                message:"Could you please enter the user id to be searched",
                error:true,
                success:false
                })
            }

            const user = await User.findOne({_id:id})

             return res.status(200).json({
                message:"User retrived successfully",
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

    return res.status(404).json({
        message:"You are not allowed to access this endpoint",
        error:true,
        success:false
    })
}

export const generateToken = async (req, res) => {
    try {
        if (req.role !== "Admin") {
            console.log(req.body)
            return res.status(403).json({
                message: "You are not allowed to access this endpoint",
                error: true,
                success: false
            })
        }

        const { name, email, phone, vno, vmodel } = req.body

        if (!name || !email || !phone || !vno || !vmodel) {
            return res.status(400).json({
                message: "All fields are required",
                error: true,
                success: false
            })
        }

        let user = await User.findOne({ email })

        if (!user) {
            const hash = await bcrypt.hash(
                name.substring(0, 4) + phone.substring(0, 4),
                10
            )

            const auth = new Auth({ email, password: hash })
            await auth.save()

            user = new User({ name, email, phone })
            await user.save()
        }

        let vehicle = await Vehicle.findOne({ vno })

        if (vehicle && vehicle.isParked) {
            return res.json({
                message: "Vehicle already parked here",
                error: true,
                success: false
            })
        }

        if (!vehicle) {
            vehicle = new Vehicle({
                vno,
                vmodel,
                user: user._id,
                isParked: true
            })
            await vehicle.save()
        } else {
            vehicle.isParked = true
            await vehicle.save()
        }

        const token = new Token({
            vehicle: vehicle._id,
            user: user._id,
            vno
        })

        await token.save()

        const data = {
            to:email,
            subject:"Mail for token generation to confirm the parking",
            html:`
                <div style="font-family: sans-serif; border: 1px solid #c3e6cb; background-color: #d4edda; color: #155724; padding: 15px; border-radius: 5px; max-width: 400px; margin: 20px auto; text-align: center;">
                <span style="font-size: 20px; margin-right: 10px;">✅</span>
                <strong>Success!</strong> Token generated successfully.
                <div style="margin-top: 10px; font-family: monospace; background: #fff; padding: 5px; border: 1px dashed #155724; word-break: break-all;">
                    ${token._id}
                </div>
                </div>`
        }

        sendMail(data)

        return res.status(200).json({
            message: "Vehicle parked and token generated",
            error: false,
            success: true,
            data: token
        })

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: true,
            success: false
        })
    }
}


export const getVehiclesById = async(req,res)=>{
    if(req.role==="Admin"){
        try {
            const {id} = req.params
            const vehicles = await Vehicle.findOne({_id:id})

            if(vehicles.length==0){
                return res.status(201).json({
                message:"There are no Vehicles available",
                error:false,
                success:true
                })
            }

            return res.status(200).json({
                message:"Vehicles retrived successfully",
                error:false,
                success:true,
                data:vehicles
            })

            
        } catch (error) {
            return res.status(500).json({
                message:"Internal server error :"+error,
                error:true,
                success:false
            })
        }
        
    }
    return res.status(404).json({
        message:"You are not allowed to access this endpoint",
        error:true,
        success:false
    })
}

export const getAllVehicles = async(req,res)=>{
    if(req.role==="Admin"){
        try {
            const vehicles = await Vehicle.find()

            if(vehicles.length==0){
                return res.status(201).json({
                message:"There are no Vehicles available",
                error:false,
                success:true
                })
            }

            return res.status(200).json({
                message:"Vehicles retrived successfully",
                error:false,
                success:true,
                data:vehicles
            })

            
        } catch (error) {
            return res.status(500).json({
                message:"Internal server error :"+error,
                error:true,
                success:false
            })
        }
        
    }
    return res.status(404).json({
        message:"You are not allowed to access this endpoint",
        error:true,
        success:false
    })
}

export const getParkedVehicles = async(req,res)=>{
    if(req.role=="Admin"){

        try {

            const vehicles = await Vehicle.find({isParked:true})

            if(vehicles.length==0){
                return res.status(201).json({
                message:"There are no Vehicles available",
                error:false,
                success:true
                })
            }

            return res.status(200).json({
                message:"Vehicles retrived successfully",
                error:false,
                success:true,
                data:vehicles
            })            
            
        } catch (error) {
            return res.status(500).json({
                message:"Internal server error :"+error,
                error:true,
                success:false
            })
        }

    }
    return res.status(404).json({
        message:"You are not allowed to access this endpoint",
        error:true,
        success:false
    })
}

export const generateBill = async(req,res)=>{
    if(req.role==='Admin'){
        try {
            const {vno} = req.body
            const token = await Token.findOne({vno:vno,isValid:true})
            const vehicle = await Vehicle.findOne({vno:vno})
            console.log(token)
            const user = await User.findOne({_id:token.user})
            const diff = Number((new Date() - new Date(token.parkedAt))/(3600*24*1000))


            if(!vehicle.isParked || !token){
                return res.status(404).json({
                message:"Your are entered the vehicle id which is not been parked",
                error:true,
                success:false
            })
            }
            
            const days = Math.floor(diff)+1;
            const totalbill = days*15
            
            const bill = new Bill({
                vehicle:vehicle._id,
                user:user._id,
                token:token._id,
                totalCost:totalbill
            })
            
            await bill.save()

            await Vehicle.findByIdAndUpdate(vehicle._id,{$set:{
                isParked:false
            }},{new:true})

            await Token.findByIdAndUpdate(token._id,{$set:{isValid:false}},{new:true})

            const data = {
            to:user.email,
            subject:"Mail for Bill generation to ensure parking ended",
            html:`
                <div style="font-family: Arial, sans-serif; border: 1px solid #eee; padding: 20px; max-width: 600px; margin: auto;">
                    <h2 style="color: #333;">Invoice Generated</h2>
                    <p>Dear Customer,</p>
                    <p>Please find your bill in our website.</p>
                    <p>The total bill : ${totalbill}</p>
                    <p>The Bill id : ${bill._id}</p>
                    <hr style="border: 0; border-top: 1px solid #eee;">
                    <p style="font-size: 12px; color: #777; text-align: center;">
                        This is an automated bill generated from Park to go.Thank you 😊
                    </p>
                </div>
            `
        }

        sendMail(data)


            return res.status(200).json({
                message:"Vehicle depatured and bill generated",
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
    return res.status(404).json({
        message:"You are not allowed to access this endpoint",
        error:true,
        success:false
    })
}

export const deleteUser = async(req,res)=>{
    if(req.role==="Admin"){

        try {
            const {id} = req.params
            const user = await User.findOne({_id:id})
            console.log(user)

            await Auth.deleteOned({email:user.email})
            await User.findByIdAndDelete({_id:id})

            return res.status(200).json({
                message:"User Deleted Successfully",
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
    return res.status(404).json({
        message:"You are not allowed to access this endpoint",
        error:true,
        success:false
    })
}

export const updateUser = async(req,res)=>{
    if(req.role==="Admin"){
        try {
            
            // console.log(req.params.id)
            const {id} = req.params
            const data = req.body
            console.log(data)

            const user = await User.findByIdAndUpdate(id,{$set:data},{new:true})

            return res.status(200).json({
                message:"User updated successfully",
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
    return res.status(404).json({
        message:"You are not allowed to access this endpoint",
        error:true,
        success:false
    })
}

export const getAllGeneratedBills = async(req,res)=>{
    if(req.role==="Admin"){

        try {
            const bills = await Bill.find().sort({departuredDate:-1});
            return res.status(200).json({
                message:"Bills are retrived successfully",
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
    return res.status(404).json({
        message:"You are not allowed to access this endpoint",
        error:true,
        success:false
    })
}

export const getAllGeneratedTokens = async(req,res)=>{
    if(req.role==="Admin"){

        try {
            const tokens = await Token.find().sort({parkedAt:1});
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
    return res.status(404).json({
        message:"You are not allowed to access this endpoint",
        error:true,
        success:false
    })
}

export const getAdminInfo = async(req,res)=>{
    if(req.role==="Admin"){
        try{
            const admin = await Auth.findOne({email:req.email})


            return res.status(200).json({
                message:"Admin retrived successfully",
                error:false,
                success:true,
                data:admin
            })

        }catch(error){
            return res.status(500).json({
                message:"Internal server error :"+error,
                error:true,
                success:false
            }) 
        }
    }

    return res.status(404).json({
        message:"You are not allowed to access this endpoint",
        error:true,
        success:false
    })
}

export const changePass = async(req,res)=>{
    if(req.role==="Admin"){

        try {

            const {password} = req.body

            const hashPass = await bcrypt.hash(password,10)

            const resu = await Auth.findOneAndUpdate({email:req.email},{$set:{password:hashPass}},{new:true})

            // console.log(resu)

             return res.status(200).json({
                message:"Admin password changed successfully",
                error:false,
                success:true,
            })
            
        } catch (error) {
            return res.status(500).json({
                message:"Internal server error :"+error,
                error:true,
                success:false
            })
        }

    }

    return res.status(404).json({
        message:"You are not allowed to access this endpoint",
        error:true,
        success:false
    })
}

export const getVehicleIdfromNumber = async(req,res)=>{
    if(req.role==="Admin"){
        try {
            const {id} = req.params
            const vehicle = await Vehicle.findOne({vno:id})

            return res.status(200).json({
                message:"Retrived the vehicle id",
                data:{
                    _id:vehicle._id
                },
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
    return res.status(404).json({
        message:"You are not allowed to access this endpoint",
        error:true,
        success:false
    })
}