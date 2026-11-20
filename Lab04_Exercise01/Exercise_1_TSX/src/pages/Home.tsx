import { NavLink, Outlet } from "react-router";
import { people } from "../data/people";

export default function Home() {
  return (
    <div className="directory">
      <aside className="directory-sidebar">
        <h2>People Directory</h2>

        <nav aria-label="People navigation">
          <ul className="people-list">
            {people.map((person) => (
              <li key={person.id}>
                <NavLink
                  to={`/people/${person.id}`}
                  className={({ isActive }) =>
                    isActive ? "person-link active" : "person-link"
                  }
                >
                  {person.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <div className="detail-panel">
        <Outlet />
      </div>
    </div>
  );
}