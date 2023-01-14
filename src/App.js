import { CircleChart } from "./components/circle-chart";
import { Diagram2 } from "./components/diagram-2";
import { CitiesChart } from "./components/cities-chart";
import { LineChart } from "./components/line-chart";
import { AxesScalesChart } from "./components/axes-scales-chart";
import { AnimatedBarChart } from "./components/animated-bar-chart";
import { InteractiveBarChart } from "./components/interactive-bar-chart";

import "./components/styles/app.css";

function App() {
  return (
    <div className="App">
      <CircleChart />
      <Diagram2 />
      <AxesScalesChart />
      <AnimatedBarChart />
      <InteractiveBarChart />
    </div>
  );
}

export default App;
