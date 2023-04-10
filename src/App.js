import { AnimatedBarChart } from "./components/animated-bar-chart";
import { InteractiveBarChart } from "./components/interactive-bar-chart";
import { ResponsiveBarChart } from "./components/responsive-bar-chart";
import { RacingBarChart } from "./components/racing-bar-chart";
import { ScatterPlot } from "./components/scatter-plot";

function App() {
  return (
    <div className="p-[30px] space-y-[30px] flex-col">
      <AnimatedBarChart />
      <InteractiveBarChart />
      <ResponsiveBarChart />
      <RacingBarChart />
      <ScatterPlot />
    </div>
  );
}

export default App;
