function SliderRow({ label, value, unit, min, max, step, onChange, hint }) {
  return (
    <div className="slider-row">
      <div className="slider-topline">
        <label>{label}</label>
        <span>
          {value}
          {unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
      <p className="slider-hint">{hint}</p>
    </div>
  );
}

function ControlPanel({
  sunlight,
  setSunlight,
  demand,
  setDemand,
  batteryCapacity,
  setBatteryCapacity,
}) {
  return (
    <div className="controls-grid">
      <SliderRow
        label="Sunlight Intensity"
        value={sunlight}
        unit="%"
        min={0}
        max={100}
        step={1}
        onChange={setSunlight}
        hint="Higher sunlight increases solar generation."
      />

      <SliderRow
        label="Energy Demand"
        value={demand}
        unit="%"
        min={10}
        max={100}
        step={1}
        onChange={setDemand}
        hint="Higher demand makes the home use more electricity."
      />

      <SliderRow
        label="Battery Capacity"
        value={batteryCapacity}
        unit="%"
        min={10}
        max={100}
        step={1}
        onChange={setBatteryCapacity}
        hint="Higher capacity allows the system to store more energy."
      />
    </div>
  );
}

export default ControlPanel;
