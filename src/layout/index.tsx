import Footer from "./components/footer";
import Header from "./components/header";
import { Outlet } from "react-router";

export const Layout = () => {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Header />

      <Outlet />

      <Footer />
    </div>
  );
};

export default Layout;
