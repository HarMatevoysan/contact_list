import { FC } from "react";

import { IContactList } from "./types";

import { ContactItem } from "../../index";

import { IDefaultState } from "../../../types/users";

import style from "./ContactList.module.scss";

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

  const contactItems = sortedLetters.map((letter, i) => (
    <div className={style.list__group} key={i}>
      <h2 className={style.list__title}>{letter}</h2>
      {firstChildArray[letter].map((item: IDefaultState, j: number) => (
        <ContactItem contact={item} key={j} />
      ))}
    </div>
  ));

  const searchTitle = state.length ? `Searching by "${query}"` : `No data by "${query}"`;

  const filteredContactItems = state.map((state) => <ContactItem contact={state} key={state.id} />);

  const contactsLenghtTitle = !query ? <div className={style.list__count}>{state.length + " Contacts"}</div> : null;

  return (
    <div className={style.list}>
      {query ? (
        <>
          <p className={style.list__search_title}>{searchTitle}</p>
          {filteredContactItems}
        </>
      ) : (
        contactItems
      )}
      {contactsLenghtTitle}
    </div>
  );
};

export default ContactList;
