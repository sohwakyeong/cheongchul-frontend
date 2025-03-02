import PageHeader from "../../components/header/PageHeader";
import Editor from "../../components/board/Editor";
import useFetch from "../../hooks/useFetch";
import { useParams,useLocation,useNavigate } from "react-router-dom";
import {errorToast} from "../../components/ui/ToastFunctions";
import { successToast } from "../../components/ui/ToastFunctions";

const BoardUpdate = () => {
    const {fetchData} = useFetch();
    const {id} = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const initialData =  {
        title: location.state.detailData.title,
        category: location.state.detailData.category, 
        content:location.state.detailData.content, 
    };
    
    const onSubmit = async (formData) => {
        const result = await fetchData(`/api/board/${id}`, "PATCH", formData);
        console.log(formData);
        if (result.status !== 200) {
            const errorMessage = result.data.message;
            console.log(errorMessage)
            errorToast(errorMessage,"error");
        } else {
            successToast("수정이 완료되었습니다!");
            navigate(`/detail/${id}`);
        }
    };

  return (
    <div>
      <PageHeader text={"게시글 수정"} />
      <Editor onSubmit={onSubmit}  initialData={initialData}/>  
    </div>
  );
};
export default BoardUpdate;