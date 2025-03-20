import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import PageHeader from "../../components/header/PageHeader";
import "./AllChats.css";
import useFetch from "../../hooks/useFetch";
import useLoadingStrore from "../../store/useLoadingStore";
import LoadingSpinner from "../../components/ui/LoadingSpinner";


const AllChats = () => {
  const navigate = useNavigate();
  const { fetchData } = useFetch();
  const [allChatsData, setAllChatsData] = useState([]);
  const {isLoading,setLoading} = useLoadingStrore();

  const formatTime = (messageTime) => {
    const year = messageTime[0];
    const month = String(messageTime[1]).padStart(2, "0");
    const day = String(messageTime[2]).padStart(2, "0");
    return `${year}-${month}-${day}`; 
  };

  useEffect(() => {
    const getAllChats = async () => {
      setLoading(true); 
      try {
        const result = await fetchData("/api/chat/rooms", "GET");
        if (result.status !== 200) {
          throw new Error("목록을 불러오는데 실패");
        }
        setAllChatsData(result.data); 
        console.log(result.data);
      } catch (error) {
        console.error(error);
      }finally{
        setLoading(false); 
      }
    };

    getAllChats();
  }, []);

  return (
    <div className="allChats">
      <PageHeader text="채팅 목록" />
      {isLoading?(
        <div className="loading-spinner-container show">
        <LoadingSpinner />
      </div>): allChatsData.length === 0 ? (
        <div className="noDataChat">
          <img className= "chatroomImg" src="/icons.png" alt="chatroomImg"/>
           <p className="noChatsMessage">과외 매칭을 위한 첫걸음, 메시지를 보내보세요!</p>
        </div>
     
    ) :(
      <ul className="chatList">
        {allChatsData.map((chatRoom) => (
          <li
            key={chatRoom.chatRoomId}
            className="chatItem"
            onClick={() => navigate(`/chat/${chatRoom.chatRoomId}`,{state:{chatRoom:chatRoom}})}
          >
            <div className="chatInfo">
              <img
                className="profileImg"
                src={chatRoom.universityImgUrl}
                alt="User Profile"
              />
              <div className="chatDetails">
                <div className="chatTop">
                  <span className="chatName">{chatRoom.otherNickName}</span>
                  <span className="chatDate">{formatTime(chatRoom.lastMessageTime)}</span>
                </div>
                <div className="lastMessage">{chatRoom.lastMessage}</div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      )}
    </div>
  );
};

export default AllChats;

