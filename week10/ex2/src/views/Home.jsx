import { Link } from "react-router-dom";
import musicData from "../assets/music.json";

export function Home() {
  return (
    <section className="page">
      <header className="page-header">
        <h1>Music List</h1>
        <p className="intro">
          Explore the chart and click any song to view its detail page.
        </p>
      </header>

      <div className="song-grid">
        {musicData.songs.map((song) => {
          return (
            <article className="song-card" key={`${song.slug}-${song.rank}`}>
              {song.cover ? (
                <img src={song.cover} alt={song.title} className="song-cover" />
              ) : (
                <div className="song-cover placeholder">No Cover</div>
              )}

              <p className="song-title">
                <Link to={`/${song.slug}`}>
                  <strong>{song.title}</strong>
                </Link>
              </p>
              <p className="song-artist">by {song.artist}</p>
              <p className="song-rank">Rank #{song.rank}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}