/** @format */

import React, { useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import FetchDataObjectSlice, {
  fetchPizza,
} from "../redux/reducers/fetchDataSlice.js";

import Sort from "../components/Sort.jsx";
import Categories from "../components/Categories.jsx";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock.jsx";
import SkeletonLoad from "../components/PizzaBlock/Skeleton.jsx";
import { setPizzaBlock } from "../redux/reducers/counterSlice.js";
import Pagination from "../components/Pagination/Pagination.jsx";
import { AppContext } from "../App.js";
import { setFilter } from "../redux/reducers/filterSlice.js";

function Home() {
  const { search, setSearch } = useContext(AppContext);
  let [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState({
    nameSort: "популярности",
    sortType: "rating",
  });

  const { data, status } = useSelector((state) => state.fetchDataSlice);
  const { pizzasBlock } = useSelector((state) => state.counterSlice);
  const { filter } = useSelector((state) => state.filterSlice);
  const dispatch = useDispatch();
  const pizzaItems = data.map((element) => (
    <PizzaBlock key={element.id} {...element} />
  ));
  const skeletons = [...new Array(6)].map((_, id) => <SkeletonLoad key={id} />);

  useEffect(() => {
    const strSort = String(sort.sortType);
    const categoryId = filter.category;
    dispatch(fetchPizza({ categoryId, strSort, search, currentPage }));
  }, [filter, sort, search, currentPage]);

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
        <Sort value={sort} onClickSort={(i) => setSort(i)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {status === "error" && <span>Server error</span>}
        {status === "loading" && skeletons}
        {status === "success" && data && data.length > 0 && pizzaItems}
      </div>
      <Pagination onChangePage={(num) => setCurrentPage(num)} />
    </div>
  );
}

export default Home;
