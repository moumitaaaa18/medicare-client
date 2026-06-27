import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";

const Login = () => {
  const { loginUser, googleLogin } = useContext(AuthContext);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  useEffect(() => {
    document.title = "Login | MediCare Connect";
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    const result = await loginUser(email, password);

    if (result?.error) {
      setError(result.error.message);
      setLoading(false);
      return;
    }

    setSuccess("Login successful");
    form.reset();

    setTimeout(() => {
      navigate(from, { replace: true });
    }, 700);
  };

  const handleGoogleLogin = async () => {
    setError("");
    setSuccess("");
    setLoading(true);

    const result = await googleLogin();

    if (result?.error) {
      setError(result.error.message);
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-cyan-100 p-8">
        <h2 className="text-3xl font-bold text-slate-900 text-center">
          Welcome Back
        </h2>

        <p className="text-slate-500 text-center mt-2">
          Login to your MediCare Connect account
        </p>

        <form onSubmit={handleLogin} className="mt-8 space-y-4">
          <input
            name="email"
            type="email"
            placeholder="Email Address"
            required
            className="w-full px-5 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-cyan-400"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            className="w-full px-5 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-cyan-400"
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-600 text-sm">{success}</p>}

          <button
            disabled={loading}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-700 text-white py-3 rounded-xl font-semibold disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="divider">OR</div>

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full border border-cyan-200 py-3 rounded-xl font-semibold text-slate-700 hover:bg-cyan-50 transition disabled:opacity-60"
        >
          {loading ? "Redirecting..." : "Continue with Google"}
        </button>

        <p className="text-center text-slate-600 mt-6">
          New here?{" "}
          <Link to="/register" className="text-cyan-600 font-semibold">
            Create Account
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;