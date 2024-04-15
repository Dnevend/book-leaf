import Header from "./header";
import { Outlet } from "react-router";

export const Layout = () => {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Header />

      <Outlet />
    </div>
  );
};

export default Layout;
