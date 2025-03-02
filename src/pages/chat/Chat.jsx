import { useParams,useLocation } from "react-router-dom";
import { useState,useEffect } from "react";
import PageHeader from "../../components/header/PageHeader";
import "./Chat.css";
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

const Chat = () => {
  const { id } = useParams();
  const location = useLocation();
  const {chatRoom} = location.state || {};
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [stompClient, setStompClient] = useState(null);

  const formatCreatedAt = (createdAt) => {
    let hours;
    let minutes;
      
    if (Array.isArray(createdAt)) {
      hours = String (createdAt[3]).padStart(2, '0');
      minutes = String (createdAt[4]).padStart(2, '0');
      return `${hours}:${minutes}`;
    } else {
          hours ="";
          minutes="";
      return  `${hours}${minutes}`;
    }
  };

  useEffect(() => {
    const loadMessages = async ()=>{
      try {
        const response = await fetch(`/api/chat/messages/${id}`);
        if(!response.ok){
          throw new Error("메시지 가져오기 실패")
        }
        const data = await response.json();
        setMessages(data);
      }catch(e){
        console.error(e);
    }
  };

loadMessages();

const socket = new SockJS("/api/ws");
const client = Stomp.over(socket);

client.connect({}, () => {
  client.subscribe(`/topic/chat/${chatRoom.chatRoomId}`,(message)=> {
    const chatMessage = JSON.parse(message.body);
    setMessages((prevMessage)=>[...prevMessage,chatMessage]);
  });
});

setStompClient(client);

return () => {
  if(client){
    client.disconnect();
  }
};
  },[chatRoom.chatRoomId]);

  const handleSend = () => {
    if (newMessage) {
      const chatMessage = {
        chatRoomId: chatRoom.chatRoomId,
        me: chatRoom.me,
        message: newMessage,
      };
      stompClient.send("/app/send",{},JSON.stringify(chatMessage));
      setNewMessage("");
    }
  };

  return (
    <div className="chatDetail">
      <PageHeader text={`${chatRoom.otherNickName}`} />
      <div className="chatMessages">
        {messages.map((msg, index) => (
          <div key={index} className={`messageContainer ${msg.senderId === chatRoom.me ? "me" : "other"}`}>
             <div className={`message ${msg.senderId === chatRoom.me ? "me" : "other"}`}>
              <span className="messageText">{msg.message}</span>
              <span className="messageTime">{formatCreatedAt(msg.createdAt)}</span>
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


