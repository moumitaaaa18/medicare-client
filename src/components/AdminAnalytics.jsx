import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const AdminAnalytics = ({ stats = {}, appointments = [], allUsers = [] }) => {
  const totalPatients =
    stats.totalPatients || allUsers.filter((u) => u.role === "patient").length;

  const totalDoctors =
    stats.totalDoctors || allUsers.filter((u) => u.role === "doctor").length;

  const totalAppointments = stats.totalAppointments || appointments.length;

  const paidAppointments = appointments.filter(
    (a) => a.paymentStatus === "paid"
  ).length;

  const unpaidAppointments = appointments.filter(
    (a) => a.paymentStatus !== "paid"
  ).length;

  const overviewData = [
    { name: "Patients", total: totalPatients },
    { name: "Doctors", total: totalDoctors },
    { name: "Appointments", total: totalAppointments },
  ];

  const paymentData = [
    { name: "Paid", value: paidAppointments },
    { name: "Unpaid", value: unpaidAppointments },
  ];

  const doctorPerformance = appointments.reduce((acc, item) => {
    const name = item.doctorName || "Unknown Doctor";
    const found = acc.find((d) => d.name === name);

    if (found) {
      found.appointments += 1;
    } else {
      acc.push({
        name,
        appointments: 1,
      });
    }

    return acc;
  }, []);

  return (
    <div className="mt-8 space-y-8">
      <div className="bg-white rounded-3xl shadow-md border border-cyan-100 p-6">
        <h2 className="text-2xl font-bold mb-2">Analytics</h2>
        <p className="text-slate-500 mb-6">
          Platform overview using Recharts
        </p>

        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={overviewData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="total" fill="#06b6d4" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl shadow-md border border-cyan-100 p-6">
          <h2 className="text-2xl font-bold mb-2">Payment Status</h2>
          <p className="text-slate-500 mb-6">Paid and unpaid appointments</p>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={paymentData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
                  label
                >
                  <Cell fill="#22c55e" />
                  <Cell fill="#ef4444" />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-md border border-cyan-100 p-6">
          <h2 className="text-2xl font-bold mb-2">Doctor Performance</h2>
          <p className="text-slate-500 mb-6">
            Performance based on appointment count
          </p>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={doctorPerformance}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="appointments"
                  fill="#6366f1"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;