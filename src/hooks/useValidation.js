import { useState } from "react";

const useValidation = () => {
  const labelMapping = {
    title: "제목",
    category: "과목",
    content: "내용",
    role: "유저정보",
    nickname: "닉네임",
    university: "대학",
    department: "학과",
    email: "이메일",
    password: "비밀번호",
    name: "이름",
  };
  const [errors, setErrors] = useState(null);
  const validate = (fields) => {
    const errorMessage = [];
    for (const [key, value] of Object.entries(fields)) {
      if (!value) {
        errorMessage.push(labelMapping[key]||key);
      } 
    }

    if(errorMessage.length > 0) {
        const message = `${errorMessage.join(', ')}을(를) 입력해주세요.`
        setErrors(message);
        return false;
    } else {
    setErrors(null);
  }
  return true;
};
  return { errors, validate };
};

export default useValidation;
