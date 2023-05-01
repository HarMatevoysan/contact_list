import React, { useState, FC } from "react";
import { useDispatch } from "react-redux";

import type { IAddContactPage } from "./types";

import { user } from "../../../assets";
import { UsersTypes } from "../../../store/actionTypes";

import style from "./AddContactPage.module.scss";

const AddContactPage: FC<IAddContactPage> = ({ setVisible }) => {
  const dispatch = useDispatch();

  const [img, setImg] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [company, setCompany] = useState<string>("");

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

  const btnDisabled = name || phone ? false : true;

  const backgroundImage = img ? `url(${img})` : "none";

  const imageTagShow = !img ? <img src={user} alt="user_img" /> : null;

  const defaultInputsState = [
    { id: 1, value: name, placeholder: "Name", onChange: handleChangeName },
    { id: 2, value: phone, placeholder: "Phone", onChange: handleChangePhone },
    { id: 3, value: email, placeholder: "Email", onChange: handleChangeEmail },
    { id: 4, value: company, placeholder: "Company", onChange: handleChangeCompany },
  ];

  const inputState = defaultInputsState.map((input) => (
    <input
      key={input.id}
      type="text"
      value={input.value}
      placeholder={input.placeholder}
      onChange={input.onChange}
      className={style.form__inputs_txt}
    />
  ));

  return (
    <div className={style.container}>
      <div className={style.header}>
        <button className={style.header__close} onClick={() => setVisible(false)}>
          &larr;Cancel
        </button>
        <div className={style.header__title}>New Contact</div>
        <button className={style.header__done} onClick={handleSumbmit} disabled={btnDisabled}>
          Done
        </button>
      </div>
      <form className={style.form}>
        <div className={style.form__img} style={{ backgroundImage: backgroundImage }}>
          {imageTagShow}
        </div>
        <div className={style.form__inputs}>
          <label className={style.form__inputs_file}>
            <input type="file" accept="image/*" onChange={handleChange} className={style.form__inputs_file_inp} />
            <span className={style.form__inputs_file_title}>Add photo</span>
          </label>
          {inputState}
        </div>
      </form>
    </div>
  );
};

export default AddContactPage;
