import { FC } from "react";
import { Outlet } from "react-router";
import { HeaderComponent } from "../Components";

export const MainLayout: FC = () => {
  return (
    <div>
      <HeaderComponent />
      <Outlet />
    </div>
  );
};
