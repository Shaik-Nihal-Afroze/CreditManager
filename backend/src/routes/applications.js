import express from 'express';

const router = express.Router();

// Import the controller functions
import { createLoanApplication, getLoanApplications, updateLoanApplicationStatus, approveLoanAmount,getLoanAmountDetails } from '../controllers/application.controller.js';

// Import the middleware
import { protectRoute } from '../middleware/protectedRoute.js';

// Route to create a new loan application
router.post('/applyloan', protectRoute, createLoanApplication);
router.get("/getloanapplications",getLoanApplications);
router.put("/updateapplicationstatus/:id", protectRoute, updateLoanApplicationStatus);
router.get("/getloanamountdetails",getLoanAmountDetails);
router.put("/approveloanamount/:id", protectRoute, approveLoanAmount);

export default router;