import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollTop from "../components/ScrollTop";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <ScrollTop />
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;