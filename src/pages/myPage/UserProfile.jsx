import PageHeader from "../../components/header/PageHeader";
import { useState } from "react";
import "./UserProfile.css";
import useFetch from "../../hooks/useFetch";
import { errorToast, successToast } from "../../components/ui/ToastFunctions";
import { useNavigate } from "react-router-dom";


const UserProfile = () => {
  const { fetchData } = useFetch();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    role: "MENTEE",
    nickname: "",
    university: "",
    department: "",
  });

  const onChangeUserValue = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();

    const result = await fetchData(
      "/api/member",
      "PATCH",
      userData
    );
    if (result && result.status === 200) {
      successToast("프로필 수정이 성공하였습니다.");
      navigate("/mypage");
    } else {
      
      if (result && result.status >= 400) {
        errorToast("프로필 수정이 실패하였습니다.");
      } else {
        errorToast("알 수 없는 오류가 발생하였습니다.");
      }
    }
  };
  return (
    <div>
      <div>
        <PageHeader text={"프로필 수정"} />
      </div>
      <div className="profileUpdateForm">
        <div className="firstForm">
          <label htmlFor="role" className="form-label">
            유저정보
          </label>
          <div className="formToggle">
            <div className="formRadioBtn">
              <input
                id="MENTEE"
                type="radio"
                name="role"
                value="MENTEE"
                checked={userData.role === "MENTEE"}
                onChange={onChangeUserValue}
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
                onChange={onChangeUserValue}
              />
              <label htmlFor="MENTOR">선생님</label>
            </div>
          </div>
        </div>
        <div className="secondForm">
          <label htmlFor="nickname" className="form-label">
            닉네임
          </label>
          <input
            type="text"
            id="nickname"
            name="nickname"
            value={userData.nickname}
            onChange={onChangeUserValue}
            className="formInput"
          />
        </div>
        <div className="thirdForm">
          {userData.role === "MENTEE" ? (
            <div>
              <label htmlFor="targetUniversity" className="form-label">
                목표 대학
              </label>
              <input
                type="text"
                id="targetUniversity"
                name="university"
                value={userData.university}
                onChange={onChangeUserValue}
                className="formInput"
              />
            </div>
          ) : (
            <div>
              <label htmlFor="currentUniversity" className="form-label">
                재학 대학
              </label>
              <input
                type="text"
                id="currentUniversity"
                name="university"
                value={userData.university}
                onChange={onChangeUserValue}
                className="formInput"
              />
            </div>
          )}
        </div>
        <div className="fourthForm">
          {userData.role === "MENTEE" ? (
            <div>
              <label htmlFor="targetDepartment" className="form-label">
                목표 학과
              </label>
              <input
                type="text"
                id="targetDepartment"
                name="department"
                value={userData.department}
                onChange={onChangeUserValue}
                className="formInput"
              />
            </div>
          ) : (
            <div>
              <label htmlFor="currentDepartment" className="form-label">
                전공 학과
              </label>
              <input
                type="text"
                id="currentDepartment"
                name="department"
                value={userData.department}
                onChange={onChangeUserValue}
                className="formInput"
              />
            </div>
          )}
        </div>
        <div>
          <button onClick={handleProfileSubmit} className="saveProfile">
            저장하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
