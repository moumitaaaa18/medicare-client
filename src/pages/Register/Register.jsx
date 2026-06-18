import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";

const Register = () => {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photo = form.photo.value;
    const password = form.password.value;

    const strongPassword = /^(?=.*[0-9])(?=.*[!@#$%^&*]).{6,}$/;

    if (!strongPassword.test(password)) {
      setError("Password must be 6 characters with one number and one special character.");
      return;
    }

    createUser(email, password)
      .then(() => updateUserProfile(name, photo))
      .then(() => {
        setSuccess("Account created successfully!");
        form.reset();
        navigate("/");
      })
      .catch((err) => setError(err.message));
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-cyan-100 p-8">
        <h2 className="text-3xl font-bold text-slate-900 text-center">Create Account</h2>
        <p className="text-slate-500 text-center mt-2">Join MediCare Connect</p>

        <form onSubmit={handleRegister} className="mt-8 space-y-4">
          <input name="name" type="text" placeholder="Full Name" required className="w-full px-5 py-3 border rounded-xl" />
          <input name="email" type="email" placeholder="Email Address" required className="w-full px-5 py-3 border rounded-xl" />
          <input name="photo" type="text" placeholder="Photo URL" required className="w-full px-5 py-3 border rounded-xl" />
          <input name="password" type="password" placeholder="Password" required className="w-full px-5 py-3 border rounded-xl" />

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-600 text-sm">{success}</p>}

          <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-700 text-white py-3 rounded-xl font-semibold">
            Register
          </button>
        </form>

        <p className="text-center text-slate-600 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-cyan-600 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Register;