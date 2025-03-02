import { useState } from "react";
import "./FilterOptions.css";

const FilterOptions = ({ sortType, setSortType }) => {
  const [isOpen, setIsOpen] = useState(false);
  const options = [
    { value: "oldest", label: "기본순" },
    { value: "latest", label: "최신순" },
    { value: "popular", label: "인기순" },
  ];

  return (
    <div className="filterOptions">
     <div className={`customSelect ${isOpen ? "open" : ""}`} onClick={() => setIsOpen(!isOpen)}>
        {options.find((opt) => opt.value === sortType)?.label || "정렬 선택"}
     
      {isOpen && (
        <ul className="customDropdown">
          {options.map((option) => (
            <li
              key={option.value}
              className="customOption"
              onClick={() => {
                setSortType(option.value);
                setIsOpen(false);
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
       </div>
    </div>
  );
};

export default FilterOptions;
