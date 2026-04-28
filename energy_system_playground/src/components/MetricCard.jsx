function MetricCard({ label, value, helper }) {
  return (
    <article className="metric-card">
      <p className="metric-label">{label}</p>
      <h3>{value}</h3>
      <p className="metric-helper">{helper}</p>
    </article>
  );
}

export default MetricCard;
