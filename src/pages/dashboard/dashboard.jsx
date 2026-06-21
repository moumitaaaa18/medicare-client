import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  const [dbUser, setDbUser] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);

  const loadDashboardData = async () => {
    if (!user?.email) return;

    setLoading(true);

    try {
      const userRes = await fetch(
        `http://localhost:5000/users/${encodeURIComponent(user.email)}`
      );
      const userData = await userRes.json();
      setDbUser(userData);
    } catch {
      setDbUser(null);
    }

    try {
      const appRes = await fetch(
        `http://localhost:5000/appointments/${encodeURIComponent(user.email)}`
      );
      const appData = await appRes.json();
      setAppointments(Array.isArray(appData) ? appData : []);
    } catch {
      setAppointments([]);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadDashboardData();
  }, [user?.email]);

  const handleCancel = async (id) => {
    const confirmCancel = window.confirm("Are you sure you want to cancel this appointment?");
    if (!confirmCancel) return;

    await fetch(`http://localhost:5000/appointments/${id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        appointmentStatus: "cancelled",
      }),
    });

    loadDashboardData();
  };

  const handleReschedule = async (e, id) => {
    e.preventDefault();

    const form = e.target;

    await fetch(`http://localhost:5000/appointments/${id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        appointmentDate: form.appointmentDate.value,
        appointmentTime: form.appointmentTime.value,
        appointmentStatus: "rescheduled",
      }),
    });

    setEditingId(null);
    loadDashboardData();
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

  const role = dbUser?.role || "patient";
  const displayName = dbUser?.name || user?.name || user?.email || "User";

  const upcomingAppointments = appointments.filter(
    (item) =>
      item.appointmentStatus !== "cancelled" &&
      item.appointmentStatus !== "completed"
  );

  const cancelledAppointments = appointments.filter(
    (item) => item.appointmentStatus === "cancelled"
  );

  const totalPaid = appointments.filter(
    (item) => item.paymentStatus === "paid"
  ).length;

  return (
    <section className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50 px-4 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-3xl shadow-md border border-cyan-100 p-8">
          <p className="text-cyan-600 font-semibold">Patient Dashboard</p>
          <h1 className="text-4xl font-bold text-slate-900 mt-2">
            Welcome, {displayName}
          </h1>
          <p className="text-slate-500 mt-2">{user?.email}</p>
          <p className="text-sm mt-2">
            Role: <span className="font-semibold text-cyan-700">{role}</span>
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          <Card title="Upcoming Appointments" value={upcomingAppointments.length} />
          <Card title="Appointment History" value={appointments.length} />
          <Card title="Paid Appointments" value={totalPaid} />
          <Card title="Cancelled" value={cancelledAppointments.length} />
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mt-8">
          <div className="lg:col-span-2 bg-white rounded-3xl shadow-md border border-cyan-100 p-6">
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
                    className="border border-cyan-100 rounded-2xl p-5 bg-cyan-50"
                  >
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-bold text-slate-900">
                          {item.doctorName}
                        </h3>
                        <p className="text-cyan-700 font-semibold">
                          {item.specialization}
                        </p>
                        <p className="text-sm text-slate-600 mt-2">
                          Date: {item.appointmentDate}
                        </p>
                        <p className="text-sm text-slate-600">
                          Time: {item.appointmentTime}
                        </p>
                        <p className="text-sm text-slate-600">
                          Symptoms: {item.symptoms}
                        </p>
                        <p className="text-sm text-slate-600">
                          Fee: ৳{item.consultationFee}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <StatusBadge label={item.appointmentStatus} />
                        <PaymentBadge label={item.paymentStatus} />
                      </div>
                    </div>

                    {editingId === item._id && (
                      <form
                        onSubmit={(e) => handleReschedule(e, item._id)}
                        className="mt-5 grid md:grid-cols-3 gap-3"
                      >
                        <input
                          name="appointmentDate"
                          type="date"
                          required
                          className="px-4 py-3 border rounded-xl"
                        />

                        <input
                          name="appointmentTime"
                          type="time"
                          required
                          className="px-4 py-3 border rounded-xl"
                        />

                        <button className="bg-cyan-600 text-white rounded-xl font-semibold">
                          Save
                        </button>
                      </form>
                    )}

                    <div className="flex flex-wrap gap-3 mt-5">
                      {item.appointmentStatus !== "cancelled" && (
                        <>
                          <button
                            onClick={() =>
                              setEditingId(editingId === item._id ? null : item._id)
                            }
                            className="px-4 py-2 rounded-xl border border-cyan-500 text-cyan-700 font-semibold"
                          >
                            Reschedule
                          </button>

                          <button
                            onClick={() => handleCancel(item._id)}
                            className="px-4 py-2 rounded-xl bg-red-500 text-white font-semibold"
                          >
                            Cancel
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-3xl shadow-md border border-cyan-100 p-6">
              <h2 className="text-2xl font-bold text-slate-900">
                My Profile
              </h2>

              <div className="mt-6 space-y-3 text-slate-600">
                <p>Name: {displayName}</p>
                <p>Email: {user?.email}</p>
                <p>Role: {role}</p>
                <p>Status: {dbUser?.status || "active"}</p>
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-md border border-cyan-100 p-6">
              <h2 className="text-2xl font-bold text-slate-900">
                Payment History
              </h2>

              <div className="mt-6 space-y-3 text-slate-600">
                <p>Paid Appointments: {totalPaid}</p>
                <p>Total Appointments: {appointments.length}</p>
                <p>Payment Gateway: Stripe pending</p>
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-md border border-cyan-100 p-6">
              <h2 className="text-2xl font-bold text-slate-900">
                My Reviews
              </h2>

              <p className="mt-4 text-slate-500">
                Review add/update/delete will be added in next step.
              </p>
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

const StatusBadge = ({ label }) => {
  const status = label || "pending";

  return (
    <p className="text-sm">
      Status:{" "}
      <span
        className={`px-3 py-1 rounded-full font-semibold ${
          status === "cancelled"
            ? "bg-red-100 text-red-600"
            : status === "completed"
            ? "bg-green-100 text-green-600"
            : status === "rescheduled"
            ? "bg-yellow-100 text-yellow-700"
            : "bg-blue-100 text-blue-600"
        }`}
      >
        {status}
      </span>
    </p>
  );
};

const PaymentBadge = ({ label }) => {
  const status = label || "unpaid";

  return (
    <p className="text-sm">
      Payment:{" "}
      <span
        className={`px-3 py-1 rounded-full font-semibold ${
          status === "paid"
            ? "bg-green-100 text-green-600"
            : "bg-orange-100 text-orange-600"
        }`}
      >
        {status}
      </span>
    </p>
  );
};

export default Dashboard;