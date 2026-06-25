import { Link } from "react-router-dom";

const PaymentSuccess = () => {
  document.title = "Payment Successful | MediCare Connect";

  return (
    <section className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-lg border border-cyan-100 p-10 max-w-xl w-full text-center">

        <div className="text-7xl mb-4">✅</div>

        <h1 className="text-4xl font-bold text-green-600">
          Payment Successful
        </h1>

        <p className="text-slate-600 mt-4">
          Your consultation fee has been paid successfully.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Link
            to="/dashboard"
            className="px-6 py-3 bg-cyan-600 text-white rounded-xl hover:bg-cyan-700"
          >
            Go to Dashboard
          </Link>

          <Link
            to="/"
            className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700"
          >
            Home
          </Link>
        </div>

      </div>
    </section>
  );
};

export default PaymentSuccess;