import * as React from 'react';
import Chart from 'react-apexcharts';
type ChartProps = React.ComponentProps<typeof Chart>;
const chartData: ChartProps = {
  height: 150,
  type: "pie",
  options: {
    dataLabels: {
      enabled: false
    },
    colors: ["#d8d8d8", "#f83f37"],
    labels: ["Order", "New Order"],
    legend: {
      show: false
    }
  },
  series: [85.7, 47.56]
};
export default chartData;