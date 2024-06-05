import "./Header.scss";
import Logo from "../../Assets/Logos/logo.svg";
import Admin from "../../Assets/Logos/admin.svg";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const handleClickHome = () => {
    navigate("/");
  };

  return (
    <div className="Container">
      <div className={"Content"}>
        <div className="header-left">
          <img src={Logo} alt="BrainFlix" className="Logo" />
          <button className="header-button" onClick={handleClickHome}>
            <p className="">home</p>
          </button>
        </div>

        <div className={"RightSideWrapper"}>
          <button className="BrainButton">
            <img src={Admin} alt="BrainFlixLogo" className="BrainButtonLogo" />
            <p className="BrainButton__text">Admin</p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
