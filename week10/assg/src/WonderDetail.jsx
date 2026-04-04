import { Link, useParams } from "react-router-dom";
import wonders from "./wonders.json";
import imageMap from "./imageMap";

export default function WonderDetail() {
  const { slug } = useParams();
  const wonder = wonders.find((item) => item.slug === slug);

  if (!wonder) {
    return (
      <div className="detail-page">
        <h1>Wonder Not Found</h1>
        <p>Sorry, that wonder does not exist.</p>
        <Link to="/" className="back-link">
          ← Return Home
        </Link>
      </div>
    );
  }

  return (
    <div className="detail-page museum-page">
      <Link to="/" className="back-link museum-back-link">
        ← Return Home
      </Link>

      <section className="hero-section">
        <img
          className="detail-hero-image"
          src={imageMap[wonder.image]}
          alt={wonder.name}
        />

        <div className="hero-overlay"></div>

        <div className="hero-text">
          <p className="hero-kicker">New Seven Wonders of the World</p>
          <h1>{wonder.name}</h1>
          <p className="hero-location">{wonder.location}</p>

          <div className="hero-meta">
            <span className="meta-pill">{wonder.year}</span>
            {wonder.ancient && <span className="meta-pill ancient-pill">Ancient</span>}
          </div>
        </div>
      </section>

      <section className="museum-content">
        <div className="museum-main">
          <p className="museum-lead">
            {wonder.name} stands as one of the most iconic monuments in world
            history, recognized for its cultural significance, architectural
            presence, and enduring legacy.
          </p>

          <div className="museum-text-block">
            <h2>Overview</h2>
            <p>
              {wonder.fact}
            </p>
            <p>
              Located in {wonder.location}, this site continues to attract global
              attention for its historical meaning and visual impact. Its inclusion
              in the New Seven Wonders campaign reflects both public admiration and
              its place in the story of human civilization.
            </p>
          </div>
        </div>

        <aside className="museum-sidebar">
          <div className="info-panel">
            <h3>Quick Facts</h3>
            <p>
              <span className="label">Name:</span> {wonder.name}
            </p>
            <p>
              <span className="label">Location:</span> {wonder.location}
            </p>
            <p>
              <span className="label">Year:</span> {wonder.year}
            </p>
            <p>
              <span className="label">Historic Period:</span>{" "}
              {wonder.ancient ? "Ancient" : "Later historical era"}
            </p>
          </div>
        </aside>
      </section>
    </div>
  );
}