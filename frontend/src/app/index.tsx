import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Providers from "./providers";
import "./style/index.scss";
import "swiped-events/dist/swiped-events.min.js";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Providers />
  </StrictMode>
);
