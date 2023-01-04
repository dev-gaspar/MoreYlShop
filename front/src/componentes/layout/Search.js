import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/Search.css"

const Search = () => {
  const [keyword, setKeyword] = useState("");

  const navigate = useNavigate();

  const searchHandler = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate(`/`);
    }
  };

  return (
    <div className="header__search">
      <form onSubmit={searchHandler}>
        <input
          className="header__searchBar"
          type="text"
          placeholder="Que estas buscando?"
          id="search_field"
          onChange={(e) => setKeyword(e.target.value)}
        />
      </form>
      <button
        id="search_btn"
        type="button"
        className="btn-buscar position-relative"
        onClick={searchHandler}
      >
        <i className="fa fa-search"></i>
      </button>
    </div>
  );
};

export default Search;
