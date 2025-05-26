import "./dashboard.css"
import DashedButton from "../DashboardButton/DashboardButton";
import { useAuthStore } from "../../store/useAuthStore";
import { FaCircleUser } from "react-icons/fa6";
import {useNavigate} from "react-router-dom";
const DashBoard = () =>{

    const {authUser, logout} = useAuthStore();

    const navigate = useNavigate();

    const onLogout = () => {
        logout();
        navigate("/login");
    }
   
    const dashboardDetails = [
        {id:"Dashboard",name:"Dashboard", image:"dashboard.png"},
        {id:"Borrowers",name:"Borrowers", image:"borrowers.png"},
        {id:"Loans",name:"Loans", image:"loans.png"},
        {id:"Repayments",name:"Repayments", image:"repaidloans.png"},
        {id:"Loan Parameters",name:"Loan Parameters",image:"loanparameters.png"},
        {id:"Accounting",name:"Accounting", image:"accounting.png"},
        {id:"Reports",name:"Reports", image:"reports.png"},
        {id:"Collateral",name:"Collateral", image:"collateral.png"},
        {id:"Access Configuration",name:"Access Configuration", image:"access_configuration.png"},
        {id:"Savings",name:"Savings", image:"savings.png"},
        {id:"Expenses",name:"Expenses", image:"expenses.png"},
        {id:"E-signature",name:"E-signature", image:"signature.png"},
        {id:"Investor Accounts",name:"Investor Accounts", image:"investor_accounts.png"},
        {id:"Calender",name:"Calender", image:"calender.png"},
        {id:"Settings",name:"Settings", image:"settings.png"},
    ]
     const handleButtonClick = (id) => {
        console.log("Button clicked:", id);
    };
    return (
        <div className="dashboard-container">
            <div className="dashboard-profile-container">
                <img src="account_circle.png" className="dashboard-avatar"/>
                <span className="dashboard-username">
                    {authUser?.fullName}
                </span>
            </div>
            <ul className="dashboard-mainbutton-container">
                {dashboardDetails.map((eachDashBoard) => (
                <DashedButton
                    key={eachDashBoard.id}
                    dashedButtonInfo={eachDashBoard}
                    onClickButton={handleButtonClick}
                />
                ))}
            </ul>
            <li className={`dashed-button-list-item logout-button`}>
             <div className="dashboard-button-icon-container">
        <img src="logout.png" alt="icon" className="dashboard-button-icon-image" /> 
        <h1 className="dashboard-name" onClick={onLogout}>Sign Out</h1>
      </div>
      
    </li>
        </div>
    )
}

export default DashBoard