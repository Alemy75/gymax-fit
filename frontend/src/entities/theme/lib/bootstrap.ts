import { THEME, type Theme } from "../model";
import { hexToRgb } from "./hex-to-rgb";

export const bootstrap = () => {
  Object.keys(THEME).forEach((colorName) => {
    document.body.style.setProperty(
      `--g-theme-${colorName}`,
      hexToRgb(THEME[colorName as keyof Theme])
    );
  });
};
