# 🩺 MediCare Connect

A full-stack healthcare appointment management system that allows patients to book appointments, doctors to manage patients, and administrators to control the entire platform.

## 🚀 Features

### 👤 Patient
- User Registration & Login
- Google Authentication
- Book Doctor Appointments
- Secure Stripe Payment
- Reschedule Appointment
- Cancel Appointment
- View Prescription
- Submit Doctor Reviews
- Dashboard with Appointment History

### 👨‍⚕️ Doctor
- Doctor Registration
- Login
- View Appointment Requests
- Accept / Reject Appointments
- Mark Appointment Completed
- Create Prescriptions
- View Patient Reviews

### 👨‍💼 Admin
- Admin Dashboard
- Verify Doctors
- Manage Users
- Manage Appointments
- Manage Payments
- Analytics Dashboard

---

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router
- Tailwind CSS
- DaisyUI
- Stripe React

### Backend
- Node.js
- Express.js
- MongoDB
- Better Auth
- JWT

---

## 📦 Installation

### Clone Repository

```bash
git clone <repository-link>
```

### Install Client

```bash
cd client
npm install
npm run dev
```

### Install Server

```bash
cd server
npm install
npm run dev
```

---

## 🔑 Environment Variables

Create a `.env` file inside the server folder.

```env
MONGODB_URI=your_mongodb_uri
BETTER_AUTH_SECRET=your_secret
BETTER_AUTH_URL=http://localhost:5000
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
CLIENT_URL=http://localhost:5173
```

---

## 📂 Project Structure

```
client/
server/
README.md
```

---