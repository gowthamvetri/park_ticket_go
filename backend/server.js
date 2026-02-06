import express from "express"
import dotenv from "dotenv"
import db from "./config/db.config.js"
import authRoutes from "./routes/auth.routes.js"
import adminRoutes from "./routes/admin.routes.js"
import userRoutes from "./routes/user.routes.js"
import cors from "cors"


dotenv.config()

const app = express()
app.use(express.json())
app.use(cors([
    "http://localhost:5173/**"
]))

app.use('/api',authRoutes);
app.use("/api",adminRoutes);
app.use("/api",userRoutes)



app.get("/",(req,res)=>{
    return res.status(200).json({
        message:"Hello this is information from server"
    })
})


app.listen(8080,()=>{
    console.log("Serevr started at port 8080")
})