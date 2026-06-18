import { Link, NavLink } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const links = (
    <>
      <NavLink to="/" className="hover:text-teal-600">Home</NavLink>
      <NavLink to="/find-doctors" className="hover:text-teal-600">Find Doctors</NavLink>
      <NavLink to="/about" className="hover:text-teal-600">About Us</NavLink>
      <NavLink to="/contact" className="hover:text-teal-600">Contact Us</NavLink>
      <NavLink to="/dashboard" className="hover:text-teal-600">Dashboard</NavLink>
    </>
  );

  return (
    <header className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link to="/" className="text-2xl font-bold text-teal-700">
          MediCare<span className="text-slate-900">Connect</span>
        </Link>

        <div className="hidden items-center gap-6 font-medium md:flex">
          {links}
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="hidden rounded-full border px-4 py-2 text-sm font-semibold hover:bg-slate-100 sm:block"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="rounded-full bg-teal-600 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-700"
          >
            Register
          </Link>
          <FaUserCircle className="text-2xl text-slate-500" />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;