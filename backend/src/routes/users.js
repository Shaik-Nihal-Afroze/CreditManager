import express from 'express';
import { checkAuth, getAllUsers, login, logout, signup } from '../controllers/auth.controller.js';
import { protectRoute } from '../middleware/protectedRoute.js';



const router = express.Router();


//signup route

router.post("/signup", signup)
router.post("/login", login)
router.post("/logout",logout)

router.get("/checkuser", protectRoute, checkAuth)


router.get("/getallusers", getAllUsers);


export default router;