import { FC, useCallback, useEffect, useMemo, useState } from "react";
import s from "./index.module.scss";
import { SlArrowDown } from "react-icons/sl";
import { Modal } from "../../modal";
import { Loader } from "../../loader";
import { useIntersect } from "@/shared/lib";

type ListItem = { id: string | number; name: string };
interface SelectProps {
  list: ListItem[];
  placeholder?: string;
  isTotal?: boolean;
  isInfinity?: boolean;
  onNext?: () => void;
  onChange?: (item: ListItem) => void;
}

const Select: FC<SelectProps> = ({
  list,
  placeholder = "Не выбрано",
  isTotal = false,
  isInfinity = false,
  onNext = () => {},
  onChange = () => {}
}) => {
  const [selected, setSelected] = useState<ListItem | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [preloaderRef, isPreloaderInterscting] = useIntersect({
    threshold: 0.5
  });

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

  const onItemClick = (item: ListItem) => {
    setSelected(item);
    setIsOpen(false);
  };

  const isSelected = useCallback(
    (item: ListItem) => {
      const base = s["e-list-item"];
      const state =
        selected && selected.id === item.id ? s["m-selected"] : "";

      return [base, state].join(" ");
    },
    [selected]
  );

  useEffect(() => {
    console.log(isPreloaderInterscting);

    if (!isPreloaderInterscting) return;

    onNext();
  }, [isPreloaderInterscting, preloaderRef]);

  useEffect(() => {
    if (!selected) return;

    onChange(selected);
  }, [selected]);

  return (
    <div className={s["g-select"]}>
      <button className={plateClass} onClick={toggleOpen}>
        <span>{selected ? selected.name : placeholder}</span>

        <SlArrowDown className={iconClass} />
      </button>

      <Modal isVisible={isOpen} onClose={close}>
        {list.map((item) => (
          <button
            key={item.id}
            className={isSelected(item)}
            onClick={() => onItemClick(item)}>
            {item.name}
          </button>
        ))}

        {!isTotal && isInfinity && (
          <div className="py-4" ref={preloaderRef}>
            <Loader />
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Select;
