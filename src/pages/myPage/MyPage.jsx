import "./MyPage.css";
import PageHeader from "../../components/header/PageHeader";
import { useNavigate } from "react-router-dom";
import { removeToken } from "../../utils/authUtils";
import useFetch from "../../hooks/useFetch";
import { useEffect, useState } from "react";
import BookmarkBoards from "../../components/mypage/BookmarkBoards";
import useLoadingStrore from "../../store/useLoadingStore";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
const MyPage = () => {
  const { fetchData } = useFetch();
  const navigate = useNavigate();
  const [memeberData, setmemebrDataData] = useState({});
  const [bookmarkCount, setBookmarkCount] = useState(0);
  const { isLoading, setLoading } = useLoadingStrore();
  const fetchMemberData = async () => {
    setLoading(true);
    try {
      const result = await fetchData("/api/member/info", "GET");

      if (result?.data) {
        setmemebrDataData(result.data);
      } else {
        console.error("회원 정보 조회 실패");
      }
    } catch (error) {
      console.error("회원 정보 요청 오류:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMemberData();
  }, []);

  const handleLogout = () => {
    removeToken();
    navigate("/login");
  };
  return (
    <div className="mypageWrapper">
      <div>
        <PageHeader text={"마이페이지"} />
      </div>
      {isLoading ? (
        <div className="loading-spinner-container show">
          <LoadingSpinner />
        </div>
      ) : (
        <>
          <div className="userDescription">
            <div className="userProfile">
              <div>
                <img
                  className="userImage"
                  src={
                    memeberData.universityImgUrl
                      ? memeberData.universityImgUrl
                      : "./defaultUnilogo.png"
                  }
                />
              </div>
              <div className="user">
                <div className="userName">{memeberData.nickname}</div>
                <div>{memeberData.department}</div>
              </div>
            </div>
            <div className="logout">
              <button onClick={handleLogout} className="logoutBtn">
                로그아웃
              </button>
            </div>
          </div>
          <div className="updateUser">
            <button
              className="userUpdateBtn"
              onClick={() => navigate("/userProfile")}
            >
              프로필 수정
            </button>
          </div>
          <div>
            <div className="banner">
              <div className="bannerBox">
                <div>
                  <img className="bannerImage" src="./icons.png" />
                </div>
                <div className="bannerMessage">
                  <div>지금 프로필을 수정하고, 새로운 과외를 찾아보세요.</div>
                </div>
              </div>
            </div>
          </div>
          <div className="TutoringItems">
            <div className="saveTutoring">
              저장한 과외공고
              <span className="saveNumber">{bookmarkCount}</span>
            </div>
            <BookmarkBoards setBookmarkCount={setBookmarkCount} />
          </div>
        </>
      )}
    </div>
  );
};
export default MyPage;
