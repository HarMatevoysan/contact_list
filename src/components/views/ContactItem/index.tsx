import { FC, useState } from "react";

import type { IContactItem } from "./types";

import { ContactPage, Modal } from "../../index";

import style from "./ContactItem.module.scss";

const ContactItem: FC<IContactItem> = ({ contact }) => {
  const [contactPage, setContactPage] = useState<boolean>(false);

  const imgBackground = contact.img ? `url(${contact.img})` : "none";

  const imgBackgroundOrLetter = contact.img ? null : contact.name[0];

  return (
    <>
      {contactPage ? (
        <div className={style.contact__modal}>
          <Modal visible={contactPage}>
            <ContactPage contact={contact} setVisible={setContactPage} />
          </Modal>
        </div>
      ) : (
        <div className={style.contact} onClick={() => setContactPage(true)}>
          <div
            className={style.contact__photo}
            style={{
              backgroundImage: imgBackground,
            }}
          >
            {imgBackgroundOrLetter}
          </div>
          <div>{contact.name}</div>
        </div>
      )}
    </>
  );
};

export default ContactItem;
