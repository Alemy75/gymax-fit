import { FC } from "react";
import s from "./loader.module.scss";

const Loader: FC = () => {
  return (
    <div className={s["g-loader"]}>
      <div className={s["e-circle"]}></div>
    </div>
  );
};

export default Loader;
