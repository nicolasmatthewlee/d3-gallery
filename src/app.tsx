import BarChart from "./components/bar-chart";
import RacingBarChart from "./components/racing-bar-chart";
import ScatterPlot from "./components/scatter-plot";

function App() {
  return (
    <div
      className="p-[30px] gap-[30px] grid grid-flow-row
    sm:grid-cols-2
    lg:grid-cols-3"
    >
      <BarChart />
      <RacingBarChart />
      <ScatterPlot />
    </div>
  );
}

export default App;
