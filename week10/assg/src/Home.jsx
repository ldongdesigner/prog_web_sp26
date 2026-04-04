import WonderCard from "./WonderCard";
import wonders from "./wonders.json";

export default function Home() {
  return (
    <div className="App">
      <header className="page-header">
        <h1>New Seven Wonders of the World</h1>
        <p className="intro">
          This collection highlights the seven monuments chosen in the 2007 New
          Seven Wonders campaign. Click any wonder to view its detail page.
        </p>
        <p className="legend">
          <span className="legend-box"></span>
          Highlighted cards mark wonders from ancient historic periods.
        </p>
      </header>

      <section className="wonder-list">
        {wonders.map((wonder) => (
          <WonderCard key={wonder.slug} wonder={wonder} />
        ))}
      </section>
    </div>
  );
}