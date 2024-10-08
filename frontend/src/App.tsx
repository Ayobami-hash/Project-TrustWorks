import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import AssignTimePage from './pages/AssignTimePage';
import RemoteWork from './pages/RemoteWork';
import MatchRoom from './pages/MatchRoom';
import Settings from './pages/Settings';
import { UserLayout } from './layout/UserLayout'; // Import UserLayout

function App() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route>
                <Route index element={<SignIn />} />
                <Route path="signup" element={<SignUp />} />
                <Route path="/" element={<UserLayout />}> {/* User layout for nested routes */}
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="assign-time" element={<AssignTimePage />} />
                  <Route path="remote-work" element={<RemoteWork />} />
                  <Route path="match-room" element={<MatchRoom />} />
                  <Route path="settings" element={<Settings />} />  
                </Route>
            </Route>
        )
    );

    return (
        <RouterProvider router={router} />
    );
}

export default App;
