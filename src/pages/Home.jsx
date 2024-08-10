/** @format */

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import FetchDataObjectSlice, {
  fetchPizza,
} from "../redux/reducers/fetchDataSlice.js";

import Sort from "../components/Sort.jsx";
import Categories from "../components/Categories.jsx";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock.jsx";
import SkeletonLoad from "../components/PizzaBlock/Skeleton.jsx";
import { setPizzaBlock } from "../redux/reducers/counterSlice.js";

function Home() {
  let [items, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const { data, status } = useSelector((state) => state.fetchDataSlice);
  const { pizzasBlock } = useSelector((state) => state.counterSlice);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchPizza());
  }, []);
  console.log(data, status);

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
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {status === "error" && <span>Server error</span>}
        {status === "loading" &&
          [...new Array(6)].map((_, id) => <SkeletonLoad key={id} />)}
        {status === "success" &&
          data &&
          data.length > 0 &&
          data.map((element) => <PizzaBlock key={element.id} {...element} />)}
      </div>
    </div>
  );
}

export default Home;
