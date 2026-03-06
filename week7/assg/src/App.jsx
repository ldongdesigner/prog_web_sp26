import "./styles.css";
import Tea from "./Tea";

export default function App() {
  // Array of tea collection objects
  const teas = [
    {
      name: "Longjing (Dragon Well)",
      province: "Zhejiang",
      type: "Green Tea",
      flavor: "Fresh, chestnut-like",
      famous: true
    },
    {
      name: "Tieguanyin",
      province: "Fujian",
      type: "Oolong Tea",
      flavor: "Floral, smooth",
      famous: true
    },
    {
      name: "Da Hong Pao",
      province: "Fujian",
      type: "Oolong Tea",
      flavor: "Roasted, rich",
      famous: true
    },
    {
      name: "Biluochun",
      province: "Jiangsu",
      type: "Green Tea",
      flavor: "Sweet, fruity",
      famous: false
    },
    {
      name: "Pu'er",
      province: "Yunnan",
      type: "Fermented Tea",
      flavor: "Earthy, deep",
      famous: true
    }
  ];

  return (
    <div className="App">
      <h1>Famous Chinese Teas</h1>
      <p className="legend"> Famous teas are highlighted</p>

      <div className="table">
        <div className="heading row">
          <div>Name</div>
          <div>Province</div>
          <div>Type</div>
          <div>Flavor</div>
        </div>

        {teas.map((tea) => (
          <Tea key={tea.name} tea={tea} />
        ))}
      </div>
    </div>
  );
}