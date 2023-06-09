import * as React from 'react';
import Chart from 'react-apexcharts';
type ChartProps = React.ComponentProps<typeof Chart>;
const chartData: ChartProps = {
  height: 320,
  type: "pie",
  options: {
    labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
    colors: ["#4680ff", "#0e9e4a", "#00acc1", "#fa7d03", "#ff5252"],
    legend: {
      show: true,
      position: "bottom"
    },
    dataLabels: {
      enabled: true,
      dropShadow: {
        enabled: false
      }
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: "bottom"
          }
        }
      }
    ]
  },
  series: [44, 55, 13, 43, 22]
};
export default chartData;