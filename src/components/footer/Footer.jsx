import "./Footer.css";
import { useNavigate, useLocation } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const changeIcon = (path, activeIcon, defaultIcon) => {
    return location.pathname === path ? activeIcon : defaultIcon;
  };
  const goToHomePage = () => {
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="footerNav">
      <div className="footerIcon" onClick={goToHomePage}>
        <img
          src={changeIcon("/", "/homepage_blue.png", "/homepage.png")}
          alt="home"
        />
      </div>
      <div className="footerIcon" onClick={() => navigate("/allchats")}>
        <img
          src={changeIcon("/chat", "/chat_blue.png", "/chat.png")}
          alt="chat"
        />
      </div>
      <div className="footerIcon" onClick={() => navigate("/create")}>
        <img
          src={changeIcon("/create", "/create_blue.png", "/create.png")}
          alt="create"
        />
      </div>
      <div className="footerIcon" onClick={() => navigate("/mypage")}>
        <img
          src={changeIcon("/mypage", "/mypage_blue.png", "/mypage.png")}
          alt="mypage"
        />
      </div>
    </div>
  );
};
export default Footer;
