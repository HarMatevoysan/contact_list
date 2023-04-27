import { useState, useEffect } from "react";
import { useAction, useTypedSelector } from "./hooks";
import { Modal, Header, ContactList, AddContactPage } from "./components";
import style from "./index.module.scss";

const App = () => {
  const [addPage, setAddPage] = useState<boolean>(false);
  const state = useTypedSelector((state) => state.users);
  const [query, setQuery] = useState<string>("");
  const { fetchUsers } = useAction();

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className={style.contenier}>
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
  );
};

export default App;
