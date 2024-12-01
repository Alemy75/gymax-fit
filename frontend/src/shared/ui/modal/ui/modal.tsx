import { FC, ReactNode, useState } from "react";
import { createPortal } from "react-dom";
import s from "./index.module.scss";

interface ModalProps {
  children: ReactNode;
}

const Modal: FC<ModalProps> = ({ children }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  return createPortal(
    <div
      className={`${s["e-modal"]} px-4 py-4 pt-8 rounded-4 bg-background shadow-lg`}>
      <div className={s["e-content"]}>
        <button className={s["e-close"]}></button>

        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
