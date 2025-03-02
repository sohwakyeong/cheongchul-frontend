import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./BoardPatchMenu.css";
import useFetch from "../../hooks/useFetch";
import { errorToast } from "../../components/ui/ToastFunctions";
import { successToast } from "../../components/ui/ToastFunctions";

const BoardPatchMenu = ({ detailData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { id } = useParams();
  const { fetchData } = useFetch();
  const navigate = useNavigate();
  const handleEdit = () => {
    setIsOpen(false);
    navigate(`/detail/${id}/edit`, { state: { detailData } });
  };
  const handleDelete = async () => {
    setIsOpen(false);
    const result = await fetchData(`/api/board/${id}`, "DELETE");

    if (result.status !== 200) {
      const errorMessage = result.data.message;
      console.log(errorMessage);
      errorToast(errorMessage, "error");
    } else {
      successToast("해당 공고가 삭제되었습니다.");
      navigate("/");
    }
  };
  return (
    <div className="activeMenu">
      <div className="activBox" onClick={() => setIsOpen(!isOpen)}>
        <img src="/activeBox.svg" alt="옵션열기" />
      </div>
      {isOpen && (
        <ul className="dropdownMenu">
          <li onClick={handleEdit}>✏️ 수정하기</li>
          <li onClick={handleDelete}>🗑 삭제하기</li>
        </ul>
      )}
    </div>
  );
};
export default BoardPatchMenu;
