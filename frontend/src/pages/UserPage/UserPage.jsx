import React ,{useState, useEffect, use} from 'react'
import { useAuthStore } from '../../store/useAuthStore'
import {useApplicationStore} from '../../store/useApplicationStore';
import LoanApllicationForm from "../../pages/LoanApplicationForm/LoanApplicationForm"


import Header from '../../components/Header/Header'

import { FaSortAmountUpAlt } from "react-icons/fa";
import { MdFilterAlt } from "react-icons/md";
import { FaUserCircle } from 'react-icons/fa';
import { BiDotsVerticalRounded } from "react-icons/bi";
import { FaSortAmountUp } from "react-icons/fa";


import './userpage.css'
import "./userpage2.css"


const UserPage = () => {

  const [userLoanDetails, setUserLoanDetails] = useState([]);
  const [displayForm, setDisplayForm] = useState(false)

  const {authUser, checkAuth} = useAuthStore();
  const {getLoanApllications, loanApplicationsData,updateLoanApplicationStatus,createLoanApplication} = useApplicationStore();

  const getUserLoanDetails = () => {
    const id = authUser._id;
    const newUserLoanDetails = loanApplicationsData.filter((loan) => loan.userId === id);
    setUserLoanDetails(newUserLoanDetails);
  }

  useEffect(() => {
    getLoanApllications()
    getUserLoanDetails();
    
  }, [getLoanApllications]);

  console.log(userLoanDetails)

 

  const loanOfferDetails = () => {
    return(
      <ul className='loan-offer-details-heading-container'>
        <li className='loan-offer-details-heading'>Loan Officer</li>
        <li className='loan-offer-details-heading'>Amount</li> 
        <li className='loan-offer-details-heading'>Date Applied</li>
        <li className='loan-offer-details-heading'>Status</li>
      </ul>
    )
  }

  const formatDateTime = (updatedAt) => {
  const dateObj = new Date(updatedAt);

  const optionsDate = { year: 'numeric', month: 'long', day: 'numeric' };
  const date = dateObj.toLocaleDateString(undefined, optionsDate); // e.g., "May 9, 2025"

  const optionsTime = { hour: 'numeric', minute: 'numeric', hour12: true };
  const time = dateObj.toLocaleTimeString(undefined, optionsTime); // e.g., "11:33 AM"

  return { date, time };
}

  const displayLoanDetails = () => {
    return userLoanDetails.map((loan) => (
      <ul className='loan-offer-details-container'>
        <li className='loan-offer-details'>{loan.fullName}</li>
        <li className='loan-offer-details'>${loan.amount}</li>
        <li className='loan-offer-details'>{formatDateTime(loan.updatedAt)}</li>
        <li className='loan-offer-details'>{loan.action}</li>
      </ul>
    ))
  }

  const onClickGetLoan = () => {
    console.log('clicked')
    setDisplayForm(!displayForm)
  }

   const displayAppliedLoans = () => {
   
     const filteredUsers = loanApplicationsData.filter((loan) => loan.userId === authUser._id);
       return (
       <div className="appliedLoans">
         <div className='appliedLoans-header'>
           <h2 className="title">Applied Loans</h2>
           <div className='appliedLoans-header-right'>
           <div className='appliedLoans-header-right-search'>
             <button className='filter-button'>
               <FaSortAmountUp className="sort-icon" />
             </button>
             <span>Sort</span>
           </div>
           <div className='appliedLoans-header-right-search' >
             <button className='filter-button'>
               <MdFilterAlt className="filter-icon" />
             </button>
             <span>Filter</span>
           </div>
           </div>
         </div>
         
         <ul className="loanList">
           <li className="header">
             <span>Loan Officer</span>
             <span>Amount</span>
             <span>Date Applied</span>
             <span>Status</span>
              {/* For the "Follow" button */}
           </li>
           <ul className="loanList">
           {filteredUsers.map((loanApplication) => {
             const {action,amount,createdAt,employmentAddress,employmentStatus,fullName,reason,tenure,updatedAt,userId,_id} = loanApplication;
             const {date, time} = formatDateTime(updatedAt);
   
    
             return (
             <li key={_id} className="header">
               <div className="borrowerInfo">
                 <FaUserCircle className="avatar" />
                 <span>{loanApplication.fullName}</span>
               </div>
               <span>{loanApplication.amount}</span>
               <div className="dateTime">
                 <span className="date">{date}</span>
               <span className="date">{time}</span>
               </div>
               
       
               <button className={`action-button ${loanApplication.action}`}>{loanApplication.action}</button>
                
             </li>
           )})}
           </ul>
         </ul>
       </div>
     );
   
     }

     
  const displayFormData = () => {
    return (
    <div>
  

      {displayForm && (
        <div className="modal-overlay">
          <div className="modal">
            <LoanApllicationForm onHandleCancel={onClickGetLoan}/>
            <button onClick={onClickGetLoan}>Close</button>
          </div>
        </div>
      )}
    </div>
  );

  }

  

  return (
    <div className='userpage-container'>
      <Header 
      />

      <div className='userpage-content'>
        <div className='get-loan-container'>
          <div className='doller-box'>
            <img src="Vector.png" alt="doller" />
          </div>
          <div className='button-container'>
            <button className='get-loan-button' onClick={onClickGetLoan}>Get a loan</button>
            {displayForm && displayFormData()}
          </div>
        </div>
        <ul className='loan-type-container'>
          <li className='loan-type'>
            Borrow Cash
          </li>
          <li className='loan-type'>
            Transact
          </li>
          <li className='loan-type'>
            Deposit Cash   
          </li>
        </ul>
        <div className='search-container'>
          <button className='search-button'>
            <img src="searchicon.png" className='search-icon'/>
            </button>
          <input type="text" className='search-input' placeholder='Search for a loan' />
          
        </div>
        <div className='applied-loads-container'>
          <div className='title-container'>
            <h1 className='applied-loans-title'>Applied Loans</h1>
            <ul className='sorting-and-filetring-container'>
              <li className='sorting-and-filetring'>
                <FaSortAmountUpAlt className='sort-icon' />
                <span className='sort-text'>Sort</span>
               </li>
              <li className='sorting-and-filetring'>
                <MdFilterAlt className='filter-icon' />
                <span className='filter-text'>Filter</span>
                  </li>

            </ul>
          </div>
          {/* {loanOfferDetails()}
          {displayLoanDetails()} */}
          {displayAppliedLoans()}
        </div>
        
      </div>
      </div>
  )
}

export default UserPage