import { NavLink, Outlet } from "react-router";

export default function PeopleLayout() {
  return (
    <div className="app-container">
      <header>
        <h1>People Directory</h1>

        <nav aria-label="Main navigation">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? "active" : ""
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "active" : ""
            }
          >
            About
          </NavLink>
        </nav>
      </header>

      <main id="main-content">
        <Outlet />
      </main>
    </div>
  );
}