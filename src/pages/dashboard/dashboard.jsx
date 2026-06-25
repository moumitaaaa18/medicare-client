import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import CheckoutForm from "../Register/CheckoutForm";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [dbUser, setDbUser] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [payments, setPayments] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    if (!user?.email) return;
    setLoading(true);

    try {
      const userRes = await fetch(
        `http://localhost:5000/users/${encodeURIComponent(user.email)}`
      );
      const userData = await userRes.json();
      setDbUser(userData);

      const role = userData?.role?.toLowerCase() || "patient";

      if (role === "admin") {
        const usersRes = await fetch("http://localhost:5000/users");
        setAllUsers(await usersRes.json());

        const appRes = await fetch("http://localhost:5000/appointments");
        setAppointments(await appRes.json());

        const payRes = await fetch("http://localhost:5000/payments");
        setPayments(await payRes.json());

        const statsRes = await fetch("http://localhost:5000/dashboard-stats");
        setStats(await statsRes.json());
      } else if (role === "doctor") {
        const appRes = await fetch("http://localhost:5000/appointments");
        const appData = await appRes.json();

        const doctorAppointments = appData.filter(
          (item) =>
            item.doctorEmail === user.email || item.doctorName === userData?.name
        );

        setAppointments(doctorAppointments);
      } else {
        const appRes = await fetch(
          `http://localhost:5000/appointments/${encodeURIComponent(user.email)}`
        );
        setAppointments(await appRes.json());

        const preRes = await fetch(
          `http://localhost:5000/prescriptions/${encodeURIComponent(user.email)}`
        );
        setPrescriptions(await preRes.json());
      }
    } catch (error) {
      console.log("Dashboard load error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [user?.email]);

  const updateAppointment = async (id, status) => {
    await fetch(`http://localhost:5000/appointments/${id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ appointmentStatus: status }),
    });
    loadData();
  };

  const cancelAppointment = async (id) => {
    await updateAppointment(id, "cancelled");
  };

  const updateUserStatus = async (id, status) => {
    await fetch(`http://localhost:5000/users/${id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ status }),
    });
    loadData();
  };

  const updateDoctorVerification = async (id, verificationStatus) => {
    await fetch(`http://localhost:5000/users/${id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ verificationStatus }),
    });
    loadData();
  };

  const createPrescription = async (item) => {
    const medicine = prompt("Medicine Name");
    const advice = prompt("Doctor Advice");

    if (!medicine || !advice) return;

    await fetch("http://localhost:5000/prescriptions", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        appointmentId: item._id,
        patientName: item.patientName,
        patientEmail: item.patientEmail,
        doctorName: displayName,
        doctorEmail: user?.email,
        medicine,
        advice,
      }),
    });

    alert("Prescription Created Successfully");
    loadData();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cyan-50">
        <p className="text-xl font-semibold text-cyan-700">
          Loading dashboard...
        </p>
      </div>
    );
  }

  const role = dbUser?.role?.toLowerCase() || "patient";
  const displayName = dbUser?.name || user?.email || "User";

  if (role === "doctor") {
    return (
      <section className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50 px-4 py-10">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-3xl shadow-md border border-cyan-100 p-8">
            <p className="text-cyan-600 font-semibold">Doctor Dashboard</p>
            <h1 className="text-4xl font-bold mt-2">Welcome, {displayName}</h1>
            <p className="text-slate-500 mt-2">{user?.email}</p>
            <p className="text-sm mt-2">
              Verification:{" "}
              <span className="font-semibold text-orange-600">
                {dbUser?.verificationStatus || "pending"}
              </span>
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 mt-8">
            <Card title="Total Patients" value={appointments.length} />
            <Card
              title="Today's Appointments"
              value={
                appointments.filter((a) => a.appointmentStatus === "approved")
                  .length
              }
            />
            <Card title="Reviews Received" value={0} />
          </div>

          <div className="bg-white rounded-3xl shadow-md border border-cyan-100 p-6 mt-8">
            <h2 className="text-2xl font-bold">Appointment Requests</h2>

            <div className="space-y-4 mt-6">
              {appointments.length === 0 ? (
                <p>No appointment requests found.</p>
              ) : (
                appointments.map((item) => (
                  <div key={item._id} className="border rounded-2xl p-5 bg-cyan-50">
                    <h3 className="font-bold text-lg">{item.patientName}</h3>
                    <p>Email: {item.patientEmail}</p>
                    <p>Date: {item.appointmentDate}</p>
                    <p>Time: {item.appointmentTime}</p>
                    <p>Symptoms: {item.symptoms}</p>
                    <p>Status: {item.appointmentStatus}</p>
                    <p>Payment: {item.paymentStatus}</p>

                    <div className="flex flex-wrap gap-3 mt-4">
                      <button onClick={() => updateAppointment(item._id, "approved")} className="px-4 py-2 bg-green-500 text-white rounded-xl">
                        Accept
                      </button>

                      <button onClick={() => updateAppointment(item._id, "cancelled")} className="px-4 py-2 bg-red-500 text-white rounded-xl">
                        Reject
                      </button>

                      <button onClick={() => updateAppointment(item._id, "completed")} className="px-4 py-2 bg-blue-500 text-white rounded-xl">
                        Complete
                      </button>

                      <button onClick={() => createPrescription(item)} className="px-4 py-2 bg-purple-500 text-white rounded-xl">
                        Create Prescription
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (role === "admin") {
    const pendingDoctors = allUsers.filter(
      (u) => u.role === "doctor" && u.verificationStatus === "pending"
    );

    return (
      <section className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50 px-4 py-10">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-3xl shadow-md border border-cyan-100 p-8">
            <p className="text-cyan-600 font-semibold">Admin Dashboard</p>
            <h1 className="text-4xl font-bold mt-2">Welcome, Admin</h1>
            <p className="text-slate-500 mt-2">{user?.email}</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            <Card title="Total Users" value={stats.totalUsers || 0} />
            <Card title="Total Doctors" value={stats.totalDoctors || 0} />
            <Card title="Total Patients" value={stats.totalPatients || 0} />
            <Card title="Total Appointments" value={stats.totalAppointments || 0} />
          </div>

          <div className="bg-white rounded-3xl shadow-md border border-cyan-100 p-6 mt-8">
            <h2 className="text-2xl font-bold">Pending Doctor Verification</h2>

            <div className="mt-6 space-y-4">
              {pendingDoctors.length === 0 ? (
                <p>No pending doctor request.</p>
              ) : (
                pendingDoctors.map((doctor) => (
                  <div key={doctor._id} className="border rounded-2xl p-5 bg-orange-50 flex flex-col md:flex-row md:justify-between gap-4">
                    <div>
                      <h3 className="font-bold">{doctor.name}</h3>
                      <p>{doctor.email}</p>
                      <p>Specialization: {doctor.specialization}</p>
                      <p>Qualifications: {doctor.qualifications}</p>
                      <p>Experience: {doctor.experience}</p>
                      <p>Fee: {doctor.consultationFee}</p>
                    </div>

                    <div className="flex gap-3">
                      <button onClick={() => updateDoctorVerification(doctor._id, "verified")} className="px-4 py-2 bg-green-500 text-white rounded-xl">
                        Verify
                      </button>

                      <button onClick={() => updateDoctorVerification(doctor._id, "rejected")} className="px-4 py-2 bg-red-500 text-white rounded-xl">
                        Reject
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-md border border-cyan-100 p-6 mt-8">
            <h2 className="text-2xl font-bold">Manage Appointments</h2>

            <div className="mt-6 space-y-4">
              {appointments.map((item) => (
                <div key={item._id} className="border rounded-2xl p-5 bg-cyan-50">
                  <h3 className="font-bold text-lg">{item.doctorName}</h3>
                  <p>Patient: {item.patientName}</p>
                  <p>Email: {item.patientEmail}</p>
                  <p>Date: {item.appointmentDate}</p>
                  <p>Time: {item.appointmentTime}</p>
                  <p>Status: {item.appointmentStatus}</p>
                  <p>Payment: {item.paymentStatus}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-md border border-cyan-100 p-6 mt-8">
            <h2 className="text-2xl font-bold">Manage Users</h2>

            <div className="mt-6 space-y-4">
              {allUsers.map((item) => (
                <div key={item._id} className="border rounded-2xl p-5 flex flex-col md:flex-row md:justify-between gap-4">
                  <div>
                    <h3 className="font-bold">{item.name || "N/A"}</h3>
                    <p>{item.email}</p>
                    <p>Role: {item.role}</p>
                    <p>Status: {item.status}</p>
                    <p>Verification: {item.verificationStatus || "verified"}</p>
                  </div>

                  <div className="flex gap-3">
                    <button onClick={() => updateUserStatus(item._id, "active")} className="px-4 py-2 bg-green-500 text-white rounded-xl">
                      Active
                    </button>

                    <button onClick={() => updateUserStatus(item._id, "suspended")} className="px-4 py-2 bg-red-500 text-white rounded-xl">
                      Suspend
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-md border border-cyan-100 p-6 mt-8">
            <h2 className="text-2xl font-bold">Payment Management</h2>

            <div className="mt-6 space-y-4">
              {payments.length === 0 ? (
                <p>No payment records found.</p>
              ) : (
                payments.map((payment) => (
                  <div key={payment._id} className="border rounded-2xl p-5 bg-green-50">
                    <h3 className="font-bold text-lg">
                      Doctor: {payment.doctorName}
                    </h3>
                    <p>Patient Email: {payment.patientEmail}</p>
                    <p>Amount: ৳{payment.amount}</p>
                    <p>Status: {payment.paymentStatus}</p>
                    <p>Transaction ID: {payment.transactionId}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50 px-4 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-3xl shadow-md border border-cyan-100 p-8">
          <p className="text-cyan-600 font-semibold">Patient Dashboard</p>
          <h1 className="text-4xl font-bold mt-2">Welcome, {displayName}</h1>
          <p className="text-slate-500 mt-2">{user?.email}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          <Card title="Upcoming Appointments" value={appointments.filter((a) => a.appointmentStatus !== "cancelled").length} />
          <Card title="Appointment History" value={appointments.length} />
          <Card title="Paid Appointments" value={appointments.filter((a) => a.paymentStatus === "paid").length} />
          <Card title="Cancelled" value={appointments.filter((a) => a.appointmentStatus === "cancelled").length} />
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mt-8">
          <div className="lg:col-span-2 bg-white rounded-3xl shadow-md border border-cyan-100 p-6">
            <h2 className="text-2xl font-bold">My Appointments</h2>

            <div className="mt-6 space-y-4">
              {appointments.length === 0 ? (
                <p>No appointment booked yet.</p>
              ) : (
                appointments.map((item) => (
                  <div key={item._id} className="border rounded-2xl p-5 bg-cyan-50">
                    <h3 className="text-xl font-bold">{item.doctorName}</h3>
                    <p className="text-cyan-700">{item.specialization}</p>
                    <p>Date: {item.appointmentDate}</p>
                    <p>Time: {item.appointmentTime}</p>
                    <p>Symptoms: {item.symptoms}</p>
                    <p>Fee: ৳{item.consultationFee}</p>
                    <p>Status: {item.appointmentStatus}</p>
                    <p>Payment: {item.paymentStatus}</p>

                    {item.paymentStatus !== "paid" &&
                      item.appointmentStatus !== "cancelled" && (
                        <CheckoutForm appointment={item} onSuccess={loadData} />
                      )}

                    {item.appointmentStatus !== "cancelled" && (
                      <button onClick={() => cancelAppointment(item._id)} className="mt-4 px-4 py-2 bg-red-500 text-white rounded-xl">
                        Cancel Appointment
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>

            <div className="mt-10">
              <h2 className="text-2xl font-bold">My Prescriptions</h2>

              <div className="mt-6 space-y-4">
                {prescriptions.length === 0 ? (
                  <p>No prescription found.</p>
                ) : (
                  prescriptions.map((item) => (
                    <div key={item._id} className="border rounded-2xl p-5 bg-purple-50">
                      <h3 className="font-bold text-lg">
                        Doctor: {item.doctorName}
                      </h3>
                      <p>Medicine: {item.medicine}</p>
                      <p>Advice: {item.advice}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-3xl shadow-md border border-cyan-100 p-6">
              <h2 className="text-2xl font-bold">My Profile</h2>
              <p className="mt-4">Name: {displayName}</p>
              <p>Email: {user?.email}</p>
              <p>Role: {role}</p>
              <p>Status: {dbUser?.status || "active"}</p>
            </div>

            <div className="bg-white rounded-3xl shadow-md border border-cyan-100 p-6">
              <h2 className="text-2xl font-bold">Payment History</h2>
              <p className="mt-4">Total Appointments: {appointments.length}</p>
              <p>
                Paid Appointments:{" "}
                {appointments.filter((a) => a.paymentStatus === "paid").length}
              </p>
              <p>Payment Gateway: Stripe</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Card = ({ title, value }) => (
  <div className="bg-white rounded-3xl shadow-md border border-cyan-100 p-6">
    <p className="text-slate-500">{title}</p>
    <h3 className="text-3xl font-bold text-cyan-700 mt-3">{value}</h3>
  </div>
);

export default Dashboard;