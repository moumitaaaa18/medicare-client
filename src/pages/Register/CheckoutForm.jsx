import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";

const CheckoutForm = ({ appointment, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);

  const handlePayment = async (e) => {
    e.preventDefault();
    setError("");
    setProcessing(true);

    try {
      if (!stripe || !elements) return;

      const res = await fetch(`${import.meta.env.VITE_API_URL}/create-payment-intent`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ fee: appointment.consultationFee }),
      });

      const data = await res.json();

      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: appointment.patientName,
            email: appointment.patientEmail,
          },
        },
      });

      if (result.error) {
        setError(result.error.message);
        setProcessing(false);
        return;
      }

      if (result.paymentIntent.status === "succeeded") {
        await fetch(`${import.meta.env.VITE_API_URL}/payments`, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            appointmentId: appointment._id,
            patientEmail: appointment.patientEmail,
            doctorName: appointment.doctorName,
            doctorEmail: appointment.doctorEmail,
            amount: appointment.consultationFee,
            transactionId: result.paymentIntent.id,
            paymentStatus: "paid",
          }),
        });

        await fetch(`${import.meta.env.VITE_API_URL}/appointments/${appointment._id}`, {
          method: "PATCH",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            paymentStatus: "paid",
            transactionId: result.paymentIntent.id,
          }),
        });

        alert("Payment successful!");
        onSuccess();
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handlePayment} className="mt-4 space-y-4">
      <div className="border border-cyan-200 rounded-xl p-4 bg-white">
        <CardElement />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={!stripe || processing}
        className="px-4 py-2 bg-green-500 text-white rounded-xl"
      >
        {processing ? "Processing..." : `Pay ৳${appointment.consultationFee}`}
      </button>
    </form>
  );
};

export default CheckoutForm;