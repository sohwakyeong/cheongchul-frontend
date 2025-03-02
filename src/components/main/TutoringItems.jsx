import "./TutoringItems.css";
import { useNavigate } from "react-router-dom";
import { useReducer, useEffect, useRef } from "react";
import useLoadingStrore from "../../store/useLoadingStore";
import LoadingSpinner from "../ui/LoadingSpinner";

const initialState = {
  data: [],
  pageInfo: {
    page: 1,
    hasMore: true,
  },
  isLoading: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_DATA":
      return {
        ...state,
        data:
          action.payload.page === 1
            ? action.payload.data
            : [...state.data, ...action.payload.data],
        pageInfo: {
          ...state.pageInfo,
          hasMore: action.payload.data.length > 0,
        },
      };
    case "RESET_PAGE":
      return {
        ...initialState,
        pageInfo: { ...initialState.pageInfo, page: 1 },
      };
    case "INCREMENT_PAGE":
      return {
        ...state,
        pageInfo: { ...state.pageInfo, page: state.pageInfo.page + 1 },
      };
    default:
      return state;
  }
};

const TutoringItems = ({ category ,sortType}) => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, initialState);
  const observerTarget = useRef();
  const { isLoading,setLoading } = useLoadingStrore();

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
      alert("로그인을 해주세요.");
      return;
    }
    navigate(`/detail/${boardId}`);
  };

  const fetchData = async () => {
    if (state.isLoading || !state.pageInfo.hasMore) return;

    setLoading(true);

    try {
      const API_URL = `api/board/all?page=${state.pageInfo.page}&size=3&category=${category}&sortType=${sortType}`;
      const accessToken = localStorage.getItem("accessToken");

      const headers = accessToken
        ? {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          }
        : {};

      const response = await fetch(API_URL, { headers });
      if (!response.ok) throw new Error("Network response was not ok");
      const newData = await response.json();

      dispatch({
        type: "SET_DATA",
        payload: { data: newData.data, page: state.pageInfo.page },
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    dispatch({ type: "RESET_PAGE" });
    fetchData();
  }, [category,sortType]);

  useEffect(() => {
    fetchData();
  }, [state.pageInfo.page, category]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && !isLoading) {
          dispatch({ type: "INCREMENT_PAGE" });
        }
      },
      {
        threshold: 0,
      }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [isLoading, state.pageInfo.hasMore]);

  return (
    <div className="TutoringItem">
      {state.data.map((item) => (
        <div
          className="contentItems"
          key={item.boardId}
          onClick={() => handleItemsClick(item.boardId)}
        >
          <div className="universityIdentify">
            <img
              className="uniLogoImage"
              src={item.universityImgUrl ? item.universityImgUrl:"../defaultUnilogo.png"}
              alt="uniLogoImage"
            />
          </div>
          <div className="contentDescription">
           <p className="nickName">{item.authorName} | {item.formatDate}</p>
            <p className="title">{item.title}</p>
            <p className="department">{item.authorUniversity} {item.authorDepartment}</p>
            <p className="category">
              <img
                className="subjectSymbol"
                src="subject.png"
                alt="subjectSymbol"
              />
              전문과목: {options.find((opt)=>opt.value === item.category)?.label || "알 수 없음"}
            </p>
          </div>
          <div className="bookMark">
            <img
              className="bookMarkSymbol"
              src={item.bookmarked ? "bookMark.png" : "bookMarkFalse.png"}
              alt="bookMarkSymbol"
            />
          </div>
        </div>
      ))}
      <div ref={observerTarget}>
      {isLoading && (
        <div className="loading-spinner-container show">
          <LoadingSpinner />
        </div>
      )}
      {!state.pageInfo.hasMore && <p className="nomoreData">더 이상 표시할 게시글이 없습니다.</p>}
    </div>
  </div>
);
};

export default TutoringItems;
