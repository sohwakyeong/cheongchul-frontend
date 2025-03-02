import "./TutoringDetail.css";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import BoardPatchMenu from "../../components/board/BoardPatchMenu";
import ChatButton from "../../components/board/ChatButton";
import useLoadingStore from "../../store/useLoadingStore"; 
import LoadingSpinner from "../../components/ui/LoadingSpinner";

const TutoringDetail = () => {
  const { fetchData } = useFetch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [detailData, setDetailData] = useState({});
  const { isLoading, setLoading } = useLoadingStore(); 

  const options = [
    { value: "korean", label: "국어" },
    { value: "english", label: "영어" },
    { value: "math", label: "수학" },
    { value: "science", label: "과학" },
    { value: "society", label: "사회" },
  ];

  const onGetDetails = async () => {
    setLoading(true);
    try {
      const result = await fetchData(`/api/board/${id}`, "GET");

      if (result?.data) {
        setDetailData(result.data);
      } else {
        console.error("상세페이지 데이터 요청오류");
      }
    } catch (error) {
      console.log("상세페이지 데이터 받아오기 오류", error);
    }finally{
      setLoading(false);
    }
  };
  useEffect(() => {
    onGetDetails();
  }, [id]);

  const setBookmark = async () => {
    try {
      const method = detailData.bookmarked ? "DELETE" : "POST";

      const result = await fetchData(`/api/bookmark/${id}`, method);

      if (result.status === 201 || result.status === 200) {
        setDetailData((prevState) => ({
          ...prevState,
          bookmarked: !prevState.bookmarked,
        }));
        alert(
          result.status === 201
            ? "북마크가 추가되었습니다"
            : "북마크가 해지되었습니다."
        );
      } else {
        throw new Error("error", result.status);
      }
    } catch (error) {
      console.error("북마크 처리 오류", error);
      alert(error.message);
    }
  };

  return (
    <div className="DetailPages">
      <div className="contentWrap">
        <div className="detailHeader">
          <div className="prev" onClick={() => navigate(-1)}>
            <img src="/prevBtn.svg" alt="뒤로가기" />
          </div>
          <div className="logoDetail">
            <img src="/logo.svg" />
          </div>
          <BoardPatchMenu detailData={detailData} />
        </div>
        {isLoading ? (<div className="loading-spinner-container show">
        <LoadingSpinner />
      </div>):(
        <div className="contentMain">
          <div className="uniLogo">
            <img
              className="uniLogoImg"
              src={
                detailData.universityImgUrl
                  ? detailData.universityImgUrl
                  : "../defaultUnilogo.png"
              }
            />
          </div>
          <div className="contentDetail">
            <div className="contentTitle">{detailData.title}</div>
            <div className="contentWriter">
              <div className="contentDepartment">
                {detailData.authorUniversity} {detailData.authorDepartment}
              </div>
              <div className="contentUser">{detailData.authorName}</div>
            </div>
            <div className="contentCategory">
              <img className="subjectIcon" src="/subject.png" />
              전문과목:{" "}
              {options.find((opt) => opt.value === detailData.category)
                ?.label || "알 수 없음"}
            </div>
          </div>
          <div className="contentBox">{detailData.content}</div>
          <div className="activeBtn">
            <button>공유하기</button>
            <button onClick={setBookmark}>
              {detailData.bookmarked ? "찜 해제" : "찜하기"}
            </button>
          </div>
          <ChatButton boardId={detailData.boardId} />
        </div>
        )}
      </div>
    </div>
  );
};
export default TutoringDetail;
