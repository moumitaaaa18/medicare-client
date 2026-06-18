import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home/Home";
import FindDoctors from "./pages/FindDoctors/FindDoctors";
import DoctorDetails from "./pages/DoctorDetails/DoctorDetails";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import PrivateRoute from "./routes/PrivateRoute";
import Dashboard from "./pages/Dashboard/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/find-doctors",
        element: <FindDoctors />,
      },
      {
  path: "/doctor-details/:id",
  element: <DoctorDetails />,
},
{
  path: "/about",
  element: <About />,
},
{
  path: "/contact",
  element: <Contact />,
},
{
  path: "/register",
  element: <Register />,
},
{
  path: "/login",
  element: <Login />,
},
{
  path: "/dashboard",
  element: (
    <PrivateRoute>
      <Dashboard />
    </PrivateRoute>
  ),
},
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;