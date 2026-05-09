import { useMemo, useState } from "react";
import ControlPanel from "./components/ControlPanel";
import MetricCard from "./components/MetricCard";
import P5Scene from "./components/P5Scene";

function App() {
  const [sunlight, setSunlight] = useState(75);
  const [demand, setDemand] = useState(55);
  const [batteryCapacity, setBatteryCapacity] = useState(70);

  const metrics = useMemo(() => {
    const solarOutput = Math.round(sunlight * 1.2);
    const batteryStored = Math.round((batteryCapacity / 100) * 120);
    const energyGap = solarOutput + batteryStored - demand * 2;
    const status =
      energyGap > 20 ? "Surplus" : energyGap >= -20 ? "Balanced" : "Deficit";

    const batteryPercent = Math.max(
      10,
      Math.min(100, Math.round((batteryStored + energyGap) / 1.2))
    );

    const sustainabilityScore = Math.max(
      0,
      Math.min(
        100,
        Math.round(0.45 * sunlight + 0.35 * batteryCapacity + 0.2 * (100 - demand))
      )
    );

    return {
      solarOutput,
      batteryStored,
      batteryPercent,
      energyGap,
      status,
      sustainabilityScore,
    };
  }, [sunlight, demand, batteryCapacity]);

  return (
    <div className="app-shell">
      <header className="hero">
        <div className="hero-copy">
          <p className="eyebrow">React + p5.js final project</p>
          <h1>Energy System Playground</h1>
          <p className="hero-text">
            Energy System Playground is an interactive learning website that lets users explore how solar energy generation, household electricity demand, and battery storage work together in a sustainable energy system. By adjusting the sliders, users can instantly see how sunlight, energy consumption, and battery capacity affect the performance and stability of the grid in real time.
          </p>
        </div>

        <div className="hero-note">
          <div className="note-card">
            <h2>Sustainability through interaction</h2>
            <p>
              This project This project uses interactive visualization and animation to demonstrate why renewable solar power and batteries are important for a cleaner and more resilient future. The live simulation encourages users to experiment, compare outcomes, and better understand how energy storage helps balance renewable energy systems.
            </p>
          </div>
        </div>
      </header>

      <main className="main-grid">
        <section className="panel-card">
          <div className="section-heading">
            <h2>System controls</h2>
            <p>Change the inputs and compare the outputs.</p>
          </div>

          <ControlPanel
            sunlight={sunlight}
            setSunlight={setSunlight}
            demand={demand}
            setDemand={setDemand}
            batteryCapacity={batteryCapacity}
            setBatteryCapacity={setBatteryCapacity}
          />
        </section>

        <section className="panel-card canvas-card">
          <div className="section-heading">
            <h2>Interactive energy scene</h2>
            <p>
              p5.js animates the sun, solar panels, home demand, and battery
              charge level.
            </p>
          </div>

          <P5Scene
            sunlight={sunlight}
            demand={demand}
            batteryPercent={metrics.batteryPercent}
            status={metrics.status}
          />
        </section>

        <section className="metrics-wrap">
          <MetricCard
            label="Solar Output"
            value={`${metrics.solarOutput} kWh`}
            helper="Estimated clean energy production"
          />
          <MetricCard
            label="Battery Storage"
            value={`${metrics.batteryStored} kWh`}
            helper="Available stored energy"
          />
          <MetricCard
            label="Grid Balance"
            value={
              metrics.energyGap >= 0
                ? `+${metrics.energyGap} kWh`
                : `${metrics.energyGap} kWh`
            }
            helper={metrics.status}
          />
          <MetricCard
            label="Sustainability Score"
            value={`${metrics.sustainabilityScore}/100`}
            helper="Higher is cleaner and more resilient"
          />
        </section>
      </main>
    </div>
  );
}

export default App;
