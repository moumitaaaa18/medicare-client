import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { AuthContext } from "../Providers/AuthProvider";

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);

  const links = (
    <>
      <NavLink to="/" className="hover:text-cyan-600">Home</NavLink>
      <NavLink to="/find-doctors" className="hover:text-cyan-600">Find Doctors</NavLink>
      <NavLink to="/about" className="hover:text-cyan-600">About Us</NavLink>
      <NavLink to="/contact" className="hover:text-cyan-600">Contact Us</NavLink>
      <NavLink to="/dashboard" className="hover:text-cyan-600">Dashboard</NavLink>
    </>
  );

  return (
    <header className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link to="/" className="text-2xl font-bold text-cyan-700">
          MediCare<span className="text-slate-900">Connect</span>
        </Link>

        <div className="hidden items-center gap-6 font-medium md:flex">
          {links}
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              {user.image ? (
  <img
    src={user.image}
    alt={user.name || "User"}
                  className="w-10 h-10 rounded-full object-cover border"
                />
              ) : (
                <FaUserCircle className="text-3xl text-slate-500" />
              )}

              <button
                onClick={logoutUser}
                className="rounded-full bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="hidden rounded-full border px-4 py-2 text-sm font-semibold hover:bg-slate-100 sm:block"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="rounded-full bg-cyan-600 px-4 py-2 text-sm font-semibold text-white hover:bg-cyan-700"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;