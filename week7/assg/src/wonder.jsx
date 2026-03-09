export default function Wonder({wonder}) {
  const { name, location, year, image, fact, ancient } = wonder;

  return (
    <article className={`wonder-card ${ancient ? "ancient" : ""}`}>
      <img className="wonder-image" src={image} alt={name} />

      <div className="wonder-content">
        <div>
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
  );
}