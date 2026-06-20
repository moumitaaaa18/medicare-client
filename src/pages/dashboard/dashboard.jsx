import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [dbUser, setDbUser] = useState(null);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:5000/users/${user.email}`)
        .then((res) => res.json())
        .then((data) => setDbUser(data));
    }

    fetch("http://localhost:5000/dashboard-stats")
      .then((res) => res.json())
      .then((data) => setStats(data));
  }, [user]);

  const role = dbUser?.role || "patient";

  return (
    <section className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50 px-6 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-3xl shadow-md border border-cyan-100 p-8">
          <h1 className="text-4xl font-bold text-slate-900">
            {role === "admin"
              ? "Admin Dashboard"
              : role === "doctor"
              ? "Doctor Dashboard"
              : "Patient Dashboard"}
          </h1>

          <p className="text-slate-500 mt-2">
            Welcome, {dbUser?.name || user?.name || user?.email}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {role === "patient" && (
            <>
              <Card title="Upcoming Appointments" value="0" />
              <Card title="Appointment History" value="0" />
              <Card title="Total Payments" value="$0" />
              <Card title="Favorite Doctors" value="0" />
            </>
          )}

          {role === "doctor" && (
            <>
              <Card title="Total Patients" value="0" />
              <Card title="Today's Appointments" value="0" />
              <Card title="Consultations" value="0" />
              <Card title="Average Rating" value="0.0" />
            </>
          )}

          {role === "admin" && (
            <>
              <Card title="Total Patients" value={stats?.totalPatients || 0} />
              <Card title="Total Doctors" value={stats?.totalDoctors || 0} />
              <Card title="Total Users" value={stats?.totalUsers || 0} />
              <Card title="Total Appointments" value={stats?.totalAppointments || 0} />
            </>
          )}
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mt-8">
          <div className="bg-white rounded-3xl shadow-md border border-cyan-100 p-6">
            <h2 className="text-2xl font-bold text-slate-900">
              Quick Actions
            </h2>

            <div className="grid sm:grid-cols-2 gap-4 mt-6">
              {role === "patient" && (
                <>
                  <Action text="Find Doctors" />
                  <Action text="Book Appointment" />
                  <Action text="View History" />
                  <Action text="My Profile" />
                </>
              )}

              {role === "doctor" && (
                <>
                  <Action text="Manage Schedule" />
                  <Action text="View Appointments" />
                  <Action text="Update Status" />
                  <Action text="Profile Settings" />
                </>
              )}

              {role === "admin" && (
                <>
                  <Action text="Manage Doctors" />
                  <Action text="Manage Users" />
                  <Action text="View Payments" />
                  <Action text="Analytics" />
                </>
              )}
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-md border border-cyan-100 p-6">
            <h2 className="text-2xl font-bold text-slate-900">
              Account Information
            </h2>

            <div className="mt-6 space-y-3 text-slate-600">
              <p><span className="font-semibold">Name:</span> {dbUser?.name || "N/A"}</p>
              <p><span className="font-semibold">Email:</span> {dbUser?.email || user?.email}</p>
              <p><span className="font-semibold">Role:</span> {role}</p>
              <p><span className="font-semibold">Status:</span> {dbUser?.status || "active"}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Card = ({ title, value }) => {
  return (
    <div className="bg-white rounded-3xl shadow-md border border-cyan-100 p-6">
      <p className="text-slate-500">{title}</p>
      <h3 className="text-3xl font-bold text-cyan-700 mt-3">{value}</h3>
    </div>
  );
};

const Action = ({ text }) => {
  return (
    <button className="w-full bg-cyan-50 hover:bg-cyan-100 text-cyan-700 font-semibold py-3 rounded-xl transition">
      {text}
    </button>
  );
};

export default Dashboard;