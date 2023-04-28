import React, { FC, useState } from "react";
import { IContactPage } from "./types";
import { useDispatch } from "react-redux";
import mail from "../.././../assets/mail.png";
import phone from "../.././../assets/phone.png";
import { UsersTypes } from "../../../store/actionTypes";
import style from "./contactPage.module.scss";

const ContactPage: FC<IContactPage> = ({ contact, setVisible }) => {
  const [img, setImg] = useState<string>(contact.img);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editName, setEditName] = useState<string>(contact.name);
  const [editEmail, setEditEmail] = useState<string>(contact.email);
  const [editPhone, setEditPhone] = useState<string>(contact.phone);
  const [editCompany, setEditCompany] = useState<string>(contact.company.name);

  const dispatch = useDispatch();

  const handleClose = () => {
    setVisible(false);
  };

  const addImg = (files: FileList | null) => {
    if (files) {
      const fileRef = files[0] || "";
      const fileType: string = fileRef.type || "";
      const reader = new FileReader();
      reader.readAsBinaryString(fileRef);
      reader.onload = (ev: any) => {
        setImg(`data:${fileType};base64,${btoa(ev.target.result)}`);
        contact.img = `data:${fileType};base64,${btoa(ev.target.result)}`;
      };
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    addImg(e.target.files);
  };

  const removeContact = () => {
    dispatch({ type: UsersTypes.REMOVE_USER, payload: contact.id });
    setVisible(false);
  };

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditName(e.target.value);
  };

  const handleChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditPhone(e.target.value);
  };

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditEmail(e.target.value);
  };

  const handleChangeCompany = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditCompany(e.target.value);
  };

  const doneEdit = () => {
    dispatch({
      type: UsersTypes.UPDATE_USER,
      payload: [contact.id, editName, editPhone, editEmail, editCompany, img],
    });
    setIsEdit(false);
  };

  return (
    <div>
      <div className={style.header}>
        {isEdit ? (
          <div className={style.header__back} onClick={() => setIsEdit(false)}>
            &larr;Cencel
          </div>
        ) : (
          <div className={style.header__back} onClick={handleClose}>
            &larr;Contatacs
          </div>
        )}

        {isEdit ? (
          <div className={style.header__edit} onClick={doneEdit}>
            Done
          </div>
        ) : (
          <div
            className={style.header__edit}
            onClick={() => {
              setIsEdit(true);
            }}
          >
            Edit
          </div>
        )}
      </div>
      <div className={style.info}>
        <div
          className={style.info__img}
          style={{
            background: img
              ? `url(${contact.img}) no-repeat center/cover`
              : "none",
          }}
        >
          {img ? (
            <div className={style.info__img_img}></div>
          ) : (
            <p>{contact.name[0]}</p>
          )}
        </div>

        {isEdit ? (
          <div className={style.edit}>
            <label className={style.edit__img}>
              <input
                type="file"
                onChange={handleChange}
                className={style.edit__img_input}
              />
              <span className={style.edit__img_title}>
                {img ? "Change photo" : "Add photo"}
              </span>
            </label>
            <div className={style.inputs}>
              <input
                className={style.form__inputs_txt}
                type="text"
                placeholder="Name"
                value={editName}
                onChange={handleChangeName}
              ></input>
              <input
                className={style.form__inputs_txt}
                type="text"
                placeholder="Phone"
                value={editPhone}
                onChange={handleChangePhone}
              ></input>
              <input
                className={style.form__inputs_txt}
                type="text"
                placeholder="Email"
                value={editEmail}
                onChange={handleChangeEmail}
              ></input>
              <input
                className={style.form__inputs_txt}
                type="text"
                placeholder="Comapany"
                value={editCompany}
                onChange={handleChangeCompany}
              ></input>
            </div>
          </div>
        ) : (
          <>
            <div className={style.info__title}>{contact.name}</div>
            <div className={style.info__actions}>
              <div className={style.info__actions_block}>
                <a href={`tel:${contact.phone}`}>
                  <img
                    className={style.info__actions_block_phone}
                    src={phone}
                    alt="phone_img"
                  />
                  <p>Call</p>
                </a>
              </div>
              <div className={style.info__actions_block}>
                <a href={`mailto:${contact.email}`}>
                  <img
                    className={style.info__actions_block_mail}
                    src={mail}
                    alt="mail_img"
                  />
                  <p>Email</p>
                </a>
              </div>
            </div>
            <div className={style.info__info}>
              <div className={style.info__info_item}>
                <p>Company</p>
                <p className={style.info__info_link}>{contact.company.name}</p>
              </div>
              <div className={style.info__info_item}>
                <p>Phone</p>
                <a
                  href={`tel:${contact.phone}`}
                  className={style.info__info_link}
                >
                  {contact.phone}
                </a>
              </div>
              <div className={style.info__info_item}>
                <p>Email</p>
                <a
                  href={`mailto:${contact.email}`}
                  className={style.info__info_link}
                >
                  {contact.email}
                </a>
              </div>
            </div>
            <button className={style.remove} onClick={removeContact}>
              Delete Contact
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ContactPage;
