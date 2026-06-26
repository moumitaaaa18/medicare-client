 import { useEffect } from "react";


const Contact = () => {
  useEffect(() => {
  document.title = "Contact | MediCare Connect";
}, []);
  return (
    <section className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50 py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-cyan-600 font-semibold">Contact Us</p>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mt-2">
            Get in Touch
          </h1>
          <p className="text-slate-500 mt-4">
            Need help booking an appointment? Send us a message.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl shadow-lg border border-cyan-100 p-8">
            <h2 className="text-2xl font-bold mb-6">Send Message</h2>

            <div className="space-y-4">
              <input className="input input-bordered w-full" placeholder="Your Name" />
              <input className="input input-bordered w-full" placeholder="Your Email" />
              <textarea className="textarea textarea-bordered w-full h-36" placeholder="Your Message"></textarea>

              <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-700 text-white py-3 rounded-xl font-semibold">
                Submit Message
              </button>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-lg border border-cyan-100 p-8">
            <h2 className="text-2xl font-bold mb-6">Contact Information</h2>

            <div className="space-y-4 text-slate-600">
              <p><b>Address:</b> Dhanmondi, Dhaka, Bangladesh</p>
              <p><b>Email:</b> support@medicareconnect.com</p>
              <p><b>Phone:</b> +880 1700-000000</p>
              <p><b>Emergency:</b> 999</p>
              <p><b>Office Hours:</b> 9:00 AM - 8:00 PM</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;