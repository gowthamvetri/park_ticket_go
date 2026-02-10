import express from "express";
import { checkAuth } from "../middleware/auth.middleware.js";
import { createCheckoutSession, verifyPayment, handleWebhook } from "../controller/payment.controller.js";

const paymentRoutes = express.Router();

// Protected routes
paymentRoutes.post("/create-checkout-session", checkAuth, createCheckoutSession);
paymentRoutes.post("/verify-payment", checkAuth, verifyPayment);

export default paymentRoutes;
