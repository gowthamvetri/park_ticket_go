import User from "../model/User.js";
import Auth from "../model/Auth.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const register = async(req,res)=>{
    const {name,email,phone,userRole} = req.body

    if(!name||!email||!phone){
        return res.status(400).json({
            message:"Enter all the necessary fields mentioned above",
            success:false,
            error:true
        })
    }
    let role = userRole;
    if(!role){
        role = "User"
    }

    const existUser = await Auth.findOne({email:email})

    if(existUser){
        return res.status(400).json({
            message:"You have Entered the existing user mail id",
            success:false,
            error:true
        })
    } 
    const password = name.substring(0,4)+phone.substring(0,4)

    const data = {
                to:email,
                subject:"Mail to inform that a new user is Created",
                html:`
                    <div style="font-family: sans-serif; border: 1px solid #c3e6cb; background-color: #d4edda; color: #155724; padding: 15px; border-radius: 5px; max-width: 400px; margin: 20px auto; text-align: center;">
                        <h1>Hello, ${name}!</h1>
                        <p>Welcome to our service. Your account has been successfully created.</p>
                        <p>Please click the link below and use the credentials:</p>
                        <p>Email:${email}</p>
                        <p>Password:${password}</p>
                        <a href=${'http://localhost:5173/'}>Confirm Account</a>
                        <p>Thank you!</p>
                    </div>`
            }
            sendMail(data)

    const hash = await bcrypt.hash(password,10)

    const auth = new Auth({
            email:email,
            password:hash,
            role:role
        })

        await auth.save()

    if(role=="User"){
        const user = new User({
            name:name,
            email:email,
            phone:phone
        })

        await user.save();
    }

    // const hash = await bcrypt.hash(name.substring(0,4)+phone.substring(0,4),10)

        

    return res.status(200).json({
        message:"User created successfully",
        error:false,
        success:true
    })
}

export const login = async(req,res)=>{
    const {email,password} = req.body

    if(!email||!password){
         return res.status(400).json({
            message:"Enter all the necessary fields mentioned above",
            success:false,
            error:true
        })
    }

    const user = await Auth.findOne({email:email})

    if(!user){
        return res.status(400).json({
            message:"You have Entered the mail id which have not been registered",
            success:false,
            error:true
        })
    }

    if(! await bcrypt.compare(password,user.password)){
        return res.status(400).json({
            message:"You have entered the wrong password. Try again!",
            success:false,
            error:true
        })
    }

    if(user.role=="Admin"){

        const token = jwt.sign({
            email:user.email,role:user.role,id:user._id
        },process.env.JWT_SECRET,{expiresIn:"1d"})

        return res.status(200).json({
            message:"Welcome Admin Have a great Day",
            success:true,
            error:false,
            data:user,
            token:token
        })
    }

    const AuthtoUser = await User.findOne({email:email});

    const token = jwt.sign({email:AuthtoUser.email,role:user.role,id:user._id},process.env.JWT_SECRET,{expiresIn:"1d"})

    return res.status(200).json({
            message:"Login successfull explore your tokens and bills",
            success:true,
            error:false,
            data:user,
            token:token
        })
}

export const getRole = async(req,res)=>{
    

    return res.status(200).json({
        message:"User Role retrived",
        data:req.role,
        error:false,
        success:true
    })
}