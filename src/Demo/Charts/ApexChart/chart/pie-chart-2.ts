import * as React from 'react';
import Chart from 'react-apexcharts';
type ChartProps = React.ComponentProps<typeof Chart>;
const chartData: ChartProps = {
  height: 320,
  type: "donut",
  options: {
    colors: ["#4680ff", "#0e9e4a", "#00acc1", "#fa7d03", "#ff5252"],
    legend: {
      show: true,
      position: "bottom"
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: {
              show: true
            },
            value: {
              show: true
            }
          }
        }
      }
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
  series: [44, 55, 41, 17, 15]
};
export default chartData;