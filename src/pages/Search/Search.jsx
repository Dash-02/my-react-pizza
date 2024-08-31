/** @format */

import React from "react";
import styles from "./Search.module.scss";
import searchImg from "../../assets/img/search.svg";

const Search = () => {
  return (
    <div className={styles.wrapperInput}>
      <img className={styles.imgSearch} src={searchImg} alt="search" />
      <input className={styles.input} placeholder="Поиск..." />
    </div>
  );
};

export default Search;
