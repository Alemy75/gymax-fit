import { FC } from "react";
import s from "./index.module.scss";

interface HeaderProps {}

const Header: FC<HeaderProps> = ({}) => {
  return (
    <div
      className={`${s["g-header"]} bg-primary text-on-primary text-body`}>
      Джимакс
    </div>
  );
};

export default Header;
