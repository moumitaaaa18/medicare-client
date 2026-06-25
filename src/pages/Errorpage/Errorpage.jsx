import { Link } from "react-router-dom";

const ErrorPage = () => {
  document.title = "404 Error | MediCare Connect";

  return (
    <section className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-lg border border-cyan-100 p-10 text-center">
        <div className="text-8xl mb-6">🩺</div>

        <h1 className="text-6xl font-bold text-cyan-700">404</h1>

        <h2 className="text-3xl font-bold text-slate-800 mt-4">
          Page Not Found
        </h2>

        <p className="text-slate-500 mt-4">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>

        <Link
          to="/"
          className="inline-block mt-8 px-6 py-3 bg-cyan-600 text-white rounded-xl font-semibold hover:bg-cyan-700 transition"
        >
          Back Home
        </Link>
      </div>
    </section>
  );
};

export default ErrorPage;