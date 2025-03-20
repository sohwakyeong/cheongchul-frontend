import PageHeader from "../../components/header/PageHeader";
import "./UserRegister.css";
import { useState } from "react";
import { successToast, errorToast } from "../../components/ui/ToastFunctions";
import useValidation from "../../hooks/useValidation";
import { useNavigate } from "react-router-dom";

const UserRegister = () => {
  const { errors, validate } = useValidation();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    name: "",
    nickname: "",
    role: "MENTEE",
    university: "",
    department: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!validate(userData)) {
        errorToast(errors);
        return;
      }

      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        console.error("회원가입 오류");
      }
      const data = await response.json();
      successToast(`🎉 ${data.nickname}님 회원가입 축하합니다!`);
      navigate("/login");
    } catch (error) {
      console.error("에러 발생:", error);
      errorToast("회원가입에 실패하였습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="registerContainer">
      <div className="registerHeader">
        <PageHeader text={"회원가입"} />
      </div>
      <div className="registerBox">
        <p className="registerMessage">회원 정보를 입력해주세요.</p>
        <form className="registerForm" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="이메일 입력"
            value={userData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="비밀번호 입력"
            value={userData.password}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="name"
            placeholder="이름 입력"
            value={userData.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="nickname"
            placeholder="닉네임 입력"
            value={userData.nickname}
            onChange={handleChange}
            required
          />
          <div className="formToggle">
            <div className="formRadioBtn">
              <input
                id="MENTEE"
                type="radio"
                name="role"
                value="MENTEE"
                checked={userData.role === "MENTEE"}
                onChange={handleChange}
              />
              <label htmlFor="MENTEE">학생</label>
            </div>
            <div className="formRadioBtn">
              <input
                id="MENTOR"
                type="radio"
                name="role"
                value="MENTOR"
                checked={userData.role === "MENTOR"}
                onChange={handleChange}
              />
              <label htmlFor="MENTOR">선생님</label>
            </div>
          </div>
          {userData.role === "MENTEE" ? (
            <>
              <input
                type="text"
                name="university"
                placeholder="목표 대학"
                value={userData.university}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="department"
                placeholder="목표 학과"
                value={userData.department}
                onChange={handleChange}
                required
              />
            </>
          ) : (
            <>
              <input
                type="text"
                name="university"
                placeholder="재학 대학"
                value={userData.university}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="department"
                placeholder="전공 학과"
                value={userData.department}
                onChange={handleChange}
                required
              />
            </>
          )}
          <button type="submit" className="registerSubmitBtn">
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserRegister;
