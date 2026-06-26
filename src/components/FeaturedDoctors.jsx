import { Link } from "react-router-dom";
const FeaturedDoctors = () => {
  const doctors = [
    { name: "Dr. Sam Rene", specialization: "Cardiologist", experience: "10 Years", fee: "৳2000", image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&auto=format&fit=crop" },
    { name: "Dr. Tanvir Hasan", specialization: "Neurologist", experience: "9 Years", fee: "৳700", image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=600&auto=format&fit=crop" },
    { name: "Dr. Faria ", specialization: "Dermatologist", experience: "7 Years", fee: "৳1000", image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=600&auto=format&fit=crop" },
    { name: "Dr. Ime D. Aris", specialization: "Orthopedic", experience: "12 Years", fee: "৳1000", image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=600&auto=format&fit=crop" },
    { name: "Dr. Ahnaf Karim", specialization: "Pediatrician", experience: "8 Years", fee: "৳650", image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&auto=format&fit=crop" },
    { name: "Dr. Mahfuzur Rahman", specialization: "Dentist", experience: "6 Years", fee: "৳500", image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=600&auto=format&fit=crop" },
    { name: "Dr. Rebecca D'M", specialization: "Gynecologist", experience: "11 Years", fee: "$80", image: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=600&auto=format&fit=crop" },
    { name: "Dr. Rafiqul Islam", specialization: "ENT Specialist", experience: "6 Years", fee: "৳550", image: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=600&auto=format&fit=crop" },
    { name: "Dr. Salsa Martina", specialization: "Psychiatrist", experience: "9 Years", fee: "৳1500", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop" },
    { name: "Dr. Abdullah Al Mamun", specialization: "Urologist", experience: "13 Years", fee: "৳950", image: "https://images.unsplash.com/photo-1504813184591-01572f98c85f?w=600&auto=format&fit=crop" },
    { name: "Dr. Jenelia Merrie", specialization: "Eye Specialist", experience: "7 Years", fee: "৳3000", image: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=600&auto=format&fit=crop" },
    { name: "Dr. Sohanur Rahman", specialization: "Medicine Specialist", experience: "15 Years", fee: "৳900", image: "https://images.unsplash.com/photo-1584467735871-8e85353a8413?w=600&auto=format&fit=crop" },
  ];

  return (
    <section className="bg-gradient-to-br from-cyan-50 via-white to-blue-50 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-cyan-600 font-semibold">Trusted Healthcare Experts</p>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mt-2">
            Featured Doctors
          </h2>
          <p className="text-slate-500 mt-4">
            Meet experienced doctors and book appointments with confidence.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctors.map((doctor, index) => (
            <div key={index} className="bg-white rounded-3xl shadow-lg border overflow-hidden hover:-translate-y-2 hover:shadow-2xl transition">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-full h-64 object-cover object-top"
              />

              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900">{doctor.name}</h3>
                <p className="text-cyan-600 font-semibold">{doctor.specialization}</p>
                <p className="mt-4 text-slate-600">Experience: {doctor.experience}</p>
                <p className="text-slate-600">Consultation Fee: {doctor.fee}</p>

                <button className="mt-6 w-full bg-gradient-to-r from-cyan-500 to-blue-700 text-white py-3 rounded-xl font-semibold">
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