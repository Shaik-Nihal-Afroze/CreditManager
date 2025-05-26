import "./index.css";

import {useAuthStore} from "../../store/useAuthStore";

const DashedButton = (props) => {
  const { dashedButtonInfo, onClickButton } = props;
  const { name, id,image } = dashedButtonInfo;
  const { authUser } = useAuthStore();

  const handleButtonClick = () => {
    onClickButton(id);
  };

  const hielightBg = authUser?.user?.role === "Admin" ? "highlighted" : "";

  return (
    <li className={`dashed-button-list-item ${hielightBg}`} onClick={handleButtonClick}>
      <div className="dashboard-button-icon-container">
        <img src={image} alt="icon" className="dashboard-button-icon-image" /> 
        <h1 className="dashboard-name">{name}</h1>
      </div>
      
    </li>
    
  );
};

export default DashedButton;