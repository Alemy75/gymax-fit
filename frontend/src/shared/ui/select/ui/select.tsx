import { FC, useMemo, useState } from "react";
import s from "./index.module.scss";
import { SlArrowDown } from "react-icons/sl";
import { Modal } from "../../modal";

interface SelectProps {
  list: { id: string | number; name: string }[];
  placeholder?: string;
}

const Select: FC<SelectProps> = ({
  list,
  placeholder = "Не выбрано"
}) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const plateClass = useMemo(() => {
    const base = `${s["e-plate"]} px-4 rounded-2`;

    const opacity = !selected ? "opacity-disabled" : "";

    return `${base} ${opacity}`.trim();
  }, [selected]);

  const iconClass = useMemo(() => {
    const base = s["e-arrow"];

    const rotate = `${isOpen ? s["m-arrow-rotated"] : ""}`;

    return `${base} ${rotate}`.trim();
  }, [isOpen]);

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const close = () => {
    setIsOpen(false);
  };

  return (
    <div className={s["g-select"]}>
      <button className={plateClass} onClick={toggleOpen}>
        <span>{placeholder}</span>

        <SlArrowDown className={iconClass} />
      </button>

      <Modal isVisible={isOpen} onClose={close}>
        any
        {/* {list.map((item) => (
          <button>{item.name}</button>
        ))} */}
      </Modal>
    </div>
  );
};

export default Select;
