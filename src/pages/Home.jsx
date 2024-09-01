/** @format */

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import FetchDataObjectSlice, {
  fetchPizza,
} from "../redux/reducers/fetchDataSlice.js";

import Sort from "../components/Sort.jsx";
import Categories from "../components/Categories.jsx";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock.jsx";
import SkeletonLoad from "../components/PizzaBlock/Skeleton.jsx";
import { setPizzaBlock } from "../redux/reducers/counterSlice.js";

function Home({ search }) {
  let [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [sort, setSort] = useState({
    nameSort: "популярности",
    sortType: "rating",
  });

  const { data, status } = useSelector((state) => state.fetchDataSlice);
  const { pizzasBlock } = useSelector((state) => state.counterSlice);
  const dispatch = useDispatch();
  const pizzaItems = data.map((element) => (
    <PizzaBlock key={element.id} {...element} />
  ));
  const skeletons = [...new Array(6)].map((_, id) => <SkeletonLoad key={id} />);

  useEffect(() => {
    const strSort = String(sort.sortType);
    dispatch(fetchPizza({ categoryId, strSort, search }));
  }, [categoryId, sort, search]);

  useEffect(() => {
    if (!data) {
      return;
    }
    const arrayId = data.map((el) => {
      return { index: el.id, counter: 0 };
    });
    dispatch(setPizzaBlock(arrayId));
  }, [data]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          onClickCategory={(id) => setCategoryId(id)}
        />
        <Sort value={sort} onClickSort={(i) => setSort(i)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {status === "error" && <span>Server error</span>}
        {status === "loading" && skeletons}
        {status === "success" && data && data.length > 0 && pizzaItems}
      </div>
    </div>
  );
}

export default Home;
