import MainSwiper from "../../components/main/MainSwiper";
import MainCategory from "../../components/main/MainCategory";
import FilterOptions from "../../components/main/FilterOptions";
import TutoringItems from "../../components/main/TutoringItems";
import "./Main.css";
import { useState } from "react";
import { getToken } from "../../utils/authUtils";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("all");
  const [sortType,setSortType] = useState("latest");

  return (
    <div className="Main">
      <div className="MainHeader">
        <div className="logo">
          <img src="./mainlogo.svg" />
        </div>
        <div>
          <form>
            <input
              className="searchBox "
              type="text"
              placeholder="검색어를 입력해 주세요."
            />
          </form>
        </div>
        <div>
          <button className="mypageBtn" onClick={()=>navigate("/mypage")}>
            <img src={getToken()? "mypage_blue.png":"./mypage.png"} />
          </button>
        </div>
      </div>
      <div className="mainWrapper">
        <div className="bannerSwiper">
          <MainSwiper />
        </div>
        <div className="TutoringCategory">
          <MainCategory activeCategory={category} setCategory={setCategory} />
        </div>
        <div className="FilterOption">
          <FilterOptions sortType={sortType} setSortType={setSortType}/>
        </div>
        <div className="TutoringItems">
        <TutoringItems category={category} sortType={sortType} />
      </div>
      </div>
    </div>
  );
};
export default Main;
