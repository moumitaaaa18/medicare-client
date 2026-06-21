import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const FindDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");
  const [sortType, setSortType] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetch(
      `http://localhost:5000/doctors?search=${search}&sort=${sortType}&page=${page}&limit=6`
    )
      .then((res) => res.json())
      .then((data) => {
        setDoctors(data.doctors || []);
        setTotalPages(data.totalPages || 1);
        setTotal(data.total || 0);
      });
  }, [search, sortType, page]);

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
            onChange={(e) => {
              setSortType(e.target.value);
              setPage(1);
            }}
            className="w-full px-5 py-3 border border-cyan-100 rounded-xl outline-none focus:ring-2 focus:ring-cyan-400"
          >
            <option value="">Sort Doctors</option>
            <option value="fee">Consultation Fee</option>
            <option value="experience">Experience</option>
            <option value="rating">Highest Rating</option>
          </select>
        </div>

        <p className="mb-6 text-slate-600 font-medium">
          Showing {doctors.length} of {total} doctors
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctors.map((doctor) => (
            <div
              key={doctor._id}
              className="bg-white rounded-3xl shadow-lg border overflow-hidden hover:-translate-y-2 hover:shadow-2xl transition duration-300"
            >
              <img
                src={doctor.profileImage || doctor.image || doctor.img}
                alt={doctor.doctorName || doctor.name}
                className="w-full h-64 object-cover object-top"
              />

              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900">
                  {doctor.doctorName || doctor.name}
                </h3>

                <p className="text-cyan-600 font-semibold">
                  {doctor.specialization || doctor.speciality}
                </p>

                <p className="mt-4 text-slate-600">
                  Experience: {doctor.experience}{" "}
                  {typeof doctor.experience === "number" ? "Years" : ""}
                </p>

                <p className="text-slate-600">
                  Consultation Fee: ৳{doctor.consultationFee || doctor.fee}
                </p>

                <p className="text-slate-600">
                  Rating: ⭐ {doctor.averageRating || doctor.rating || 4.5}
                </p>

                <div className="mt-6 flex gap-3">
                  <Link
                    to={`/doctor-details/${doctor._id}`}
                    className="flex-1 border border-cyan-500 text-cyan-700 py-3 rounded-xl font-semibold hover:bg-cyan-50 transition text-center"
                  >
                    View Profile
                  </Link>

                  <Link
                    to={`/doctor-details/${doctor._id}`}
                    className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-700 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition text-center"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {doctors.length === 0 && (
          <p className="text-center mt-10 text-slate-500">No doctor found.</p>
        )}

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