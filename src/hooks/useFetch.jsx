const useFetch = () => {
  const fetchData = async (url, method, body) => {
    const aceessToken = localStorage.getItem("accessToken");
    if (!aceessToken) {
      alert("로그인을 해주세요.");
      return;
    }
   console.log(aceessToken);
    const options = {
      method,
      headers:{
        "Content-Type": "application/json",
        "Authorization": `Bearer ${aceessToken}`,
      }
    };

    if((method === "POST" || method === "PATCH") && body) {
      options.body = JSON.stringify(body);
    } 
    try {
      const response = await fetch(url, options);
      const status = response.status;
      
      if (!response.ok) {
        const errorData = await response.json();
        return { status, data: errorData }; // 에러 데이터 반환
      }
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.startsWith("application/json")) {
        const data = await response.json();
        return { data , status};
      } else {
        return { status };
      }
    } catch (err) {
      console.error("네트워크 오류", err.message);
    }
  };
  return {fetchData};
};
export default useFetch;
