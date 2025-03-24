import { useEffect } from "react";
import { Routes, Route,useNavigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import Main from "./pages/main/Main";
import MyPage from "./pages/myPage/MyPage";
import TutoringCreate from "./pages/board/TutoringCreate";
import BoardUpdate from "./pages/board/BoardUpdate";
import TutoringDetail from "./pages/board/TutoringDetail";
import UserLogin from "./pages/login/UserLogin";
import Notfound from "./pages/notFound/NotFound";
import UserProfile from "./pages/myPage/UserProfile";
import AllChats from "./pages/chat/AllChats";
import Chat from "./pages/chat/Chat";

import useFetch from "./hooks/useFetch";
import Layout from "./components/main/Layout";
import UserRegister from "./pages/signUp/UserRegister";
import { getToken, removeToken } from "./utils/authUtils"; 
import RequireToken from "./utils/RequireToken";
import ToastNotification from "./components/ui/ToastNotification";
import { errorToast } from "./components/ui/ToastFunctions";


function App() {
  const queryClient = new QueryClient();
  const { fetchData } = useFetch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken(); 
    const isLogout = localStorage.getItem("isLogout");

 if (!token && isLogout !== "true") { 
      removeToken();
      navigate("/login");
    }
  }, [navigate]);


  const onCreate = async ({ title, content, category }) => {
    const postData = { title, content, category };
    const result = await fetchData(
      "api/board/create",
      "POST",
      postData
    );
    if (result.status === 201) {
      navigate(`/detail/${result.data.boardId}`)
    } else if (result.status >= 400) {
      errorToast("글 작성이 실패하였습니다.");
    } else {
      errorToast("글 작성이 실패하였습니다.");
    }
  };

  return (
      <QueryClientProvider client={queryClient}>
     <ToastNotification />
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Main />
            </Layout>
          }
        />
        <Route
          path="/mypage"
          element={
            <Layout>
              <RequireToken>
              <MyPage />
              </RequireToken>
            </Layout>
          }
        />
        <Route path="/userProfile" element={<Layout><UserProfile /></Layout>} />
        <Route
          path="/create"
          element={
            <Layout>
               <RequireToken>
               <TutoringCreate onCreate={onCreate} />
               </RequireToken>
            </Layout>
          }
        />
         <Route
          path="/detail/:id/edit"
          element={ 
            <Layout>
              <RequireToken>
              <BoardUpdate />
              </RequireToken>
            </Layout>
          }/>
        <Route
          path="/detail/:id"
          element={
            <RequireToken>
            <Layout>
              <TutoringDetail />
            </Layout>
            </RequireToken>
          }
        />
        <Route
          path="/register"
          element={
            <Layout>
              <UserRegister />
            </Layout>
          }
        />
        <Route
          path="/login"
          element={
            <Layout>
              <UserLogin />
            </Layout>
          }
        />
        <Route
          path="/allChats"
          element={ 
            <Layout>
              <RequireToken>
              <AllChats />
              </RequireToken>
            </Layout>
          }/>
           <Route
          path="/chat/:id"
          element={ 
            <Layout>
              <RequireToken>
              <Chat />
              </RequireToken>
            </Layout>
          }/>
        <Route path="*" element={<Notfound />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
