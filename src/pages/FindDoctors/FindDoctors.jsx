import { useState } from "react";

const doctors = [
  { id: 1, name: "Dr. Sam Rene", specialization: "Cardiologist", experience: 10, fee: 20, rating: 4.9, image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&auto=format&fit=crop" },
  { id: 2, name: "Dr. Tanvir Hasan", specialization: "Neurologist", experience: 9, fee: 700, rating: 4.7, image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=600&auto=format&fit=crop" },
  { id: 3, name: "Dr. Faria", specialization: "Dermatologist", experience: 7, fee: 30, rating: 4.8, image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=600&auto=format&fit=crop" },
  { id: 4, name: "Dr. Ime D. Aris", specialization: "Orthopedic", experience: 12, fee: 10, rating: 4.6, image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=600&auto=format&fit=crop" },
  { id: 5, name: "Dr. Ahnaf Karim", specialization: "Pediatrician", experience: 8, fee: 650, rating: 4.5, image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&auto=format&fit=crop" },
  { id: 6, name: "Dr. Mahfuzur Rahman", specialization: "Dentist", experience: 6, fee: 500, rating: 4.4, image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=600&auto=format&fit=crop" },
  { id: 7, name: "Dr. Rebecca D'M", specialization: "Gynecologist", experience: 11, fee: 80, rating: 4.9, image: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=600&auto=format&fit=crop" },
  { id: 8, name: "Dr. Rafiqul Islam", specialization: "ENT Specialist", experience: 6, fee: 550, rating: 4.3, image: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=600&auto=format&fit=crop" },
  { id: 9, name: "Dr. Salsa Martina", specialization: "Psychiatrist", experience: 9, fee: 70, rating: 4.8, image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop" },
  { id: 10, name: "Dr. Abdullah Al Mamun", specialization: "Urologist", experience: 13, fee: 950, rating: 4.7, image: "https://images.unsplash.com/photo-1504813184591-01572f98c85f?w=600&auto=format&fit=crop" },
  { id: 11, name: "Dr. Jenelia Merrie", specialization: "Eye Specialist", experience: 7, fee: 60, rating: 4.6, image: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=600&auto=format&fit=crop" },
  { id: 12, name: "Dr. Sohanur Rahman", specialization: "Medicine Specialist", experience: 15, fee: 900, rating: 4.9, image: "https://images.unsplash.com/photo-1584467735871-8e85353a8413?w=600&auto=format&fit=crop" },
];

const FindDoctors = () => {
  const [search, setSearch] = useState("");
  const [sortType, setSortType] = useState("");
  const [page, setPage] = useState(1);

  const doctorsPerPage = 6;

  const filteredDoctors = doctors
    .filter(
      (doctor) =>
        doctor.name.toLowerCase().includes(search.toLowerCase()) ||
        doctor.specialization.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortType === "fee") return a.fee - b.fee;
      if (sortType === "experience") return b.experience - a.experience;
      if (sortType === "rating") return b.rating - a.rating;
      return 0;
    });

  const totalPages = Math.ceil(filteredDoctors.length / doctorsPerPage);
  const startIndex = (page - 1) * doctorsPerPage;
  const currentDoctors = filteredDoctors.slice(
    startIndex,
    startIndex + doctorsPerPage
  );

  return (
    <section className="bg-gradient-to-br from-cyan-50 via-white to-blue-50 py-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-10">
          <p className="text-cyan-600 font-semibold">Find Your Doctor</p>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mt-2">
            Search Trusted Doctors
          </h1>
          <p className="text-slate-500 mt-4">
            Search by doctor name or specialization and book appointments easily.
          </p>
        </div>

        <div className="bg-white shadow-lg border border-cyan-100 rounded-2xl p-5 mb-10 grid md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Search doctor or specialization"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full px-5 py-3 border border-cyan-100 rounded-xl outline-none focus:ring-2 focus:ring-cyan-400"
          />

          <select
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
            className="w-full px-5 py-3 border border-cyan-100 rounded-xl outline-none focus:ring-2 focus:ring-cyan-400"
          >
            <option value="">Sort Doctors</option>
            <option value="fee">Consultation Fee</option>
            <option value="experience">Experience</option>
            <option value="rating">Highest Rating</option>
          </select>
        </div>

        <p className="mb-6 text-slate-600 font-medium">
          Showing {currentDoctors.length} of {filteredDoctors.length} doctors
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentDoctors.map((doctor) => (
            <div
              key={doctor.id}
              className="bg-white rounded-3xl shadow-lg border overflow-hidden hover:-translate-y-2 hover:shadow-2xl transition duration-300"
            >
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-full h-64 object-cover object-top"
              />

              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900">
                  {doctor.name}
                </h3>

                <p className="text-cyan-600 font-semibold">
                  {doctor.specialization}
                </p>

                <p className="mt-4 text-slate-600">
                  Experience: {doctor.experience} Years
                </p>

                <p className="text-slate-600">
                  Consultation Fee:{" "}
                  {doctor.fee > 100 ? `৳${doctor.fee}` : `$${doctor.fee}`}
                </p>

                <p className="text-slate-600">Rating: ⭐ {doctor.rating}</p>

                <div className="mt-6 flex gap-3">
                  <a
                    href={`/doctor-details/${doctor.id}`}
                    className="flex-1 border border-cyan-500 text-cyan-700 py-3 rounded-xl font-semibold hover:bg-cyan-50 transition text-center"
                  >
                    View Profile
                  </a>

                  <button className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-700 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center gap-3 mt-12">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => setPage(index + 1)}
                className={`px-5 py-2 rounded-xl font-semibold ${
                  page === index + 1
                    ? "bg-cyan-600 text-white"
                    : "bg-white border border-cyan-200 text-slate-700"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FindDoctors;