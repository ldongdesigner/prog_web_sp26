export default function Tea(props) {
  const { name, province, type, flavor, famous } = props.tea;

  return (
    <div className={`row ${famous ? "famous" : ""}`}>
      <div>{name}</div>
      <div>{province}</div>
      <div>{type}</div>
      <div>{flavor}</div>
    </div>
  );
}