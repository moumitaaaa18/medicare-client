import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const AdminAnalytics = ({ stats = {}, appointments = [], allUsers = [] }) => {
  const roleData = [
    { name: "Patients", value: stats.totalPatients || 0 },
    { name: "Doctors", value: stats.totalDoctors || 0 },
    { name: "Admins", value: stats.totalAdmins || 0 },
  ];

  const appointmentStatusData = [
    {
      name: "Pending",
      value: appointments.filter((item) => item.appointmentStatus === "pending").length,
    },
    {
      name: "Approved",
      value: appointments.filter((item) => item.appointmentStatus === "approved").length,
    },
    {
      name: "Completed",
      value: appointments.filter((item) => item.appointmentStatus === "completed").length,
    },
    {
      name: "Cancelled",
      value: appointments.filter((item) => item.appointmentStatus === "cancelled").length,
    },
  ];

  const userStatusData = [
    {
      name: "Active",
      value: allUsers.filter((item) => item.status === "active").length,
    },
    {
      name: "Suspended",
      value: allUsers.filter((item) => item.status === "suspended").length,
    },
  ];

  const colors = ["#06b6d4", "#22c55e", "#f59e0b", "#ef4444"];

  return (
    <div className="grid lg:grid-cols-2 gap-6 mt-8">
      <div className="bg-white rounded-3xl shadow-md border border-cyan-100 p-6">
        <h2 className="text-xl font-bold mb-4">Appointment Status</h2>
        <div className="w-full h-72">
          <ResponsiveContainer>
            <BarChart data={appointmentStatusData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" name="Appointments">
                {appointmentStatusData.map((entry, index) => (
                  <Cell key={entry.name} fill={colors[index % colors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-md border border-cyan-100 p-6">
        <h2 className="text-xl font-bold mb-4">User Roles</h2>
        <div className="w-full h-72">
          <ResponsiveContainer>
            <PieChart>
              <Pie data={roleData} dataKey="value" nameKey="name" outerRadius={90} label>
                {roleData.map((entry, index) => (
                  <Cell key={entry.name} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-md border border-cyan-100 p-6 lg:col-span-2">
        <h2 className="text-xl font-bold mb-4">User Status</h2>
        <div className="w-full h-72">
          <ResponsiveContainer>
            <BarChart data={userStatusData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" name="Users">
                {userStatusData.map((entry, index) => (
                  <Cell key={entry.name} fill={colors[index % colors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;