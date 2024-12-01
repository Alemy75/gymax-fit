import Header from "@/widgets/header";
import { FC, ReactNode } from "react";

interface DefaultLayout {
  children: ReactNode;
}

const DefaultLayout: FC<DefaultLayout> = ({ children }) => {
  return (
    <div className="g-default-layout">
      <Header />

      <main>{children}</main>
    </div>
  );
};

export default DefaultLayout;
