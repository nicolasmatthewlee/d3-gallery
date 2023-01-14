import { CircleChart } from "./components/circle-chart";
import { Diagram2 } from "./components/diagram-2";
import { CitiesChart } from "./components/cities-chart";
import { LineChart } from "./components/line-chart";
import { AxesScalesChart } from "./components/axes-scales-chart";

function App() {
  return (
    <div className="App">
      <CircleChart />
      <Diagram2 />
      <CitiesChart />
      <LineChart />
      <AxesScalesChart />
    </div>
  );
}

export default App;
