import PropTypes from "prop-types";
import clsx from "clsx";

export default function Wonder({ wonder, deleteWonder, duplicateWonder }) {
  const { id, name, location, year, image, fact, ancient } = wonder;

  return (
    <article className={clsx("wonder-card", ancient && "ancient")}>
      <img className="wonder-image" src={image} alt={name} />

      <div className="wonder-content">
        <div className="wonder-heading">
          <h2>{name}</h2>
          {ancient && <span className="tag">Ancient</span>}
        </div>

        <p>
          <span className="label">Location:</span> {location}
        </p>
        <p>
          <span className="label">Year:</span> {year}
        </p>
        <p>
          <span className="label">Fact:</span> {fact}
        </p>

        <div className="button-row">
          <button type="button" onClick={() => duplicateWonder(id)}>
            Duplicate
          </button>
          <button
            type="button"
            className="delete-button"
            onClick={() => deleteWonder(id)}
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}

Wonder.propTypes = {
  wonder: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    fact: PropTypes.string.isRequired,
    ancient: PropTypes.bool.isRequired
  }).isRequired,
  deleteWonder: PropTypes.func.isRequired,
  duplicateWonder: PropTypes.func.isRequired
};
