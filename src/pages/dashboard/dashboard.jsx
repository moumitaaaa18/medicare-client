import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [dbUser, setDbUser] = useState(null);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    if (!user?.email) return;

    const loadData = async () => {
      try {
        const userRes = await fetch(
          `http://localhost:5000/users/${encodeURIComponent(user.email)}`
        );
        const userText = await userRes.text();
        const userData = userText ? JSON.parse(userText) : null;
        setDbUser(userData);
      } catch (error) {
        setDbUser(null);
      }

      try {
        const appRes = await fetch(
          `http://localhost:5000/appointments/${encodeURIComponent(user.email)}`
        );
        const appText = await appRes.text();
        console.log("appointments raw:", appText);

        const appData = appText ? JSON.parse(appText) : [];
        setAppointments(Array.isArray(appData) ? appData : []);
      } catch (error) {
        console.log("appointments error:", error);
        setAppointments([]);
      }
    };

    loadData();
  }, [user]);

  const role = dbUser?.role || "patient";
  const displayName = dbUser?.name || user?.name || user?.email || "User";

  return (
    <section className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50 px-6 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-3xl shadow-md border border-cyan-100 p-8">
          <h1 className="text-4xl font-bold text-slate-900">
            Patient Dashboard
          </h1>

          <p className="text-slate-500 mt-2">Welcome, {displayName}</p>
          <p className="text-red-500 text-sm mt-2">
            Logged email: {user?.email}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          <Card title="Upcoming Appointments" value={appointments.length} />
          <Card title="Appointment History" value={appointments.length} />
          <Card title="Total Payments" value="$0" />
          <Card title="Favorite Doctors" value="0" />
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mt-8">
          <div className="bg-white rounded-3xl shadow-md border border-cyan-100 p-6">
            <h2 className="text-2xl font-bold text-slate-900">
              My Appointments
            </h2>

            <div className="mt-6 space-y-4">
              {appointments.length === 0 ? (
                <p className="text-slate-500">No appointment booked yet.</p>
              ) : (
                appointments.map((item) => (
                  <div
                    key={item._id}
                    className="border border-cyan-100 rounded-2xl p-4 bg-cyan-50"
                  >
                    <h3 className="font-bold text-slate-900">
                      {item.doctorName}
                    </h3>
                    <p className="text-sm text-slate-600">
                      Specialization: {item.specialization}
                    </p>
                    <p className="text-sm text-slate-600">
                      Date: {item.appointmentDate}
                    </p>
                    <p className="text-sm text-slate-600">
                      Time: {item.appointmentTime}
                    </p>
                    <p className="text-sm text-slate-600">
                      Symptoms: {item.symptoms}
                    </p>
                    <p className="text-sm text-slate-600">
                      Status: {item.appointmentStatus}
                    </p>
                    <p className="text-sm text-slate-600">
                      Payment: {item.paymentStatus}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-md border border-cyan-100 p-6">
            <h2 className="text-2xl font-bold text-slate-900">
              Account Information
            </h2>

            <div className="mt-6 space-y-3 text-slate-600">
              <p>Name: {displayName}</p>
              <p>Email: {user?.email}</p>
              <p>Role: {role}</p>
              <p>Status: {dbUser?.status || "active"}</p>
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