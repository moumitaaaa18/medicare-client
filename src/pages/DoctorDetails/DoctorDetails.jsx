import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";

const DoctorDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/doctors/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setDoctor(data);
        setLoading(false);
      })
      .catch(() => {
        setDoctor(null);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cyan-50">
        <p className="text-xl font-semibold text-cyan-700">Loading doctor details...</p>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="text-center py-20 text-3xl font-bold">
        Doctor Not Found
      </div>
    );
  }

  const handleAppointment = async (e) => {
    e.preventDefault();
    setError("");

    if (!user?.email) {
      navigate("/login");
      return;
    }

    const form = e.target;

    const appointment = {
      patientEmail: user.email,
      patientName: user.name || user.email,
      doctorId: doctor._id,
      doctorName: doctor.doctorName,
      specialization: doctor.specialization,
      consultationFee: doctor.consultationFee,
      appointmentDate: form.appointmentDate.value,
      appointmentTime: form.appointmentTime.value,
      symptoms: form.symptoms.value,
    };

    const res = await fetch(`${import.meta.env.VITE_API_URL}/appointments`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(appointment),
    });

    const data = await res.json();

    if (data.insertedId) {
      form.reset();
      navigate("/dashboard");
    } else {
      setError("Appointment booking failed. Please try again.");
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50 py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div className="bg-white rounded-3xl shadow-xl border border-cyan-100 overflow-hidden">
            <img
              src={doctor.profileImage}
              alt={doctor.doctorName}
              className="w-full h-[420px] object-cover object-top"
            />
          </div>

          <div className="bg-white rounded-3xl shadow-xl border border-cyan-100 p-8">
            <p className="text-cyan-600 font-semibold">
              {doctor.specialization}
            </p>

            <h1 className="text-4xl font-bold text-slate-900 mt-2">
              {doctor.doctorName}
            </h1>

            <p className="text-slate-500 mt-4">
              Experienced healthcare professional providing reliable treatment,
              consultation, and patient care through MediCare Connect.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mt-8">
              <Info title="Experience" value={`${doctor.experience} Years`} />
              <Info title="Consultation Fee" value={`৳${doctor.consultationFee}`} />
              <Info title="Rating" value={`⭐ ${doctor.averageRating}`} />
              <Info title="Status" value={doctor.verificationStatus || "verified"} />
            </div>

            <div className="mt-8 space-y-4 text-slate-600">
              <p>
                <span className="font-semibold text-slate-900">Qualifications:</span>{" "}
                {doctor.qualifications}
              </p>

              <p>
                <span className="font-semibold text-slate-900">Hospital:</span>{" "}
                {doctor.hospitalName}
              </p>

              <p>
                <span className="font-semibold text-slate-900">Available Days:</span>{" "}
                {doctor.availableDays?.join(", ")}
              </p>

              <p>
                <span className="font-semibold text-slate-900">Available Slots:</span>{" "}
                {doctor.availableSlots?.join(", ")}
              </p>
            </div>

            <form onSubmit={handleAppointment} className="mt-8 space-y-4">
              <input
                name="appointmentDate"
                type="date"
                required
                className="w-full px-4 py-3 border border-cyan-200 rounded-xl outline-none"
              />

              <select
                name="appointmentTime"
                required
                className="w-full px-4 py-3 border border-cyan-200 rounded-xl outline-none"
              >
                <option value="">Select Appointment Time</option>
                {doctor.availableSlots?.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>

              <textarea
                name="symptoms"
                placeholder="Write your symptoms"
                required
                className="w-full px-4 py-3 border border-cyan-200 rounded-xl outline-none min-h-28"
              />

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-700 text-white py-4 rounded-2xl font-semibold hover:opacity-90 transition">
                Book Appointment
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Info = ({ title, value }) => {
  return (
    <div className="bg-cyan-50 p-4 rounded-2xl">
      <p className="text-slate-500">{title}</p>
      <h3 className="font-bold text-slate-900">{value}</h3>
    </div>
  );
};

export default DoctorDetails;