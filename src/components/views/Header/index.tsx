import { FC } from "react";
import { IHeader } from "./types";
import { useDispatch } from "react-redux";
import plus from "./../../../assets/plus.png";
import search from "./../../../assets/search.png";
import { UsersTypes } from "../../../store/actionTypes";
import style from "./header.module.scss";

const Header: FC<IHeader> = ({ setAddPage, setQuery, query }) => {
  const data = new Date();
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    dispatch({ type: UsersTypes.QUERY_USER, payload: e.target.value });
  };

  return (
    <div className={style.header}>
      <div className={style.header__time}>
        <span>{data.getHours() + ":" + data.getMinutes()}</span>
      </div>
      <div className={style.header__title}>
        <h1>Contacts</h1>
        <img src={plus} alt="" onClick={() => setAddPage(true)} />
      </div>
      <div className={style.header__search} style={{ marginTop: 20 }}>
        <form>
          <div className={style.header__search_box}>
            <img src={search} style={{ height: 20 }} alt=""></img>
            <input
              className={style.header__search_input}
              type="text"
              placeholder="Search"
              value={query}
              onChange={handleChange}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Header;
