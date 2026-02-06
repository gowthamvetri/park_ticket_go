import express from "express"
import { checkAuth } from "../middleware/auth.middleware.js"
import { getAllBills, getAllTokens, getBill, getInfo, getToken, getVehicle, updateInfo } from "../controller/user.controller.js"

const userRoutes = express.Router()

userRoutes.get("/getInfo",checkAuth,getInfo)
userRoutes.patch("/update",checkAuth,updateInfo)
userRoutes.get("/getAllTokens",checkAuth,getAllTokens)
userRoutes.get("/getAllBills",checkAuth,getAllBills)
userRoutes.get("/getBill/:id",checkAuth,getBill)
userRoutes.get("/getToken/:id",checkAuth,getToken)
userRoutes.get("/getVehicle/:id",checkAuth,getVehicle)

export default userRoutes