import { Link } from "react-router-dom";
import { FaFacebookF, FaLinkedinIn, FaGithub } from "react-icons/fa";

const Footer = () => {
  const linkStyle =
    "block rounded-lg bg-slate-900 px-4 py-3 text-slate-200 border border-slate-700 active:bg-cyan-600 active:text-white hover:bg-cyan-600 hover:text-white transition-all duration-300";

  return (
    <footer className="mt-20 bg-slate-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-4">
        <div>
          <h2 className="text-2xl font-bold text-cyan-700">
            MediCare<span className="text-white">Connect</span>
            </h2>
          <p className="mt-3 text-sm text-slate-300">
            Smart hospital appointment and healthcare management system.
          </p>
        </div>

        <div>
          <h3 className="mb-3 font-semibold">Quick Links</h3>
          <div className="flex flex-col gap-2 text-sm">
            <Link className={linkStyle} to="/">Home</Link>
            <Link className={linkStyle} to="/find-doctors">Find Doctors</Link>
            <Link className={linkStyle} to="/about">About Us</Link>
            <Link className={linkStyle} to="/contact">Contact Us</Link>
            <Link className={linkStyle} to="/dashboard">Dashboard</Link>
          </div>
        </div>

        <div>
          <h3 className="mb-3 font-semibold">Contact Information</h3>
          <p className="text-sm text-slate-300">Email: support@medicare.com</p>
          <p className="text-sm text-slate-300">Phone: +880 1700-000000</p>
          <p className="text-sm text-slate-300">Emergency: 999</p>
        </div>

        <div>
          <h3 className="mb-3 font-semibold">Social Links</h3>
          <div className="flex gap-3">
            <span className="rounded-full bg-slate-800 p-3 hover:bg-cyan-600 transition">
              <FaFacebookF />
            </span>
            <span className="rounded-full bg-slate-800 p-3 hover:bg-cyan-600 transition">
              <FaLinkedinIn />
            </span>
            <span className="rounded-full bg-slate-800 p-3 hover:bg-cyan-600 transition">
              <FaGithub />
            </span>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800 py-4 text-center text-sm text-slate-400">
        © {new Date().getFullYear()} MediCare Connect. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;