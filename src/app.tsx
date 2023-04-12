import BarChart from "./components/bar-chart";
import RacingBarChart from "./components/racing-bar-chart";
import ScatterPlot from "./components/scatter-plot";

function App() {
  return (
    <div
      className="p-[30px] space-y-[45px]
    md:columns-2 md:gap-x-[45px]"
    >
      <BarChart />
      <RacingBarChart />
      <ScatterPlot />
    </div>
  );
}

export default App;
