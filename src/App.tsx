import { useState, useEffect } from "react";

import { battery, phoneBg, wifi } from "./assets";
import { useAction, useTypedSelector } from "./hooks";
import { Modal, Header, ContactList, AddContactPage } from "./components";

import style from "./index.module.scss";

const App = () => {
  const [addPage, setAddPage] = useState<boolean>(false);
  const [clock, setClock] = useState<any>();
  const [query, setQuery] = useState<string>("");

  const state = useTypedSelector((state) => state.users);
  const { fetchUsers } = useAction();

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    setInterval(() => {
      const data = new Date();
      setClock(data.toLocaleTimeString().slice(0, 5));
    }, 1000);
  }, []);

  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={style.content__status_bar}>
          <div className={style.content__status_bar__time}>{clock}</div>
          <div className={style.content__status_bar__icons}>
            <img src={wifi} alt="wifi" />
            <img src={battery} alt="battery" />
          </div>
        </div>
        {addPage ? (
          <Modal visible={addPage}>
            <AddContactPage setVisible={setAddPage} />
          </Modal>
        ) : (
          <>
            <Header setQuery={setQuery} query={query} setAddPage={setAddPage} />
            <ContactList state={state} query={query} />
          </>
        )}
      </div>
      <img className={style.container__bg} src={phoneBg}></img>
    </div>
  );
};

export default App;
