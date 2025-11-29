import { Router } from "express";
import { loginHandler, signupHandler } from "../controllers/authController.js";

const router = Router();

router.post('/signup' , signupHandler)
router.post('/login' , loginHandler)

export {router as authRoutes};
