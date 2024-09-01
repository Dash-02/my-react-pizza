/** @format */

import React, { useContext } from "react";
import styles from "./Search.module.scss";
import searchImg from "../../assets/img/search.svg";
import closeImg from "../../assets/img/close.svg";
import { AppContext } from "../../App";

const Search = () => {
  const { search, setSearch } = useContext(AppContext);

  return (
    <div className={styles.wrapperInput}>
      <img className={styles.imgSearch} src={searchImg} alt="search" />
      <input
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        className={styles.input}
        placeholder="Поиск..."
      />
      {search && (
        <img
          onClick={() => setSearch("")}
          className={styles.imgClose}
          src={closeImg}
          alt="close"
        />
      )}
    </div>
  );
};

export default Search;
