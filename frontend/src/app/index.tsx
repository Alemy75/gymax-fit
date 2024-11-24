import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Providers from "./providers";
import "./style/index.scss";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Providers />
  </StrictMode>
);
