import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home/Home";
import FindDoctors from "./pages/FindDoctors/FindDoctors";

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
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;