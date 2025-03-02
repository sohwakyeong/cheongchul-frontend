import { useNavigate } from 'react-router-dom';
import useFetch from "../../hooks/useFetch";

const ChatButton = ({ boardId }) => {
    const navigate = useNavigate();
    const {fetchData} = useFetch();

    const getAuthorId = async () => {

    try{
        console.log(boardId);
        const result = await fetchData(`/api/board/${boardId}/author`,"GET");

    if(result.status !== 200){
        throw new Error("작성자 ID 가져오기 실패"); 
    }
   const data = result.data;
   console.log(data);
    return data;
    }catch (e) {
        console.error(e,"작성자 이름 가져오기 실패")
        return null;
    }
};
    

const handleChatButtonClick = async () => {
    try {
        const authorId = await getAuthorId();
        if (!authorId) {
            alert("작성자 ID를 가져올 수 없습니다.");
            return;
        }
        const result = await fetchData(`/api/chat/room/${authorId}`, "POST");
        console.log(result);
        
        if (result.status !== 200) {
            alert("채팅방을 생성할 수 없습니다.");
            return;
        }
        navigate(`/chat/${result.data.chatRoomId}`, {
            state: { chatRoom: result.data }
        });

    } catch (error) {
        console.error("채팅방 생성 중 오류 발생:", error);
        alert("채팅방을 생성하는 도중 문제가 발생했습니다.");
    }
};

    return (
        <div className="chatBtn">
            <button onClick={handleChatButtonClick}>과외 상담하기</button>
        </div>
    );
};

export default ChatButton;
