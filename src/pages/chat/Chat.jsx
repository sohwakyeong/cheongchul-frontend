import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import PageHeader from "../../components/header/PageHeader";
import "./Chat.css";
import useLoadingStore from "../../store/useLoadingStore";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

const Chat = ({ stompClient, isSocketConnected }) => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { chatRoom } = location.state || {};

  const { isLoading, setLoading } = useLoadingStore();

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const formatCreatedAt = (createdAt) => {
    let hours;
    let minutes;
    if (Array.isArray(createdAt)) {
      hours = String(createdAt[3]).padStart(2, "0");
      minutes = String(createdAt[4]).padStart(2, "0");
      return `${hours}:${minutes}`;
    } else {
      hours = "";
      minutes = "";
      return `${hours}${minutes}`;
    }
  };

  useEffect(() => {
    if (!chatRoom) {
      alert("잘못된 접근입니다.");
      navigate(-1);
      return;
    }

    const loadMessages = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/chat/messages/${id}`);
        if (!response.ok) {
          throw new Error("메시지 가져오기 실패");
        }
        const data = await response.json();
        setMessages(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    loadMessages();

    if (stompClient && isSocketConnected) {
      stompClient.connect({}, () => {
        stompClient.subscribe(
          `/topic/chat/${chatRoom.chatRoomId}`,
          (message) => {
            const chatMessage = JSON.parse(message.body);
            setMessages((prevMessages) => [...prevMessages, chatMessage]);
          }
        );
      });
    }
  }, [chatRoom, id, stompClient, isSocketConnected, navigate, setLoading]);

  const handleSend = () => {
    if (newMessage && stompClient) {
      const chatMessage = {
        chatRoomId: chatRoom.chatRoomId,
        me: chatRoom.me,
        message: newMessage,
      };
      stompClient.send("/app/send", {}, JSON.stringify(chatMessage));
      setNewMessage("");
    }
  };

  if (isLoading || !isSocketConnected) {
    return (
      <div className="loading-spinner-container">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="chatDetail">
      <PageHeader text={`${chatRoom.otherNickName}`} />
      <div className="chatMessages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`messageContainer ${
              msg.senderId === chatRoom.me ? "me" : "other"
            }`}
          >
            <div
              className={`message ${
                msg.senderId === chatRoom.me ? "me" : "other"
              }`}
            >
              <span className="messageText">{msg.message}</span>
              <span className="messageTime">
                {formatCreatedAt(msg.createdAt)}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="chatInputBox">
        <input
          type="text"
          placeholder="메시지를 입력해주세요."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={handleSend}>전송</button>
      </div>
    </div>
  );
};

export default Chat;
