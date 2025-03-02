import PageHeader from "../../components/header/PageHeader";
import Editor from "../../components/board/Editor";

const TutoringCreate = ({ onCreate }) => {
  const onSubmit = (formData) => {
    onCreate(formData);
  };

  return (
    <div>
      <PageHeader text={"과외공고 작성하기"} />
      <Editor onSubmit={onSubmit} />  
    </div>
  );
};
export default TutoringCreate;
