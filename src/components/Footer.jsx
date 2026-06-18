import { Link } from "react-router-dom";
import { FaFacebookF, FaLinkedinIn, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="mt-20 bg-slate-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-4">
        <div>
          <h2 className="text-2xl font-bold text-teal-400">MediCareConnect</h2>
          <p className="mt-3 text-sm text-slate-300">
            Smart hospital appointment and healthcare management system.
          </p>
        </div>

        <div>
          <h3 className="mb-3 font-semibold">Quick Links</h3>
          <div className="flex flex-col gap-2 text-sm text-slate-300">
            <Link to="/">Home</Link>
            <Link to="/find-doctors">Find Doctors</Link>
            <Link to="/about">About Us</Link>
            <Link to="/contact">Contact Us</Link>
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
            <span className="rounded-full bg-slate-800 p-3"><FaFacebookF /></span>
            <span className="rounded-full bg-slate-800 p-3"><FaLinkedinIn /></span>
            <span className="rounded-full bg-slate-800 p-3"><FaGithub /></span>
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