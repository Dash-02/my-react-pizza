/** @format */

import React from "react";

function Categories({ value, onClickCategory }) {
  console.log("value", value);
  // const [activeCategory, setActiveCategory] = React.useState(0);

  // const onClickCategory = (param) => {
  //   setActiveCategory(param);
  // };

  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, i) => (
          <li
            key={i}
            onClick={() => onClickCategory(i)}
            className={value === i ? "active" : ""}
          >
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
