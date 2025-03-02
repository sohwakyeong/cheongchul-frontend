
import { useState} from "react";
import "./Editor.css";
import useValidation from "../../hooks/useValidation";
import { errorToast } from "../../components/ui/ToastFunctions";

const Editor = ({ onSubmit,initialData ={}}) => {
  const { errors, validate } = useValidation();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: initialData.title,
    category: initialData.category,
    content: initialData.content,
});

  const options = [
    { value: "korean", label: "국어" },
    { value: "english", label: "영어" },
    { value: "math", label: "수학" },
    { value: "science", label: "과학" },
    { value: "society", label: "사회" },
  ];

  const onChangeValue = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onClickSubmitButton = (e) => {
    e.preventDefault();
    if (!validate(formData)) {
      errorToast(errors);
      return;
    }
    onSubmit(formData);
  };


  return (
    <div>
      <form className="formData" onSubmit={onClickSubmitButton}>
        <div className="form-group">
          <label htmlFor="title">제목을 작성해주세요.</label>
          <input
            value={formData.title}
            onChange={onChangeValue}
            name="title"
            id="title"
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">전문과목을 선택해주세요.</label>
          <div className="filterOption">
            <div
              className={`categoryCustomSelect ${isOpen ? "open" : ""}`}
              onClick={() => setIsOpen(!isOpen)}
            >
              {options.find((opt) => opt.value === formData.category)?.label ||
                "선택"}
              {isOpen && (
                <ul className="customDropdown">
                  {options.map((option) => (
                    <li
                      key={option.value}
                      className="customOption"
                      onClick={() => {
                        setFormData({ ...formData, category: option.value });
                        setIsOpen(false);
                      }}
                    >
                      {option.label}
                    </li>
                  ))} 
                </ul>
              )}
            </div>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="content">선생님의 수업 내용을 알려주세요.</label>
          <textarea
            value={formData.content}
            onChange={onChangeValue}
            name="content"
            id="content"
          />
        </div>

        <div className="buttonBox">
          <button className="cancleBtn" type="button">
            작성취소
          </button>
          <button className="createBtn" type="submit">
            등록하기
          </button>
        </div>
      </form>
    </div>
  );
};
export default Editor;
