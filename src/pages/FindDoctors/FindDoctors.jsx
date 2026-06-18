import { useState } from "react";

const doctors = [
  {
    id: 1,
    name: "Dr. Sarah Ahmed",
    specialization: "Cardiologist",
    experience: 10,
    fee: 40,
    rating: 4.9,
  },
  {
    id: 2,
    name: "Dr. Tanvir Hasan",
    specialization: "Neurologist",
    experience: 8,
    fee: 35,
    rating: 4.7,
  },
  {
    id: 3,
    name: "Dr. Nadia Rahman",
    specialization: "Dermatologist",
    experience: 6,
    fee: 30,
    rating: 4.8,
  },
];

const FindDoctors = () => {
  const [search, setSearch] = useState("");

  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(search.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-5 py-10">
      <h1 className="text-4xl font-bold text-center mb-8">
        Find Doctors
      </h1>

      <input
        type="text"
        placeholder="Search Doctor Name or Specialization"
        className="input input-bordered w-full mb-8"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="grid md:grid-cols-3 gap-6">
        {filteredDoctors.map((doctor) => (
          <div key={doctor.id} className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">{doctor.name}</h2>

              <p>{doctor.specialization}</p>
              <p>Experience: {doctor.experience} Years</p>
              <p>Fee: ${doctor.fee}</p>
              <p>Rating: {doctor.rating}</p>

              <button className="btn btn-primary">
                Book Appointment
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FindDoctors;