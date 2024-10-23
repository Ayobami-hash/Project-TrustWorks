import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import AssignTimePage from './pages/AssignTimePage';
import RemoteWork from './pages/RemoteWork';
import MatchRoom from './pages/MatchRoom';
import Settings from './pages/Settings';
import AdminDashboard from './pages/Admin/AdminDashboard'; // Import AdminDashboard
import { UserLayout } from './layout/UserLayout'; // Import UserLayout
import { AdminLayout } from './layout/AdminLayout'; // Import AdminLayout (if necessary)
import UserManagement from "./pages/Admin/UserManagement";
import TaskAssignment from "./pages/Admin/TaskAssignment";
import PerformanceMonitoring from "./pages/Admin/PerformanceMonitoring";
import ReportsAnalytics from "./pages/Admin/ReportsAnalytics";
import SystemSettings from "./pages/Admin/SystemSettings";
import 'react-toastify/dist/ReactToastify.css';

function App() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route>
                <Route index element={<SignIn />} />
                <Route path="signup" element={<SignUp />} />
                
                {/* User Layout and Nested Routes */}
                <Route path="/" element={<UserLayout />}>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="assign-time" element={<AssignTimePage />} />
                    <Route path="remote-work" element={<RemoteWork />} />
                    <Route path="match-room" element={<MatchRoom />} />
                    <Route path="settings" element={<Settings />} />  
                </Route>

                <Route path="/admin" element={<AdminLayout />}>
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="user-management" element={<UserManagement />} />
                    <Route path="task-assignment" element={<TaskAssignment />} />
                    <Route path="performance-monitoring" element={<PerformanceMonitoring />} />
                    <Route path="reports-analytics" element={<ReportsAnalytics />} />
                    <Route path="system-settings" element={<SystemSettings />} />
                    </Route>

            </Route>
        )
    );

    return (
        <RouterProvider router={router} />
    );
}

export default App;
