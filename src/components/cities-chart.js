import { select, csv } from "d3";

import data from "../cities.csv";

export const CitiesChart = () => {
  csv(data, (data) => console.log(data));
  return <div className="cities-chart"></div>;
};
