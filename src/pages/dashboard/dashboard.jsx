import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [dbUser, setDbUser] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    if (!user?.email) return;
    setLoading(true);

    const userRes = await fetch(`http://localhost:5000/users/${user.email}`);
    const userText = await userRes.text();
    const userData = userText ? JSON.parse(userText) : null;
    setDbUser(userData);

    const role = userData?.role || "patient";

    if (role === "admin") {
      const usersRes = await fetch("http://localhost:5000/users");
      const usersData = await usersRes.json();
      setAllUsers(usersData);

      const appRes = await fetch("http://localhost:5000/appointments");
      const appData = await appRes.json();
      setAppointments(appData);

      const statsRes = await fetch("http://localhost:5000/dashboard-stats");
      const statsData = await statsRes.json();
      setStats(statsData);
    } else {
      const appRes = await fetch(`http://localhost:5000/appointments/${user.email}`);
      const appText = await appRes.text();
      const appData = appText ? JSON.parse(appText) : [];
      setAppointments(Array.isArray(appData) ? appData : []);
    }

    setLoading(false);
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cyan-50">
        <p className="text-xl font-semibold text-cyan-700">Loading dashboard...</p>
      </div>
    );
  }

  const role = dbUser?.role || "patient";
  const displayName = dbUser?.name || user?.name || user?.email;

  if (role === "admin") {
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

                  <div className="flex flex-wrap gap-3 mt-4">
                    <button onClick={() => updateAppointment(item._id, "approved")} className="px-4 py-2 bg-green-500 text-white rounded-xl">
                      Approve
                    </button>
                    <button onClick={() => updateAppointment(item._id, "completed")} className="px-4 py-2 bg-blue-500 text-white rounded-xl">
                      Complete
                    </button>
                    <button onClick={() => updateAppointment(item._id, "cancelled")} className="px-4 py-2 bg-red-500 text-white rounded-xl">
                      Cancel
                    </button>
                  </div>
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
          <Card title="Upcoming Appointments" value={appointments.filter(a => a.appointmentStatus !== "cancelled").length} />
          <Card title="Appointment History" value={appointments.length} />
          <Card title="Paid Appointments" value={appointments.filter(a => a.paymentStatus === "paid").length} />
          <Card title="Cancelled" value={appointments.filter(a => a.appointmentStatus === "cancelled").length} />
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

                    {item.appointmentStatus !== "cancelled" && (
                      <button onClick={() => cancelAppointment(item._id)} className="mt-4 px-4 py-2 bg-red-500 text-white rounded-xl">
                        Cancel Appointment
                      </button>
                    )}
                  </div>
                ))
              )}
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
              <p>Payment Gateway: Stripe pending</p>
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