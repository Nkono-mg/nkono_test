import { NavLink } from "react-router-dom";

export default function Menu() {
  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <ul className="flex space-x-6 py-4">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md font-medium transition-colors duration-200 ${
                  isActive
                    ? "bg-white text-blue-600"
                    : "hover:bg-blue-500 hover:text-white"
                }`
              }
            >
              Logs
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/perspective"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md font-medium transition-colors duration-200 ${
                  isActive
                    ? "bg-white text-blue-500"
                    : "hover:bg-blue-400 hover:text-white"
                }`
              }
            >
              Perspective
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
