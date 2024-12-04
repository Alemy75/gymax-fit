import { FC, useEffect } from "react";
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import { bootstrap } from "@/entities/theme";
import { routes } from "@/pages";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/shared/api/react-query";

const router = createBrowserRouter(routes);

const Providers: FC = () => {
  useEffect(() => {
    bootstrap();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

export default Providers;
