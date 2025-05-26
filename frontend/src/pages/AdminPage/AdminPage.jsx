import React, { useState,useEffect} from 'react'
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { toast } from 'react-toastify';  
import Header from '../../components/Header/Header'
import {useApplicationStore} from '../../store/useApplicationStore'
import DashBoard from '../../components/Dashboard/Dashboard'
import { FaUserCircle } from 'react-icons/fa';
import { BiDotsVerticalRounded } from "react-icons/bi";
import { FaSortAmountUp } from "react-icons/fa";
import { MdFilterAlt } from "react-icons/md";


import "./adminpage.css"





const AdminPage = () => {
  const {authUser, logout, getAllUsers, allUsers} = useAuthStore();
  const {getLoanApllications, loanApplicationsData,updateLoanApplicationStatus} = useApplicationStore();

  const {cashRecieved, cashDisbursed, savings, borrowersCount, approveLoanAmount,getLoanAmountDetails} = useApplicationStore();


  useEffect(() => {
    getLoanApllications();
    getLoanAmountDetails();
  }, [getLoanApllications,approveLoanAmount, getLoanAmountDetails]);

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  

  const [visibleId, setVisibleId] = useState(null);

  const dataContainerDetails = [

         {
          id:"Active Users",
          dataImage : "activeusers.png",
          title:"ACTIVE USERS",
          count: allUsers.length,

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
             id:"Cash_received",
            dataImage : "tabler_currency-naira.jpg",
            title:"CASH RECEIVED",
            count:cashRecieved
        },
        {
             id:"Savings",
            dataImage : "savings.png",
            title:"SAVINGS",
            count:savings
        },
        {
             id:"Repaid_loans",
            dataImage : "repaidloans.png",
            title:"REPAID LOANS",
            count:30
        },
        {
          id:"Other Accounts",
          dataImage : "Vector.png",
          title:"OTHER ACCOUNTS",
          count:10,
        },
        
        {   id:"Loans",
            dataImage : "Vector.png",
            title:"LOANS",
            count:50
        },
    ]


  const displayStatistics = () => {
    return (
        <ul className="data-container-unorderedlist">
            {dataContainerDetails.map((eachDataContainer)=>
            {
                return (
        
            <li className="data-item1" key={eachDataContainer.id}>
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
 
  
console.log(cashRecieved, cashDisbursed, savings, borrowersCount)
  
  

  const handleLogout = () => {
    logout();
  }

  const onUpdateApproveStatus = async (id, action) => { 

    await updateLoanApplicationStatus(id, action);
    console.log(id,action)
    const loanApplication = loanApplicationsData.find((application) => application._id === id);
    if (action === "Approved") {
      approveLoanAmount(id,loanApplication.amount);
      toast.success("Loan Approved Successfully",{
        position:'bottom-right'
      });
    }
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

 const handleAction = async (action) => {
    onUpdateApproveStatus(visibleId, action);
     setVisibleId(null);
     console.log(action)
 }

 const onDisplayShowButton = () => {
  return (
    <div className='show-button-container'>
      <button onClick={() => handleAction('Approved')} className="show-button1">Approve</button>
    </div>
  )
 }

  const displayAppliedLoans = () => {


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
          <span>User Details</span>
          <span>Customer Name</span>
          <span>Date</span>
          <span>Action</span>
           {/* For the "Follow" button */}
        </li>
        <ul className="loanList">
        {loanApplicationsData.map((loanApplication) => {
          const {action,amount,createdAt,employmentAddress,employmentStatus,fullName,reason,tenure,updatedAt,userId,_id} = loanApplication;
          const {date, time} = formatDateTime(updatedAt);

          const onClickDots = () => {
            onClickThreeDots(_id);
          }

          const showVerify = visibleId === _id;
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
            
    
            <button className={`action-button ${loanApplication.action}`}>{loanApplication.action}</button>
             <span>
                 <div className="status-button">
                    <button onClick={onClickDots} className='status-button'>
                      <BiDotsVerticalRounded className="follow-icon" />
                             
                      </button>
                        {(showVerify && action==='Verified') && onDisplayShowButton()}
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



export default AdminPage