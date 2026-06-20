import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";

const Register = () => {
  const { createUser, refreshUser } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const image = form.photo.value || "https://i.ibb.co/4pDNDk1/avatar.png";
    const password = form.password.value;

    if (password.length < 6) return setError("Password must be at least 6 characters.");
    if (!/\d/.test(password)) return setError("Password must include at least one number.");
    if (!/[!@#$%^&*]/.test(password)) return setError("Password must include at least one special character.");

    const result = await createUser(name, email, password, image);

    if (result?.error) {
      setError(result.error.message);
      return;
    }

    await fetch("http://localhost:5000/users", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        photo: image,
        role: "patient",
        status: "active",
      }),
    });

    await refreshUser();
    form.reset();
    navigate("/dashboard");
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50 flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-cyan-100 p-8">
        <h2 className="text-3xl font-bold text-center text-slate-900">Create Account</h2>
        <p className="text-center text-slate-500 mt-2">Join MediCare Connect</p>

        <form onSubmit={handleRegister} className="mt-8 space-y-4">
          <input name="name" type="text" placeholder="Your Name" required className="w-full px-5 py-3 border border-cyan-200 rounded-xl outline-none focus:ring-2 focus:ring-cyan-400" />
          <input name="email" type="email" placeholder="Email Address" required className="w-full px-5 py-3 border border-cyan-200 rounded-xl outline-none focus:ring-2 focus:ring-cyan-400" />
          <input name="photo" type="text" placeholder="Photo URL optional" className="w-full px-5 py-3 border border-cyan-200 rounded-xl outline-none focus:ring-2 focus:ring-cyan-400" />
          <input name="password" type="password" placeholder="Password" required className="w-full px-5 py-3 border border-cyan-200 rounded-xl outline-none focus:ring-2 focus:ring-cyan-400" />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-700 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition">
            Register
          </button>
        </form>

        <p className="text-center text-slate-600 mt-6">
          Already have an account? <Link to="/login" className="text-cyan-600 font-semibold">Login</Link>
        </p>
      </div>
    </section>
  );
};

export default Register;