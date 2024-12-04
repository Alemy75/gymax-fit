import { FC, ReactNode, useEffect, useMemo, useRef } from "react";
import { createPortal } from "react-dom";
import s from "./index.module.scss";

interface ModalProps {
  children: ReactNode;
  isVisible: boolean;
  onClose: () => void;
}

const Modal: FC<ModalProps> = ({ children, isVisible, onClose }) => {
  const modalElement = useRef(null);

  const modalClass = useMemo(() => {
    const base = `${s["e-modal"]}`;

    const helpers =
      "modal-container px-4 py-4 pt-8 rounded-4 bg-background shadow-lg";

    const visible = isVisible ? s["m-visible"] : "";

    return `${base} ${helpers} ${visible}`.trim();
  }, [isVisible]);

  useEffect(() => {
    if (modalElement.current) {
      const el = modalElement.current as HTMLDivElement;

      el.addEventListener("swiped-down", (event) => {
        console.log(event);
      });
    }
  }, []);

  return createPortal(
    <div ref={modalElement} className={modalClass}>
      <div className={s["e-content"]}>
        <button className={s["e-close"]} onClick={onClose}></button>

        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
