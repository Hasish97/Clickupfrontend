import * as React from 'react';
import Chart from 'react-apexcharts';
type ChartProps = React.ComponentProps<typeof Chart>;
const chartData: ChartProps = {
  height: 300,
  type: "line",
  options: {
    chart: {
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false,
      width: 2
    },
    stroke: {
      curve: "straight"
    },
    colors: ["#4680ff"],
    title: {
      text: "Product Trends by Month",
      align: "left"
    },
    grid: {
      row: {
        colors: ["#f3f6ff", "transparent"],
        opacity: 0.5
      }
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep"
      ]
    }
  },
  series: [
    {
      name: "Desktops",
      data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
    }
  ]
};
export default chartData;