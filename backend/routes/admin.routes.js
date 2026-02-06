import express from "express"
import { checkAuth } from "../middleware/auth.middleware.js"
import { changePass, createUser, deleteUser, generateBill, generateToken, getAdminInfo, getAllGeneratedBills, getAllGeneratedTokens, getAllUsers, getAllVehicles, getParkedVehicles, getUser, updateUser } from "../controller/admin.controller.js"

const adminRoutes = express.Router()

adminRoutes.post("/createUser",checkAuth,createUser)
adminRoutes.get("/getAdmin",checkAuth,getAdminInfo)
adminRoutes.patch("/changePass",checkAuth,changePass)
adminRoutes.get("/getAllUsers",checkAuth,getAllUsers)
adminRoutes.get("/getUser/:id",checkAuth,getUser)
adminRoutes.post("/generateToken",checkAuth,generateToken)
adminRoutes.get("/getAllVehicle/:id",checkAuth,getAllVehicles)
adminRoutes.post("/generateBill",checkAuth,generateBill)
adminRoutes.get("/getParkedVehicle",checkAuth,getParkedVehicles)
adminRoutes.delete("/deleteUser/:id",checkAuth,deleteUser)
adminRoutes.patch("/updateUser/:id",checkAuth,updateUser)
adminRoutes.get("/getAllGeneratedBills",checkAuth,getAllGeneratedBills)
adminRoutes.get("/getAllGeneratedTokens",checkAuth,getAllGeneratedTokens)

export default adminRoutes
