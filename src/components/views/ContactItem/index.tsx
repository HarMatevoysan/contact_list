import { FC, useState } from "react";
import Modal from "../../shared/Modal";
import { IContactItem } from "./types";
import { ContactPage } from "./../../index";
import style from "./contactItem.module.scss";

const ContactItem: FC<IContactItem> = ({ contact }) => {
  const [contactPage, setContactPage] = useState<boolean>(false);
  return (
    <>
      {contactPage ? (
        <Modal visible={contactPage}>
          <ContactPage contact={contact} setVisible={setContactPage} />
        </Modal>
      ) : (
        <div className={style.contact} onClick={() => setContactPage(true)}>
          <div
            className={style.contact__photo}
            style={{
              background: contact.img
                ? `url(${contact.img})no-repeat center/cover`
                : "none",
            }}
          >
            {contact.img ? <></> : contact.name[0]}
          </div>
          <div>{contact.name}</div>
        </div>
      )}
    </>
  );
};

export default ContactItem;
