import mongoose from 'mongoose';
// Define the loan application schema
// This schema is used to create a new loan application
// It contains the following fields:

const loanApplicationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  tenure: {
    type: Number,
    required: true,
  },
  employmentStatus: {
    type: String,
    enum: ['Employed', 'Self-employed', 'Unemployed', 'Student'],
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  employmentAddress: {
    type: String,
    required: true,
  },
  action: {
    type: String,
    enum: ['Pending', 'Verified', 'Rejected', 'Approved'],
    default: 'Pending',
  },
}, {
  timestamps: true,
});

const LoanApplication = mongoose.model('LoanApplication', loanApplicationSchema);

export default LoanApplication;