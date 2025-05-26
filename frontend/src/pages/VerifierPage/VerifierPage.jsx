import React, { useEffect, useState } from 'react'
import { useAuthStore } from '../../store/useAuthStore'
import {useApplicationStore} from '../../store/useApplicationStore'
import "./verifierpage.css"
import Header from '../../components/Header/Header'
import DashBoard from '../../components/Dashboard/Dashboard'

import { FaUserCircle } from 'react-icons/fa';
import { BiDotsVerticalRounded } from "react-icons/bi";


const VerifierPage = () => {
  const {authUser, logout} = useAuthStore();
  const {getLoanApllications, loanApplicationsData,updateLoanApplicationStatus} = useApplicationStore();
  const {cashRecieved, cashDisbursed, savings, borrowersCount, approveLoanAmount,getLoanAmountDetails} = useApplicationStore();

  useEffect(() => {
    getLoanApllications();
    getLoanAmountDetails();
  }, [getLoanApllications, approveLoanAmount, getLoanAmountDetails]);

  const [visibleId, setVisibleId] = useState(null);

  const dataContainerDetails = [
        {   id:"Loans",
            dataImage : "Vector.png",
            title:"LOANS",
            count:50,
        },
        {
             id:"Borrowers",
            dataImage : "borrow.png",
            title:"BORROWERS",
            count: borrowersCount
        },
        {
             id:"Cash_distributed",
            dataImage : "cash-multiple.png",
            title:"CASH DISBURSED",
            count:cashDisbursed
        },
        {
             id:"Savings",
            dataImage : "savings.png",
            title:"SAVINGS",
            count: savings
        },
        {
             id:"Repaid_loans",
            dataImage : "repaidloans.png",
            title:"REPAID LOANS",
            count:30,
        },
        {
             id:"Cash_received",
            dataImage : "tabler_currency-naira.jpg",
            title:"CASH RECEIVED",
            count: cashRecieved
        }
    ]


  const displayStatistics = () => {
    return (
        <ul className="data-container-unorderedlist">
            {dataContainerDetails.map((eachDataContainer)=>
            {
                return (
        
            <li className="data-item" key={eachDataContainer.id}>
                <div className="data-mainContainer">
                    <div className="data-image-container">
                        <img src={eachDataContainer.dataImage} className="data-image"/>
                    </div>
                    <div className="data-value-container">
                      <p className="data-container-heading">{eachDataContainer.count}</p>
                        <h1 className="data-container-heading">{eachDataContainer.title}</h1>
                    </div>
                </div>
                
            </li>
            
        
        
    )
            })}
        </ul>
    )
  }
 
  

  

  

  const handleLogout = () => {
    logout();
  }

  const onUpdateStatus = async (id, action) => {  
    await updateLoanApplicationStatus(id, action);
    console.log(id,action)
  } 



  const formatDateTime = (updatedAt) => {
  const dateObj = new Date(updatedAt);

  const optionsDate = { year: 'numeric', month: 'long', day: 'numeric' };
  const date = dateObj.toLocaleDateString(undefined, optionsDate); // e.g., "May 9, 2025"

  const optionsTime = { hour: 'numeric', minute: 'numeric', hour12: true };
  const time = dateObj.toLocaleTimeString(undefined, optionsTime); // e.g., "11:33 AM"

  return { date, time };
}

 

 const onClickThreeDots = (id) => {
  
  setVisibleId((prevId) => (prevId === id ? null : id));

 }

 const onClickVerify = (action) => {
    onUpdateStatus(visibleId,action);
    setVisibleId(null);

 }

 const onDisplayShowButton = () => {
  return (
    <div className='show-button-container'>
      <button onClick={() => onClickVerify('Verified')} className="show-button">Verify</button>
      <button onClick={() => onClickVerify('Rejected')} className="show-button">Reject</button>
    </div>
  )
 }

  const displayAppliedLoans = () => {


    return (
    <div className="appliedLoans">
      <h2 className="title">Applied Loans</h2>
      <ul className="loanList">
        <li className="header">
          <span>User Recent Activity</span>
          <span>Customer Name</span>
          <span>Date</span>
          <span>Action</span>
           {/* For the "Follow" button */}
        </li>
        <ul className='loanList'>
        {loanApplicationsData.map((loanApplication) => {
          const {action,amount,createdAt,employmentAddress,employmentStatus,fullName,reason,tenure,updatedAt,userId,_id} = loanApplication;
          const {date, time} = formatDateTime(updatedAt);

          const onClickDots = () => {
            onClickThreeDots(_id);
          }

          const showVerify = visibleId === _id;
          console.log(showVerify);

          return (
          <li key={_id} className="header">
            <div className="borrowerInfo">
              <FaUserCircle className="avatar" />
              <span>{loanApplication.reason}</span>
            </div>
            <span>{loanApplication.fullName}</span>
            <div className="dateTime">
              <span className="date">{date}</span>
            <span className="date">{time}</span>
            </div>
            
    
            <button className={` loan-status ${loanApplication.action}`}>{loanApplication.action}</button>
             <span>
              <div className="status-button">
                <button onClick={onClickDots} className='status-button'>
                <BiDotsVerticalRounded className="follow-icon" />
                
              </button>
              {(showVerify && action !=='Approved') && onDisplayShowButton()}
              </div>
             </span>
          </li>
        )})}
        </ul>
      </ul>
    </div>
  );

  }
  return (
    <div className='verifierpage-container'>
      
      <div>
        <Header
        />
      </div>

      <div className='verifier-page-content'>
        <DashBoard />
        <div className='verifier-page-content-right'>
          {displayStatistics()}
          {displayAppliedLoans()}
        </div>

      </div>
      </div>
  )
}

export default VerifierPage