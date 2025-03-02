import "./MainCategory.css"
const MainCategory = ({activeCategory,setCategory}) => {

  const handleCategoryClick = (category) => {
    setCategory(category);
  };

  return (
    <div className="MainCategory">
     <div onClick={() => handleCategoryClick("all")}>
     <button
          className={`categoryBtn ${
            activeCategory === "all" ? "active" : ""
          }`}
        >전체</button>
    </div>
     <div onClick={() => handleCategoryClick("korean")}>
     <button
          className={`categoryBtn ${
            activeCategory === "korean" ? "active" : ""
          }`}
        >국어</button>
    </div>
    <div onClick={() => handleCategoryClick("english")}>
    <button
          className={`categoryBtn ${
            activeCategory === "english" ? "active" : ""
          }`}
        >영어</button>
   </div>
   <div onClick={() => handleCategoryClick("math")}>
   <button
          className={`categoryBtn ${
            activeCategory === "math" ? "active" : ""
          }`}
        >수학</button>
  </div>
  <div onClick={() => handleCategoryClick("science")}>
  <button
          className={`categoryBtn ${
            activeCategory === "science" ? "active" : ""
          }`}
        >과학</button>
 </div>
 <div onClick={() => handleCategoryClick("society")}>
 <button
          className={`categoryBtn ${
            activeCategory === "society" ? "active" : ""
          }`}
        >사회</button>
</div>
</div>
  );
};

export default MainCategory;
