const FeaturedDoctors = () => {
  const doctors = [
    {
      name: "Dr. Sarah Ahmed",
      specialization: "Cardiologist",
      experience: "10 Years",
      fee: "$40",
    },
    {
      name: "Dr. Tanvir Hasan",
      specialization: "Neurologist",
      experience: "8 Years",
      fee: "$35",
    },
    {
      name: "Dr. Nadia Rahman",
      specialization: "Dermatologist",
      experience: "6 Years",
      fee: "$30",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
        Featured Doctors
      </h2>

      <p className="text-center text-gray-600 mb-10">
        Meet our experienced and trusted healthcare professionals.
      </p>

      <div className="grid md:grid-cols-3 gap-6">
        {doctors.map((doctor, index) => (
          <div
            key={index}
            className="card bg-base-100 shadow-xl border border-gray-100"
          >
            <div className="card-body">
              <h3 className="card-title text-xl">{doctor.name}</h3>
              <p>{doctor.specialization}</p>
              <p>{doctor.experience} Experience</p>
              <p className="font-semibold">Consultation Fee: {doctor.fee}</p>

              <div className="card-actions justify-end mt-4">
                <button className="btn btn-primary">View Profile</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedDoctors;