import "./TutoringItems.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useFetchTutoringItems } from "../../hooks/useItems";
import LoadingSpinner from "../ui/LoadingSpinner";
import { errorToast } from "../../components/ui/ToastFunctions";

const TutoringItems = ({ category, sortType, search }) => {
  const navigate = useNavigate();
  const observerTarget = useRef();

  const {
    data,
    isFetching,
    fetchNextPage,
    hasNextPage,
  } = useFetchTutoringItems(category, sortType, search);

  const options = [
    { value: "korean", label: "국어" },
    { value: "english", label: "영어" },
    { value: "math", label: "수학" },
    { value: "science", label: "과학" },
    { value: "society", label: "사회" },
  ];

  const handleItemsClick = (boardId) => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      errorToast("로그인을 해주세요.");
      navigate(`/detail/${boardId}`);
      return;
    }
    navigate(`/detail/${boardId}`);
  };


  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0 }
    );

    if (observerTarget.current) observer.observe(observerTarget.current);
    return () => observer.disconnect();
  }, [hasNextPage]);

  return (
    <div className="TutoringItem">
      {data?.pages?.flatMap((page) =>
        page.data.map((item) => (
          <div
            className="contentItems"
            key={item.boardId}
            onClick={() => handleItemsClick(item.boardId)}
          >
            <div className="universityIdentify">
              <img
                className="uniLogoImage"
                src={item.universityImgUrl || "/defaultUnilogo.png"}
                alt="uniLogoImage"
              />
            </div>
            <div className="contentDescription">
              <p className="nickName">{item.authorName} | {item.formatDate}</p>
              <p className="title">{item.title}</p>
              <p className="department">
                {item.authorUniversity} {item.authorDepartment}
              </p>
              <p className="category">
                <img className="subjectSymbol" src="/subject.png" alt="subjectSymbol" />
                전문과목: {options.find((opt) => opt.value === item.category)?.label || "알 수 없음"}
              </p>
            </div>
            <div className="bookMark">
              <img
                className="bookMarkSymbol"
                src={item.bookmarked ? "/bookMark.png" : "/bookMarkFalse.png"}
                alt="bookMarkSymbol"
              />
            </div>
          </div>
        ))
      )}
      <div ref={observerTarget}>
        {isFetching && (
          <div className="loading-spinner-container show">
            <LoadingSpinner />
          </div>
        )}
        {!isFetching &&!hasNextPage && <p className="nomoreData">더 이상 표시할 게시글이 없습니다.</p>}
      </div>
    </div>
  );
};

export default TutoringItems;
