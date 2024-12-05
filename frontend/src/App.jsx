import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/shared/Navbar";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Home from "./user/pages/Home";
import Jobs from "./user/pages/Jobs";
import Browse from "./user/pages/Browse";
import Profile from "./user/pages/Profile";
import JobDescription from "./user/components/JobDescription";
import Companies from "./admin/pages/Companies";
import CompanyCreate from "./admin/pages/CompanyCreate";
import CompanySetup from "./admin/pages/CompanySetup";
import AdminJobs from "./admin/pages/AdminJobs";
import PostJob from "./admin/pages/PostJob";
import Applicants from "./admin/pages/Applicants";
import ProtectedRoute from "./admin/route/ProtectedRoute";
import PublicRoute from "./user/routes/PublicRoute";
import PrivateRoute from "./user/routes/PrivateRoute";
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <PublicRoute>
        <Home />
      </PublicRoute>
    )
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/jobs",
    element: (
      <PublicRoute>
        <Jobs />
      </PublicRoute>
    )
  },
  {
    path: "/description/:id",
    element: (
      <PublicRoute>
        <JobDescription />
      </PublicRoute>
    )
  },
  {
    path: "/browse",
    element: <Browse />
  },
  {
    path: "/profile",
    element: (
      <PrivateRoute>
        <Profile />
      </PrivateRoute>
    )
  },
  // admin ke liye yha se start hoga
  {
    path: "/admin/companies",
    element: (
      <ProtectedRoute>
        <Companies />
      </ProtectedRoute>
    )
  },
  {
    path: "/admin/companies/create",
    element: (
      <ProtectedRoute>
        <CompanyCreate />
      </ProtectedRoute>
    )
  },
  {
    path: "/admin/companies/:id",
    element: (
      <ProtectedRoute>
        <CompanySetup />
      </ProtectedRoute>
    )
  },
  {
    path: "/admin/jobs",
    element: (
      <ProtectedRoute>
        <AdminJobs />
      </ProtectedRoute>
    )
  },
  {
    path: "/admin/jobs/create",
    element: (
      <ProtectedRoute>
        <PostJob />
      </ProtectedRoute>
    )
  },
  {
    path: "/admin/jobs/:id/applicants",
    element: (
      <ProtectedRoute>
        <Applicants />
      </ProtectedRoute>
    )
  }
]);
function App() {
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;
