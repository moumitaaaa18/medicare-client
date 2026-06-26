import { useEffect } from "react";


 const About = () => {
  useEffect(() => {
  document.title = "About | MediCare Connect";
}, []);
  return (
    <section className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-cyan-600 font-semibold">About MediCare Connect</p>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mt-2">
            Smart Healthcare Appointment Platform
          </h1>
          <p className="text-slate-500 mt-4 max-w-3xl mx-auto">
            MediCare Connect helps patients find trusted doctors, book appointments,
            manage schedules, and receive better healthcare support through a simple digital system.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-3xl shadow-lg border border-cyan-100">
            <h3 className="text-2xl font-bold text-slate-900">Our Mission</h3>
            <p className="text-slate-600 mt-4">
              To make healthcare appointment booking easier, faster, and more accessible for patients.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-lg border border-cyan-100">
            <h3 className="text-2xl font-bold text-slate-900">Our Vision</h3>
            <p className="text-slate-600 mt-4">
              To build a reliable healthcare platform where patients, doctors, and admins work together.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-lg border border-cyan-100">
            <h3 className="text-2xl font-bold text-slate-900">Why Us</h3>
            <p className="text-slate-600 mt-4">
              Verified doctors, easy appointment system, secure dashboard, and smooth user experience.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;