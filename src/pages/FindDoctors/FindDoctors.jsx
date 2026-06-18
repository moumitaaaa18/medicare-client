import { useMemo, useState } from "react";

const doctors = [
  { id: 1, name: "Dr. Sarah Ahmed", specialization: "Cardiologist", experience: 10, fee: 40, rating: 4.9 },
  { id: 2, name: "Dr. Tanvir Hasan", specialization: "Neurologist", experience: 8, fee: 35, rating: 4.7 },
  { id: 3, name: "Dr. Nadia Rahman", specialization: "Dermatologist", experience: 6, fee: 30, rating: 4.8 },
  { id: 4, name: "Dr. Farhan Kabir", specialization: "Orthopedic", experience: 12, fee: 45, rating: 4.6 },
  { id: 5, name: "Dr. Ayesha Karim", specialization: "Pediatrician", experience: 7, fee: 32, rating: 4.9 },
  { id: 6, name: "Dr. Mahmud Hasan", specialization: "Dentist", experience: 9, fee: 28, rating: 4.5 },
  { id: 7, name: "Dr. Samira Islam", specialization: "Gynecologist", experience: 11, fee: 50, rating: 4.8 },
  { id: 8, name: "Dr. Rafi Chowdhury", specialization: "ENT Specialist", experience: 5, fee: 25, rating: 4.4 },
  { id: 9, name: "Dr. Nusrat Jahan", specialization: "Psychiatrist", experience: 6, fee: 38, rating: 4.7 },
  { id: 10, name: "Dr. Imran Hossain", specialization: "Urologist", experience: 10, fee: 42, rating: 4.6 },
  { id: 11, name: "Dr. Meher Nigar", specialization: "Eye Specialist", experience: 13, fee: 36, rating: 4.9 },
  { id: 12, name: "Dr. Zubair Alam", specialization: "Medicine Specialist", experience: 15, fee: 48, rating: 4.8 },
];

const FindDoctors = () => {
  const [search, setSearch] = useState("");
  const [sortType, setSortType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const doctorsPerPage = 6;

  const filteredDoctors = useMemo(() => {
    const result = doctors
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

    return result;
  }, [search, sortType]);

  const totalPages = Math.ceil(filteredDoctors.length / doctorsPerPage);
  const startIndex = (currentPage - 1) * doctorsPerPage;
  const currentDoctors = filteredDoctors.slice(startIndex, startIndex + doctorsPerPage);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handleSort = (e) => {
    setSortType(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <section className="bg-gradient-to-r from-cyan-600 to-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-5 text-center">
          <h1 className="text-4xl md:text-5xl font-bold">Find Your Doctor</h1>
          <p className="mt-4 max-w-2xl mx-auto text-white/90">
            Search trusted doctors by name or specialization, compare fees, ratings, and experience.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-5 py-10">
        <div className="bg-white shadow-lg rounded-2xl p-5 mb-8 grid md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Search doctor or specialization"
            className="input input-bordered w-full md:col-span-2"
            value={search}
            onChange={handleSearch}
          />

          <select className="select select-bordered w-full" value={sortType} onChange={handleSort}>
            <option value="">Sort Doctors</option>
            <option value="fee">Consultation Fee: Low to High</option>
            <option value="experience">Experience: High to Low</option>
            <option value="rating">Highest Rating</option>
          </select>
        </div>

        <p className="font-semibold mb-5">
          Showing {currentDoctors.length} of {filteredDoctors.length} doctors
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentDoctors.map((doctor) => (
            <div
              key={doctor.id}
              className="card bg-white shadow-xl border border-slate-100 hover:-translate-y-1 transition"
            >
              <div className="card-body">
                <div className="w-14 h-14 rounded-full bg-cyan-100 text-cyan-700 flex items-center justify-center text-xl font-bold">
                  {doctor.name.split(" ")[1]?.charAt(0)}
                </div>

                <h2 className="card-title text-slate-800">{doctor.name}</h2>
                <p className="text-cyan-700 font-semibold">{doctor.specialization}</p>

                <div className="space-y-1 text-sm text-slate-600 mt-3">
                  <p>Experience: {doctor.experience} Years</p>
                  <p>Consultation Fee: ${doctor.fee}</p>
                  <p>Rating: ⭐ {doctor.rating}</p>
                </div>

                <div className="card-actions justify-between items-center mt-5">
                  <button className="btn btn-outline btn-primary btn-sm">View Profile</button>
                  <button className="btn btn-primary btn-sm">Book Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {currentDoctors.length === 0 && (
          <div className="text-center bg-white rounded-2xl shadow p-10 mt-8">
            <h3 className="text-2xl font-bold">No doctors found</h3>
            <p className="text-gray-500 mt-2">Try another name or specialization.</p>
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center mt-10 gap-2">
            <button
              className="btn btn-outline"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Previous
            </button>

            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                className={`btn ${currentPage === index + 1 ? "btn-primary" : "btn-outline"}`}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}

            <button
              className="btn btn-outline"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default FindDoctors;