import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home/Home";
import FindDoctors from "./pages/FindDoctors/FindDoctors";
import DoctorDetails from "./pages/DoctorDetails/DoctorDetails";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Register from "./pages/Register/Register";

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
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;