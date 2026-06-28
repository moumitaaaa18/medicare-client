import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import CheckoutForm from "../Register/CheckoutForm";
import AdminAnalytics from "../../components/AdminAnalytics";

const API = import.meta.env.VITE_API_URL;

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  const [dbUser, setDbUser] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);
  const [payments, setPayments] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("access-token");

  useEffect(() => {
    document.title = "Dashboard | MediCare Connect";
  }, []);

  const doctorNameMatches = (item, doctorUser) => {
    const name = doctorUser?.name || "";
    const email = user?.email || "";
    const itemDoctorName = item?.doctorName || "";
    const itemDoctorEmail = item?.doctorEmail || "";

    return (
      itemDoctorEmail === email ||
      itemDoctorName === name ||
      itemDoctorName === `Dr. ${name}` ||
      itemDoctorName.toLowerCase().includes(name.toLowerCase()) ||
      name.toLowerCase().includes(itemDoctorName.replace("Dr. ", "").toLowerCase())
    );
  };

  const loadData = async () => {
    if (!user?.email) return;
    setLoading(true);

    try {
      const userRes = await fetch(`${API}/users/${encodeURIComponent(user.email)}`);
      const userData = await userRes.json();
      setDbUser(userData);

      const role =
  user?.email === "admin@medicare.com"
    ? "admin"
    : userData?.role?.toLowerCase() || "patient";

      if (role === "admin") {
        const usersRes = await fetch(`${API}/users`, {
          headers: { authorization: `Bearer ${token}` },
        });
        setAllUsers(await usersRes.json());

        const appRes = await fetch(`${API}/appointments`, {
          headers: { authorization: `Bearer ${token}` },
        });
        setAppointments(await appRes.json());

        const payRes = await fetch(`${API}/payments`, {
          headers: { authorization: `Bearer ${token}` },
        });
        setPayments(await payRes.json());

        const statsRes = await fetch(`${API}/dashboard-stats`, {
          headers: { authorization: `Bearer ${token}` },
        });
        setStats(await statsRes.json());
      } else if (role === "doctor") {
        const appRes = await fetch(`${API}/appointments`, {
          headers: { authorization: `Bearer ${token}` },
        });
        const appData = await appRes.json();
        const doctorAppointments = Array.isArray(appData)
          ? appData.filter((item) => doctorNameMatches(item, userData))
          : [];
        setAppointments(doctorAppointments);

        const reviewRes = await fetch(`${API}/reviews`);
        const reviewData = await reviewRes.json();
        const doctorReviews = Array.isArray(reviewData)
          ? reviewData.filter((item) => doctorNameMatches(item, userData))
          : [];
        setReviews(doctorReviews);
      } else {
        const appRes = await fetch(
          `${API}/appointments/patient/${encodeURIComponent(user.email)}`
        );
        setAppointments(await appRes.json());

        const preRes = await fetch(
          `${API}/prescriptions/${encodeURIComponent(user.email)}`
        );
        setPrescriptions(await preRes.json());

        const reviewRes = await fetch(`${API}/reviews/${encodeURIComponent(user.email)}`);
        setReviews(await reviewRes.json());
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

  const role =
  user?.email === "admin@medicare.com"
    ? "admin"
    : dbUser?.role?.toLowerCase() || "patient";
  const displayName = dbUser?.name || user?.email || "User";

  const updateAppointment = async (id, status) => {
    await fetch(`${API}/appointments/${id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ appointmentStatus: status }),
    });
    loadData();
  };

  const cancelAppointment = async (id) => {
    await updateAppointment(id, "cancelled");
  };

  const rescheduleAppointment = async (item) => {
    const newDate = prompt("Enter new appointment date (YYYY-MM-DD)", item.appointmentDate || "");
    if (!newDate) return;

    const newTime = prompt("Enter new appointment time", item.appointmentTime || "");
    if (!newTime) return;

    await fetch(`${API}/appointments/${item._id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        appointmentDate: newDate,
        appointmentTime: newTime,
        appointmentStatus: "pending",
      }),
    });

    alert("Appointment rescheduled successfully");
    loadData();
  };

  const updateUserStatus = async (id, status) => {
    await fetch(`${API}/users/${id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ status }),
    });
    loadData();
  };

  const updateDoctorVerification = async (id, verificationStatus) => {
    await fetch(`${API}/users/${id}`, {
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

    await fetch(`${API}/prescriptions`, {
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

    alert("Prescription created successfully");
    loadData();
  };

  const submitReview = async (appointment) => {
    if (!reviewText.trim()) {
      alert("Please write your review");
      return;
    }

    const res = await fetch(`${API}/reviews`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        patientName: displayName,
        patientEmail: user.email,
        doctorName: appointment.doctorName,
        doctorEmail: appointment.doctorEmail || "",
        rating,
        review: reviewText,
      }),
    });

    const data = await res.json();

    if (data.insertedId) {
      alert("Review submitted successfully");
      setReviewText("");
      setRating(5);
      loadData();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cyan-50">
        <p className="text-xl font-semibold text-cyan-700">Loading dashboard...</p>
      </div>
    );
  }

  if (role === "doctor") {
    return (
      <section className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50 px-4 py-10">
        <div className="max-w-7xl mx-auto">
          <Header label="Doctor Dashboard" title={`Welcome, ${displayName}`} email={user?.email} />

          <div className="grid sm:grid-cols-3 gap-6 mt-8">
            <Card title="Total Appointments" value={appointments.length} />
            <Card title="Approved" value={appointments.filter((a) => a.appointmentStatus === "approved").length} />
            <Card title="Completed" value={appointments.filter((a) => a.appointmentStatus === "completed").length} />
          </div>

          <Section title="Appointment Requests">
            {appointments.length === 0 ? (
              <p>No appointment requests found.</p>
            ) : (
              appointments.map((item) => (
                <AppointmentCard key={item._id} item={item}>
                  {item.appointmentStatus === "pending" && (
                    <>
                      <ActionButton onClick={() => updateAppointment(item._id, "approved")} type="green">Accept</ActionButton>
                      <ActionButton onClick={() => updateAppointment(item._id, "cancelled")} type="red">Reject</ActionButton>
                    </>
                  )}

                  {item.appointmentStatus === "approved" && (
                    <>
                      <ActionButton onClick={() => updateAppointment(item._id, "completed")} type="blue">Complete</ActionButton>
                      <ActionButton onClick={() => createPrescription(item)} type="purple">Create Prescription</ActionButton>
                    </>
                  )}

                  {item.appointmentStatus === "completed" && <Badge type="green">Appointment Completed</Badge>}
                  {item.appointmentStatus === "cancelled" && <Badge type="red">Appointment Cancelled</Badge>}
                </AppointmentCard>
              ))
            )}
          </Section>

          <Section title="Patient Reviews">
            {reviews.length === 0 ? (
              <p>No review yet.</p>
            ) : (
              reviews.map((review) => (
                <div key={review._id} className="border rounded-2xl p-5 bg-purple-50">
                  <h3 className="font-bold">{review.patientName}</h3>
                  <p>{"⭐".repeat(Number(review.rating || 0))}</p>
                  <p>{review.review}</p>
                </div>
              ))
            )}
          </Section>
        </div>
      </section>
    );
  }

  if (role === "admin") {
    const pendingDoctors = allUsers.filter(
      (item) => item.role === "doctor" && item.verificationStatus === "pending"
    );

    return (
      <section className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50 px-4 py-10">
        <div className="max-w-7xl mx-auto">
          <Header label="Admin Dashboard" title="Welcome, Admin" email={user?.email} />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            <Card title="Total Users" value={stats.totalUsers || 0} />
            <Card title="Total Doctors" value={stats.totalDoctors || 0} />
            <Card title="Total Patients" value={stats.totalPatients || 0} />
            <Card title="Total Appointments" value={stats.totalAppointments || 0} />
          </div>

          <AdminAnalytics stats={stats} appointments={appointments} allUsers={allUsers} />

          <Section title="Pending Doctor Verification">
            {pendingDoctors.length === 0 ? (
              <p>No pending doctor request.</p>
            ) : (
              pendingDoctors.map((doctor) => (
                <div key={doctor._id} className="border rounded-2xl p-5 bg-orange-50 flex flex-col md:flex-row md:justify-between gap-4">
                  <div>
                    <h3 className="font-bold">{doctor.name}</h3>
                    <p>{doctor.email}</p>
                    <p>Specialization: {doctor.specialization || "N/A"}</p>
                    <p>Experience: {doctor.experience || "N/A"}</p>
                    <p>Fee: {doctor.consultationFee || "N/A"}</p>
                  </div>

                  <div className="flex gap-3">
                    <ActionButton onClick={() => updateDoctorVerification(doctor._id, "verified")} type="green">Verify</ActionButton>
                    <ActionButton onClick={() => updateDoctorVerification(doctor._id, "rejected")} type="red">Reject</ActionButton>
                  </div>
                </div>
              ))
            )}
          </Section>

          <Section title="Manage Appointments">
            {appointments.length === 0 ? (
              <p>No appointments found.</p>
            ) : (
              appointments.map((item) => <AppointmentCard key={item._id} item={item} />)
            )}
          </Section>

          <Section title="Manage Users">
            {allUsers.length === 0 ? (
              <p>No users found.</p>
            ) : (
              allUsers.map((item) => (
                <div key={item._id} className="border rounded-2xl p-5 flex flex-col md:flex-row md:justify-between gap-4">
                  <div>
                    <h3 className="font-bold">{item.name || "N/A"}</h3>
                    <p>{item.email}</p>
                    <p>Role: {item.role}</p>
                    <p>Status: {item.status}</p>
                    <p>Verification: {item.verificationStatus || "verified"}</p>
                  </div>

                  <div className="flex gap-3">
                    <ActionButton onClick={() => updateUserStatus(item._id, "active")} type="green">Active</ActionButton>
                    <ActionButton onClick={() => updateUserStatus(item._id, "suspended")} type="red">Suspend</ActionButton>
                  </div>
                </div>
              ))
            )}
          </Section>

          <Section title="Payment Management">
            {payments.length === 0 ? (
              <p>No payment records found.</p>
            ) : (
              payments.map((payment) => (
                <div key={payment._id} className="border rounded-2xl p-5 bg-green-50">
                  <h3 className="font-bold text-lg">Doctor: {payment.doctorName}</h3>
                  <p>Patient Email: {payment.patientEmail}</p>
                  <p>Amount: ৳{payment.amount}</p>
                  <p>Status: {payment.paymentStatus}</p>
                  <p>Transaction ID: {payment.transactionId}</p>
                </div>
              ))
            )}
          </Section>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50 px-4 py-10">
      <div className="max-w-7xl mx-auto">
        <Header label="Patient Dashboard" title={`Welcome, ${displayName}`} email={user?.email} />

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
                      item.appointmentStatus !== "cancelled" &&
                      item.appointmentStatus !== "completed" && (
                        <CheckoutForm appointment={item} onSuccess={loadData} />
                      )}

                    {item.paymentStatus !== "paid" &&
                      item.appointmentStatus !== "cancelled" &&
                      item.appointmentStatus !== "completed" && (
                        <ActionButton onClick={() => rescheduleAppointment(item)} type="yellow">Reschedule</ActionButton>
                      )}

                    {["pending", "approved"].includes(item.appointmentStatus) &&
                      item.paymentStatus !== "paid" && (
                        <ActionButton onClick={() => cancelAppointment(item._id)} type="red">Cancel Appointment</ActionButton>
                      )}

                    {item.appointmentStatus === "completed" && (
                      <div className="mt-4">
                        <Badge type="green">Appointment Completed</Badge>

                        <div className="mt-4 space-y-3">
                          <textarea
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                            placeholder="Write your review..."
                            className="textarea textarea-bordered w-full"
                          />

                          <select
                            value={rating}
                            onChange={(e) => setRating(Number(e.target.value))}
                            className="select select-bordered w-full"
                          >
                            <option value={5}>⭐⭐⭐⭐⭐</option>
                            <option value={4}>⭐⭐⭐⭐</option>
                            <option value={3}>⭐⭐⭐</option>
                            <option value={2}>⭐⭐</option>
                            <option value={1}>⭐</option>
                          </select>

                          <button onClick={() => submitReview(item)} className="btn btn-primary">
                            Submit Review
                          </button>
                        </div>
                      </div>
                    )}

                    {item.appointmentStatus === "cancelled" && <Badge type="red">Appointment Cancelled</Badge>}
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
                      <h3 className="font-bold text-lg">Doctor: {item.doctorName}</h3>
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
              <p>Paid Appointments: {appointments.filter((a) => a.paymentStatus === "paid").length}</p>
              <p>Payment Gateway: Stripe</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Header = ({ label, title, email }) => (
  <div className="bg-white rounded-3xl shadow-md border border-cyan-100 p-8">
    <p className="text-cyan-600 font-semibold">{label}</p>
    <h1 className="text-3xl md:text-4xl font-bold mt-2 break-words">{title}</h1>
    <p className="text-slate-500 mt-2 break-words">{email}</p>
  </div>
);

const Card = ({ title, value }) => (
  <div className="bg-white rounded-3xl shadow-md border border-cyan-100 p-6">
    <p className="text-slate-500">{title}</p>
    <h3 className="text-3xl font-bold text-cyan-700 mt-3">{value}</h3>
  </div>
);

const Section = ({ title, children }) => (
  <div className="bg-white rounded-3xl shadow-md border border-cyan-100 p-6 mt-8">
    <h2 className="text-2xl font-bold">{title}</h2>
    <div className="mt-6 space-y-4">{children}</div>
  </div>
);

const AppointmentCard = ({ item, children }) => (
  <div className="border rounded-2xl p-5 bg-cyan-50">
    <h3 className="font-bold text-lg">{item.doctorName || item.patientName}</h3>
    {item.patientName && <p>Patient: {item.patientName}</p>}
    {item.patientEmail && <p>Email: {item.patientEmail}</p>}
    <p>Date: {item.appointmentDate}</p>
    <p>Time: {item.appointmentTime}</p>
    {item.symptoms && <p>Symptoms: {item.symptoms}</p>}
    <p>Status: {item.appointmentStatus}</p>
    <p>Payment: {item.paymentStatus}</p>
    {children && <div className="flex flex-wrap gap-3 mt-4">{children}</div>}
  </div>
);

const ActionButton = ({ children, onClick, type }) => {
  const classes = {
    green: "bg-green-500",
    red: "bg-red-500",
    blue: "bg-blue-500",
    purple: "bg-purple-500",
    yellow: "bg-yellow-500",
  };

  return (
    <button
      onClick={onClick}
      className={`mt-4 mr-3 px-4 py-2 ${classes[type]} text-white rounded-xl`}
    >
      {children}
    </button>
  );
};

const Badge = ({ children, type }) => {
  const classes = {
    green: "bg-green-100 text-green-700",
    red: "bg-red-100 text-red-700",
  };

  return (
    <p className={`mt-4 inline-block px-4 py-2 ${classes[type]} rounded-xl`}>
      {children}
    </p>
  );
};

export default Dashboard;