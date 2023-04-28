import { FC } from "react";
import { IContactList } from "./types";
import { ContactItem } from "../../index";
import { defaultState } from "../../../types/users";
import style from "./contactList.module.scss";

const ContactList: FC<IContactList> = ({ state, query }) => {
  const firstChildArray = state.reduce((acc, item) => {
    const letter = item.name[0].toUpperCase();
    if (!acc[letter]) {
      acc[letter] = [];
    }
    acc[letter].push(item);
    return acc;
  }, {});

  const letters = Object.keys(firstChildArray);
  const sortedLetters = letters.sort((a, b) => a.localeCompare(b));

  const array = sortedLetters.map((letter, i) => (
    <div className={style.list__group} key={i}>
      <h2 className={style.list__title}>{letter}</h2>
      {firstChildArray[letter].map((item: defaultState, j: number) => {
        return <ContactItem contact={item} key={j} />;
      })}
    </div>
  ));

  const filterdArray = state.map((state) => {
    return <ContactItem contact={state} key={state.id} />;
  });

  return (
    <div className={style.list}>
      {query ? (
        <>
          <p className={style.list__search_title}>
            {state.length ? `Searching by"${query}"` : `No data by "${query}"`}
          </p>
          {filterdArray}
        </>
      ) : (
        array
      )}
      {!query ? (
        <div className={style.list__count}>{state.length + " Contacts"}</div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ContactList;
