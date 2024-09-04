/** @format */

import React, { useContext, useRef } from "react";
import styles from "./Search.module.scss";
import searchImg from "../../assets/img/search.svg";
import closeImg from "../../assets/img/close.svg";
import { AppContext } from "../../App";

const Search = () => {
  const { search, setSearch } = useContext(AppContext);

  const searchRef = useRef();
  const onClickInput = () => {
    setSearch("");
    searchRef.current.focus();
  };

  return (
    <div className={styles.wrapperInput}>
      <img className={styles.imgSearch} src={searchImg} alt="search" />
      <input
        ref={searchRef}
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        className={styles.input}
        placeholder="Поиск..."
      />
      {search && (
        <img
          onClick={onClickInput}
          className={styles.imgClose}
          src={closeImg}
          alt="close"
        />
      )}
    </div>
  );
};

export default Search;
