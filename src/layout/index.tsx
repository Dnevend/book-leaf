import Header from "./header";
import { Outlet } from "react-router";

export const Layout = () => {
  return (
    <div className="relative">
      <Header />

      <Outlet />
    </div>
  );
};

export default Layout;
