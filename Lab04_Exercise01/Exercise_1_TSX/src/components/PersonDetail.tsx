import { useParams } from "react-router";
import { people } from "../data/people";

export default function PersonDetail() {
  const { id } = useParams<{ id: string }>();

  const person = people.find((p) => p.id === id);

  if (!person) {
    return (
      <section aria-labelledby="not-found-title">
        <h2 id="not-found-title">404 - Person Not Found</h2>
        <p>The requested person does not exist.</p>
      </section>
    );
  }

  return (
    <section aria-labelledby="person-title">
      <h2 id="person-title">{person.name}</h2>

      <dl className="person-details">
        <dt>Name</dt>
        <dd>{person.name}</dd>

        <dt>Role</dt>
        <dd>{person.role}</dd>

        <dt>Email</dt>
        <dd>
          <a href={`mailto:${person.email}`}>
            {person.email}
          </a>
        </dd>
      </dl>
    </section>
  );
}