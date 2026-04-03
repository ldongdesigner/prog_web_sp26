import { Link, useParams } from "react-router-dom";
import PropTypes from "prop-types";

export function Song({ data }) {
  const { slug } = useParams();
  const selectedSong = data.find((song) => song.slug === slug);

  if (!selectedSong) {
    return (
      <section className="page detail-page">
        <nav className="back-nav">
          <Link to="/" className="back-link">← Back Home</Link>
        </nav>
        <div className="detail-card">
          <h1>Song not found</h1>
          <p>Sorry, we couldn't find that song.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="page detail-page">
      <nav className="back-nav">
        <Link to="/" className="back-link">← Back Home</Link>
      </nav>

      <article className="detail-card">
        {selectedSong.cover ? (
          <img
            src={selectedSong.cover}
            alt={selectedSong.title}
            className="detail-cover"
          />
        ) : (
          <div className="detail-cover placeholder large">No Cover Available</div>
        )}

        <h1>{selectedSong.title}</h1>
        <p><strong>Artist:</strong> {selectedSong.artist}</p>
        <p><strong>Rank:</strong> #{selectedSong.rank}</p>
        <p><strong>Peak Position:</strong> #{selectedSong.position.peakPosition}</p>
        <p><strong>Weeks on Chart:</strong> {selectedSong.position.weeksOnChart}</p>
        <p>
          <strong>Last Week:</strong>{" "}
          {selectedSong.position.positionLastWeek ?? "New this week"}
        </p>
      </article>
    </section>
  );
}

Song.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};