const FeaturedDoctors = () => {
  const doctors = [
    { name: "Dr. Sarah Ahmed", specialization: "Cardiologist", experience: "10 Years", fee: "$40", color: "from-cyan-500 to-blue-600" },
    { name: "Dr. Tanvir Hasan", specialization: "Neurologist", experience: "8 Years", fee: "$35", color: "from-violet-500 to-indigo-600" },
    { name: "Dr. Nadia Rahman", specialization: "Dermatologist", experience: "6 Years", fee: "$30", color: "from-pink-500 to-rose-600" },
    { name: "Dr. Farhan Kabir", specialization: "Orthopedic", experience: "12 Years", fee: "$45", color: "from-emerald-500 to-teal-600" },
    { name: "Dr. Ayesha Karim", specialization: "Pediatrician", experience: "7 Years", fee: "$32", color: "from-orange-500 to-amber-600" },
    { name: "Dr. Mahmud Hasan", specialization: "Dentist", experience: "9 Years", fee: "$28", color: "from-sky-500 to-cyan-600" },
  ];

  return (
    <section className="bg-slate-50 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-cyan-600 font-semibold">Trusted Healthcare Experts</p>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mt-2">
            Featured Doctors
          </h2>
          <p className="text-slate-500 mt-4 max-w-2xl mx-auto">
            Meet experienced doctors and book appointments with confidence.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctors.map((doctor, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl shadow-lg hover:shadow-2xl border border-slate-100 overflow-hidden transition duration-300 hover:-translate-y-2"
            >
              <div className={`h-28 bg-gradient-to-r ${doctor.color}`}></div>

              <div className="p-6 -mt-12">
                <div className="w-20 h-20 rounded-2xl bg-white shadow-lg flex items-center justify-center text-3xl font-bold text-cyan-700 border">
                  {doctor.name.split(" ")[1][0]}
                </div>

                <h3 className="text-xl font-bold text-slate-900 mt-5">
                  {doctor.name}
                </h3>

                <p className="text-cyan-600 font-semibold mt-1">
                  {doctor.specialization}
                </p>

                <div className="mt-5 space-y-2 text-slate-600">
                  <p>Experience: {doctor.experience}</p>
                  <p>Consultation Fee: {doctor.fee}</p>
                </div>

                <button className="mt-6 w-full bg-gradient-to-r from-cyan-600 to-blue-700 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition">
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedDoctors;