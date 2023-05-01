import { FC } from "react";

import type { IModal } from "./types";

import style from "./Modal.module.scss";

const Modal: FC<IModal> = ({ children, visible }) => {
  const rootStyle = [style.container];

  if (visible) {
    rootStyle.push(style.active);
  }

  const containerClasses = rootStyle.join(" ");

  return (
    <div className={containerClasses}>
      <div className={style.container__content}>{children}</div>
    </div>
  );
};

export default Modal;
