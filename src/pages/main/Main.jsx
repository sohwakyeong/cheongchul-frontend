import MainSwiper from "../../components/main/MainSwiper";
import MainCategory from "../../components/main/MainCategory";
import FilterOptions from "../../components/main/FilterOptions";
import TutoringItems from "../../components/main/TutoringItems";
import "./Main.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "../../utils/authUtils";

const Main = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("all");
  const [sortType, setSortType] = useState("latest");
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
  };

  return (
    <div className="Main">
      <div className="MainHeader">
        <div className="logo">
          <img src="./mainlogo.svg" />
        </div>
        <div>
          <form>
            <input
              className="searchBox"
              type="text"
              placeholder="검색어를 입력해 주세요."
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setSearch(e.target.value);
                  handleSearch(e);
                }
              }}
            />
          </form>
        </div>
        <div>
          <button className="mypageBtn" onClick={() => navigate("/mypage")}>
            <img src={getToken() ? "mypage_blue.png" : "./mypage.png"} />
          </button>
        </div>
      </div>
      <div className="mainWrapper">
        <div className="bannerSwiper">
          <MainSwiper />
        </div>
        <div className="TutoringCategory">
          <MainCategory
            activeCategory={category}
            setCategory={setCategory}
            setSearch={setSearch}
          />
        </div>
        <div className="FilterOption">
          <FilterOptions sortType={sortType} setSortType={setSortType} />
        </div>
        <div className="TutoringItems">
          <TutoringItems
            category={category}
            sortType={sortType}
            search={search}
          />
        </div>
      </div>
    </div>
  );
};

export default Main;
