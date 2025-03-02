import PageHeader from "../../components/header/PageHeader";
import "./UserLogin.css";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { setToken } from "../../utils/authUtils";


const UserLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      console.log("로그인 성공:", data);
      setToken(data.token);

      const redirectTo = location.state?.from?.pathname || "/";
      navigate(redirectTo);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <div>
      <div className="loginHeader">
        <PageHeader text={"로그인/회원가입"} />
      </div>
      <div className="mainBox">
        <div className="mainBox_logo">
          <img src="accountLogo.png" />
          <p className="loginMessage">이메일로 로그인해주세요.</p>
        </div>
        <form className="loginForm" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="이메일 입력"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="비밀번호 입력"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="loginBtn">로그인</button>
        </form>
        <a href="/register" className="registerBtn">
          회원가입
        </a>
        <div className="footer">
          <a href="/#">이용약관</a>
          <a href="/#">개인정보처리방침</a>
          <a href="/#">공지사항</a>
          <a href="/#">쿠키정책</a>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
