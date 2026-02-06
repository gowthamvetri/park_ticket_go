import jwt from "jsonwebtoken"

export const checkAuth = async(req,res,next)=>{
    try{
    const token = req.headers.authorization.split(" ")[1];
    const start = req.headers.authorization.split(" ")[0];
    if(!start==="Bearer"){
        return res.status(400).json({
            message:"You are unauthorized to access this link",
            error:true,
            success:false
        })
    }
    if(!token){
        return res.status(400).json({
            message:"User token not available. Please login",
            error:true,
            success:false
        })
    }
    // console.log(token)
    const user = jwt.verify(token,process.env.JWT_SECRET)
    if(!user){
        return res.status(400).json({
            message:"User token is invalid. Please login",
            error:true,
            success:false
        })
    }
    
    // console.log(user)

    req.role = user.role
    req.email = user.email
    // req.id = user.id   
    next()

    }catch(err){
        return res.status(500).json({
            message:"Internal server error. Please try again. error"+err,
            error:true,
            success:false
        })
    }

}