import React, { useState, FC } from "react";
import { useDispatch } from "react-redux";
import { IAddContactPage } from "./types";
import user from "./../../../assets/user.png";
import { UsersTypes } from "../../../store/actionTypes";
import style from "./addContactPage.module.scss";

const AddContactPage: FC<IAddContactPage> = ({ setVisible }) => {
  const [img, setImg] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [company, setCompany] = useState<string>("");
  const dispatch = useDispatch();

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleChangeCompany = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompany(e.target.value);
  };

  const handleSumbmit = () => {
    dispatch({
      type: UsersTypes.ADD_USER,
      payload: [name, phone, email, company, img],
    });
    setVisible(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    addImg(e.target.files);
  };

  const addImg = (files: FileList | null) => {
    if (files) {
      const fileRef = files[0] || "";
      const fileType: string = fileRef.type || "";
      const reader = new FileReader();
      reader.readAsBinaryString(fileRef);
      reader.onload = (ev: any) => {
        setImg(`data:${fileType};base64,${btoa(ev.target.result)}`);
      };
    }
  };

  return (
    <div className={style.contenier}>
      <div className={style.header}>
        <button
          className={style.header__close}
          onClick={() => setVisible(false)}
        >
          &larr;Cancel
        </button>
        <div className={style.header__title}>New Contact</div>
        <button
          className={style.header__done}
          onClick={handleSumbmit}
          disabled={name || phone ? false : true}
        >
          Done
        </button>
      </div>
      <form className={style.form}>
        <div
          className={style.form__img}
          style={{
            background: img ? `url(${img}) no-repeat center/cover` : "none",
          }}
        >
          {!img ? <img src={user} alt="user_img" /> : <></>}
        </div>
        <div className={style.form__inputs}>
          <label className={style.form__inputs_file}>
            <input
              type="file"
              onChange={handleChange}
              className={style.form__inputs_file_inp}
            />
            <span className={style.form__inputs_file_title}>Add photo</span>
          </label>
          <input
            className={style.form__inputs_txt}
            type="text"
            placeholder="Name"
            value={name}
            onChange={handleChangeName}
          ></input>
          <input
            className={style.form__inputs_txt}
            type="text"
            placeholder="Phone"
            value={phone}
            onChange={handleChangePhone}
          ></input>
          <input
            className={style.form__inputs_txt}
            type="text"
            placeholder="Email"
            value={email}
            onChange={handleChangeEmail}
          ></input>
          <input
            className={style.form__inputs_txt}
            type="text"
            placeholder="Comapany"
            value={company}
            onChange={handleChangeCompany}
          ></input>
        </div>
      </form>
    </div>
  );
};

export default AddContactPage;
