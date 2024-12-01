import { FC } from "react";
import s from "./index.module.scss";

interface HeaderProps {}

const Header: FC<HeaderProps> = ({}) => {
  return (
    <div
      className={`${s["g-header"]} bg-primary text-on-primary text-body`}>
      <span className="text-h3">
        <span className="opacity-high">GYMAX</span>
        <span className="opacity-medium"> FIT</span>
      </span>

      <span className="text-caption opacity-disabled">
        Твой спортивный помощник
      </span>
    </div>
  );
};

export default Header;
