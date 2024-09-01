/** @format */

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCategory } from "../redux/reducers/filterSlice";

function Categories() {
  const dispatch = useDispatch();
  const [categoryId, setCategoryId] = useState(0);
  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];
  const onClickCategory = (i) => {
    setCategoryId(i);
  };

  useEffect(() => {
    dispatch(setCategory(categoryId));
  }, [categoryId]);

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, i) => (
          <li
            key={i}
            onClick={() => onClickCategory(i)}
            className={categoryId === i ? "active" : ""}
          >
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
