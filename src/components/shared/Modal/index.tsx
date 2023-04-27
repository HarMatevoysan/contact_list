import React, { FC } from "react";
import { IModal } from "./types";
import style from "./modal.module.scss";

const Modal: FC<IModal> = ({ children, visible }) => {
  const rootStyle = [style.contenier];
  if (visible) {
    rootStyle.push(style.active);
  }

  return (
    <div className={rootStyle.join(" ")}>
      <div className={style.content}>{children}</div>
    </div>
  );
};

export default Modal;
