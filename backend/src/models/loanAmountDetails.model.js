import mongoose from 'mongoose';

const loanAmountDetailsSchema = new mongoose.Schema({
	  cashRecieved: {
		type: Number,
		required: true,	
		default: 1500000,
	  },
	  cashDisbursed: {
		type: Number,
		required: true,
		default: 0,
	  },
	  savings: {
		type: Number,
		required: true,
		default: 1500000,
	  },
	  borrowersCount: {
		type: Number,
		required: true,
		default: 0,
	  },
	}, {timestamps: true});
const LoanAmountDetails = mongoose.model('LoanAmountDetails', loanAmountDetailsSchema);	

export default LoanAmountDetails;