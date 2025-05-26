import React, { useState } from 'react';
import './loanApplication.css';

import { useApplicationStore } from '../../store/useApplicationStore';



const LoanApplicationForm = ({onHandleCancel}) => {


  const {getLoanApllications, loanApplicationsData,updateLoanApplicationStatus,createLoanApplication} = useApplicationStore();
  

  const [formData, setFormData] = useState({
    fullName: '',
    amount: 0,
    tenure: 0,
    employmentStatus: '',
    reason: '',
    employmentAddress: '',
    checkbox1: false,
    checkbox2: false
  });

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitted Data:', formData);

    await createLoanApplication(formData)
    
    setFormData({
      fullName: '',
      amount: '',
      tenure: '',
      employmentStatus: '',
      reason: '',
      employmentAddress: '',
      checkbox1: false,
      checkbox2: false
    })

    onHandleCancel()

    // alert('Form submitted! Check the console for output.');
  };
 
  return (
    <div className='form-wrapper'>
        <div className="form-container">
      <h1>APPLY FOR A LOAN</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>Full name as it appears on bank account</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
             onChange={(e)=>setFormData({...formData,fullName:e.target.value})}
              placeholder="Full name"
              required
            />
          </div>
          <div className="form-group">
            <label>How much do you need?</label>
            <input
              type="number"
              name="loanAmount"
              value={formData.amount}
              onChange={(e)=>setFormData({...formData,amount:e.target.value})}
              placeholder="Enter a number"
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Loan tenure (in months)</label>
            <input
              type="number"
              name="loanTenure"
              value={formData.tenure}
              onChange={(e)=>setFormData({...formData,tenure:e.target.value})}
              placeholder="Enter a number"
              required
            />
          </div>
          <div className="form-group">
            <label>Employment status</label>
            <select value = {formData.employmentStatus} onChange={(e)=>setFormData({...formData,employmentStatus:e.target.value})} required>
                <option>Employed</option>    
                <option>Unemployed</option>    
                <option>Self-employed</option>    
                <option>Student</option>    
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Reason for loan</label>
            <textarea
              className='textarea'
              name="reason"
              value={formData.reason}
              onChange={(e)=>setFormData({...formData,reason:e.target.value})}
              placeholder="Reason for loan"
              rows={10}
              required
            />
          </div>
          <div className="form-group">
            <label>Employment address</label>
            <input
              type="text"
              name="employmentAddress"
              value={formData.employmentAddress}
              onChange={(e)=>setFormData({...formData,employmentAddress:e.target.value})}
              placeholder="Employment address"
              required
            />
           
          </div>
        </div>

        <div className="checkboxes">
          <label>
            <input
              type="checkbox"
              name="checkbox1"              
              onChange={()=>setFormData((prevState)=>({...formData,checkbox1:!prevState.checkbox1}))}
              checked={formData.checkbox1}
              required
              
            />
            I have read the important information and accept that by completing the application I will be bound by the terms
          </label>
          <label>
            <input
              type="checkbox"
              name="checkbox2" 
              onChange={()=>setFormData((prevState)=>({...formData,checkbox2:!prevState.checkbox2}))}
              checked={formData.checkbox2}
              required
              
            />
            Any personal and credit information obtained may be disclosed from time to time to other lenders, credit bureaus or other credit reporting agencies.
          </label>
        </div>

        
       

        <button type="submit" className="submit-btn">Submit</button>
        <button className="cancel-button2" onClick={onHandleCancel} >Cancel</button>
      </form>
    </div>
    </div>
    
  );
};

export default LoanApplicationForm;