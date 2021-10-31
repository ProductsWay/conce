import { Link, Navigate, Outlet } from "react-router-dom";

import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import Logout from "./pages/logout";
import NotFound from "./pages/not_found";

const AuthGuard = ({ isLoggedIn }: { isLoggedIn: boolean }) =>
  isLoggedIn ? (
    <div className="flex-col w-full md:flex md:flex-row md:min-h-screen xl:container xl:mx-auto">
      <div className="flex flex-col flex-shrink-0 w-full h-full md:w-64">
        <div className="h-screen py-4 artboard">
          <ul className="py-3 shadow-lg menu bg-base-100 rounded-box">
            <li className="menu-title">
              <span>Admin Control Panel</span>
            </li>
            <li>
              <Link to="/">Dashboard</Link>
            </li>
            <li>
              <Link to="/company">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                Company
                <div className="ml-2 badge success">3</div>
              </Link>
            </li>
            <li>
              <Link to="/user">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                User
                <div className="ml-2 badge success">3</div>
              </Link>
            </li>
            <li>
              <Link to="/logout">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="w-full p-5 overflow-hidden">
        <div className="w-full overflow-hidden">
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    <Navigate to="/login" />
  );
const UnAuthGuard = ({ isLoggedIn }: { isLoggedIn: boolean }) =>
  !isLoggedIn ? (
    <div>
      <Outlet />
    </div>
  ) : (
    <Navigate to="/" />
  );

const routes = (isLoggedIn: boolean) => [
  // Dashboard
  {
    path: "/",
    element: <AuthGuard isLoggedIn={isLoggedIn} />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
    ],
  },
  // Login
  {
    path: "login",
    element: <UnAuthGuard isLoggedIn={isLoggedIn} />,
    children: [
      {
        path: "",
        element: <Login />,
      },
    ],
  },
  // Logout
  {
    path: "logout",
    element: <Logout />,
  },
  // Fallback to not found component
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
