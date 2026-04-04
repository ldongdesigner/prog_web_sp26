import { Link } from "react-router-dom";
import imageMap from "./imageMap";

export default function WonderCard({ wonder }) {
  const { slug, name, location, year, image, fact, ancient } = wonder;

  return (
    <Link to={`/${slug}`} className="card-link">
      <article className={`wonder-card ${ancient ? "ancient" : ""}`}>
        <img className="wonder-image" src={imageMap[image]} alt={name} />

        <div className="wonder-content">
          <div className="title-row">
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
        </div>
      </article>
    </Link>
  );
}