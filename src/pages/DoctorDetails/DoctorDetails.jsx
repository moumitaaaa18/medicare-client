import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";

const doctors = [
  { id: 1, name: "Dr. Sam Rene", specialization: "Cardiologist", experience: 10, fee: 20, rating: 4.9, image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&auto=format&fit=crop", status: "Available Today", availableDays: "Sunday, Tuesday, Thursday", availableSlots: "10:00 AM - 2:00 PM" },
  { id: 2, name: "Dr. Tanvir Hasan", specialization: "Neurologist", experience: 9, fee: 700, rating: 4.7, image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=600&auto=format&fit=crop", status: "Verified Doctor", availableDays: "Monday, Wednesday, Friday", availableSlots: "4:00 PM - 8:00 PM" },
  { id: 3, name: "Dr. Faria", specialization: "Dermatologist", experience: 7, fee: 30, rating: 4.8, image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=600&auto=format&fit=crop", status: "Online Consultation", availableDays: "Saturday, Monday, Wednesday", availableSlots: "11:00 AM - 3:00 PM" },
  { id: 4, name: "Dr. Ime D. Aris", specialization: "Orthopedic", experience: 12, fee: 10, rating: 4.6, image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=600&auto=format&fit=crop", status: "Available This Week", availableDays: "Sunday, Monday, Thursday", availableSlots: "6:00 PM - 9:00 PM" },
  { id: 5, name: "Dr. Ahnaf Karim", specialization: "Pediatrician", experience: 8, fee: 650, rating: 4.5, image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&auto=format&fit=crop", status: "Child Care Specialist", availableDays: "Tuesday, Thursday, Saturday", availableSlots: "9:00 AM - 1:00 PM" },
  { id: 6, name: "Dr. Mahfuzur Rahman", specialization: "Dentist", experience: 6, fee: 500, rating: 4.4, image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=600&auto=format&fit=crop", status: "Dental Care Available", availableDays: "Monday, Tuesday, Friday", availableSlots: "5:00 PM - 8:30 PM" },
  { id: 7, name: "Dr. Rebecca D'M", specialization: "Gynecologist", experience: 11, fee: 80, rating: 4.9, image: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=600&auto=format&fit=crop", status: "Women Health Expert", availableDays: "Sunday, Wednesday, Friday", availableSlots: "3:00 PM - 7:00 PM" },
  { id: 8, name: "Dr. Rafiqul Islam", specialization: "ENT Specialist", experience: 6, fee: 550, rating: 4.3, image: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=600&auto=format&fit=crop", status: "ENT Service Open", availableDays: "Saturday, Monday, Thursday", availableSlots: "12:00 PM - 4:00 PM" },
  { id: 9, name: "Dr. Salsa Martina", specialization: "Psychiatrist", experience: 9, fee: 70, rating: 4.8, image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop", status: "Mental Health Support", availableDays: "Tuesday, Wednesday, Friday", availableSlots: "7:00 PM - 10:00 PM" },
  { id: 10, name: "Dr. Abdullah Al Mamun", specialization: "Urologist", experience: 13, fee: 950, rating: 4.7, image: "https://images.unsplash.com/photo-1504813184591-01572f98c85f?w=600&auto=format&fit=crop", status: "Senior Consultant", availableDays: "Sunday, Tuesday, Saturday", availableSlots: "8:00 AM - 12:00 PM" },
  { id: 11, name: "Dr. Jenelia Merrie", specialization: "Eye Specialist", experience: 7, fee: 60, rating: 4.6, image: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=600&auto=format&fit=crop", status: "Eye Care Available", availableDays: "Monday, Thursday, Friday", availableSlots: "2:00 PM - 6:00 PM" },
  { id: 12, name: "Dr. Sohanur Rahman", specialization: "Medicine Specialist", experience: 15, fee: 900, rating: 4.9, image: "https://images.unsplash.com/photo-1584467735871-8e85353a8413?w=600&auto=format&fit=crop", status: "Most Experienced", availableDays: "Saturday, Sunday, Wednesday", availableSlots: "9:30 AM - 1:30 PM" },
];

const DoctorDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const doctor = doctors.find((item) => item.id === Number(id));

  if (!doctor) {
    return <div className="text-center py-20 text-3xl font-bold">Doctor Not Found</div>;
  }

  const handleAppointment = async (e) => {
    e.preventDefault();
    setError("");

    if (!user) {
      navigate("/login");
      return;
    }

    const form = e.target;

    const appointment = {
      patientEmail: user.email,
      patientName: user.name || user.email,
      doctorId: doctor.id,
      doctorName: doctor.name,
      specialization: doctor.specialization,
      consultationFee: doctor.fee,
      appointmentDate: form.appointmentDate.value,
      appointmentTime: form.appointmentTime.value,
      symptoms: form.symptoms.value,
    };

    const res = await fetch("http://localhost:5000/appointments", {
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
            <img src={doctor.image} alt={doctor.name} className="w-full h-[420px] object-cover object-top" />
          </div>

          <div className="bg-white rounded-3xl shadow-xl border border-cyan-100 p-8">
            <p className="text-cyan-600 font-semibold">{doctor.specialization}</p>
            <h1 className="text-4xl font-bold text-slate-900 mt-2">{doctor.name}</h1>

            <p className="text-slate-500 mt-4">
              Experienced healthcare professional providing reliable treatment,
              consultation, and patient care through MediCare Connect.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mt-8">
              <Info title="Experience" value={`${doctor.experience} Years`} />
              <Info title="Consultation Fee" value={doctor.fee > 100 ? `৳${doctor.fee}` : `$${doctor.fee}`} />
              <Info title="Rating" value={`⭐ ${doctor.rating}`} />
              <Info title="Status" value={doctor.status} />
            </div>

            <div className="mt-8 space-y-4 text-slate-600">
              <p><span className="font-semibold text-slate-900">Hospital:</span> MediCare General Hospital</p>
              <p><span className="font-semibold text-slate-900">Available Days:</span> {doctor.availableDays}</p>
              <p><span className="font-semibold text-slate-900">Available Slots:</span> {doctor.availableSlots}</p>
            </div>

            <form onSubmit={handleAppointment} className="mt-8 space-y-4">
              <input
                name="appointmentDate"
                type="date"
                required
                className="w-full px-4 py-3 border border-cyan-200 rounded-xl outline-none"
              />

              <input
                name="appointmentTime"
                type="time"
                required
                className="w-full px-4 py-3 border border-cyan-200 rounded-xl outline-none"
              />

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