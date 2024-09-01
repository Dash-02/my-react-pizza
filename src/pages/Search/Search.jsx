/** @format */

import React from "react";
import styles from "./Search.module.scss";
import searchImg from "../../assets/img/search.svg";
import closeImg from "../../assets/img/close.svg";

const Search = ({ search, setSearch }) => {
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
