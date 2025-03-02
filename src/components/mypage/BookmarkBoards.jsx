import "../main/TutoringItems.css";
import { useNavigate } from "react-router-dom";
import {useState,useEffect} from "react";
import useFetch from "../../hooks/useFetch";

const BookmarkBoards = ({setBookmarkCount}) => {
    const navigate = useNavigate();
    const [bookmarkData,setBookmarkData] = useState([]);
    const { fetchData } = useFetch();
    useEffect(()=> {
        fetchBookmarkData();
    },[]);

    const handleItemsClick = (boardId) => {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
            alert("로그인을 해주세요.");
            return;
        }
        navigate(`/detail/${boardId}`);
    }
     const fetchBookmarkData = async() => {
        try {
            const result = await fetchData("/api/bookmark/bookmarks","GET")
            if(result.status === 200) {
                console.log(result.data);
                setBookmarkData(result.data || []);
                setBookmarkCount(result.data.length);
            }else {
                throw new Error("북마크 정보 가져오기 오류");
            }
        }catch(error) {
            console.error("북마크 정보 가져오기 오류: ", error.message);
        }
     }
    return(
        <div className="TutoringItem">
        {bookmarkData.map((item) => (
          <div
            className="contentItems"
            key={item.boardId}
            onClick={() => handleItemsClick(item.boardId)}
          >
            <div className="universityIdentify">
              <img
                className="uniLogoImage"
                src={item.universityImg?item.universityImg:"./defaultUnilogo.png"}
                alt="uniLogoImage"
              />
            </div>
            <div className="contentDescription">
              <p className="nickName">{item.authorName}</p>
              <p className="title">{item.title}</p>
              <p className="department">{item.authorUniversity} {item.authorDepartment}</p>
              <p className="category">
                <img
                  className="subjectSymbol"
                  src="subject.png"
                  alt="subjectSymbol"
                />
                전문과목: {item.category}
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
      </div>
    );
}
export default BookmarkBoards;
