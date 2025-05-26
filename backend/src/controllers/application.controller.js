
import LoanApplication from "../models/loanApplication.model.js";
import LoanAmountDetails from "../models/loanAmountDetails.model.js";

// Create a new loan application

export const createLoanApplication = async (req, res) => {
  const { fullName, amount, tenure, employmentStatus, reason, employmentAddress } =
    req.body;

  try {
    if (!fullName || !amount || !tenure || !employmentStatus || !reason || !employmentAddress) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newLoanApplication = new LoanApplication({
      userId: req.user._id,
      fullName,
      amount,
      tenure,
      employmentStatus,
      reason,
      employmentAddress,
    });

    await newLoanApplication.save();

    res.status(201).json(newLoanApplication);
  } catch (error) {
    console.log("Error in createLoanApplication controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}


export const updateLoanApplicationStatus = async (req, res) => {
  const { id } = req.params;
  const { action } = req.body;

  try {
    if (!action) {
      return res.status(400).json({ message: "Action is required" });
    }

    const loanApplication = await LoanApplication.findById(id);

    if (!loanApplication) {
      return res.status(404).json({ message: "Loan application not found" });
    }

    loanApplication.action = action;

    await loanApplication.save();

    res.status(200).json(loanApplication);
  } catch (error) {
    console.log("Error in updateLoanApplication controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}   

export const getLoanApplications = async (req, res) => {
  try {
    const loanApplications = await LoanApplication.find();
    res.status(200).json(loanApplications);
  } catch (error) {
    console.log("Error in getLoanApplications controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export const getLoanAmountDetails = async (req, res) => {
  try {
    let loanAmountDetails = await LoanAmountDetails.findOne();
    if (!loanAmountDetails) {
      loanAmountDetails = new LoanAmountDetails();
      await loanAmountDetails.save();
    }
    res.status(200).json(loanAmountDetails);
  } catch (error) {
    console.log("Error in getLoanAmountDetails controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export const approveLoanAmount = async (req, res) => {
  const { id } = req.params;
  const { amount } = req.body;

  try {
    if (!amount) {
      return res.status(400).json({ message: "Amount is required" });
    }

    const loanApplication = await LoanApplication.findById(id);

    if (!loanApplication) {
      return res.status(404).json({ message: "Loan application not found" });
    }

    const loanAmountDetails = await LoanAmountDetails.findOne();

    if (!loanAmountDetails) {
      return res.status(404).json({ message: "Loan amount details not found" });
    }

    loanAmountDetails.cashDisbursed += amount;
    loanAmountDetails.savings -= amount;
    loanAmountDetails.borrowersCount += 1;

    await loanAmountDetails.save();

    res.status(200).json(loanAmountDetails);
  } catch (error) {
    console.log("Error in approveLoanAmount controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

