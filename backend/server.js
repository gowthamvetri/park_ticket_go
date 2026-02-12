import express from "express"
import dotenv from "dotenv"
import db from "./config/db.config.js"
import authRoutes from "./routes/auth.routes.js"
import adminRoutes from "./routes/admin.routes.js"
import userRoutes from "./routes/user.routes.js"
import paymentRoutes from "./routes/payment.routes.js"
import { handleWebhook } from "./controller/payment.controller.js"
import cors from "cors"

dotenv.config()
db()

const app = express()

app.post('/api/webhook', express.raw({ type: 'application/json' }), handleWebhook);

app.use(express.json())

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://park-ticket-go.vercel.app/"
  ],
  credentials: true
}));

app.use('/api', authRoutes);
app.use("/api", adminRoutes);
app.use("/api", userRoutes);
app.use("/api", paymentRoutes);

app.get("/", (req,res)=>{
    return res.status(200).json({
        message:"Hello this is information from server"
    })
})

app.listen(8080,()=>{ console.log("Serevr started at port 8080") })

export default app
