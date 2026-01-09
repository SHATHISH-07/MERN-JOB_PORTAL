import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "./context/AuthContext";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import JobSeekerProfile from "./pages/profile/JobSeekerProfile";
import EmployerProfile from "./pages/profile/EmployerProfile";
import LandingPage from "./pages/LandingPage";

import AppLayout from "./components/layout/AppLayout";

/* Job Pages */
import JobList from "./pages/jobs/JobList";
import MyJobs from "./pages/jobs/MyJobs";
import CreateJob from "./pages/jobs/CreateJob";
import EditJob from "./pages/jobs/EditJob";
import JobDetails from "./pages/jobs/JobDetails";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  if (!user) return <Navigate to="/login" />;

  return children;
};

const RoleRoute = ({ allowedRole, children }) => {
  const { user } = useContext(AuthContext);

  if (!user) return <Navigate to="/login" />;
  if (user.role !== allowedRole) return <Navigate to="/dashboard" />;

  return children;
};

function App() {
  const { user } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <AppLayout>
                <Dashboard />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        {/* Profile */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <AppLayout>
                {user?.role === "EMPLOYER" ? (
                  <EmployerProfile />
                ) : (
                  <JobSeekerProfile />
                )}
              </AppLayout>
            </ProtectedRoute>
          }
        />

        {/* Job Seeker Routes */}
        {/* Job Seeker Routes */}
        <Route
          path="/jobs"
          element={
            <ProtectedRoute>
              <RoleRoute allowedRole="JOB_SEEKER">
                <AppLayout>
                  <JobList />
                </AppLayout>
              </RoleRoute>
            </ProtectedRoute>
          }
        />

        {/* Employer Routes */}
        <Route
          path="/employer/jobs"
          element={
            <ProtectedRoute>
              <RoleRoute allowedRole="EMPLOYER">
                <AppLayout>
                  <MyJobs />
                </AppLayout>
              </RoleRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/employer/jobs/create"
          element={
            <ProtectedRoute>
              <RoleRoute allowedRole="EMPLOYER">
                <AppLayout>
                  <CreateJob />
                </AppLayout>
              </RoleRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/employer/jobs/edit/:id"
          element={
            <ProtectedRoute>
              <RoleRoute allowedRole="EMPLOYER">
                <AppLayout>
                  <EditJob />
                </AppLayout>
              </RoleRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/jobs/:id"
          element={
            <ProtectedRoute>
              <RoleRoute allowedRole="JOB_SEEKER">
                <AppLayout>
                  <JobDetails />
                </AppLayout>
              </RoleRoute>
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
