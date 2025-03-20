import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import PageHeader from "../../components/header/PageHeader";
import "./AllChats.css";
import useFetch from "../../hooks/useFetch";
import useLoadingStore from "../../store/useLoadingStore";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import { errorToast, successToast } from "../../components/ui/ToastFunctions";

const AllChats = () => {
  const navigate = useNavigate();
  const { fetchData } = useFetch();
  const [allChatsData, setAllChatsData] = useState([]);
  const { isLoading, setLoading } = useLoadingStore();

  useEffect(() => {
    const getAllChats = async () => {
      setLoading(true);
      try {
        const result = await fetchData("/api/chat/rooms", "GET");
        if (result.status !== 200) {
          throw new Error("목록을 불러오는데 실패");
        }
        setAllChatsData(result.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getAllChats();
  }, []);

  const formatTime = (messageTime) => {
    if (!messageTime) return "";
    const [year, month, day] = messageTime;
    return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  };

  const handleDelete = async (chatRoomId) => {
    try {
      const result = await fetchData(`/api/chat/rooms/${chatRoomId}`, "DELETE");
      if (result.status !== 200) { 
        throw new Error(result.data?.message || "채팅방 삭제 실패");
      }
      successToast("채팅방이 삭제되었습니다.");
      setAllChatsData((prevChats) => prevChats.filter(chat => chat.chatRoomId !== chatRoomId));
    } catch (error) {
      errorToast(error.message, "error");
      console.error(error);
    }
  };

  return (
    <div className="allChats">
      <PageHeader text="채팅 목록" />
      {isLoading ? (
        <div className="loading-spinner-container">
          <LoadingSpinner />
        </div>
      ) : allChatsData.length === 0 ? (
        <div className="noDataChat">
          <img className="chatroomImg" src="/icons.png" alt="chatroomImg" />
          <p className="noChatsMessage">과외 매칭을 위한 첫걸음, 메시지를 보내보세요!</p>
        </div>
      ) : (
        <ul className="chatList">
          {allChatsData.map((chatRoom) => (
            <li key={chatRoom.chatRoomId} className="chatItem">
              <div className="chatInfo" onClick={() => navigate(`/chat/${chatRoom.chatRoomId}`, { state: { chatRoom } })}>
                <img className="profileImg" src={chatRoom.otherImg || "/default-profile.png"} alt="User Profile" />
                <div className="chatDetails">
                  <div className="chatTop">
                    <span className="chatName">{chatRoom.otherNickName}</span>
                  </div>
                  <div className="lastMessage">{chatRoom.lastMessage || "메시지가 없습니다."}</div>
                </div>
                <div className="chatDate">{formatTime(chatRoom.lastMessageTime || "")}</div>
              </div>
              <button className="deleteChatBtn" onClick={() => handleDelete(chatRoom.chatRoomId)}>✕</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AllChats;
