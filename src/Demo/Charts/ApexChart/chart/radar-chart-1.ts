import * as React from 'react';
import Chart from 'react-apexcharts';
type ChartProps = React.ComponentProps<typeof Chart>;
const chartData: ChartProps = {
  height: 350,
  type: "radar",
  options: {
    dataLabels: {
      enabled: false
    },
    labels: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ],
    plotOptions: {
      radar: {
        size: 140,
        polygons: {
          strokeColor: "#f3f6ff",
          fill: {
            colors: ["#f3f6ff", "#fff"]
          }
        }
      }
    },
    title: {
      text: "Radar with Polygon Fill"
    },
    colors: ["#ff5252"],
    markers: {
      size: 4,
      colors: ["#fff"],
      strokeColor: "#ff5252",
      strokeWidth: 2
    },
    tooltip: {
      y: {
        formatter: (val: string) => val
      }
    },
    yaxis: {
      tickAmount: 7,
      labels: {
        formatter: (val: string, i: number) => {
          if (i % 2 === 0) {
            return val;
          } else {
            return "";
          }
        }
      }
    }
  },
  series: [
    {
      name: "Series 1",
      data: [20, 100, 40, 30, 50, 80, 33]
    }
  ]
};
export default chartData;