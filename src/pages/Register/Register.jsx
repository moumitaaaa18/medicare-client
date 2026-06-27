import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";

const Register = () => {
  useEffect(() => {
    document.title = "Register | MediCare Connect";
  }, []);

  const { createUser } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [role, setRole] = useState("patient");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    const form = e.target;

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const image =
      form.photo.value.trim() || "https://i.ibb.co/4pDNDk1/avatar.png";
    const password = form.password.value;

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (!/\d/.test(password)) {
      setError("Password must include at least one number.");
      return;
    }

    if (!/[!@#$%^&*]/.test(password)) {
      setError("Password must include at least one special character.");
      return;
    }

    const result = await createUser(name, email, password, image);

    if (result?.error) {
      setError(result.error.message);
      return;
    }

    const userInfo = {
      name,
      email,
      photo: image,
      role,
      status: "active",
      verificationStatus: role === "doctor" ? "pending" : "verified",
    };

    if (role === "doctor") {
      userInfo.specialization = form.specialization.value.trim();
      userInfo.qualifications = form.qualifications.value.trim();
      userInfo.experience = form.experience.value.trim();
      userInfo.consultationFee = Number(form.consultationFee.value);
      userInfo.availableSlots = form.availableSlots.value.trim();
    }

    const saveUserRes = await fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });

    const saveUserData = await saveUserRes.json();
    console.log("SAVE USER RESPONSE:", saveUserData);

    if (!saveUserRes.ok) {
      setError(saveUserData.message || "Failed to save user information.");
      return;
    }

    form.reset();
    setRole("patient");

    if (role === "doctor") {
      alert(
        "Doctor registration successful. Please wait for admin verification."
      );
      navigate("/login");
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50 flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-cyan-100 p-8">
        <h2 className="text-3xl font-bold text-center text-slate-900">
          Create Account
        </h2>

        <p className="text-center text-slate-500 mt-2">
          Join MediCare Connect
        </p>

        <form onSubmit={handleRegister} className="mt-8 space-y-4">
          <input
            name="name"
            type="text"
            placeholder="Your Name"
            required
            className="w-full px-5 py-3 border border-cyan-200 rounded-xl outline-none focus:ring-2 focus:ring-cyan-400"
          />

          <input
            name="email"
            type="email"
            placeholder="Email Address"
            required
            className="w-full px-5 py-3 border border-cyan-200 rounded-xl outline-none focus:ring-2 focus:ring-cyan-400"
          />

          <input
            name="photo"
            type="text"
            placeholder="Photo URL optional"
            className="w-full px-5 py-3 border border-cyan-200 rounded-xl outline-none focus:ring-2 focus:ring-cyan-400"
          />

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-5 py-3 border border-cyan-200 rounded-xl outline-none focus:ring-2 focus:ring-cyan-400"
          >
            <option value="patient">Register as Patient</option>
            <option value="doctor">Register as Doctor</option>
          </select>

          {role === "doctor" && (
            <>
              <input
                name="specialization"
                type="text"
                placeholder="Specialization"
                required
                className="w-full px-5 py-3 border border-cyan-200 rounded-xl outline-none focus:ring-2 focus:ring-cyan-400"
              />

              <input
                name="qualifications"
                type="text"
                placeholder="Qualifications"
                required
                className="w-full px-5 py-3 border border-cyan-200 rounded-xl outline-none focus:ring-2 focus:ring-cyan-400"
              />

              <input
                name="experience"
                type="text"
                placeholder="Experience, example: 5 Years"
                required
                className="w-full px-5 py-3 border border-cyan-200 rounded-xl outline-none focus:ring-2 focus:ring-cyan-400"
              />

              <input
                name="consultationFee"
                type="number"
                placeholder="Consultation Fee"
                required
                className="w-full px-5 py-3 border border-cyan-200 rounded-xl outline-none focus:ring-2 focus:ring-cyan-400"
              />

              <input
                name="availableSlots"
                type="text"
                placeholder="Available Slots, example: 10 AM - 2 PM"
                required
                className="w-full px-5 py-3 border border-cyan-200 rounded-xl outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </>
          )}

          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            className="w-full px-5 py-3 border border-cyan-200 rounded-xl outline-none focus:ring-2 focus:ring-cyan-400"
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-700 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition">
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