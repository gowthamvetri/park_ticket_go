import express from "express"
import { getRole, login, register } from "../controller/auth.controller.js";
import { checkAuth } from "../middleware/auth.middleware.js";
import { test } from "../controller/test.controller.js";

const authRoutes = express.Router()

authRoutes.post("/register",register)
authRoutes.post("/login",login)
authRoutes.get("/getRole",checkAuth,getRole)
// authRoutes.get("/test",checkAuth,test);

export default authRoutes;