import { FC, useEffect } from "react";
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import { bootstrap } from "@/entities/theme";
import { routes } from "@/pages";

const router = createBrowserRouter(routes);

const Providers: FC = () => {
  useEffect(() => {
    bootstrap();
  }, []);

  return <RouterProvider router={router} />;
};

export default Providers;
