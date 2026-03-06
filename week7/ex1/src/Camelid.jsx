export default function Camelid({ name, img, trivia }) {
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>{name}</h2>
      <img src={img} alt={name} width="300" style={{ borderRadius: "10px"}} />
      <p>{trivia}</p>
    </div>
  );
}