import { FC } from "react";
import { useDispatch } from "react-redux";

import { IHeader } from "./types";

import { plus, search } from "../../../assets";
import { UsersTypes } from "../../../store/actionTypes";

import style from "./Header.module.scss";

const Header: FC<IHeader> = ({ setAddPage, setQuery, query }) => {
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);

    dispatch({ type: UsersTypes.QUERY_USER, payload: e.target.value });
  };

  return (
    <div className={style.header}>
      <div className={style.header__title}>
        <h1>Contacts</h1>
        <img src={plus} alt="" onClick={() => setAddPage(true)} />
      </div>
      <div className={style.header__search}>
        <form>
          <div className={style.header__search_box}>
            <img src={search} alt="search"></img>
            <input
              type="text"
              value={query}
              placeholder="Search"
              onChange={handleChange}
              className={style.header__search_input}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Header;
